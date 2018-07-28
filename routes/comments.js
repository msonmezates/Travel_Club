const express = require('express');
const router = express.Router({ mergeParams: true }); //mergeParams enables us to use req.params 
const TravelClub = require('../models/travelclub');
const Comment = require('../models/comment');
const middleware = require('../middleware');

// New Comments
router.get('/new', middleware.isLoggedIn, (req, res) => { //isLogged middleware enables/disables access to create a comment
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
router.post('/', middleware.isLoggedIn, (req, res) => {
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
          req.flash('success', 'Comment created!');
          res.redirect(`/travelplaces/${travelPlace._id}`);
        }
      });
    }
  });
});

// Edit Comments
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
  const { id, comment_id } = req.params;
  TravelClub.findById(id, (err, foundTravelPlace) => {
    if(err || !foundTravelPlace) {
      req.flash('error', 'Travel place not found!');
      res.redirect('back');
    }
    Comment.findById(comment_id, (err, foundComment) => {
      if(err) {
        res.redirect('back');
      } else {
        res.render('comments/edit', { travelPlace_id: id, comment: foundComment });
      }
    });
  });
});

// Update Comments
router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  const { id, comment_id } = req.params;
  const { comment } = req.body;
  Comment.findByIdAndUpdate(comment_id, comment, (err, updatedComment) => {
    if(err) {
      res.redirect('back');
    } else {
      res.redirect(`/travelplaces/${id}`);
    }
  });
});

// Destroy Route - Delete Comments
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  const { id, comment_id } = req.params;
  Comment.findByIdAndRemove(comment_id, (err) => {
    if(err) {
      res.redirect('back');
    } else {
      req.flash('success', 'Comment deleted!');
      res.redirect(`/travelplaces/${id}`);
    }
  });
});

module.exports = router;