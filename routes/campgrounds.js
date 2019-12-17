var express = require('express');
var router = express.Router({ mergeParams: true });
var Campground = require("../models/campground");

// -- CAMPGROUND Index ---
router.get("/", function (req, res) {
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
router.post("/", function (req, res) {
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
router.get("/new", function (req, res) {
    res.render("campgrounds/new");
});

//   -- CAMPGROUND Show --
router.get("/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

module.exports = router;