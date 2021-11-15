const express = require("express");
const router = express.Router();

let MoviesModel = require("../models/Movies.model");

router.get("/movies/create", (req, res, next) => {
  res.render("./movies/new-movies.hbs");
});

router.get("/movies", (req, res, next) => {
  const { movies } = req.params;
  MoviesModel.find(movies)
    .then((movies) => {
      res.render("./movies/movies.hbs", { movies });
    })
    .catch(() => {
      next("Single todo Fetch failed", err);
    });
});

router.get("/movies/:id", (req, res, next) => {
  let { id } = req.params;
  MoviesModel.findById(id)
    .then((movie) => {
      // console.log(drones);
      res.render("movies/movie-details.hbs", { movie });
    })
    .catch(() => {
      next("Drone details not found");
    });
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  MoviesModel.create({ title, genre, plot, cast })
    .populate("cast")
    .then((movies) => {
      res.render("/movies/movies.hbs", { movies });
    })
    .catch((err) => {
      next("Sorry movies creation failed", err);
    });
});

router.get("/movies/:id/edit", (req, res, next) => {
  let { id } = req.params;
  MoviesModel.findById(id)
    .then((movie) => {
      res.render("movies/edit-movie.hbs", { movie });
    })
    .catch(() => {
      next("Page not found");
    });
});

router.post("/movies/:id/edit", (req, res, next) => {
  let { title, genre, plot } = req.body;
  let { id } = req.params;
  MoviesModel.findByIdAndUpdate(id, { title, genre, plot })
    .then(() => {
      res.redirect("/");
    })
    .catch(() => {
      next("Edit drone failed");
    });
});

router.get("/movies/:id/delete", (req, res, next) => {
  const { id } = req.params;
  MoviesModel.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/");
    })
    .catch(() => {
      next("Movie deletion failed");
    });
});

module.exports = router;
