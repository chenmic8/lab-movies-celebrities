// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("celebrities/celebrities.hbs", { celebrities });
    })
    .catch((err) => console.error(err));
});
router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity.hbs");
});
router.post("/create", (req, res, next) => {
  const celebrity = req.body;
  const { name, occupation, catchPhrase } = celebrity;
  if (name && occupation && catchPhrase) {
    Celebrity.create(celebrity).then(() => res.redirect("/celebrities"));
  } else {
    const error = { error: "error: provide a value for all the fields" };
    res.render("celebrities/new-celebrity", error);
  }
});
router.post("/delete/:id", (req, res, next) => {
  Celebrity.findByIdAndDelete(req.params.id)
    .then((deletedCelebrity) => {
      console.log("this is the delted celebrity: ", deletedCelebrity);
      res.redirect("/celebrities");
    })
    .catch((err) => console.error(err));
});

module.exports = router;
