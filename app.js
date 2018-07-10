const express      = require('express'),
      app          = express(),
      bodyParser   = require('body-parser'),
      mongoose     = require('mongoose'),
      User         = require('./models/User');
      TravelClub   = require('./models/travelclub'),
      Comment      = require('./models/comment'),
      seedDataBase = require('./seedDatabase'),
      passport     = require('passport'),
      LocalStrategy= require('passport-local');


seedDataBase(); // Always seed database before running the code
mongoose.connect('mongodb://localhost/travel_club');

// PASSPORT Configuration
app.use(require('express-session')({
  secret: 'This is the secret part',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public')); //this middleware is to use css files

app.get('/', (req,res) => {
  res.render('landing');
});

// INDEX route - show all travel places
app.get('/travelplaces', (req,res) => {
  // get all travelplaces from db
  TravelClub.find({}, (err, travelplaces) => {
    if(err) console.log(err);
    else {
      res.render('travelPlaces/index', { travelplaces });
    }
  });
});

// CREATE route = add new places to DB
app.post('/travelplaces', (req,res) => {
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
app.get('/travelplaces/new', (req,res) => {
  // find the place with provided id
  // render the template with that travel place
  res.render('travelPlaces/new'); //new.ejs is the form file
});

// SHOW route - shows more info about one travel place
app.get('/travelplaces/:id', (req,res) => {
  const { id } = req.params;
  TravelClub.findById(id).populate('comments').exec((err, foundTravelPlace) => {  // populate('comments').exec(function(){}) enables to show the
    if(err) console.log(err);                                                     // data based on id
    else {
      console.log(foundTravelPlace);
      res.render('travelPlaces/show', { travelPlace: foundTravelPlace });
    }
  });
});

// ===============================
// COMMENTS ROUTES
// ===============================

app.get('/travelplaces/:id/comments/new', (req, res) => {
  // find the travel place by id
  const {id } = req.params;
  TravelClub.findById(id, (err, travelPlace) => {
    if(err) console.log(err);
    else {
      res.render('comments/new', { travelPlace });
    }
  });
});

app.post('/travelplaces/:id/comments', (req, res) => {
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

// ===============================
// AUTH ROUTES
// ===============================

// show register form
app.get('/register', (req,res) => {
  res.render('register');
});
// Handle sign up logic
app.post('/register', (req, res) => {
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
app.get('/login', (req, res) => {
  res.render('login');
});
// Login Logic
// middleware
app.post('/login', passport.authenticate('local', {
  successRedirect: '/travelplaces',
  failureRedirect: '/login'
}), (req, res) => {
});

// Logout Route
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.listen(process.env.PORT || 3000, () => console.log('Travel Club server has started...'));