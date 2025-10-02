const Quotation = require("../Models/Quotation");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

// Create and send quotation
exports.createQuotation = async (req, res) => {
  try {
    // Get token from headers
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const useremail = decoded.email;
    const username = req.body.username;
    const userphone = req.body.userphone;

    const { requestType, subjects, userreference, usermessage } = req.body;

    // Validate
    if (!username || !useremail || !userphone || !requestType || !usermessage) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    // Save to DB
    const newQuotation = new Quotation({
      username,
      useremail,
      userphone,
      requestType,
      subjects,
      userreference,
      usermessage,
    });
    await newQuotation.save();

    // Send email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // fix "from" format
      to: process.env.EMAIL_TO,
      subject: "New Quotation Request From UdemandMe",
      html: `
        <h2>New Quotation Request</h2>
        <p><strong>Name:</strong> ${username}</p>
        <p><strong>Email:</strong> ${useremail}</p>
        <p><strong>Phone:</strong> ${userphone}</p>
        <p><strong>Request Type:</strong> ${requestType.join(", ")}</p>
        <p><strong>Subjects:</strong> ${subjects.join(", ")}</p>
        <p><strong>Reference:</strong> ${userreference}</p>
        <p><strong>Message:</strong> ${usermessage}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(201)
      .json({ message: "Quotation submitted and email sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
