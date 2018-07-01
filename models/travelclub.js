const mongoose = require('mongoose');

// SCHEMA Setup
const travelClubSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

const TravelClub = mongoose.model('TravelClub', travelClubSchema);

module.exports = TravelClub;