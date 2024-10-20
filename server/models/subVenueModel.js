const mongoose = require("mongoose");

const subVenueSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    capacity: { type: Number },
    type: {
      type: String,
      required: true,
    },
    venueId: {
      type: String,
      required: true,
    },
    outsideEventsAllowed: { type: Boolean, default: false },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("subVenue", subVenueSchema);
