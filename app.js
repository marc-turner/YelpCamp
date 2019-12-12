var express = require("express"),
    bodyParser = require("body-parser"),
    app = express(),
    mongoose = require("mongoose"),
    Campground = require('./models/campground');

// APP CONFIG //
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// // SCHEMA SETUP //

//  CAMPGROUND SCHEMA //
// var campgroundSchema = new mongoose.Schema({
//     name: String,
//     image: String,
//     description: String
// });

// var Campground = mongoose.model("Campground", campgroundSchema);


// Campground.create(
//     {
//         name: "Granite Hill",
//         image: "https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744e702a73d19149c5_340.jpg",
//         description: "This is a huge granite hill. Primative campsite. Beautiful!"
//     }, function (err, campground) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("A NEW CAMPGOUND WAS CREATED!");
//             console.log(campground);
//         }
//     });

// ROUTES //
app.get("/", function (req, res) {
    res.render("landing");
});

// -- Index ---
app.get("/campgrounds", function (req, res) {
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log("THERE WAS AN ERROR");
            console.log(err);
        } else {
            res.render("index", { campgrounds: allCampgrounds });
        }
    });
});

//  -- Create --
app.post("/campgrounds", function (req, res) {
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

//   -- New --
app.get("/campgrounds/new", function (req, res) {
    res.render("new.ejs");
});

//   -- Show --
app.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", { campground: foundCampground });
        }
    });
});

// LISTENER //
app.listen(3000, function () {
    console.log("YELP CAMP APP HAS STARTED!");
});
