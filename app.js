const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const travelPlaces = [
  {name:'Pace Bend', image:'https://mabellake.com/wp-content/uploads/2015/01/tile-stay-seasonalrv-240x200.jpg'},
  {name:'Hill Country', image:'https://igx.4sqi.net/img/general/200x200/22593755_TJ6UIcYObQvxCuNAezV6283Fs0581TlzUcJMLxznxP8.jpg'},
  {name:'River Torridon', image:'https://s3-us-west-2.amazonaws.com/cdn.glaciermt.io/partners/536/536-b14d35-200.jpg'},
  {name:'Pace Bend', image:'http://blueridgeheritage.com/sites/default/files/images/200_RockyBluff.JPG'},
  {name:'Hill Country', image:'https://igx.4sqi.net/img/general/200x200/22593755_TJ6UIcYObQvxCuNAezV6283Fs0581TlzUcJMLxznxP8.jpg'},
  {name:'River Torridon', image:'https://s3-us-west-2.amazonaws.com/cdn.glaciermt.io/partners/536/536-b14d35-200.jpg'},
  {name:'Pace Bend', image:'http://blueridgeheritage.com/sites/default/files/images/200_RockyBluff.JPG'},
  {name:'Hill Country', image:'https://igx.4sqi.net/img/general/200x200/22593755_TJ6UIcYObQvxCuNAezV6283Fs0581TlzUcJMLxznxP8.jpg'},
  {name:'River Torridon', image:'https://s3-us-west-2.amazonaws.com/cdn.glaciermt.io/partners/536/536-b14d35-200.jpg'}
];

app.get('/', (req,res) => {
  res.render('landing');
});

app.get('/travelplaces', (req,res) => {
  res.render('travelplaces', { travelplaces: travelPlaces });
});

app.post('/travelplaces', (req,res) => {
  // get the data from form and add it into travelPlaces
  const { name } = req.body;
  const { image } = req.body;
  const newTravelPlace = { name, image }; //add this object into travelplaces array
  travelPlaces.push(newTravelPlace);
  res.redirect('/travelplaces');
});

app.get('/travelplaces/new', (req,res) => {
  res.render('new'); //new.ejs is the form file
});

app.listen(process.env.PORT || 3000, () => console.log('Travel Club server has started...'));