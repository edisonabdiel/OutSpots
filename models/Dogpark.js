const mongoose = require('mongoose')
const geoCoder = require('../config/geocoder')

const DogparkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String
  },
  facilities:{
    waterSupply: {
      type: Boolean, 
      default: false,
      required: false
    },
    seatingSpaces: {
      type: Boolean, 
      default: false,
      required: false
    },
    smallDogsArea: {
      type: Boolean, 
      default: false,
      required: false
    }
  },
  ground: {
    type: String,
    required: false
  },
  isFenced: {
    type: Boolean,
    required: false
  },

  createdAt: {
    type: Date,
    default: Date.now()
}
});

//Geocode and save location
DogparkSchema.pre('save', async function (next) {
  const geoloc = await geoCoder.geocode(this.address);
  console.log(geoloc);
  this.location = {
    type: 'Point',
    coordinates: [geoloc[0].longitude, geoloc[0].latitude],
    formattedAddress: geoloc[0].formattedAddress
  };

  //do not save address
  this.address = undefined;
  next();
});

const Dogpark = mongoose.model('Dogpark', DogparkSchema);

module.exports = Dogpark;

