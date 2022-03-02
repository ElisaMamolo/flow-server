const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Acquarium = require("../models/Acquarium.model");
const Log = require("../models/Log.model");
const User = require("../models/User.model");

router.get("/", (req, res, next) => {
  Acquarium.find()
    .then((acquariums) => res.json(acquariums))
    .catch((err) => res.json(err));
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  //TODO: add user property with user id
  const { name, liters, started, logs } = req.body;

  Acquarium.create({ name, liters, started, logs: [] })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

module.exports = router;
