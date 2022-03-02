const { Schema, model } = require("mongoose");

const acquariumSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    name: String,
    liters: Number,
    started: Date,
    logs: [{ type: Schema.Types.ObjectId, ref: "Log" }],
  },
  {
    timestamps: true,
  }
);

const Acquarium = model("Acquarium", acquariumSchema);

module.exports = Acquarium;
