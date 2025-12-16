const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

/* ===== DEBUG ===== */
console.log("✅ EnquiryRoutes loaded");

/* ===== Ensure upload folder exists ===== */
const uploadDir = path.join(__dirname, "../uploads/email");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/* ===== Multer disk storage ===== */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 }, // 500KB
});

/* ===== POST /api/enquiry ===== */
router.post("/", upload.single("file"), async (req, res) => {
  console.log("🔥 Enquiry POST HIT");

  const { name, phone, email, requestType, brands, reference, message } =
    req.body || {};

  // Validation (file optional)
  if (!name || !phone || !email || !requestType || !brands || !message) {
    return res.status(400).json({
      success: false,
      message: "All required fields are missing",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "mail.privateemail.com",
      port: 587,
      secure: false,
      auth: {
        user: "contact@udemandme.com",
        pass: "Sukoon110#", // move to env later
      },
      tls: { rejectUnauthorized: false },
    });

    const mailOptions = {
      from: `"New Enquiry" <contact@udemandme.com>`,
      to: "info@udemandme.com",
      replyTo: email,
      subject: `New Enquiry – ${requestType}`,
      html: `
        <h3>New Enquiry</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Request Type:</b> ${requestType}</p>
        <p><b>Brands / Items:</b><br>${brands}</p>
        <p><b>Reference:</b> ${reference || "-"}</p>
        <p><b>Message:</b><br>${message}</p>
      `,
    };

    // attach file if uploaded
    if (req.file) {
      mailOptions.attachments = [
        {
          filename: req.file.originalname,
          path: req.file.path,
        },
      ];
    }

    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "Enquiry sent successfully",
    });
  } catch (err) {
    console.error("❌ Enquiry mail error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to send enquiry",
    });
  }
});

module.exports = router;
