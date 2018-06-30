const mongoose = require('mongoose');

// SCHEMA Setup
const travelClubSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

const TravelClub = mongoose.model('TravelClub', travelClubSchema);

module.exports = TravelClub;