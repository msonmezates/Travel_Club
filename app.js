const express     = require('express'),
      app         = express(),
      bodyParser  = require('body-parser'),
      mongoose    = require('mongoose');


mongoose.connect('mongodb://localhost/travel_club');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const travelClubSchema = new mongoose.Schema({
  name: String,
  image: String
});

const TravelClub = mongoose.model('TravelClub', travelClubSchema);

// TravelClub.create({
//   name:'Hill Country', 
//   image:'https://igx.4sqi.net/img/general/200x200/22593755_TJ6UIcYObQvxCuNAezV6283Fs0581TlzUcJMLxznxP8.jpg'
// }, (err, travelplace) => {
//   if(err) console.log(err);
//   else console.log(travelplace);
// });

// const travelPlaces = [
//   {name:'Pace Bend', image:'https://mabellake.com/wp-content/uploads/2015/01/tile-stay-seasonalrv-240x200.jpg'},
//   {name:'Hill Country', image:'https://igx.4sqi.net/img/general/200x200/22593755_TJ6UIcYObQvxCuNAezV6283Fs0581TlzUcJMLxznxP8.jpg'},
//   {name:'River Torridon', image:'https://s3-us-west-2.amazonaws.com/cdn.glaciermt.io/partners/536/536-b14d35-200.jpg'},
//   {name:'Pace Bend', image:'http://blueridgeheritage.com/sites/default/files/images/200_RockyBluff.JPG'},
//   {name:'Hill Country', image:'https://igx.4sqi.net/img/general/200x200/22593755_TJ6UIcYObQvxCuNAezV6283Fs0581TlzUcJMLxznxP8.jpg'},
//   {name:'River Torridon', image:'https://s3-us-west-2.amazonaws.com/cdn.glaciermt.io/partners/536/536-b14d35-200.jpg'},
//   {name:'Pace Bend', image:'http://blueridgeheritage.com/sites/default/files/images/200_RockyBluff.JPG'},
//   {name:'Hill Country', image:'https://igx.4sqi.net/img/general/200x200/22593755_TJ6UIcYObQvxCuNAezV6283Fs0581TlzUcJMLxznxP8.jpg'},
//   {name:'River Torridon', image:'https://s3-us-west-2.amazonaws.com/cdn.glaciermt.io/partners/536/536-b14d35-200.jpg'}
// ];

app.get('/', (req,res) => {
  res.render('landing');
});

app.get('/travelplaces', (req,res) => {
  // get all travelplaces from db
  TravelClub.find({}, (err, travelplaces) => {
    if(err) console.log(err);
    else {
      res.render('travelplaces', { travelplaces });
    }
  });
});

app.post('/travelplaces', (req,res) => {
  // get the data from form and add it into travelPlaces
  const { name } = req.body;
  const { image } = req.body;
  const newTravelPlace = { name, image }; //add this object into travelplaces array
  // create a new place and save to DB
  TravelClub.create(newTravelPlace, (err, newPlace) => {
    if(err) console.log(err);
    else {
      // redirect back to travel places page
      res.redirect('/travelplaces');
    }
  });
});

app.get('/travelplaces/new', (req,res) => {
  res.render('new'); //new.ejs is the form file
});

app.listen(process.env.PORT || 3000, () => console.log('Travel Club server has started...'));