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







module.exports = router;
