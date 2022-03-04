const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const mongoose = require("mongoose");

const Log = require("../models/Log.model");
const Acquarium = require("../models/Acquarium.model");
const { findById } = require("../models/Log.model");

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    let foundLog = await Log.findById(id);
    res.status(201).json(foundLog);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { acquarium, comments, measurements } = req.body;
    let newLog = await Log.create({
      acquarium,
      comments,
      measurements,
    });
    //call acquarium and push id of this created log
    //only then can use populate on acquarium Logs
    await Acquarium.findByIdAndUpdate(acquarium, {
      $push: { logs: newLog._id },
    });
    res.status(201).json(newLog);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:logid/:acquariumid", (req, res, next) => {
  const { logid, acquariumid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(logid)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Log.findByIdAndUpdate(logid, req.body, { new: true })
    .then((updatedLog) => res.json(updatedLog))
    .catch((error) => {
      console.log(error);
      res.json(error);
    });
});

router.delete("/:logid/:acquariumid", async (req, res, next) => {
  const { logid, acquariumid } = req.params;
  try {
    await Log.findByIdAndRemove(logid);

    //call acquarium and push id of this created log
    //only then can use populate on acquarium Logs
    await Acquarium.findByIdAndUpdate(acquariumid, {
      $pull: { logs: logid },
    });
    res.status(201).json({
      message: `log with ${logid} is removed successfully.`,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
