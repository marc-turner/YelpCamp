var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var campgrounds = [
    {
        name: "Salmon Creek",
        image:
            "https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744e702d72dc9f48c7_340.jpg"
    },
    {
        name: "Granite Hill",
        image:
            "https://pixabay.com/get/57e8d3444855a914f6da8c7dda793f7f1636dfe2564c704c722a79dd9f45c05a_340.jpg"
    },
    {
        name: "Mountain Goats Bluff",
        image:
            "https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c722a79dd9f45c05a_340.jpg"
    },
    {
        name: "Salmon Creek",
        image:
            "https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744e702d72dc9f48c7_340.jpg"
    },
    {
        name: "Granite Hill",
        image:
            "https://pixabay.com/get/57e8d3444855a914f6da8c7dda793f7f1636dfe2564c704c722a79dd9f45c05a_340.jpg"
    },
    {
        name: "Mountain Goats Bluff",
        image:
            "https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c722a79dd9f45c05a_340.jpg"
    },
    {
        name: "Salmon Creek",
        image:
            "https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744e702d72dc9f48c7_340.jpg"
    },
    {
        name: "Granite Hill",
        image:
            "https://pixabay.com/get/57e8d3444855a914f6da8c7dda793f7f1636dfe2564c704c722a79dd9f45c05a_340.jpg"
    },
    {
        name: "Mountain Goats Bluff",
        image:
            "https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c722a79dd9f45c05a_340.jpg"
    }
];

// ROUTES //
app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", function (req, res) {
    // res.send("You hit the post route!");
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = { name: name, image: image };
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function (req, res) {
    res.render("new.ejs");
});

// LISTENER //
app.listen(3000, function () {
    console.log("YELP CAMP APP HAS STARTED!");
});
