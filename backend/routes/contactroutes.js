const express = require("express");
const { registerContact } = require("../controller/contactcontroller");
const router = express.Router();

router.post("/register",registerContact);






module.exports = router