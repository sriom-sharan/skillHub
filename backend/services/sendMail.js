const nodemailer = require("nodemailer");
require("dotenv").config();


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const sendEmail = async (toEmail, toName, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: {
        name: "SkillHub",
        address: process.env.EMAIL_ID,
      },

      to: {
        name: toName,
        address: toEmail,
      },

      subject: subject,

      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(
      "Email sent successfully:",
      info.messageId
    );

    return info;
  } catch (error) {
    console.error("Error while sending email:", error);
    throw error;
  }
};

module.exports = { sendEmail };