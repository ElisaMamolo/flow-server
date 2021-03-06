const { Schema, model } = require("mongoose");

const logSchema = new Schema(
  {
    acquarium: { type: Schema.Types.ObjectId, ref: "Acquarium" },
    comments: String,
    measurements: [
      {
        timestamp: Date, //see if this needs to change
        ph: Number,
        temperature: Number,
        ammonia: Number,
        nitrite: Number,
        nitrate: Number,
        phosphate: Number,
        salinity: Number,
        alkalinity: Number,
        calcium: Number,
        magnesium: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Log = model("Log", logSchema);

module.exports = Log;
