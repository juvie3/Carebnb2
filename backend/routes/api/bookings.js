const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Spot, Review, Booking, ReviewImage, SpotImage } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

router.get("/current", requireAuth, async (req, res, next) => {

      const userBookings = await Booking.findAll({
            where: {
                  userId: req.user.id
            },
            include: [
                  {model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'], include: SpotImage},
            ]
      });

      const bookingsArray = [];

      userBookings.forEach(booking => {
            bookingsArray.push(booking.toJSON());
      });

      bookingsArray.forEach(booking => {

            booking.Spot.SpotImages.forEach(image => {

                  if(image.preview === true) {
                        booking.Spot.previewImage = image.url
                  };
            });

            if(!booking.Spot.previewImage) {
                  booking.Spot.previewImage = "There is no preview image"
            };

            delete booking.Spot.SpotImages;
      });

      return res.json({"Bookings": bookingsArray})

});

router.put("/:bookingId", requireAuth, async (req, res, next) => {

      const { startDate, endDate } = req.body;

      function datesBetween(startD, endD) {
            const currentD = new Date(startD.getTime());
            const dates = [];
            while (currentD <= endD) {
              dates.push(new Date(currentD));
              currentD.setDate(currentD.getDate() + 1);
            };
            return dates;
      };

      const curBooking = await Booking.findByPk(req.params.bookingId);

      if (!curBooking) {
            res.status(404);
            return res.json({
                  "message": "Booking couldn't be found"
            });
      };

      if (curBooking.userId !== req.user.id) {
            res.status(403);
            return res.json({
                  "message": "Forbidden"
                });
      };

      const curDate = new Date();

      if (curBooking.endDate.getTime() < curDate.getTime()) {
            res.status(403);
            return res.json({
                  "message": "Past bookings can't be modified"
                });
      };

      const allBookings = await Booking.findAll({
            where: {
                  spotId: curBooking.spotId
            }
      });

      const bookedDatesArray = [];

      allBookings.forEach(bookingss => {
            const fullBookingInfo = bookingss.toJSON();
            const sstart = fullBookingInfo.startDate;
            const eend = fullBookingInfo.endDate;

            const allDates = datesBetween(sstart, eend);

            allDates.forEach(datess => {
                  bookedDatesArray.push(datess.getTime());
            });
      });

      //=================================================
      // Handling date conflicts
      //=================================================

      const requestStart = new Date(startDate);
      const requestEnd = new Date(endDate);
      const requestedDatesArray = datesBetween(requestStart, requestEnd);

      if (bookedDatesArray.includes(requestStart.getTime())) {
            res.status(403);
            return res.json({
                  "message": "Sorry, this spot is already booked for the specified dates",
                  "errors": {
                    "startDate": "Start date conflicts with an existing booking"
                  }
            });
      };

      if (bookedDatesArray.includes(requestEnd.getTime())) {
            res.status(403);
            return res.json({
                  "message": "Sorry, this spot is already booked for the specified dates",
                  "errors": {
                        "endDate": "End date conflicts with an existing booking"
                  }
            });
      };

      for (let i = 0; i < requestedDatesArray.length; i++) {
            let thisDate = requestedDatesArray[i];
            if (bookedDatesArray.includes(thisDate.getTime())) {
                  res.status(403);
                  return res.json({"message": "Sorry, this spot is already booked in the middle of your requested stay"})
                  break;
            };
      };

      const newStart = new Date(startDate);
      const newEnd = new Date(endDate);

      if (newStart.getTime() >= newEnd.getTime()) {
            res.status(400);
            return res.json({
                  "message": "Bad Request",
                  "errors": {
                    "endDate": "endDate cannot be on or before startDate"
                  }
            })
      };

      await curBooking.update({
            startDate,
            endDate
      });

      return res.json(curBooking);
});

router.delete("/:bookingId", requireAuth, async (req, res, next) => {

      const curBooking = await Booking.findByPk(req.params.bookingId);

      if (!curBooking) {
            res.status(404);
            return res.json({
                  "message": "Booking couldn't be found"
            });
      };

      const curSpot = await Spot.findOne({
            where: {
                  id: curBooking.spotId
            }
      });

      if (req.user.id !== curBooking.userId && req.user.id !== curSpot.ownerId) {
            res.status(403);
            return res.json({
                  "message": "Forbidden"
            });
      };

      const curDate = new Date();

      if (curDate.getTime() >= curBooking.startDate.getTime()) {
            console.log('hello');
            res.status(403);
            return res.json({
                  "message": "Bookings that have been started can't be deleted"
            });
      };

      curBooking.destroy();

      return res.json({"message": "Successfully deleted"});
});




module.exports = router;
