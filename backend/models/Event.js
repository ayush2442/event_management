const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  location: String,
  maxAttendees: { type: Number, default: null },
  isPrivate: { type: Boolean, default: false },
  ticketPrice: { type: Number, default: 0 },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, {
  timestamps: true
});

// Add index for efficient querying
eventSchema.index({ date: 1, category: 1 });

module.exports = mongoose.model("Event", eventSchema);