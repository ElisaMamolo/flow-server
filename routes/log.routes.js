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
    const measurementsObject = req.body.measurements[0];
    if (measurementsObject.timestamp === null) {
      res.status(400).json({ message: "Date is required" });
      return;
    }

    if (
      measurementsObject.ph < 0 ||
      measurementsObject.temperature < 0 ||
      measurementsObject.ammonia < 0 ||
      measurementsObject.nitrite < 0 ||
      measurementsObject.nitrate < 0 ||
      measurementsObject.salinity < 0 ||
      measurementsObject.phosphate < 0 ||
      measurementsObject.salinity < 0 ||
      measurementsObject.alkalinity < 0 ||
      measurementsObject.calcium < 0
    ) {
      res.status(400).json({ message: "You must input only positive numbers" });
      return;
    }
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
  const measurementsObject = req.body.measurements[0];
  if (measurementsObject.timestamp === null) {
    res.status(400).json({ message: "Date is required" });
    return;
  }

  if (
    measurementsObject.ph < 0 ||
    measurementsObject.temperature < 0 ||
    measurementsObject.ammonia < 0 ||
    measurementsObject.nitrite < 0 ||
    measurementsObject.nitrate < 0 ||
    measurementsObject.salinity < 0 ||
    measurementsObject.phosphate < 0 ||
    measurementsObject.salinity < 0 ||
    measurementsObject.alkalinity < 0 ||
    measurementsObject.calcium < 0
  ) {
    res.status(400).json({ message: "You must input only positive numbers" });
    return;
  }

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
