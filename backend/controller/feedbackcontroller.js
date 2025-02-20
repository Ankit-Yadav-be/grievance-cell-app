

const registerFeedback = async (req, res) => {
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
};

// const getfeedbackcontroller = async (req, res) => {
//   try {
//     const { studentid} = req.body;
// console.log("Hello",studentid);

//     // Find feedback by studentid
//     const feedback = await Feedback.findOne({ studentid });

//     if (!feedback) {
//       return res.status(404).json({ message: "Feedback not found" });
//     }

//     res.status(200).send(feedback);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error });
//   }
// };

module.exports = { registerFeedback };
