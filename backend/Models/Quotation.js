const mongoose = require("mongoose");

const quotationSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    useremail: { type: String, required: true },
    userphone: { type: String, required: true },
    requestType: { type: [String], required: true }, // array of request types
    subjects: { type: [String], default: [] }, // array of subjects
    userreference: { type: String, default: "" },
    usermessage: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quotation", quotationSchema);
