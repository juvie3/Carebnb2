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
        price: 89.99,
        category: 'mansion'
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
        price: 54.50,
        category: 'cabin'
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
        price: 75.00,
        category: 'beachfront'
      },
      {
        ownerId: 1,
        address: "907 Upstate Way",
        city: "Rochester",
        state: "New York",
        country: "USA",
        lat: 43.156578,
        lng: -77.608849,
        name: "Frank Lloyd Wright House",
        description: "Discover an architectural gem by Frank Lloyd Wright in the heart of NY! This stunning Airbnb features a one-of-a-kind design that seamlessly blends nature with modernity. Immerse yourself in the tranquility of the surrounding landscape as you lounge by the pool. Inside, experience luxury and comfort with thoughtfully designed spaces, stylish furnishings, and state-of-the-art amenities. The fully equipped kitchen invites culinary adventures, and the cozy bedrooms promise restful nights. Perfectly located, you can explore NY's vibrant city life or retreat to this peaceful oasis. Book now for an unforgettable escape! #FLW #NYC #ModernLiving #PoolsideParadise",
        price: 95.00,
        category: 'lakefront'
      },
      {
        ownerId: 2,
        address: "432 Hillside Rd",
        city: "San Juan",
        state: "Puerto Rico",
        country: "USA",
        lat: 18.465540,
        lng: -66.105736,
        name: "Island Hillside Retreat",
        description: "Escape to a luxurious hillside mansion in enchanting Puerto Rico! Our Airbnb offers breathtaking views and a private pool for ultimate relaxation. Indulge in the serenity of the lush surroundings as you bask in the sun-drenched paradise. The mansion boasts elegant architecture, modern amenities, and spacious living areas. Unwind in stylish bedrooms with cozy comforts. Explore nearby pristine beaches, vibrant culture, and delicious cuisine. Whether seeking adventure or a peaceful retreat, this is your gateway to a magical Caribbean experience. Book now and create memories that will last a lifetime!",
        price: 105.00,
        category: 'beachfront'
      },
      {
        ownerId: 3,
        address: "657 Light Blvd",
        city: "Seattle",
        state: "Washington",
        country: "USA",
        lat: 47.606209,
        lng: -122.332069,
        name: "Brilliant Night Sky",
        description: "Welcome to our modern Seattle sanctuary! This Airbnb is flooded with natural light, thanks to its expansive windows that frame stunning city views. Take a refreshing dip in the private pool or unwind on the spacious deck, perfect for soaking up the Pacific Northwest ambiance. Inside, sleek design meets comfort, with contemporary furnishings and state-of-the-art amenities. The fully equipped kitchen is a dream for culinary enthusiasts. Located in a vibrant neighborhood, you'll have easy access to Seattle's attractions, dining, and entertainment. Experience city living with a touch of tranquility! Book now and make unforgettable memories.",
        price: 75.00,
        category: 'iconic'
      },
      {
        ownerId: 1,
        address: "123 Bohemian Way",
        city: "Portland",
        state: "Oregon",
        country: "USA",
        lat: 45.512230,
        lng: -122.658722,
        name: "Bohemian Life",
        description: "Embrace the bohemian spirit in our modern and cozy Portland Airbnb! This unique home is a haven of creativity and relaxation. The stylish decor, earthy tones, and natural textures create an inviting atmosphere. Lounge by the pool amidst lush greenery, enjoying the perfect blend of serenity and urban charm. The fully equipped kitchen inspires culinary adventures, while the comfortable bedrooms promise restful nights. Located in a trendy neighborhood, you'll find quirky shops, artisanal cafes, and lively entertainment just steps away. Immerse yourself in Portland's vibrant culture and unwind in this artistic oasis. Book now for an unforgettable stay!",
        price: 45.00,
        category: 'tiny'
      },
      {
        ownerId: 2,
        address: "567 Inner Court",
        city: "Los Angeles",
        state: "California",
        country: "USA",
        lat: 34.052235,
        lng: -118.243683,
        name: "Inner Sanctuary",
        description: "Discover modern elegance in the heart of Los Angeles at our Airbnb with an enchanting inner courtyard. This architectural gem exudes style and sophistication, with sleek lines and contemporary design. The central courtyard serves as a tranquil oasis, where you can relax and unwind amidst lush greenery and soothing water features. Inside, the home offers luxurious amenities, spacious living areas, and a fully equipped gourmet kitchen. Located in a prime neighborhood, you'll have easy access to LA's iconic attractions, trendy dining spots, and vibrant nightlife. Experience the best of LA living - book now for an unforgettable stay!",
        price: 150.00,
        category: 'mansion'
      },
      {
        ownerId: 3,
        address: "100 Nowhere Road",
        city: "Vancouver",
        state: "BC",
        country: "Canada",
        lat: 49.282729,
        lng: -123.120738,
        name: "Isolated Wonder",
        description: "Escape to a modern retreat in Vancouver, embraced by nature and lakes. This stylish Airbnb offers serene views, contemporary design, and spacious living areas. Immerse yourself in the surrounding greenery, explore nearby lakes, and experience the best of city and nature living. Book now for an unforgettable getaway!",
        price: 65.00,
        category: 'lakefront'
      },
      {
        ownerId: 1,
        address: "432 Green Ivy St",
        city: "Austin",
        state: "Texas",
        country: "USA",
        lat: 30.267153,
        lng: -97.743061,
        name: "Lush Oasis",
        description: "Welcome to our serene oasis in Austin, Texas! Nestled amidst lush greenery, our spacious and inviting house is the perfect retreat for nature enthusiasts and urban explorers alike. With ample room to stretch out and unwind, this home offers a seamless blend of comfort and elegance. Whether you're savoring the tranquil surroundings from the private patio or exploring the vibrant city, our Airbnb promises an unforgettable stay. Embrace the beauty of nature while enjoying the convenience of Austin's vibrant scene. Book now for an extraordinary escape!",
        price: 45.00,
        category: 'farm'
      },
      {
        ownerId: 2,
        address: "541 Ice Fire Rd",
        city: "Lake",
        state: "Queenstown",
        country: "New Zealand",
        lat: -45.031162,
        lng: 168.662644,
        name: "Breathtaking Mountain Lake Views",
        description: "Experience contemporary luxury in Queenstown, New Zealand! Our modern Airbnb is perfectly situated beside a breathtaking lake, offering stunning mountain views that will leave you in awe. The house is a masterpiece of design, with sleek interiors and top-notch amenities to ensure your utmost comfort. Whether you're sipping wine on the expansive deck or exploring the enchanting surroundings, this is a dream getaway. Indulge in the serenity of the lake, bask in the beauty of the mountains, and create memories to last a lifetime. Book now for an unforgettable escape to Queenstown's paradise!",
        price: 125.00,
        category: 'lakefront'
      },
      {
        ownerId: 3,
        address: "910 Carnival Ave",
        city: "Rio",
        state: "Rio de Janeiro",
        country: "Brazil",
        lat: -22.906847,
        lng: -43.172896,
        name: "Sea Views and Stone Walls",
        description: "Welcome to our luxurious and modern Airbnb in Rio de Janeiro, where opulence meets the majestic beauty of the ocean! Perched atop a cliff, this exquisite house offers unrivaled panoramic views of the azure waters and sandy shores. Indulge in a seamless blend of comfort and sophistication with sleek interiors and top-of-the-line amenities. Sip cocktails on the private terrace while watching the sunset paint the sky in hues of orange and pink. Located in the heart of Rio, you'll have easy access to the city's vibrant culture and iconic landmarks. Treat yourself to a once-in-a-lifetime experience in this oceanfront paradise. Book now and immerse yourself in Rio's allure!",
        price: 275.00,
        category: 'beachfront'
      },
      {
        ownerId: 1,
        address: "326 Treehouse Way",
        city: "Bedford",
        state: "Virginia",
        country: "USA",
        lat: 37.334308,
        lng: -79.523088,
        name: "Romantic Treehouse",
        description: "Retreat together into the trees at our unique treehouse! Perfect for romantic getaways, Bella Rose Treehouse overlooks our historic 18th century event venue, which features a working watermill. Make your own special moments and take in the beauty of nature like never before while still enjoying comfortable modern amenities. Our beautiful treehouse was built by Pete Nelson of Treehouse Masters, Animal Planet's original television program!",
        price: 25.00,
        category: 'treehouse'
      },
      {
        ownerId: 2,
        address: "410 Wood Trail",
        city: "Durham",
        state: "North Carolina",
        country: "USA",
        lat: 35.9904033,
        lng: -78.898619,
        name: "Modern Tiny House in the Woods",
        description: "You'll feel like you're getting away from it all in this modern, private tiny house in the trees (even though you're minutes from Duke, and downtown Durham, and loads of shopping and restaurants). All the right amenities are here - full kitchen, laundry, A/C, and high-speed internet - but don't be surprised if you find yourself opting to relax in the swing on the screened-in porch while you soak in the sounds of the birds and the trees instead.",
        price: 15.00,
        category: 'tiny'
      },
      {
        ownerId: 3,
        address: "1000 Castle Rd",
        city: "Cleveland",
        state: "Wisconsin",
        country: "USA",
        lat: 43.914994,
        lng: -87.747309,
        name: "Castle Vineyard",
        description: "For travelers who want an exclusive taste of Tuscany without the hassle of jetting across an ocean, The Castle Vineyard is the place to stay. The dramatic, spellbinding stone castle proudly overlooks over twenty acres of idyllic rolling hills and a gorgeous, working vineyard. Once inside, the interior does nothing to dispel the magic.",
        price: 15.00,
        category: 'castle'
      },
      {
        ownerId: 1,
        address: "123 Heavens Way",
        city: "Coron",
        state: "Palawan",
        country: "Philippines",
        lat: 11.940556,
        lng: 120.240278,
        name: "Bluewater Island Houseboat",
        description: "Set in a picturesque lagoon, this collection of secluded overwater cottages is a boat ride away from Coron Port. Featuring floating decks with sunloungers, rustic overwater cottages with thatched roofs have Wi-Fi, ceiling fans and cold-water showers. Upgraded cottages add air conditioning, dining areas, in-room safes and/or floor-to-ceiling windows.",
        price: 500.00,
        category: 'boat'
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options);
  }
};
