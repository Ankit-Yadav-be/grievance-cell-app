const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can use any email service
      auth: {
        user: 'ay870421@gmail.com', // Replace with your email
        pass: 'Ram@123456789', // Replace with your email password
      },
    });

    const mailOptions = {
      from: 'ay870421@gmail.com', // Replace with your email
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email', error);
  }
};

module.exports = sendEmail;
