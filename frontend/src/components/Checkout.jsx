import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const [selectedPayment, setSelectedPayment] = useState("cash payment");

  // Billing form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postCode, setPostCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const getProductPrice = (product, selectedAttributes = []) => {
    if (!product) return 0;

    let totalSalePrice = 0;
    let totalRegularPrice = 0;
    let hasValidSalePrice = false;

    if (selectedAttributes.length > 0) {
      selectedAttributes.forEach((attr) => {
        if (attr.attributeSalePriceInr > 0) {
          totalSalePrice += attr.attributeSalePriceInr;
          hasValidSalePrice = true;
        }
        if (attr.attributeRegularPriceInr > 0) {
          totalRegularPrice += attr.attributeRegularPriceInr;
        }
      });

      if (!hasValidSalePrice) {
        totalSalePrice = product.productSalePriceInr || 0;
        totalRegularPrice = product.productRegularPriceInr || 0;
      }
    } else {
      totalSalePrice = product.productSalePriceInr || 0;
      totalRegularPrice = product.productRegularPriceInr || 0;
    }

    return totalSalePrice;
  };

  // Calculations
  const subtotal =
    cart?.reduce(
      (acc, item) =>
        acc +
        getProductPrice(item.productId, item.selectedAttributes) * item.qty,
      0
    ) || 0;

  const tax = 10;
  const grandTotal = subtotal + tax;

  const handlePaymentChange = (e) => setSelectedPayment(e.target.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cart || cart.length === 0) return toast.error("Cart is empty!");

    const token = localStorage.getItem("token"); // 👈 JWT token uthao

    const payload = {
      user: {
        firstName,
        lastName,
        businessName,
        country,
        address,
        apartment,
        city,
        state,
        postCode,
        phone,
        email,
        notes,
      },
      cartItems: cart.map((item) => {
        const price = getProductPrice(item.productId, item.selectedAttributes);
        return {
          productId: item.productId?._id,
          productName: item.productId?.productName,
          qty: item.qty,
          price,
          total: price * item.qty,
        };
      }),
      subtotal,
      tax,
      grandTotal,
      paymentMethod: selectedPayment,
    };

    try {
      const response = await fetch("https://147.93.108.82:5000/api/order/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 👈 yahi missing tha
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to place order!");

      const data = await response.json();
      toast.success("Order placed successfully!");
      console.log("Order Data:", data);
      setFirstName("");
      setLastName("");
      setBusinessName("");
      setCountry("");
      setAddress("");
      setApartment("");
      setCity("");
      setState("");
      setPostCode("");
      setPhone("");
      setEmail("");
      setNotes("");
      setSelectedPayment("");
    } catch (err) {
      toast.error("Failed to place order!");
    }
  };

  return (
    <section className="checkout py-80">
      <div className="container container-lg">
        {/* Coupon */}
        <div className="border border-gray-100 rounded-8 px-30 py-20 mb-40">
          <span>
            Have a coupon?{" "}
            <Link
              to="/cart"
              className="fw-semibold text-gray-900 hover-text-decoration-underline hover-text-main-600"
            >
              Click here to enter your code
            </Link>
          </span>
        </div>

        <div className="row">
          {/* Billing Form */}
          <div className="col-xl-9 col-lg-8">
            <form className="pe-xl-5" onSubmit={handleSubmit}>
              <div className="row gy-3">
                <div className="col-sm-6 col-xs-6">
                  <input
                    required
                    type="text"
                    className="common-input border-gray-100"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="col-sm-6 col-xs-6">
                  <input
                    required
                    type="text"
                    className="common-input border-gray-100"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <input
                    required
                    type="text"
                    className="common-input border-gray-100"
                    placeholder="Business Name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <input
                    required
                    type="text"
                    className="common-input border-gray-100"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <input
                    required
                    type="text"
                    className="common-input border-gray-100"
                    placeholder="House number and street name"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    className="common-input border-gray-100"
                    placeholder="Apartment, suite, unit, etc. (Optional)"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <input
                    required
                    type="text"
                    className="common-input border-gray-100"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <input
                    required
                    type="text"
                    className="common-input border-gray-100"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <input
                    required
                    type="text"
                    className="common-input border-gray-100"
                    placeholder="Post Code"
                    value={postCode}
                    onChange={(e) => setPostCode(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <input
                    required
                    type="number"
                    className="common-input border-gray-100"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <input
                    required
                    type="email"
                    className="common-input border-gray-100"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <div className="my-40">
                    <h6 className="text-lg mb-24">Additional Information</h6>
                    <input
                      type="text"
                      className="common-input border-gray-100"
                      placeholder="Notes about your order"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-12 mt-4">
                  <button
                    type="submit"
                    className="btn btn-main py-18 w-100 rounded-8"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="col-xl-3 col-lg-4">
            <div className="checkout-sidebar">
              <div className="bg-color-three rounded-8 p-24 text-center">
                <span className="text-gray-900 text-xl fw-semibold">
                  Your Orders
                </span>
              </div>
              <div className="border border-gray-100 rounded-8 px-24 py-40 mt-24">
                <div className="mb-32 pb-32 border-bottom border-gray-100 flex-between gap-8">
                  <span className="text-gray-900 fw-medium text-xl font-heading-two">
                    Product
                  </span>
                  <span className="text-gray-900 fw-medium text-xl font-heading-two">
                    Subtotal
                  </span>
                </div>
                {cart?.length > 0 ? (
                  cart.map((item) => {
                    const price = getProductPrice(
                      item.productId,
                      item.selectedAttributes
                    );
                    return (
                      <div className="flex-between gap-24 mb-32" key={item._id}>
                        <div className="flex-align gap-12">
                          <span className="text-gray-900 fw-normal text-md font-heading-two w-144">
                            {item.productId?.productName}
                          </span>
                          <span className="text-gray-900 fw-normal text-md font-heading-two">
                            <i className="ph-bold ph-x" />
                          </span>
                          <span className="text-gray-900 fw-semibold text-md font-heading-two">
                            {item.qty}
                          </span>
                        </div>
                        <span className="text-gray-900 fw-bold text-md font-heading-two">
                          AED {parseFloat(price * item.qty).toFixed(2)}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center text-gray-500">
                    🛒 No items in cart
                  </p>
                )}

                <div className="border-top border-gray-100 pt-30 mt-30">
                  <div className="mb-32 flex-between gap-8">
                    <span className="text-gray-900 font-heading-two text-xl fw-semibold">
                      Subtotal
                    </span>
                    <span className="text-gray-900 font-heading-two text-md fw-bold">
                      AED {parseFloat(subtotal).toFixed(2)}
                    </span>
                  </div>
                  <div className="mb-32 flex-between gap-8">
                    <span className="text-gray-900 font-heading-two text-xl fw-semibold">
                      Tax
                    </span>
                    <span className="text-gray-900 font-heading-two text-md fw-bold">
                      AED {tax}
                    </span>
                  </div>
                  <div className="mb-0 flex-between gap-8">
                    <span className="text-gray-900 font-heading-two text-xl fw-semibold">
                      Total
                    </span>
                    <span className="text-gray-900 font-heading-two text-md fw-bold">
                      AED {parseFloat(grandTotal).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-32">
                  <div className="payment-item">
                    <div className="form-check common-check common-radio py-16 mb-0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="payment"
                        id="cash payment"
                        checked={selectedPayment === "cash payment"}
                        onChange={handlePaymentChange}
                      />
                      <label
                        className="form-check-label fw-semibold text-neutral-600"
                        htmlFor="cash payment"
                      >
                        Cash on delivery
                      </label>
                    </div>
                    {selectedPayment === "cash payment" && (
                      <div className="payment-item__content px-16 py-24 rounded-8 bg-main-50 position-relative d-block">
                        <p className="text-gray-800">
                          Pay cash when your order is delivered at your
                          doorstep.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-32 pt-32 border-top border-gray-100">
                  <p className="text-gray-500">
                    Your personal data will be used to process your order,
                    support your experience, and for purposes described in our{" "}
                    <Link
                      to="#"
                      className="text-main-600 text-decoration-underline"
                    >
                      privacy policy
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
