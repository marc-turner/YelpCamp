var express = require('express');
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// -- CAMPGROUND Index ---
router.get("/", function (req, res) {
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            req.flash("error", "Campgrounds not found");
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds, currentUser: req.user });
        }
    });
});

//  -- CAMPGROUND Create --
router.post("/", middleware.isLoggedIn, function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = { name: name, image: image, description: desc, author: author };
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            req.flash("error", "There was a problem creating the campground");
            console.log(err);
        } else {
            req.flash("success", "Campground was successfully created");
            res.redirect("/campgrounds");
        }
    });
});

//   -- CAMPGROUND form --
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

//   -- CAMPGROUND Show --
router.get("/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err || !foundCampground) {
            req.flash("error", "There was a problem finding the campground");
            res.resdirect("back");
            // console.log(err);
        } else {
            res.render("campgrounds/show", { campground: foundCampground, currentUser: req.user });
        }
    });
});

// -- CAMPGROUND show edit form --
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err || !foundCampground) {
            req.flash("error", "There was a problem finding the campground");
            res.redirect("back");
        } else {
            res.render("campgrounds/edit.ejs", { campground: foundCampground });
        }
    });
});

//  -- CAMPGROUND edit campground logic - update --
router.put("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
        if (err) {
            req.flash("error", "There was a problem updating your campground");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Your campground has been successfully updated");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// CAMPGROUND delete
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndDelete(req.params.id, function (err) {
        if (err) {
            req.flash("error", "There was aproblem deleting your campground");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Your campground has been deleted");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;