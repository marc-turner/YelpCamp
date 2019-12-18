var mongoose = require('mongoose');
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Granite Hill",
        image: "https://pixabay.com/get/57e8d34b4c50a814f6da8c7dda793f7f1636dfe2564c704c72297dd5954bc059_340.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias blanditiis voluptatem accusamus totam modi, eum magnam natus quo. Molestiae dicta voluptatum debitis obcaecati voluptas voluptatibus totam, nesciunt quo consequuntur officia maxime, consectetur fugit. Dolorem debitis nesciunt ipsam dicta voluptates neque consequuntur nulla exercitationem? Odit illo modi obcaecati a sit atque minus laborum eveniet tempore earum ratione impedit, perferendis architecto doloribus animi reprehenderit. Atque maiores assumenda, eum animi accusantium reiciendis a repellat voluptas architecto. Nobis quos culpa quo reiciendis corporis? Quod voluptates autem praesentium enim dignissimos aspernatur reprehenderit, cupiditate atque provident ipsam veniam aperiam beatae alias labore dolores voluptatibus, impedit quis."
    },
    {
        name: "Brokeback Mountain",
        image: "https://pixabay.com/get/57e0d6424b56ad14f6da8c7dda793f7f1636dfe2564c704c72297dd5954bc059_340.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias blanditiis voluptatem accusamus totam modi, eum magnam natus quo. Molestiae dicta voluptatum debitis obcaecati voluptas voluptatibus totam, nesciunt quo consequuntur officia maxime, consectetur fugit. Dolorem debitis nesciunt ipsam dicta voluptates neque consequuntur nulla exercitationem? Odit illo modi obcaecati a sit atque minus laborum eveniet tempore earum ratione impedit, perferendis architecto doloribus animi reprehenderit. Atque maiores assumenda, eum animi accusantium reiciendis a repellat voluptas architecto. Nobis quos culpa quo reiciendis corporis? Quod voluptates autem praesentium enim dignissimos aspernatur reprehenderit, cupiditate atque provident ipsam veniam aperiam beatae alias labore dolores voluptatibus, impedit quis.."
    },
    {
        name: "Cloud Valley",
        image: "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c72297dd5954bc059_340.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias blanditiis voluptatem accusamus totam modi, eum magnam natus quo. Molestiae dicta voluptatum debitis obcaecati voluptas voluptatibus totam, nesciunt quo consequuntur officia maxime, consectetur fugit. Dolorem debitis nesciunt ipsam dicta voluptates neque consequuntur nulla exercitationem? Odit illo modi obcaecati a sit atque minus laborum eveniet tempore earum ratione impedit, perferendis architecto doloribus animi reprehenderit. Atque maiores assumenda, eum animi accusantium reiciendis a repellat voluptas architecto. Nobis quos culpa quo reiciendis corporis? Quod voluptates autem praesentium enim dignissimos aspernatur reprehenderit, cupiditate atque provident ipsam veniam aperiam beatae alias labore dolores voluptatibus, impedit quis."
    }
]


// function to be exported to app.js //
function seedDB() {
    // remove all campgrounds and comments data //
    Campground.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Campgrounds removed from db!");
            Comment.deleteMany({}, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Comments removed from db!");
                }
            });
        }
        // add campgrounds via "data" array
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("A campground was added!");
                    Comment.create(
                        {
                            text: "This place is great but lame",
                            author: "Einstein"
                        }, function (err, comment) {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("A comment was added");
                        });
                }
            });
        });
    });
};

module.exports = seedDB;

