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

                  let aveStars = 0;
                  const starsArray = [];

                  spot.Reviews.forEach(reviews => {

                        starsArray.push(reviews.stars);
                  });

                  const initialValue = 0;
                  aveStars = starsArray.reduce(
                        (accumulator, currentValue) => accumulator + currentValue,
                        initialValue
                  );

                  spot.aveRating = aveStars;

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

            let aveStars = 0;
            let reviewCount = 0;
            const starsArray = [];

            parsedIdSpot.Reviews.forEach(reviews => {
                  reviewCount++;
                  starsArray.push(reviews.stars);
            });

            const initialValue = 0;
            aveStars = starsArray.reduce(
                  (accumulator, currentValue) => accumulator + currentValue,
                  initialValue
            );

            parsedIdSpot.numReviews = reviewCount;
            parsedIdSpot.aveStarRating = aveStars;

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

                  let aveStars = 0;
                  const starsArray = [];

                  spot.Reviews.forEach(reviews => {

                        starsArray.push(reviews.stars);
                  });

                  const initialValue = 0;
                        aveStars = starsArray.reduce(
                              (accumulator, currentValue) => accumulator + currentValue,
                              initialValue
                        );

                  spot.aveRating = aveStars;

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

router.post("/:spotId/images", requireAuth, async (req, res, next) => {

      const { url, preview } = req.body;

      const curSpot = await Spot.findByPk(req.params.spotId);

      if (curSpot && curSpot.ownerId === req.user.id) {

            const newSpotImage = await SpotImage.create({
                  url,
                  preview,
                  spotId: curSpot.id
            });

            return res.json(newSpotImage);

      } else if (curSpot && curSpot.ownerId !== req.user.id) {
            res.status(403);
            return res.json({"message": "You don't have the right authorization"});
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
            return res.json({"message": "You don't have the right authorization"});
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
            return res.json({"message": "You don't have the right authorization"});

      } else {
            res.status(404);
            return res.json({"message": "Spot couldn't be found"});
      }
});

module.exports = router;
