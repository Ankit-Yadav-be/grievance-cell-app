const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    teacherid: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("teacher", teacherSchema);
