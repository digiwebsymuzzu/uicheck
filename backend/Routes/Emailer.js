const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Basic validation
  if (!name || !email || !phone || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    // SMTP Transport (Namecheap Private Email)
    const transporter = nodemailer.createTransport({
      host: "mail.privateemail.com",
      port: 587, // STARTTLS
      secure: false,
      auth: {
        user: "contact@udemandme.com",
        pass: "Sukoon110#",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Send mail
    await transporter.sendMail({
      from: `"UdemandMe Website" <contact@udemandme.com>`,
      to: "info@udemandme.com",
      replyTo: email,
      subject: "New Contact Form Submission",
      html: `
        <h3>New Contact Query</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b><br>${message}</p>
      `,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}
      `,
    });

    return res.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Emailer error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
});

module.exports = router;
