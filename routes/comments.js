const express = require('express');
const router = express.Router();
const TravelClub = require('../models/travelclub');
const Comment = require('../models/comment');

// Create middleware to handle unathorized access
const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) return next(); // if authorized, move to next step
  res.redirect('/login'); // if not authorized, redirect to login
}

// ===============================
// COMMENTS ROUTES
// ===============================

router.get('/travelplaces/:id/comments/new', isLoggedIn, (req, res) => { //isLogged middleware enables/disables access to create a comment
  // find the travel place by id
  const {id } = req.params;
  TravelClub.findById(id, (err, travelPlace) => {
    if(err) console.log(err);
    else {
      res.render('comments/new', { travelPlace });
    }
  });
});

router.post('/travelplaces/:id/comments', isLoggedIn, (req, res) => {
  const { id } = req.params; //get the id from url
  TravelClub.findById(id, (err, travelPlace) => {
    if(err) console.log(err);
    else {
      Comment.create(req.body.comment, (err, comment) => {
        if(err) console.log(err);
        else {
          travelPlace.comments.push(comment);
          travelPlace.save();
          res.redirect(`/travelplaces/${travelPlace._id}`);
        }
      });
    }
  });
});

module.exports = router;