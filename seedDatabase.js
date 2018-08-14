const mongoose = require("mongoose");
const TravelClub = require("./models/travelclub");
const Comment = require("./models/comment");

const travelPlacesArray = [
  {
    name: "Austin",
    image:
      "http://cdn.destination360.com/north-america/us/texas/images/s/austin-day-trip.jpg",
    description:
      "Mount Bonnell is the peak within Covert Park located on Mount Bonnell Drive and offers public access to panoramic views several hundred feet above Lake Austin",
    price: "20",
    author: {
      username: "John Doe"
    }
  },
  {
    name: "Austin",
    image:
      "http://cdn.destination360.com/north-america/us/texas/images/s/austin-day-trip.jpg",
    description:
      "Mount Bonnell is the peak within Covert Park located on Mount Bonnell Drive and offers public access to panoramic views several hundred feet above Lake Austin",
    price: "30",
    author: {
      username: "John Doe"
    }
  },
  {
    name: "Austin",
    image:
      "http://cdn.destination360.com/north-america/us/texas/images/s/austin-day-trip.jpg",
    description:
      "Mount Bonnell is the peak within Covert Park located on Mount Bonnell Drive and offers public access to panoramic views several hundred feet above Lake Austin",
    price: "40",
    author: {
      username: "John Doe"
    }
  }
];

const SeedDatabase = () => {
  // Remove all travel places from DB
  TravelClub.remove({}, err => {
    if (err) console.log(err);
    else {
      console.log("All travel places are removed!");
      // Once the data is removed
      // Then Add a travel place(s)
      travelPlacesArray.map(travelPlace => {
        TravelClub.create(travelPlace, (err, travelPlace) => {
          if (err) console.log(err);
          else {
            Comment.create(
              { text: "This place is beautiful", author: "John Doe" },
              (err, comment) => {
                if (err) console.log(err);
                travelPlace.comments.push(comment);
                travelPlace.save();
                console.log("New comment is created");
              }
            );
          }
        });
      });
    }
  });
};

module.exports = SeedDatabase;
