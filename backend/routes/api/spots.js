const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Spot, Review, Booking, ReviewImage, SpotImage } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

router.get("/", async (req, res) => {
      const allSpots = await Spot.findAll();

      return res.json({Spots: allSpots});
});

module.exports = router;
