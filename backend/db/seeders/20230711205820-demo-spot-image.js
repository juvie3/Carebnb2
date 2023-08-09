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
      },
      {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-52380618/original/1eecf1ae-cc6b-4128-b2db-1104b401edb4.jpeg",
        preview: true
      },
      {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-52380618/original/de27cb09-4483-42b4-b4ec-ff210af6f3ea.jpeg",
        preview: false
      },
      {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-52380618/original/d99cfb35-b220-4686-9e43-ea6d58a51094.jpeg",
        preview: false
      },
      {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-52380618/original/c240a9d3-8841-4537-8c7c-9095afd7effe.jpeg",
        preview: false
      },
      {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-52380618/original/d7733035-4883-4def-bdea-c9a1ffdb9eed.jpeg",
        preview: false
      },
      {
        spotId: 14,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-35484995/original/04ce5de7-5828-4353-870d-3971af6e50b1.jpeg",
        preview: true
      },
      {
        spotId: 14,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-35484995/original/80f1d07e-e409-47d4-9760-365855e05699.jpeg",
        preview: false
      },
      {
        spotId: 14,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-35484995/original/e5fd09b6-2f88-4f0a-a533-34d75890ac6d.jpeg",
        preview: false
      },
      {
        spotId: 14,
        url: "https://a0.muscache.com/im/pictures/6c497de0-523a-4dab-8d96-6a92febf4558.jpg",
        preview: false
      },
      {
        spotId: 14,
        url: "https://a0.muscache.com/im/pictures/114314cd-30fa-4654-a392-49eb5e774ca8.jpg",
        preview: false
      },
      {
        spotId: 15,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-616473242380750899/original/92dbd162-b07b-4818-b386-9b66edd05717.jpeg",
        preview: true
      },
      {
        spotId: 15,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-616473242380750899/original/dabda650-52b8-4964-9f0d-f82ac7ae184f.jpeg",
        preview: false
      },
      {
        spotId: 15,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-616473242380750899/original/7d9f0dec-ec68-4757-aa95-5c03cd5c8fe5.jpeg",
        preview: false
      },
      {
        spotId: 15,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-616473242380750899/original/dd616f51-7e90-4b35-9777-10ebe846d4a6.jpeg",
        preview: false
      },
      {
        spotId: 15,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-616473242380750899/original/44a21b2e-a4f0-4f05-baaa-88dcc30130f5.jpeg",
        preview: false
      },
      {
        spotId: 16,
        url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/a5/87/26/paolyn-houseboat.jpg?w=1200&h=-1&s=1",
        preview: true
      },
      {
        spotId: 16,
        url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/20/fa/41/71/bamboo-suite.jpg?w=1200&h=-1&s=1",
        preview: false
      },
      {
        spotId: 16,
        url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/20/fa/41/62/bamboo-suite.jpg?w=1200&h=-1&s=1",
        preview: false
      },
      {
        spotId: 16,
        url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/20/fa/3f/a2/glass-houseboat-bedroom.jpg?w=1200&h=-1&s=1",
        preview: false
      },
      {
        spotId: 16,
        url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/b4/b1/e4/paolyn-houseboats-coron.jpg?w=1100&h=-1&s=1",
        preview: false
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options);
  }
};
