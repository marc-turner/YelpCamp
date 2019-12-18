var express = require('express');
var router = express.Router();
var Campground = require("../models/campground");

// -- CAMPGROUND Index ---
router.get("/campgrounds", function (req, res) {
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log("THERE WAS AN ERROR");
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    });
});

//  -- CAMPGROUND Create --
router.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = { name: name, image: image, description: description };
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

//   -- CAMPGROUND form --
router.get("/campgrounds/new", function (req, res) {
    res.render("campgrounds/new");
});

//   -- CAMPGROUND Show --
router.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", { campground: foundCampground, currentUser: req.user });
        }
    });
});

module.exports = router;