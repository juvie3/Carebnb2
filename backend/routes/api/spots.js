const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Spot, Review, Booking, ReviewImage, SpotImage } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

router.get("/current", requireAuth, async (req, res, next) => {

      const userSpots = await Spot.findAll({
            where: {
                  ownerId: req.user.id
            },
            include: [{model: Review}, {model: SpotImage}]
      });

      const userArray = [];

      userSpots.forEach(spot => {
            userArray.push(spot.toJSON());
      });

      userArray.forEach(spot => {

            if (spot.Reviews.length) {

                  let totalStars = 0;
                  let count = 0
                  const starsArray = [];

                  spot.Reviews.forEach(reviews => {
                        count++;
                        starsArray.push(reviews.stars);
                  });

                  const initialValue = 0;
                  totalStars = starsArray.reduce(
                        (accumulator, currentValue) => accumulator + currentValue,
                        initialValue
                  );

                  spot.aveRating = totalStars/count;

            } else spot.aveRating = "There are no current ratings";

            delete spot.Reviews;

            spot.SpotImages.forEach(images => {

                  if(images.preview === true) {
                        spot.previewImage = images.url
                  };
            });

            if(!spot.previewImage) {
                  spot.previewImage = "There is no preview image"
            };

            delete spot.SpotImages;

      });

      return res.json({Spots: userArray});
});

router.get("/:spotId/reviews", async (req, res, next) => {

      const curSpotReviews = await Review.findAll({
            where: {
                  spotId: req.params.spotId
            },
            include: [
                  {model: User, attributes: ['id', 'firstName', 'lastName']},
                  {model: ReviewImage, attributes: ['id', 'url']}
            ]
      });

      if (curSpotReviews.length) return res.json(curSpotReviews)
      else {
            res.status(404);
            return res.json({"message": "Spot couldn't be found"});
      };
});

router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {

      const sspot = await Spot.findByPk(req.params.spotId);

      if (!sspot) {
            res.status(404);
            return res.json({
                  "message": "Spot couldn't be found"
                });
      }

      if (sspot.ownerId !== req.user.id) {

            const curSpot = await Spot.findByPk(req.params.spotId, {
                  attributes: [],
                  include: [{model: Booking, attributes: ["spotId", "startDate", "endDate"]}]
            });

            const bookingsArray = [];

            const thisSpot = curSpot.toJSON();

            const bookingInfo = Object.values(thisSpot);

            bookingInfo.forEach(bookingss => {

                  bookingss.forEach(bookingsss => {
                        const start = bookingsss.startDate;
                        const end = bookingsss.endDate;

                        const targetStart = start.getFullYear() + "-" + (start.getMonth()+1) + "-" + start.getDate();
                        const targetEnd = end.getFullYear() + "-" + (end.getMonth()+1) + "-" + end.getDate();

                        bookingsss.startDate = targetStart;
                        bookingsss.endDate = targetEnd;
                        bookingsArray.push(bookingsss);
                  });

            });

                  return res.json({"Bookings": bookingsArray});
      };

      if (sspot.ownerId === req.user.id) {

            const curSpot = await Spot.findByPk(req.params.spotId, {
                  attributes: [],
                  include: [
                        // {model: User, as: "Owner", attributes: ["id", "firstName", "lastName"]},
                        {model: Booking,
                              include: [{model: User, attributes: ['id', 'firstName', 'lastName']}]
                        }

                  ]
            });


            const bookingsArray = [];

            const thisSpot = curSpot.toJSON();

            const bookingInfo = thisSpot.Bookings;

            bookingInfo.forEach(bookingss => {

                  const start = bookingss.startDate;
                  const end = bookingss.endDate;

                  const targetStart = start.getFullYear() + "-" + (start.getMonth()+1) + "-" + start.getDate();
                  const targetEnd = end.getFullYear() + "-" + (end.getMonth()+1) + "-" + end.getDate();

                  const bookingObj = {
                        User: bookingss.User,
                        id: bookingss.id,
                        spotId: bookingss.spotId,
                        userId: bookingss.userId,
                        startDate: targetStart,
                        endDate: targetEnd,
                        createdAt: bookingss.createdAt,
                        updatedAt: bookingss.updatedAt
                  };

                  bookingsArray.push(bookingObj);

            });

                  return res.json({"Bookings": bookingsArray});
      }

});

router.get("/:spotId", async (req, res, next) => {

      const idSpot = await Spot.findByPk (req.params.spotId, {
            include: [
                  {model: Review},
                  {model: SpotImage, attributes: ['id', 'url', 'preview']},
                  {model: User, as: "Owner", attributes: ['id', 'firstName', 'lastName']}
            ]
      });

      if(!idSpot){
            res.status(404);
            return res.json({"message": "Spot couldn't be found"});
      };

      const parsedIdSpot = idSpot.toJSON();

      if (parsedIdSpot.Reviews.length) {

            let totalStars = 0;
            let reviewCount = 0;
            const starsArray = [];

            parsedIdSpot.Reviews.forEach(reviews => {
                  reviewCount++;
                  starsArray.push(reviews.stars);
            });

            const initialValue = 0;
            totalStars = starsArray.reduce(
                  (accumulator, currentValue) => accumulator + currentValue,
                  initialValue
            );

            parsedIdSpot.numReviews = reviewCount;
            parsedIdSpot.aveStarRating = totalStars/reviewCount;

      } else {
            parsedIdSpot.numReviews = 0;
            parsedIdSpot.aveStarRating = "There are no current ratings";
      }

      // delete parsedIdSpot.Reviews;
      const { id, ownerId, address, city, state, country,lat, lng, name, description, price, createdAt, updatedAt, SpotImages, Owner, numReviews, aveStarRating } = parsedIdSpot;

      const finalIdSpot = {id, ownerId, address, city, state, country,lat, lng, name, description, price, createdAt, updatedAt, numReviews, aveStarRating, SpotImages, Owner};

      return res.json(finalIdSpot);
});

router.get("/", async (req, res, next) => {

      const allSpots = await Spot.findAll({
            include: [{model: Review}, {model: SpotImage}]
      });

      const spotsArray = [];

      allSpots.forEach(spot => {
            spotsArray.push(spot.toJSON());
      });

      spotsArray.forEach(spot => {

            if (spot.Reviews.length) {

                  let totalStars = 0;
                  let count = 0
                  const starsArray = [];

                  spot.Reviews.forEach(reviews => {
                        count++;
                        starsArray.push(reviews.stars);
                  });

                  const initialValue = 0;
                  totalStars = starsArray.reduce(
                        (accumulator, currentValue) => accumulator + currentValue,
                        initialValue
                  );

                  spot.aveRating = totalStars/count;

            } else spot.aveRating = "There are no current ratings";

            delete spot.Reviews;

            spot.SpotImages.forEach(images => {

                  if(images.preview === true) {
                        spot.previewImage = images.url
                  };
            });

            if(!spot.previewImage) {
                  spot.previewImage = "There is no preview image"
            };

            delete spot.SpotImages;

      });

      return res.json({Spots: spotsArray});
});

router.post("/:spotId/bookings", requireAuth, async (req, res, next) => {

      function datesBetween(startD, endD) {
            const currentD = new Date(startD.getTime());
            const dates = [];
            while (currentD <= endD) {
              dates.push(new Date(currentD));
              currentD.setDate(currentD.getDate() + 1);
            };
            return dates;
      };

      const { startDate, endDate } = req.body;

      const curSpot = await Spot.findByPk(req.params.spotId);

      if (!curSpot) {
            res.status(404);
            return res.json({
                  "message": "Spot couldn't be found"
                });
      };

      if (curSpot.ownerId === req.user.id) {
            res.status(403);
            return res.json({"message": "Forbidden"});
      };

      //=================================================
      // Find all dates that are booked for this spot
      //=================================================

      const allBookings = await Booking.findAll({
            where: {
                  spotId: curSpot.id
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

      const newBooking = await Booking.create({
            spotId: curSpot.id,
            userId: req.user.id,
            startDate,
            endDate
      });

      const { id, spotId, userId, createdAt, updatedAt } = newBooking;

      const confirmedBooking = {
            id,
            spotId,
            userId,
            startDate,
            endDate,
            createdAt,
            updatedAt
      }

      // return res.json(newBooking);
      return res.json(confirmedBooking);

});

router.post("/:spotId/images", requireAuth, async (req, res, next) => {

      const { url, preview } = req.body;

      const curSpot = await Spot.findByPk(req.params.spotId);

      if (curSpot && curSpot.ownerId === req.user.id) {

            const newSpotImage = await SpotImage.create({
                  url,
                  preview,
                  spotId: curSpot.id
            });

            const finalSpotImage = await SpotImage.findByPk(newSpotImage.id, {
                  attributes: ['id', 'url', 'preview']
            });

            return res.json(finalSpotImage);

      } else if (curSpot && curSpot.ownerId !== req.user.id) {
            res.status(403);
            return res.json({
                  "message": "Forbidden"
                });
      } else {
            res.status(404);
            return res.json({"message": "Spot couldn't be found"});
      }
});

router.post("/:spotId/reviews", requireAuth, async (req, res, next) => {

      const curSpot = await Spot.findByPk(req.params.spotId, {
            include: Review
      });

      if (!curSpot) {
            res.status(404);
            return res.json({"message": "Spot couldn't be found"});
      }

      const curReviewsArray = [];

      curSpot.Reviews.forEach(reviews => {
            const {userId} = reviews.dataValues;
            curReviewsArray.push(userId);
      })

      if (curReviewsArray.includes(req.user.id)){
            res.status(500);
            return res.json({"message": "User already has a review for this spot"})
      }

      if (curSpot){
            const { review, stars } = req.body;

            const newReview = await Review.create({
                  userId: req.user.id,
                  spotId: req.params.spotId,
                  review,
                  stars,
            });

            res.status(201);
            return res.json(newReview);

      };
});

router.post("/", requireAuth, async (req, res, next) => {

      const { address, city, state, country, lat, lng, name, description, price } = req.body;

      const newSpot = await Spot.create({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            ownerId: req.user.id
      });

            res.status(201);
            return res.json(newSpot);

});

router.put("/:spotId", requireAuth, async (req, res, next) => {

      const { address, city, state, country, lat, lng, name, description, price } = req.body;

      const curSpot = await Spot.findByPk(req.params.spotId)

      if (curSpot && curSpot.ownerId === req.user.id) {

            const updatedSpot = await curSpot.update({
                  address,
                  city,
                  state,
                  country,
                  lat,
                  lng,
                  name,
                  description,
                  price
            });

            return res.json(updatedSpot);

      } else if (curSpot && curSpot.ownerId !== req.user.id) {
            res.status(403);
            return res.json({
                  "message": "Forbidden"
                });
      } else {
            res.status(404);
            return res.json({"message": "Spot couldn't be found"});
      }

});

router.delete("/:spotId", requireAuth, async (req, res, next) => {

      const curSpot = await Spot.findByPk(req.params.spotId);

      if (curSpot && curSpot.ownerId === req.user.id) {
            curSpot.destroy();
            return res.json({"message": "Successfully deleted"});

      } else if (curSpot && curSpot.ownerId !== req.user.id) {
            res.status(403);
            return res.json({
                  "message": "Forbidden"
                });

      } else {
            res.status(404);
            return res.json({"message": "Spot couldn't be found"});
      }
});

module.exports = router;
