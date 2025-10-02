const mongoose = require("mongoose");
const AddressSchema = new mongoose.Schema({
  street: { type: String, required: true, trim: true },
  apartment: { type: String, trim: true },
  city: { type: String, required: true, trim: true },
  emirate: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  postalCode: { type: String, required: true, trim: true },
});
const CustomerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: 50, // optional
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 6, // bcrypt will hash this
    },
    dob: {
      type: Date,
    },
    phone: {
      type: String,
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"],
    },
    // 👇 New field: Array of address objects
    addresses: [AddressSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", CustomerSchema);
