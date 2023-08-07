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
        spotId: 1,
        url: "https://www.home-designing.com/wp-content/uploads/2021/02/luxury-LA-home.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://www.home-designing.com/wp-content/uploads/2021/02/outdoor-staircase.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://www.home-designing.com/wp-content/uploads/2021/02/luxury-living-room.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://www.home-designing.com/wp-content/uploads/2021/02/pivoting-front-door.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://www.home-designing.com/wp-content/uploads/2023/04/modern-day-houses-1024x1024.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://www.home-designing.com/wp-content/uploads/2022/01/outdoor-sofa.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://www.home-designing.com/wp-content/uploads/2022/01/small-sofa.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://www.home-designing.com/wp-content/uploads/2022/01/wooden-dining-table.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://www.home-designing.com/wp-content/uploads/2022/01/white-kitchen.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://www.home-designing.com/wp-content/uploads/2023/04/mid-century-modern-houses-1024x683.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://www.home-designing.com/wp-content/uploads/2018/10/Modern-outdoor-chairs.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://www.home-designing.com/wp-content/uploads/2018/10/mid-century-modern-living-room.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://www.home-designing.com/wp-content/uploads/2018/10/Wood-dining-set.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://www.home-designing.com/wp-content/uploads/2018/10/Baby-grand-piano.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://www.home-designing.com/wp-content/uploads/2023/04/big-modern-houses-1024x770.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://www.home-designing.com/wp-content/uploads/2018/03/Cantilevered-volume.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://www.home-designing.com/wp-content/uploads/2018/03/Contemporary-home.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://www.home-designing.com/wp-content/uploads/2018/03/Feature-staircase.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://www.home-designing.com/wp-content/uploads/2018/03/Exterior-stone-cladding.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://www.home-designing.com/wp-content/uploads/2023/04/modern-beach-houses-1024x682.webp",
        preview: true
      },
      {
        spotId: 5,
        url: "https://www.home-designing.com/wp-content/uploads/2022/03/luxury-home-exterior.webp",
        preview: false
      },
      {
        spotId: 5,
        url: "https://www.home-designing.com/wp-content/uploads/2022/03/modular-sofa.webp",
        preview: false
      },
      {
        spotId: 5,
        url: "https://www.home-designing.com/wp-content/uploads/2022/03/dining-room-pendnant-lights.webp",
        preview: false
      },
      {
        spotId: 5,
        url: "https://www.home-designing.com/wp-content/uploads/2022/03/four-poster-bed.webp",
        preview: false
      },
      {
        spotId: 6,
        url: "https://www.home-designing.com/wp-content/uploads/2023/04/modern-black-houses-1024x684.jpg",
        preview: true
      },
      {
        spotId: 6,
        url: "https://www.home-designing.com/wp-content/uploads/2017/11/antler-chandelier.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://www.home-designing.com/wp-content/uploads/2017/11/modern-brown-interior.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://www.home-designing.com/wp-content/uploads/2017/11/gray-area-rug.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://www.home-designing.com/wp-content/uploads/2017/11/white-tile-marble-floor.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://www.home-designing.com/wp-content/uploads/2023/04/cute-modern-houses-1024x626.jpg",
        preview: true
      },
      {
        spotId: 7,
        url: "https://www.home-designing.com/wp-content/uploads/2022/07/modern-architecture.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://www.home-designing.com/wp-content/uploads/2022/07/patio-ideas.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://www.home-designing.com/wp-content/uploads/2022/07/tiled-floor.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://www.home-designing.com/wp-content/uploads/2022/07/unique-garden-ideas.jpg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://www.home-designing.com/wp-content/uploads/2023/04/nice-modern-houses-1024x683.jpg",
        preview: true
      },
      {
        spotId: 8,
        url: "https://www.home-designing.com/wp-content/uploads/2023/02/courtyard-design.jpg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://www.home-designing.com/wp-content/uploads/2023/02/beige-sofa.jpg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://www.home-designing.com/wp-content/uploads/2023/02/round-dining-set.jpg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://www.home-designing.com/wp-content/uploads/2023/02/home-exterior.jpg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://www.home-designing.com/wp-content/uploads/2022/04/modern-architecture.jpg",
        preview: true
      },
      {
        spotId: 9,
        url: "https://www.home-designing.com/wp-content/uploads/2022/04/luxury-house.jpg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://www.home-designing.com/wp-content/uploads/2022/04/luxury-living-room.jpg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://www.home-designing.com/wp-content/uploads/2022/04/dining-room-pendant-light.jpg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://www.home-designing.com/wp-content/uploads/2022/04/terrace-design.jpg",
        preview: false
      },
      {
        spotId: 10,
        url: "https://www.home-designing.com/wp-content/uploads/2022/02/modern-home-exterior.jpg",
        preview: true
      },
      {
        spotId: 10,
        url: "https://www.home-designing.com/wp-content/uploads/2022/02/circular-courtyard.jpg",
        preview: false
      },
      {
        spotId: 10,
        url: "https://www.home-designing.com/wp-content/uploads/2022/02/wooden-dining-table-1.jpg",
        preview: false
      },
      {
        spotId: 10,
        url: "https://www.home-designing.com/wp-content/uploads/2022/02/freestanding-bathtub-3.jpg",
        preview: false
      },
      {
        spotId: 10,
        url: "https://www.home-designing.com/wp-content/uploads/2022/02/pivot-door.jpg",
        preview: false
      },
      {
        spotId: 11,
        url: "https://www.home-designing.com/wp-content/uploads/2021/12/large-area-rug.jpg",
        preview: true
      },
      {
        spotId: 11,
        url: "https://www.home-designing.com/wp-content/uploads/2021/12/kitchen-island-3.jpg",
        preview: false
      },
      {
        spotId: 11,
        url: "https://www.home-designing.com/wp-content/uploads/2021/12/kitchen-bar-stools-1.jpg",
        preview: false
      },
      {
        spotId: 11,
        url: "https://www.home-designing.com/wp-content/uploads/2021/12/luxurious-bedroom.jpg",
        preview: false
      },
      {
        spotId: 11,
        url: "https://www.home-designing.com/wp-content/uploads/2021/12/freestanding-bathtub-2.jpg",
        preview: false
      },
      {
        spotId: 12,
        url: "https://www.home-designing.com/wp-content/uploads/2019/11/luxury-home-with-pool.jpg",
        preview: true
      },
      {
        spotId: 12,
        url: "https://www.home-designing.com/wp-content/uploads/2019/11/outdoor-chaise-lounge-chairs.jpg",
        preview: false
      },
      {
        spotId: 12,
        url: "https://www.home-designing.com/wp-content/uploads/2019/11/modern-house-exterior.jpg",
        preview: false
      },
      {
        spotId: 12,
        url: "https://www.home-designing.com/wp-content/uploads/2019/11/hot-tub.jpg",
        preview: false
      },
      {
        spotId: 12,
        url: "https://www.home-designing.com/wp-content/uploads/2019/11/courtyard.jpg",
        preview: false
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options);
  }
};
