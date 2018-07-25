const express = require('express');
const router = express.Router({ mergeParams: true }); //mergeParams enables us to use req.params 
const TravelClub = require('../models/travelclub');
const Comment = require('../models/comment');

// Create middleware to handle unathorized access
const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) return next(); // if authorized, move to next step
  res.redirect('/login'); // if not authorized, redirect to login
}

// New Comments
router.get('/new', isLoggedIn, (req, res) => { //isLogged middleware enables/disables access to create a comment
  // find the travel place by id
  const {id } = req.params;
  TravelClub.findById(id, (err, travelPlace) => {
    if(err) console.log(err);
    else {
      res.render('comments/new', { travelPlace });
    }
  });
});

// Create Comments
router.post('/', isLoggedIn, (req, res) => {
  const { id } = req.params; //get the id from url
  TravelClub.findById(id, (err, travelPlace) => {
    if(err) console.log(err);
    else {
      Comment.create(req.body.comment, (err, comment) => {
        if(err) console.log(err);
        else {
          // add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          // save comment
          comment.save();

          travelPlace.comments.push(comment);
          travelPlace.save();
          console.log(comment)
          res.redirect(`/travelplaces/${travelPlace._id}`);
        }
      });
    }
  });
});

module.exports = router;