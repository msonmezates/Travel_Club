const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req,res) => {
  res.render('landing');
});

app.get('/campgrounds', (req,res) => {
  const campgrounds = [
    {name:'Pace Bend', image:'https://austinot.com/wp-content/uploads/2017/01/camping2pacebendJPG.jpg'},
    {name:'Hill Country', image:'https://i.pinimg.com/736x/9d/19/37/9d1937617e2f0839d145c3a9e7e4dba2--tent-camping-camping-outdoors.jpg'},
    {name:'River Torridon', image:'http://s0.geograph.org.uk/geophotos/01/30/72/1307243_6767b04c.jpg'}
  ];

  res.render('campgrounds', { campgrounds });
});

app.listen(process.env.PORT || 3000, () => console.log('Yelp Camp server has started...'));