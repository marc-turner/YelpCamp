var express = require('express');
var router = express.Router({ mergeParams: true });
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");


//  -- COMMENTS New --
router.get("/new", middleware.isLoggedIn, function (req, res) {
    //find campground by id
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { campground: campground, currentUser: req.user });
        }
    });
});

//  -- COMMENTS create --
router.post("/", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {

            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // create new comment
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    req.flash("error", "There was a problem creating your comment");
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Your comment has been successfully added");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// -- COMMENTS edit --
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err || !foundCampground) {
            req.flash("error", "No campground found");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err || !foundComment) {
                req.flash("error", "There was a problem finding the comment");
                res.render("back");
            } else {
                res.render("comments/edit", { campground_id: req.params.id, comment: foundComment });
            }
        });
    });

});

// -- COMMENT update --
router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
        if (err) {
            req.flash("error", "There was a problem updating your comment");
            res.redirect("back");
        } else {
            req.flash("success", "Your comment was successfully updated");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// -- COMMENT delete --
router.delete("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if (err) {
            req.flash("error", "There was a problem deleting your comment");
            res.redirect("back");
        } else {
            req.flash("success", "Your comment was successfully deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;