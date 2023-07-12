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
            }
      })

      return res.json({Spots: userSpots});
});

router.get("/:spotId", async (req, res, next) => {


      const idSpot = await Spot.findByPk (req.params.spotId, {

      });

      if (idSpot) {
            return res.json(idSpot)
      } else {
            res.status(404);
            return res.json({"message": "Spot couldn't be found"});
      }
});

router.get("/", async (req, res, next) => {

      const allSpots = await Spot.findAll();

      return res.json({Spots: allSpots});
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
