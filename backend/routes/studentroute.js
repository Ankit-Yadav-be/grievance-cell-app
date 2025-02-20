const express = require("express");
const { registercontroller, loginController } = require("../controller/studentcontroller");
const router = express.Router();
// Adjust the path according to your project structure

// Route for student registration
router.post("/register", registercontroller);
router.post("/login", loginController);

module.exports = router;
