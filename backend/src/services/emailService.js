const nodemailer = require('nodemailer');
const { getConfig } = require('../config');

const transporter = nodemailer.createTransport({
  host: getConfig().emailHost,
  port: getConfig().emailPort,
  secure: false,
  auth: {
    user: getConfig().emailUser,
    pass: getConfig().emailPass,
  },
});

async function sendEmail(to, subject, html) {
  await transporter.sendMail({
    from: getConfig().emailUser,
    to,
    subject,
    html,
  });
}

module.exports = { sendEmail };