const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const mongoose = require("mongoose");

const Log = require("../models/Log.model");
const Acquarium = require("../models/Acquarium.model");

router.post("/", (req, res, next) => {
  const { acquarium, comments, measurements } = req.body;

  Log.create({
    acquarium,
    comments,
    measurements,
  })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Log.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedLog) => res.json(updatedLog))
    .catch((error) => res.json(error));
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;

  Log.findByIdAndRemove(id)
    .then(() =>
      res.json({
        message: `Item with ${id} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
