'use strict';

/** @type {import('sequelize-cli').Migration} */

const { User, Spot, Review, Booking, ReviewImage, SpotImage } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        review: "Needed some cleaning",
        stars: 3
      },
      {
        spotId: 2,
        userId: 3,
        review: "Air was so thin it was wonderful",
        stars: 5
      },
      {
        spotId: 3,
        userId: 1,
        review: "I lost 5 pounds from all the dancing",
        stars: 4
      },
      {
        spotId: 4,
        userId: 2,
        review: "Stunning!",
        stars: 5
      },
      {
        spotId: 5,
        userId: 3,
        review: "Simply, WOW!",
        stars: 5
      },
      {
        spotId: 6,
        userId: 2,
        review: "Wonderful stay!",
        stars: 4
      },
      {
        spotId: 7,
        userId: 3,
        review: "Georgeous place!",
        stars: 4
      },
      {
        spotId: 8,
        userId: 2,
        review: "I really enjoyed my stays, and I can't wait to come back!",
        stars: 5
      },
      {
        spotId: 9,
        userId: 1,
        review: "What can you say? Just look at the photos! It did not disappoint!",
        stars: 5
      },
      {
        spotId: 10,
        userId: 3,
        review: "Never been to this part of the United States before, but this stay made it worth it! Really enjoyed my time there!",
        stars: 4
      },
      {
        spotId: 11,
        userId: 1,
        review: "It was a long flight to get there, but having a place like that was incredible!! Worth every penny!",
        stars: 5
      },
      {
        spotId: 12,
        userId: 2,
        review: "My family went to visit friends in Brazil, and this place was more than I could have asked for! It was heaven, and I was so sad to leave it all behind!",
        stars: 5
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(options);
  }
};
