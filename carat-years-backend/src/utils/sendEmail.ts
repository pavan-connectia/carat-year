import nodemailer from "nodemailer";

const sendEmail = async (
  to: string,
  subject: string,
  emailTemplate: string
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Carat Years Support" <${process.env.SMTP_EMAIL}>`,
      to: to,
      subject: subject,
      html: emailTemplate,
    });
  } catch (err) {
    console.log(err)
    throw new Error("Failed to send OTP email. Please try again.",)
  }
};

export default sendEmail;
