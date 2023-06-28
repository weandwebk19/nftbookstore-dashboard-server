const { text } = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (email, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      service: process.env.MAIL_SERVICE,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    let body = {
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: subject,
      text: text,
      html: html,
    };

    await transporter.sendMail(body, (err, result) => {
      if (err) {
        console.log(err);
        return false;
      }
      console.log(result);
      console.log("email sent sucessfully");
    });
  } catch (error) {
    console.log(error, "email not sent");
  }
};

module.exports = sendEmail;
