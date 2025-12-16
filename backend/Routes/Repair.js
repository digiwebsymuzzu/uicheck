const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

/**
 * 🔴 HARD PROOF: Router loaded
 */
console.log("✅ RepairRoutes FILE loaded");

/**
 * Ensure upload directory exists
 */
const uploadDir = path.join(__dirname, "../uploads/email");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/**
 * Multer disk storage (REQUIRED for your case)
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("📂 Multer destination hit");
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    console.log("📄 Multer filename:", uniqueName);
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 },
});

/**
 * 🔴 HARD PROOF: Router entered
 */
router.use((req, res, next) => {
  console.log("➡️ RepairRoutes middleware HIT:", req.method, req.originalUrl);
  next();
});

/**
 * POST /api/repair
 */
router.post("/", upload.single("file"), async (req, res) => {
  console.log("🔥 Repair POST handler HIT");

  const { name, email, phone, subject, brands, message } = req.body;

  if (!name || !email || !phone || !subject || !brands || !message) {
    console.log("❌ Validation failed", req.body);
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
        pass: "Sukoon110#",
      },
      tls: { rejectUnauthorized: false },
    });

    const mailOptions = {
      from: `"Repair Request" <contact@udemandme.com>`,
      to: "info@udemandme.com",
      replyTo: email,
      subject: `Repair Request: ${subject}`,
      html: `
        <h3>New Repair Request</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Repair For:</b><br>${brands}</p>
        <p><b>Message:</b><br>${message}</p>
      `,
    };

    if (req.file) {
      console.log("📎 File attached:", req.file.path);
      mailOptions.attachments = [
        {
          filename: req.file.originalname,
          path: req.file.path,
        },
      ];
    } else {
      console.log("ℹ️ No file uploaded");
    }

    await transporter.sendMail(mailOptions);

    console.log("✅ Repair email sent");

    return res.json({
      success: true,
      message: "Repair request sent successfully",
    });
  } catch (err) {
    console.error("❌ Repair mail error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to send repair request",
    });
  }
});

module.exports = router;
