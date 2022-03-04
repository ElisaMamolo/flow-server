const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Acquarium = require("../models/Acquarium.model");
const Log = require("../models/Log.model");
const User = require("../models/User.model");

router.get("/", (req, res, next) => {
  Acquarium.find()
    .populate("logs")
    .then((acquariums) => {
      console.log("acquariums :>> ", acquariums);
      res.json(acquariums);
    })
    .catch((err) => res.json(err));
});

//get by id for the edit page
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Acquarium.findById(id)
    .then((acquarium) => res.json(acquarium))
    .catch((err) => res.json(err));
});

router.post("/", (req, res, next) => {
  const { user, name, liters, started, logs } = req.body;

  Acquarium.create({ user, name, liters, started, logs: [] })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Acquarium.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedAcquarium) => res.json(updatedAcquarium))
    .catch((error) => res.json(error));
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;

  Acquarium.findByIdAndRemove(id)
    .then(() =>
      res.json({
        message: `Item with ${id} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
