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
      },
      {
        ownerId: 1,
        address: "907 Upstate Way",
        city: "Rochester",
        state: "New York",
        country: "USA",
        lat: 43.1566,
        lng: 77.6088,
        name: "Frank Lloyd Wright House",
        description: "Discover an architectural gem by Frank Lloyd Wright in the heart of NY! This stunning Airbnb features a one-of-a-kind design that seamlessly blends nature with modernity. Immerse yourself in the tranquility of the surrounding landscape as you lounge by the pool. Inside, experience luxury and comfort with thoughtfully designed spaces, stylish furnishings, and state-of-the-art amenities. The fully equipped kitchen invites culinary adventures, and the cozy bedrooms promise restful nights. Perfectly located, you can explore NY's vibrant city life or retreat to this peaceful oasis. Book now for an unforgettable escape! #FLW #NYC #ModernLiving #PoolsideParadise",
        price: 95.00
      },
      {
        ownerId: 2,
        address: "432 Hillside Rd",
        city: "San Juan",
        state: "Puerto Rico",
        country: "USA",
        lat: 18.4671,
        lng: 66.1185,
        name: "Island Hillside Retreat",
        description: "Escape to a luxurious hillside mansion in enchanting Puerto Rico! Our Airbnb offers breathtaking views and a private pool for ultimate relaxation. Indulge in the serenity of the lush surroundings as you bask in the sun-drenched paradise. The mansion boasts elegant architecture, modern amenities, and spacious living areas. Unwind in stylish bedrooms with cozy comforts. Explore nearby pristine beaches, vibrant culture, and delicious cuisine. Whether seeking adventure or a peaceful retreat, this is your gateway to a magical Caribbean experience. Book now and create memories that will last a lifetime!",
        price: 105.00
      },
      {
        ownerId: 3,
        address: "657 Light Blvd",
        city: "Seattle",
        state: "Washington",
        country: "USA",
        lat: 47.61,
        lng: 122.332,
        name: "Brilliant Night Sky",
        description: "Welcome to our modern Seattle sanctuary! This Airbnb is flooded with natural light, thanks to its expansive windows that frame stunning city views. Take a refreshing dip in the private pool or unwind on the spacious deck, perfect for soaking up the Pacific Northwest ambiance. Inside, sleek design meets comfort, with contemporary furnishings and state-of-the-art amenities. The fully equipped kitchen is a dream for culinary enthusiasts. Located in a vibrant neighborhood, you'll have easy access to Seattle's attractions, dining, and entertainment. Experience city living with a touch of tranquility! Book now and make unforgettable memories.",
        price: 75.00
      },
      {
        ownerId: 1,
        address: "123 Bohemian Way",
        city: "Portland",
        state: "Oregon",
        country: "USA",
        lat: 45.5152,
        lng: 122.678,
        name: "Bohemian Life",
        description: "Embrace the bohemian spirit in our modern and cozy Portland Airbnb! This unique home is a haven of creativity and relaxation. The stylish decor, earthy tones, and natural textures create an inviting atmosphere. Lounge by the pool amidst lush greenery, enjoying the perfect blend of serenity and urban charm. The fully equipped kitchen inspires culinary adventures, while the comfortable bedrooms promise restful nights. Located in a trendy neighborhood, you'll find quirky shops, artisanal cafes, and lively entertainment just steps away. Immerse yourself in Portland's vibrant culture and unwind in this artistic oasis. Book now for an unforgettable stay!",
        price: 45.00
      },
      {
        ownerId: 2,
        address: "567 Inner Court",
        city: "Los Angeles",
        state: "California",
        country: "USA",
        lat: 34.0522,
        lng: 118.243,
        name: "Inner Sanctuary",
        description: "Discover modern elegance in the heart of Los Angeles at our Airbnb with an enchanting inner courtyard. This architectural gem exudes style and sophistication, with sleek lines and contemporary design. The central courtyard serves as a tranquil oasis, where you can relax and unwind amidst lush greenery and soothing water features. Inside, the home offers luxurious amenities, spacious living areas, and a fully equipped gourmet kitchen. Located in a prime neighborhood, you'll have easy access to LA's iconic attractions, trendy dining spots, and vibrant nightlife. Experience the best of LA living - book now for an unforgettable stay!",
        price: 150.00
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options);
  }
};
