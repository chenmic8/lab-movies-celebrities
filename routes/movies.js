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
    .populate("cast")
    .then((movie) => {
      console.log("get this movie", movie);
    });
});

module.exports = router;
