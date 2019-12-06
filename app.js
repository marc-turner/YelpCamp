var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Schema Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// ROUTES //
app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log("THERE WAS AN ERROR");
            console.log(err);
        } else {
            res.render("campgrounds", { campgrounds: allCampgrounds });
        }
    });
});

app.post("/campgrounds", function (req, res) {
    // res.send("You hit the post route!");
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = { name: name, image: image };
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
    // campgrounds.push(newCampground);
});

app.get("/campgrounds/new", function (req, res) {
    res.render("new.ejs");
});

// LISTENER //
app.listen(3000, function () {
    console.log("YELP CAMP APP HAS STARTED!");
});
