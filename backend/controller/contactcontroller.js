const Contact = require("../model/contactmodel");
const registerContact = async (req, res) => {
    const { name, studentId, message } = req.body;
  
    // Validate input
    if (!name || !studentId || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
    }
  
    try {
      // Create a new contact document
      const newContact = new Contact({
        name:name,
        studentid:studentId,
        message:message,
      });
  
      // Save the document to the database
      await newContact.save();
  
      // Send a success response
      res.status(201).json({
        success: true,
        message: 'Your message has been sent successfully.',
        newContact
      });
    } catch (error) {
      console.error(error);
      // Send an error response
      res.status(500).json({
        success: false,
        message: 'There was an error processing your request. Please try again later.',
      });
    }
  };

  module.exports = {registerContact}