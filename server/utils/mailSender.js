const nodemailer = require("nodemailer");

exports.mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: `WanderLust - by Kanad Shee <${process.env.MAIL_USER}>`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    console.log("Mail Sending info: ", info);
    return info;
  } catch (error) {
    console.log("Mail Sending error: ", error);
  }
};
