const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const campgrounds = [
  {name:'Pace Bend', image:'https://austinot.com/wp-content/uploads/2017/01/camping2pacebendJPG.jpg'},
  {name:'Hill Country', image:'https://i.pinimg.com/736x/9d/19/37/9d1937617e2f0839d145c3a9e7e4dba2--tent-camping-camping-outdoors.jpg'},
  {name:'River Torridon', image:'http://s0.geograph.org.uk/geophotos/01/30/72/1307243_6767b04c.jpg'}
];

app.get('/', (req,res) => {
  res.render('landing');
});

app.get('/campgrounds', (req,res) => {
  res.render('campgrounds', { campgrounds });
});

app.post('/campgrounds', (req,res) => {
  // get the data from form and add it into campgrounds
  const { name } = req.body;
  const { image } = req.body;
  const newCampground = { name, image }; //add this object into campgrounds array
  campgrounds.push(newCampground);
  res.redirect('/campgrounds');
});

app.get('/campgrounds/new', (req,res) => {
  res.render('new'); //new.ejs is the form file
});

app.listen(process.env.PORT || 3000, () => console.log('Yelp Camp server has started...'));