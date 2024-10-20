const mongoose = require('mongoose');

const venueSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    name: { type: String, required: true },
    address: { type: String, required: true },
    // capacity: { type: Number },
    venueType: { type: String, enum: ["COLLEGE", "UNIVERSITY", "MARRIAGE-HALL"], required: true },
    subVenues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'subVenue' }],
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Venue', venueSchema);
