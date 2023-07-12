const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Spot, Review, Booking, ReviewImage, SpotImage } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

router.get("/current", requireAuth, async (req, res, next) => {

      const curUserReviews = await Review.findAll({
            where: {
                  userId: req.user.id
            }
      });

      if(curUserReviews.length) {
            return res.json(curUserReviews);
      } else return res.json({message: "You don't have any current reviews"});

});





module.exports = router;
