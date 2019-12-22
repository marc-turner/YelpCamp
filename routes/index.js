var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require("../models/user");

// -- ROOT route
router.get("/", function (req, res) {
    res.render("landing");
});

// AUTH Show - register form
router.get("/register", function (req, res) {
    res.render("register");
});

// AUTH Sign Up Logic
router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Welcome " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

// AUTH Show Login form
router.get("/login", function (req, res) {
    res.render("login");
});

// AUTH login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function (req, res) {

});

// AUTH logout
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "You have successfully logged out.");
    res.redirect("/campgrounds");
});

module.exports = router;