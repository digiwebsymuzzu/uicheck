const express = require("express");
const router = express.Router();
const addressController = require("../Controllers/AddressController");

// All routes need Authorization: Bearer <token>
router.post("/", addressController.addAddress);
router.get("/", addressController.getAddresses);
router.put("/:addressId", addressController.updateAddress);
router.delete("/:addressId", addressController.deleteAddress);

module.exports = router;
