const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

router.get('/', (req,res) => {
  res.render('landing');
});

// ===============================
// AUTH ROUTES
// ===============================

// show register form
router.get('/register', (req,res) => {
  res.render('register');
});
// Handle sign up logic
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username });
  User.register(newUser, password, (err, user) => {
    if(err) {
      console.log(err);
      return res.render('register');
    } 
    passport.authenticate('local')(req, res, () => { // we are using local strategy
      res.redirect('/travelplaces');
    });
  })
});

// Show login form
router.get('/login', (req, res) => {
  res.render('login');
});
// Login Logic
// middleware
router.post('/login', passport.authenticate('local', {
  successRedirect: '/travelplaces',
  failureRedirect: '/login'
}), (req, res) => {
});

// Logout Route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/travelplaces');
});

module.exports = router;