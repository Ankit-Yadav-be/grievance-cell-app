const mongoose = require("mongoose");

const complaintSchema = mongoose.Schema(
  {
    studentid: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    complaintdata: {
      type: String,
      required: true,
    },
    complainttype: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    complaintstatus: {
      type: Boolean,
      default: false,
    },
    actiontaken: {
      type: Boolean,
      default: false,
    },
    feedback: {
      type: String,
      default: "No feedback Yet",
    },
    photo: {
      data: Buffer,  // Store the image as binary data
      contentType: String,  // Store the image content type (e.g., 'image/jpeg')
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("complaint", complaintSchema);
