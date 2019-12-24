var express = require("express"),
    bodyParser = require("body-parser"),
    app = express(),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require('passport'),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground = require('./models/campground'),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds")

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")

// APP CONFIG //
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/yelp_camp_2", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();


// PASSPORT CONFIG //
app.use(require("express-session")({
    secret: "noneya business",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// Requiring Routes
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// LISTENER //
app.listen(3000, function () {
    console.log("YELP CAMP APP HAS STARTED!");
});
