var mongoose = require('mongoose');
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Granite Hill",
        image: "https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744e732f72d29249c1_340.jpg",
        description: "A hill of granite"
    },
    {
        name: "Brokeback Mountain",
        image: "https://pixabay.com/get/57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c72297bdd9148c15c_340.jpg",
        description: "A REALLY friendly place."
    },
    {
        name: "Cloud Valley",
        image: "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c72297bdd9148c15c_340.jpg",
        description: "Not much to see here"
    }
]


// function to be exported to app.js //
function seedDB() {
    // remove all campgrounds and comments data //
    Campground.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Campgrounds removed from db!");
            Comment.deleteMany({}, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Comments removed from db!");
                }
            });
        }
        // add campgrounds via "data" array
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("A campground was added!");
                    Comment.create(
                        {
                            text: "This place is great but lame",
                            author: "Einstein"
                        }, function (err, comment) {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("A comment was added");
                        });
                }
            });
        });
    });
};

module.exports = seedDB;

