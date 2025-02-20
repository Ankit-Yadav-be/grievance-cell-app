const Student = require("../model/studentmodel"); // Adjust the path according to your project structure
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
// Register Controller
 // Use bcryptjs instead of bcrypt
const saltRounds = 10; // Number of salt rounds for bcrypt

const registercontroller = async (req, res) => {
  try {
    // Destructure student data from request body
    const { name, studentid, password, email, branch, section, semester } = req.body;

    // Validate required fields
    if (!name || !studentid || !password || !email || !branch || !section || !semester) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if student already exists
    const existingStudent = await Student.findOne({ studentid });
    if (existingStudent) {
        return res.status(400).json({ message: 'Student already exists' });
    }

    // Hash the password using bcryptjs
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new student with the hashed password
    const newStudent = new Student({
        name,
        studentid,
        password: hashedPassword,
        email,
        branch,
        section,
        semester
    });

    // Save the new student to the database
    await newStudent.save();

    // Send success response
    res.status(201).json({ message: 'Student registered successfully', student: newStudent });
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



//login


// Adjust the path as needed

const loginController = async (req, res) => {
  const { studentid, password } = req.body;
  console.log(req.body);
  try {
    // Validate input
    if (!studentid || !password) {
      return res.status(400).json({ message: 'Student ID and password are required' });
    }
   
    // Find student by studentid
    const student = await Student.findOne({ studentid });
    if (!student) {
      return res.status(401).json({ message: 'Invalid Student ID or password' });
    }

    // Check password
  

    // Generate JWT token
    const token = jwt.sign(
      { id: student._id, studentid: student.studentid },
      "ankit", // You might want to move this to an environment variable
      { expiresIn: '1h' } // Token expiry time
    );

    // Send response with token
    res.status(200).json({
      message: 'Login successful',
      token,
      student
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




module.exports = { registercontroller,loginController };
