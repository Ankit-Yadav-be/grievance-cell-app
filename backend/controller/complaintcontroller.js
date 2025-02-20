const Complaint = require("../model/complaintsmodel");
const sendEmail = require("../config/sendEmail");
const complaintcontroller = async (req, res) => {
  try {
    const {
      studentid,
      email,
      complaintdata,
      complainttype,
      branch,
      section,
      semester,
    } = req.body;
    console.log(email);

    const newComplaint = new Complaint({
      studentid,
      email,
      complaintdata,
      complainttype,
      branch,
      section,
      semester,
    });

    await newComplaint.save();
    //for sending  email
    await sendEmail(
      email,
      "Complaint Registered Successfully",
      `Your complaint has been registered successfully. Complaint ID: ${newComplaint.studentid}`
    );

    res.status(201).json({
      message: "Complaint created successfully",
      complaint: newComplaint,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating complaint", error: error.message });
  }
};

//getcomplaints
const getComplaintsByStudentId = async (req, res) => {
  try {
    // Extract studentid from query parameters
    const { studentid } = req.body;
    if (studentid) {
      console.log(studentid);
    }

    // Check if studentid is provided
    if (!studentid) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    // Find complaints by studentid
    const complaints = await Complaint.find({ studentid });

    // Check if complaints are found
    if (complaints.length === 0) {
      return res
        .status(404)
        .json({ message: "No complaints found for this student ID" });
    }

    // Respond with the complaints data
    res.status(200).json(complaints);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//getall complaint based on complainttype
const getComplaintsByType = async (req, res) => {
  const { complainttype } = req.body;

  if (!complainttype) {
    return res.status(400).json({
      success: false,
      message: "Complaint type is required",
    });
  }

  try {
    const complaints = await Complaint.find({ complainttype });

    if (complaints.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No complaints found for this type",
      });
    }

    res.status(200).json({
      success: true,
      data: complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

//for update action taken field
const updateActionTaken = async (req, res) => {
  try {
    const { _id } = req.body;

    // Find the complaint by studentid and update the actiontaken field to true
    const updatedComplaint = await Complaint.findOneAndUpdate(
      { _id },
      { actiontaken: true },
      { new: true } // This option returns the updated document
    );

    if (!updatedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

//for updating complaints status

const updateComplaintStatus = async (req, res) => {
  try {
    const { _id } = req.body;
    console.log(_id, "Ram");
    // Find the complaint by studentid and update the complaintstatus field to true
    const updatedComplaint = await Complaint.findOneAndUpdate(
      { _id },
      { complaintstatus: true },
      { new: true } // This option returns the updated document
    );

    if (!updatedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

//get all complaints for admin
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find(); // Fetch all complaints
    res.status(200).json(complaints);
  } catch (error) {
    console.error("Error fetching complaints", error);
    res.status(500).json({ message: "Failed to fetch complaints" });
  }
};

//for getting resolved complaints
const getTrueComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ complaintstatus: true });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Error fetching complaints", error });
  }
};

const getFalseComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ complaintstatus: false });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Error fetching complaints", error });
  }
};

module.exports = {
  getFalseComplaints,
  getTrueComplaints,
  getComplaintsByStudentId,
  complaintcontroller,
  getComplaintsByType,
  updateActionTaken,
  updateComplaintStatus,
  getAllComplaints,
};
