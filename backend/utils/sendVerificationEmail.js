const nodemailer = require('nodemailer');
const config = require('../config');

const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: config.mailtrapUsername,
        pass: config.mailtrapPassword,
      },
    });

    const mailOptions = {
      from: 'Your Name <yourname@example.com>',
      to: email,
      subject: 'Account Verification',
      text: `Click the following link to verify your email: ${config.appURL}/verify/${verificationToken}`,
      html: `<p>Click the following link to verify your email: <a href="${config.appURL}/verify/${verificationToken}">${config.appURL}/verify/${verificationToken}</a></p>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Failed to send verification email', error);
  }
};

module.exports = sendVerificationEmail;
