// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/", (req, res, next) => {
  Movie.find()
    .then((movies) => {
      //   movies.forEach((movie) => console.log(movie.cast));
      res.render("movies/movies.hbs", { movies });
    })
    .catch((err) => console.error(err));
});
router.get("/create", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      // console.log(celebrities);
      res.render("movies/new-movie.hbs", { celebrities });
    })
    .catch((err) => console.error(err));
});
router.post("/create", (req, res, next) => {
  let movie = req.body;
  Movie.create(movie).then(() => res.redirect("/movies"));
});
router.get("/movie-details/:id", (req, res, next) => {
  Movie.findById(req.params.id)
    .populate({
      path: "cast",
    })
    .then((movie) => {
    //   console.log("get this movie", movie);
      res.render("movies/movie-details.hbs", movie);
    });
});
router.get("/delete/:id", (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id).then((deletedMovie) => {
    // console.log("deleted movie: ", deletedMovie);
    res.redirect("/movies");
  });
});
router.get("/update/:id", (req, res, next) => {
  Movie.findById(req.params.id)
    .populate()
    .then((movie) => {
      Celebrity.find().then((celebrities) => {
        let remainingCelebs = celebrities.filter(
          (curr) => !movie.cast.includes(curr._id)
        );
        let starringCelebs = celebrities.filter((curr) =>
          movie.cast.includes(curr._id)
        );
        res.render("movies/edit-movie", {
          movie,
          starringCelebs,
          remainingCelebs,
        });
      });
    });
});
router.post("/update/:id", (req, res, next) => {
  Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedMovie) => {
    //   console.log("updated movie: ", updatedMovie);
      res.redirect(`/movies/movie-details/${req.params.id}`);
    })
    .catch((err) => console.error(err));
});

module.exports = router;
