const TravelClub = require('../models/travelclub');
const Comment = require('../models/comment');

const middlewareObj = {
  // check travel place authorization
  checkTravelPlaceOwnership: (req, res, next) => {
    const { id } = req.params;
    // if user is logged in
    if (req.isAuthenticated()) {
      TravelClub.findById(id, (err, foundTravelPlace) => {
        if(err) {
          res.redirect('back');  // using back takes user back to the original page
          console.log(err);
        } else {
          // does user own the travel place?
          if (foundTravelPlace.author.id.equals(req.user._id)) {  // we need to use mongoose' equals method bc author.id is an object
            next();                                               // and req.user._id is a string even though they look identical
          } else { // otherwise redirect
            res.redirect('back');
          }
        }
      });
    } else { // user is not logged in so redirect back
      res.redirect('back'); 
    }
  },
  // check comment authorization
  checkCommentOwnership: (req, res, next) => {
    const { comment_id } = req.params;
    // if user is logged in
    if (req.isAuthenticated()) {
      Comment.findById(comment_id, (err, foundComment) => {
        if(err) {
          res.redirect('back');  // using back takes user back to the original page
          console.log(err);
        } else {
          // does user own the travel place?
          if (foundComment.author.id.equals(req.user._id)) {  // we need to use mongoose' equals method bc author.id is an object
            next();                                           // and req.user._id is a string even though they look identical
          } else { // otherwise redirect
            res.redirect('back');
          }
        }
      });
    } else { // user is not logged in so redirect back
      res.redirect('back'); 
    }
  },
  // handle unathorized access
  isLoggedIn: (req, res, next) => {
    if(req.isAuthenticated()) return next(); // if authorized, move to next step
    req.flash('error', 'Please login first');
    res.redirect('/login'); // if not authorized, redirect to login
  }
};

module.exports = middlewareObj;