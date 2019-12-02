var express = require("express");
var app = express();

app.set("view engine", "ejs");

// ROUTES //
app.get("/", function(req, res) {
    // res.send("Landing page works");
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
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
        }
    ];
    res.render("campgrounds", { campgrounds: campgrounds });
});

// LISTENER //
app.listen(3000, function() {
    console.log("YELP CAMP APP HAS STARTED!");
});
