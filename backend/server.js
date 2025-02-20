const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const studentroutes = require("./routes/studentroute");
const complaintroutes = require("./routes/complaintroute");
const teacherroute = require("./routes/teacherroute");
const connectiondb = require("./config/connectiondb");
const feedbackroute = require("./routes/feedbackroute");
const contactroute = require("./routes/contactroutes");
const Feedback = require("./model/complaintsmodel");
const path =require('path');
connectiondb();
const _dirname = path.resolve();
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/student", studentroutes);
app.use("/api/complaints", complaintroutes);
app.use("/api/teacher", teacherroute);
//app.use("/api/feedback", feedbackroute);
app.use("/api/contact", contactroute);

app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get('*',(_,res)=>{
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
})

app.get("/", (req, res) => {
  res.send("response is show here");
});


app.post("/register89",async (req, res) => {
  const { studentid, feedbackdata, complainttype, satisfied ,complaint} = req.body;
 // console.log(req.body);
 // console.log()
  // Check if all required fields are provided
  if (!studentid || !feedbackdata || !complainttype) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
  const feedback = await Feedback.findOne({ studentid ,complaintdata:complaint});
  feedback.feedback=feedbackdata;

    // Create a new feedback entry
    

    // Save the feedback entry to the database
    await feedback.save();


    // Respond with the created feedback
    res.status(201).json(feedback);
  } catch (error) {
    // Handle any errors that occur during the save operation
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, (req, res) => {
  console.log(`server is running at port ${PORT}`);
});
