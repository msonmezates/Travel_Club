const mongoose = require('mongoose');

// SCHEMA Setup
const travelClubSchema = new mongoose.Schema({
  name: String,
  price: String,
  image: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

const TravelClub = mongoose.model('TravelClub', travelClubSchema);

module.exports = TravelClub;