const express = require("express");
const { registerFeedback } = require("../controller/feedbackcontroller");
const router = express.Router();

router.post("/register89", registerFeedback);


module.exports = router;
