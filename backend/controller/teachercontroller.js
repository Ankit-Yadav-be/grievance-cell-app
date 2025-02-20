
const bcrypt = require("bcryptjs");
const Teacher = require("../model/teachermodel"); 
const jwt = require("jsonwebtoken");

const teacherregistrationcontroller = async(req,res)=>{
    try {
        const { name, teacherid, department, password } = req.body;

        // Check if the teacher already exists
        const existingTeacher = await Teacher.findOne({ teacherid });
        if (existingTeacher) {
            return res.status(400).json({ message: "Teacher already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new teacher
        const newTeacher = new Teacher({
            name,
            teacherid,
            department,
            password: hashedPassword
        });

        // Save the teacher to the database
        await newTeacher.save();

        res.status(201).json({ message: "Teacher registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }

}

//teacherlogin
const teacherLoginController = async (req, res) => {
    const { teacherid, password } = req.body;
    console.log(teacherid,password);
  
    try {
      // Find the teacher by ID
      const teacher = await Teacher.findOne({ teacherid });
  
      if (!teacher) {
        return res.status(400).json({ message: 'Invalid teacher ID or password' });
      }
  
      // Check if the password matches
      const isMatch = await bcrypt.compare(password, teacher.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid teacher ID or password' });
      }
  
      // Create a token for the teacher
      const token = jwt.sign(
        { id: teacher._id, teacherid: teacher.teacherid },
        'ankit', // Replace with your own secret
        { expiresIn: '23d' }
      );
  
      res.json({
        token,
        teacher: {
          id: teacher._id,
          name: teacher.name,
          department: teacher.department,
          admin:teacher.admin,
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  //getall teacher for admin page 

  const getAllTeachers = async (req, res) => {
    try {
      const teachers = await Teacher.find();
      res.status(200).json(teachers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch teachers", error });
    }
  };

  //update teacher 
  const updateTeacherById = async (req, res) => {
    const { teacherid, name, department, password } = req.body;
  
    try {
      // Find the teacher by teacherid
      const teacher = await Teacher.findOne({ teacherid });
  
      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
  
      // Update the teacher's details if they are provided
      if (name) teacher.name = name;
      if (department) teacher.department = department;
  
      // Update the password if provided
      if (password) {
        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        teacher.password = await bcrypt.hash(password, salt);
      }
  
      // Save the updated teacher document
      await teacher.save();
  
      res.status(200).json({
        message: "Teacher updated successfully",
        teacher,
      });
    } catch (error) {
      console.error("Error updating teacher", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  //remove teacher for admin
  const deleteTeacher = async (req, res) => {
    const teacherid = req.params.teacherid;
    
    
  
    if (!teacherid) {
      return res.status(400).json({ message: 'Teacher ID is required' });
    }
  
    try {
      // Find the teacher by teacherid and remove
      const result = await Teacher.findOneAndDelete({teacherid});
     
      if (!result) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
  
      res.status(200).json({ message: 'Teacher removed successfully' });
    } catch (error) {
      console.error('Error removing teacher:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports ={teacherregistrationcontroller,teacherLoginController,getAllTeachers,updateTeacherById,deleteTeacher}