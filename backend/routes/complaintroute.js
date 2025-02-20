const express  = require("express");
const {complaintcontroller, getComplaintsByStudentId, getComplaintsByType, updateActionTaken, updateComplaintStatus, getAllComplaints, getTrueComplaints, getFalseComplaints }= require("../controller/complaintcontroller");
const router = express.Router();


router.post("/complaint",complaintcontroller);
router.post("/getcomplaint",getComplaintsByStudentId);
router.post("/getallcomplaint",getComplaintsByType);
router.put("/updateaction",updateActionTaken);
router.put("/updatestatus",updateComplaintStatus);
router.get("/allcomplaintadmin",getAllComplaints);
router.get("/resolved",getTrueComplaints);
router.get("/unresolved",getFalseComplaints);



module.exports = router;