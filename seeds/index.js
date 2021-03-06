const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // USER ID
      author: '62b0d6ee27f0c5f67104f627',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit enim commodi omnis non expedita velit, incidunt facere possimus cum quia maiores sint atque libero eum amet, officiis eaque tenetur ipsam!',
      price,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: 'https://res.cloudinary.com/do7va2ezv/image/upload/v1655936011/YelpCamp/dttosn3nap5x8uoi49ea.jpg',
          filename: 'YelpCamp/dttosn3nap5x8uoi49ea',
        },
        {
          url: 'https://res.cloudinary.com/do7va2ezv/image/upload/v1656022401/YelpCamp/gnojyvxcuee3sbnep3vs.jpg',
          filename: 'YelpCamp/gnojyvxcuee3sbnep3vs',
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
