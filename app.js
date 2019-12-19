var express = require("express"),
    bodyParser = require("body-parser"),
    app = express(),
    mongoose = require("mongoose"),
    passport = require('passport'),
    LocalStrategy = require("passport-local"),
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
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
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
    next();
});

// Requiring Routes
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


// // -- ROOT route
// app.get("/", function (req, res) {
//     res.render("landing");
// });

// // -- CAMPGROUND Index ---
// app.get("/campgrounds", function (req, res) {
//     Campground.find({}, function (err, allCampgrounds) {
//         if (err) {
//             console.log("THERE WAS AN ERROR");
//             console.log(err);
//         } else {
//             res.render("campgrounds/index", { campgrounds: allCampgrounds });
//         }
//     });
// });

// //  -- CAMPGROUND Create --
// app.post("/campgrounds", function (req, res) {
//     var name = req.body.name;
//     var image = req.body.image;
//     var description = req.body.description;
//     var newCampground = { name: name, image: image, description: description };
//     Campground.create(newCampground, function (err, newlyCreated) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.redirect("/campgrounds");
//         }
//     });
// });

// //   -- CAMPGROUND form --
// app.get("/campgrounds/new", function (req, res) {
//     res.render("campgrounds/new");
// });

// //   -- CAMPGROUND Show --
// app.get("/campgrounds/:id", function (req, res) {
//     Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.render("campgrounds/show", { campground: foundCampground });
//         }
//     });
// });

// //  -- COMMENTS New --
// app.get("/campgrounds/:id/comments/new", isLoggedIn, function (req, res) {
//     //find campground by id
//     Campground.findById(req.params.id, function (err, campground) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.render("comments/new", { campground: campground });
//         }
//     });
// });

// //  -- COMMENTS create --
// app.post("/campgrounds/:id/comments", isLoggedIn, function (req, res) {
//     //look up campground using id
//     // console.log(req.body.comments);
//     Campground.findById(req.params.id, function (err, campground) {
//         if (err) {
//             console.log(err);
//             res.redirect("/campgrounds");
//         } else {
//             // create new comment
//             Comment.create(req.body.comments, function (err, comment) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     campground.comments.push(comment);
//                     campground.save();
//                     res.redirect("/campgrounds/" + campground._id);
//                 }
//             });
//         }
//     });
// });

// // AUTH Show - register form
// app.get("/register", function (req, res) {
//     res.render("register");
// });

// // AUTH Sign Up Logic
// app.post("/register", function (req, res) {
//     var newUser = new User({ username: req.body.username });
//     User.register(newUser, req.body.password, function (err, user) {
//         if (err) {
//             console.log(err);
//             return res.render("register")
//         }
//         passport.authenticate("local")(req, res, function () {
//             res.redirect("/campgrounds");
//         })
//     });
// });

// // AUTH Show Login form
// app.get("/login", function (req, res) {
//     res.render("login");
// });

// // AUTH login logic
// app.post("/login", passport.authenticate("local", {
//     successRedirect: "/campgrounds",
//     failureRedirect: "/login"
// }), function (req, res) {

// });

// // AUTH logout
// app.get("/logout", function (req, res) {
//     req.logout();
//     res.redirect("/campgrounds");
// });

// // middleware
// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect("/login");
// }


// LISTENER //
app.listen(3000, function () {
    console.log("YELP CAMP APP HAS STARTED!");
});
