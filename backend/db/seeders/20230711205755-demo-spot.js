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
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: "123 Sunshine Blvd",
        city: "San Diego",
        state: "California",
        country: "USA",
        lat: 32.7174202,
        lng: -117.1627728,
        name: "Home Away",
        description: "Your home away from home",
        price: 59.99
      },
      {
        ownerId: 2,
        address: "456 Happy Lane",
        city: "Denver",
        state: "Colorado",
        country: "USA",
        lat: 39.7392364,
        lng: -104.984862,
        name: "No Air",
        description: "Come with oxygen",
        price: 34.50
      },
      {
        ownerId: 3,
        address: "789 Dancing Way",
        city: "Miami",
        state: "Florida",
        country: "USA",
        lat: 25.7741728,
        lng: -80.19362,
        name: "Music House",
        description: "Bring your dancing shoes",
        price: 75.00
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options);
  }
};
