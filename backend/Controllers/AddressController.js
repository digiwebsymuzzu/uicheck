const jwt = require("jsonwebtoken");
const Customer = require("../Models/Customer");

// ✅ Add new address
exports.addAddress = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id; // ✅ make sure it's _id

    const { street, apartment, city, emirate, country, postalCode } = req.body;

    // Validate postalCode → must be 6 digits
    if (!/^\d{6}$/.test(postalCode)) {
      return res
        .status(400)
        .json({ message: "Postal code must be exactly 6 digits" });
    }

    const customer = await Customer.findById(userId);
    if (!customer) return res.status(404).json({ message: "User not found" });

    // Push address into array
    customer.addresses.push({
      street,
      apartment,
      city,
      emirate,
      country,
      postalCode,
    });

    await customer.save(); // ✅ actually saves in MongoDB

    res.json({ success: true, addresses: customer.addresses });
  } catch (error) {
    console.error(error); // log any error
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all addresses
exports.getAddresses = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;
    console.log(userId);
    const customer = await Customer.findById(userId);
    if (!customer) return res.status(404).json({ message: "User not found" });

    res.json({ success: true, addresses: customer.addresses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Edit an address
exports.updateAddress = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;

    const { addressId } = req.params;
    const { street, apartment, city, emirate, country, postalCode } = req.body;

    // Validate postalCode → must be 6 digits
    if (!/^\d{6}$/.test(postalCode)) {
      return res
        .status(400)
        .json({ message: "Postal code must be exactly 6 digits" });
    }

    const customer = await Customer.findById(userId);
    if (!customer) return res.status(404).json({ message: "User not found" });

    const address = customer.addresses.id(addressId);
    if (!address) return res.status(404).json({ message: "Address not found" });

    // update fields
    address.street = street;
    address.apartment = apartment;
    address.city = city;
    address.emirate = emirate;
    address.country = country;
    address.postalCode = postalCode;

    await customer.save();
    res.json({ success: true, addresses: customer.addresses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;

    const addressId = req.params.addressId;

    const customer = await Customer.findById(userId);
    if (!customer) return res.status(404).json({ message: "User not found" });

    const address = customer.addresses.id(addressId);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Safe removal
    customer.addresses = customer.addresses.filter(
      (addr) => addr._id.toString() !== addressId
    );

    await customer.save();

    res.json({ success: true, addresses: customer.addresses });
  } catch (error) {
    console.error(error); // <-- important: check this in console
    res.status(500).json({ message: error.message });
  }
};
