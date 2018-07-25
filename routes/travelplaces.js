const express = require('express');
const router = express.Router();
const TravelClub = require('../models/travelclub');

// INDEX route - show all travel places
router.get('/', (req,res) => {
  // get all travelplaces from db
  TravelClub.find({}, (err, travelplaces) => {
    if(err) console.log(err);
    else {
      res.render('travelPlaces/index', { travelplaces });
    }
  });
});

// CREATE route = add new places to DB
router.post('/', (req,res) => {
  // get the data from form and add it into travelPlaces
  const { name, image, description } = req.body;
  const newTravelPlace = { name, image, description }; //add this object into travelplaces array
  // create a new place and save to DB
  TravelClub.create(newTravelPlace, (err, newPlace) => {
    if(err) console.log(err);
    else {
      // redirect back to travel places page
      res.redirect('/travelplaces');
    }
  });
});

// NEW route - show form to create new travel place
router.get('/new', (req,res) => {
  // find the place with provided id
  // render the template with that travel place
  res.render('travelPlaces/new'); //new.ejs is the form file
});

// SHOW route - shows more info about one travel place
router.get('/:id', (req,res) => {
  const { id } = req.params;
  TravelClub.findById(id).populate('comments').exec((err, foundTravelPlace) => {  // populate('comments').exec(function(){}) enables to show the
    if(err) console.log(err);                                                     // data based on id
    else {
      console.log(foundTravelPlace);
      res.render('travelPlaces/show', { travelPlace: foundTravelPlace });
    }
  });
});

module.exports = router;