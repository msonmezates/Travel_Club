const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  User = require("./models/user"),
  flash = require("connect-flash"), // to display the stored messages
  seedDataBase = require("./seedDatabase"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  methodOverride = require("method-override"); //to use HTTP verbs such as PUT or DELETE methods where the client doesn't support it

// requiring all routes
const commentRoutes = require("./routes/comments"),
  travelPlaceRoutes = require("./routes/travelplaces"),
  indexRoutes = require("./routes/index");

// seedDataBase(); // Always seed database before running the code
// mongoose.connect('mongodb://localhost/travel_club');
mongoose.connect("mongodb://mehmet:abc123@ds115022.mlab.com:15022/travelclub"); // Use mlab for easy deployment

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public")); //this middleware is to use css files

app.use(methodOverride("_method"));

app.use(flash());

// ===============================
// Passport Configuration

app.use(
  require("express-session")({
    secret: "This is the secret part",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// We need to create our middleware to enable currentuser
app.use((req, res, next) => {
  res.locals.currentUser = req.user; //make current user available when applicable
  res.locals.error = req.flash("error"); //make flash message available when there is an error
  res.locals.success = req.flash("success"); //make flash message available when it's successful
  next(); //move to next step
});
// ===============================

// Use RESTful Routes with prefix values
app.use("/", indexRoutes);
app.use("/travelplaces", travelPlaceRoutes);
app.use("/travelplaces/:id/comments", commentRoutes);

// Set server
app.listen(process.env.PORT || 3000, () =>
  console.log("Travel Club server has started...")
);
