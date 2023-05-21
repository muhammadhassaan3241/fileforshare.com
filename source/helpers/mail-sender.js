const nodemailer = require("nodemailer");

exports.transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "wetavfx4935@gmail.com",
    pass: "nevdbydkcypvmrkq",
  },
  tls: {
    rejectUnauthorized: false,
  },
});
