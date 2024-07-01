import nodemailer from "nodemailer";

export const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mavadiyadivyesh56@gmail.com",
    pass: "xlsz gkwd rrtg qhip",
  },
});
