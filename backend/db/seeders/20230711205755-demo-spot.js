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
        name: "California Dreaming",
        description: "Discover paradise in San Diego! Our stunning Airbnb offers a luxurious retreat with a private pool. Lounge in style, soak up the sun, and take refreshing dips. Inside, enjoy modern amenities, spacious rooms, and a fully equipped kitchen. Conveniently located near beaches, attractions, and dining. Your dream vacation starts here! Book now for an unforgettable experience.",
        price: 89.99
      },
      {
        ownerId: 2,
        address: "456 Happy Lane",
        city: "Denver",
        state: "Colorado",
        country: "USA",
        lat: 39.7392364,
        lng: -104.984862,
        name: "Mountain Retreat",
        description: "Welcome to our idyllic Denver mountain retreat with a private pool! Nestled in the heart of the majestic Rockies, our Airbnb offers a perfect blend of serene mountain charm and modern luxury. Immerse yourself in nature's beauty, hike scenic trails, and bask in the breathtaking views. Back at the cozy home, unwind by the pool, stargaze from the deck, and create cherished memories with loved ones. Enjoy the fully equipped kitchen, stylish living spaces, and comfortable bedrooms. With attractions nearby and mountain adventures at your doorstep, this is the ultimate dream getaway. Book now for an unforgettable experience!",
        price: 54.50
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
        description: "Escape to our tropical oasis in Miami, Florida! Our stunning Airbnb boasts a private pool for your ultimate relaxation and enjoyment. Bask in the warm sunshine, take refreshing dips, and savor the vibrant Miami vibes. The modern interior offers comfort and style, with a fully equipped kitchen, cozy bedrooms, and spacious living areas. Located near pristine beaches, trendy restaurants, and exciting nightlife, you'll have the best of Miami at your fingertips. Experience the magic of this coastal paradise! Book now for an unforgettable stay!",
        price: 75.00
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options);
  }
};
