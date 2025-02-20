const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema(
  {
    studentid: {
      type: String,
      required: true,
    },
    feedbackdata: {
      type: String,
      required: true,
    },
    complainttype: {
      type: String,
      required: true,
    },
    satisfied: {
      type: String,
      required: true,
      default: "No", // Default is "No", can be changed to "Yes"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("feedback", feedbackSchema);
