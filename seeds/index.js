const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10);
        const camp = new Campground({
            author : '64f07973767d6d211a59b3c6',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: "The camping welcomes you with there 90 pitches including 13 accommodation on a terrain of more than 3 hectares of land and terraces. Caravans and motorhomes are welcome and will have a place on the lower part of the campsite, the upper part is not being accessible to campers and large vehicles. All the spots have a 10 A electrical hook-up (for some of you, make sure having an extension cord).", 
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});

