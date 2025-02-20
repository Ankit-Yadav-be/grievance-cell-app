const express = require("express");
const { teacherregistrationcontroller, teacherLoginController, getAllTeachers, updateTeacherById, deleteTeacher } = require("../controller/teachercontroller");
const router = express.Router();


router.post("/register",teacherregistrationcontroller);
router.post("/login",teacherLoginController);
router.get("/allteacher",getAllTeachers);
router.put("/update",updateTeacherById);
router.delete("/delete/:teacherid",deleteTeacher);


module.exports = router