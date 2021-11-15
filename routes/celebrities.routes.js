const express = require("express");
const router = express.Router();

let CelebritiesModel = require("../models/Celebrities.model");

router.get("/celebrities", (req, res, next) => {
  const { celebrities } = req.params;
  CelebritiesModel.find(celebrities)
    .then((celebrities) => {
      res.render("./celebrities/celebritiesList.hbs", { celebrities });
    })
    .catch(() => {
      next("Single todo Fetch failed", err);
    });
});

router.get("/celebrities/create", (req, res, next) => {
  res.render("./celebrities/new-celebrity.hbs");
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  CelebritiesModel.create({ name, occupation, catchPhrase })
    .then((celebrities) => {
      res.render("./celebrities/celebritiesList.hbs", { celebrities });
    })
    .catch(() => {
      next("Single todo Fetch failed", err);
    });
});

module.exports = router;
