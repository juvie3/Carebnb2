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
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: "https://www.home-designing.com/wp-content/uploads/2023/04/modern-houses-1024x683.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://www.home-designing.com/wp-content/uploads/2023/04/modern-day-houses-1024x1024.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://www.home-designing.com/wp-content/uploads/2023/04/mid-century-modern-houses-1024x683.jpg",
        preview: true
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options);
  }
};
