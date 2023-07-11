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
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        startDate: "2022-01-06",
        endDate: "2022-01-15"
      },
      {
        spotId: 2,
        userId: 2,
        startDate: "2022-05-12",
        endDate: "2022-05-28"
      },
      {
        spotId: 3,
        userId: 3,
        startDate: "2022-11-01",
        endDate: "2022-11-02"
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkDelete(options);
  }
};
