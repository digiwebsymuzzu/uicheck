import React, { useState, useEffect } from "react";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { handleError, handleSuccess } from "../utils";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";

const Account = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [phone, setPhone] = useState("");
  const [requestType, setRequestType] = useState("");
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // submit quatation
  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  const userEmail = decoded ? decoded.email : "";
  const userName = decoded ? decoded.firstName : "";
  const userPhone = decoded ? decoded.phone : "";

  const [quotationForm, setQuotationForm] = useState({
    username: userName,
    useremail: userEmail,
    userphone: userPhone,
    requestType: [],
    subjects: [],
    userreference: "",
    usermessage: "",
  });

  // Handle input change
  const handleQuotationInputChange = (e) => {
    const { name, value } = e.target;
    setQuotationForm({ ...quotationForm, [name]: value });
  };

  // Handle phone change
  const handleQuotationPhoneChange = (value) => {
    setQuotationForm({ ...quotationForm, userphone: value });
  };

  // Handle request type change
  // Request type multi-select change
  const handleQuotationRequestTypeChange = (selected) => {
    const types = selected.map((s) => s.value);
    setQuotationForm({ ...quotationForm, requestType: types, subjects: [] });

    // update subjects dynamically
    let combinedSubjects = [];
    types.forEach((type) => {
      if (subjectData[type])
        combinedSubjects = [...combinedSubjects, ...subjectData[type]];
    });
    setSubjectOptions(combinedSubjects);
  };

  // Handle subjects multi-select change
  const handleQuotationSubjectsChange = (selected) => {
    setQuotationForm({
      ...quotationForm,
      subjects: selected.map((s) => s.value),
    });
  };

  // Handle form submit
  const handleQuotationSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("username", quotationForm.username);
      data.append("useremail", quotationForm.useremail);
      data.append("userphone", quotationForm.userphone);
      data.append("requestType", JSON.stringify(quotationForm.requestType));
      data.append("subjects", JSON.stringify(quotationForm.subjects));
      data.append("userreference", quotationForm.userreference);
      data.append("usermessage", quotationForm.usermessage);

      const response = await fetch("https://udemandme.cloud/api/quotation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: quotationForm.username,
          useremail: quotationForm.useremail,
          userphone: quotationForm.userphone,
          requestType: quotationForm.requestType,
          subjects: quotationForm.subjects,
          userreference: quotationForm.userreference,
          usermessage: quotationForm.usermessage,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        handleSuccess(
          result.message || "Quotation request submitted successfully!"
        );
        setQuotationForm({
          username: "",
          useremail: "",
          userphone: "",
          requestType: [],
          subjects: [],
          userreference: "",
          usermessage: "",
        });
      } else {
        handleError(result.message || "Something went wrong!");
      }

      setQuotationForm({
        username: "",
        useremail: userEmail,
        userphone: "",
        requestType: [],
        subjects: [],
        userreference: "",
        usermessage: "",
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };
  useEffect(() => {
    if (decoded) {
      setQuotationForm({
        username: decoded.name || "",
        useremail: decoded.email || "",
        userphone: decoded.phone || "",
        requestType: [],
        subjects: [],
        userreference: "",
        usermessage: "",
      });
    }
  }, []); // empty dependency array = runs once

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("https://udemandme.cloud/api/auth/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Unauthorized or expired token");
        }

        const result = await response.json();
        if (result.success) {
          setUser(result.user);
          setPhone(result.user?.phone || "");
        }
      } catch (err) {
        console.error("Error fetching profile:", err.message);
      }
    };

    fetchProfile();
  }, []);
  const handleReturn = async (orderId, itemId) => {
    try {
      const { data } = await axios.put(
        `https://udemandme.cloud/api/order/orders/${orderId}/return/${itemId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success("Return request submitted successfully!");

        // ✅ Update orders state to hide button immediately
        setOrders((prevOrders) =>
          prevOrders.map((order) => {
            if (order._id === orderId) {
              return {
                ...order,
                cartItems: order.cartItems.map((item) => {
                  if (item._id === itemId) {
                    return { ...item, returnStatus: "Requested" }; // update status
                  }
                  return item;
                }),
              };
            }
            return order;
          })
        );
      } else {
        toast.error("Failed to submit return request!");
      }
    } catch (error) {
      console.error("Return Error:", error);
      toast.error("Something went wrong!");
    }
  };

  //   update the user data
  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://udemandme.cloud/api/auth/updateprofile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          dob: user.dob,
          phone: phone,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setUser(result.user); // update UI with fresh data
        handleSuccess("Profile updated successfully ✅");
      } else {
        handleError(result.message || "Failed to update profile ❌");
      }
    } catch (err) {
      console.error("Error updating profile:", err.message);
    }
  };
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const subjectData = {
    Sell: ["Property", "Vehicle", "Furniture", "Electronics"],
    Repair: ["AC", "Washing Machine", "Refrigerator", "Plumbing"],
    Buy: [
      "Books",
      "Furniture",
      "Mobile",
      "Car",
      "Hand tool",
      "Power Tool",
      "Welding/Gas",
    ],
  };

  const handleRequestTypeChange = (e) => {
    const selected = e.target.value;
    setRequestType(selected);
    setSubjectOptions(subjectData[selected] || []);
    setSelectedSubjects([]); // reset previously selected subjects
  };

  const [address, setAddress] = useState({
    street: "",
    apartment: "",
    city: "",
    emirate: "",
    country: "",
    postalCode: "",
  });
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [editId, setEditId] = useState(null);
  const [deliveryMessage, setDeliveryMessage] = useState("");

  // ✅ Fetch addresses from backend
  const fetchAddresses = async () => {
    try {
      const res = await fetch("https://udemandme.cloud/api/address", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setSavedAddresses(data.addresses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [token]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "postalCode") {
      if (/^\d{0,6}$/.test(value)) {
        setAddress({ ...address, [name]: value });
        setDeliveryMessage(
          value.length === 6
            ? "✅ Postal code looks good"
            : "❌ Postal code must be 6 digits"
        );
      }
    } else {
      setAddress({ ...address, [name]: value });
    }
  };

  // ✅ Add or update address
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{6}$/.test(address.postalCode)) {
      alert("Postal code must be exactly 6 digits.");
      return;
    }

    try {
      let url = "https://udemandme.cloud/api/address";
      let method = "POST";

      if (editId) {
        url = `https://udemandme.cloud/api/address/${editId}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(address),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        fetchAddresses(); // refresh addresses
        setAddress({
          street: "",
          apartment: "",
          city: "",
          emirate: "",
          country: "",
          postalCode: "",
        });
        setDeliveryMessage("");
        setEditId(null);

        handleSuccess(
          data.message ||
            (editId
              ? "Address updated successfully!"
              : "Address added successfully!")
        );
      } else {
        handleError(
          data.message || "Something went wrong while saving the address."
        );
      }
    } catch (error) {
      handleError("Failed to submit address. Please try again.");
      console.error(error);
    }
  };

  // ✅ Delete address
  const handleDelete = async (id) => {
    if (!id) return console.error("No address ID provided");
    try {
      const res = await fetch(`https://udemandme.cloud/api/address/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        fetchAddresses();
        handleSuccess(data.message || "Address deleted successfully!");
      } else {
        handleError(data.message || "Failed to delete address.");
      }
    } catch (error) {
      handleError("Something went wrong while deleting the address.");
      console.error(error);
    }
  };

  // ✅ Edit address (load into form)
  const handleEdit = (addr) => {
    setAddress(addr);
    setEditId(addr._id);
  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token"); // login token
        const res = await axios.get(
          "https://udemandme.cloud/api/order/my-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(res.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const renderContent = () => {
    if (!user) return <p>Loading...</p>;
    switch (activeTab) {
      case "details":
        return (
          <>
            <h5 className="mb-24">Personal Information</h5>

            {/* ===== Personal Information Form ===== */}
            <form onSubmit={handleProfileSubmit}>
              <div className="mb-32">
                <p className="text-gray-500 mb-16">
                  Seamlessly manage your profile details to personalize shopping
                  experiences. Effortlessly update information for secure and
                  convenient access across all devices.
                </p>
                <div className="row gy-4">
                  {/* First Name */}
                  <div className="col-md-6">
                    <label
                      htmlFor="firstName"
                      className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="common-input px-16"
                      value={user.firstName || ""}
                      onChange={(e) =>
                        setUser({ ...user, firstName: e.target.value })
                      }
                    />
                  </div>

                  {/* Second Name */}
                  <div className="col-md-6">
                    <label
                      htmlFor="secondName"
                      className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4"
                    >
                      Second Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="common-input px-16"
                      value={user.lastName || ""}
                      onChange={(e) =>
                        setUser({ ...user, lastName: e.target.value })
                      }
                    />
                  </div>

                  {/* Birth Date */}
                  <div className="col-md-6">
                    <label
                      htmlFor="birthDate"
                      className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4"
                    >
                      Birth Date
                    </label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      className="common-input px-16"
                      value={user.dob ? user.dob.split("T")[0] : ""} // 👈 keep only YYYY-MM-DD
                      onChange={(e) =>
                        setUser({
                          ...user,
                          dob: e.target.value,
                        })
                      }
                      autoComplete="bday"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="col-md-6">
                    <label
                      htmlFor="phone"
                      className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4"
                    >
                      Mobile Number{" "}
                      <span className="text-danger text-xl line-height-1">
                        *
                      </span>
                    </label>
                    <div className="d-flex">
                      <PhoneInput
                        country={"ae"} // default country
                        value={phone} // 👈 state value = database field "phone"
                        onChange={(newPhone) => setPhone(newPhone)} // 👈 update phone state
                        containerClass="w-100"
                        inputProps={{
                          id: "phone",
                          name: "phone", // 👈 keep same as database field
                          required: true,
                          autoComplete: "tel",
                        }}
                      />
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="col-12 mt-10">
                    <button
                      type="submit"
                      className="btn btn-main py-18 px-32 rounded-8"
                    >
                      Save Personal Info
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* ===== Email Address Form ===== */}
            <form>
              <div>
                <h6 className="fw-semibold mb-12">E-mail address</h6>
                <p className="text-gray-500 mb-16">
                  Your registered email is linked with your account for order
                  updates and secure notifications.
                </p>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control rounded-8 mb-16"
                  value={user?.email || ""} // 👈 show email from backend
                  onChange={(e) => setUser({ ...user, email: e.target.value })} // 👈 allow editing
                  required
                  autoComplete="email"
                  readOnly
                />
                {/* <button
                  type="submit"
                  className="btn bg-btn-primecolor text-light px-32 py-10 rounded-8"
                >
                  Save Email
                </button> */}
              </div>
            </form>
          </>
        );
      case "address":
        return (
          <div>
            <h5 className="mb-24">Address Information</h5>

            <form onSubmit={handleSubmit}>
              <div className="mb-32">
                <p className="text-gray-500 mb-20">
                  Here you can manage your saved addresses.
                </p>
                <div className="row gy-4">
                  {/* Street Address */}
                  <div className="col-md-6">
                    <label htmlFor="street" className="mb-4 fw-semibold">
                      Street Address
                    </label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      className="common-input px-16"
                      placeholder="Al Ittihad Road"
                      value={address.street}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Apartment */}
                  <div className="col-md-6">
                    <label htmlFor="apartment" className="mb-4 fw-semibold">
                      Apartment / Suite
                    </label>
                    <input
                      type="text"
                      id="apartment"
                      name="apartment"
                      className="common-input px-16"
                      placeholder="Suite 101"
                      value={address.apartment}
                      onChange={handleChange}
                    />
                  </div>

                  {/* City */}
                  <div className="col-md-6">
                    <label htmlFor="city" className="mb-4 fw-semibold">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      className="common-input px-16"
                      placeholder="Dubai"
                      value={address.city}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Emirate */}
                  <div className="col-md-6">
                    <label htmlFor="emirate" className="mb-4 fw-semibold">
                      Emirate / State
                    </label>
                    <input
                      type="text"
                      id="emirate"
                      name="emirate"
                      className="common-input px-16"
                      placeholder="Dubai"
                      value={address.emirate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Country */}
                  <div className="col-md-6">
                    <label htmlFor="country" className="mb-4 fw-semibold">
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      className="common-input px-16"
                      placeholder="United Arab Emirates"
                      value={address.country}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Postal Code */}
                  <div className="col-md-6">
                    <label htmlFor="postalCode" className="mb-4 fw-semibold">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      className="common-input px-16"
                      placeholder="000000"
                      value={address.postalCode}
                      onChange={handleChange}
                      required
                    />
                    {deliveryMessage && (
                      <p
                        className={`mt-2 text-sm font-semibold ${
                          deliveryMessage.includes("✅")
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {deliveryMessage}
                      </p>
                    )}
                  </div>

                  {/* Save Button */}
                  <div className="col-12 mt-10">
                    <button
                      type="submit"
                      className="btn btn-main py-18 px-32 rounded-8"
                    >
                      {editId ? "Update Address" : "Save Address Info"}
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Saved Addresses */}
            {savedAddresses.length > 0 && (
              <div className="mt-32">
                <h6 className="mb-16">Saved Addresses</h6>
                <ul className="list-group">
                  {savedAddresses.map((addr) => (
                    <li
                      key={addr._id}
                      className="list-group-item border rounded-8 p-16 mb-12 flex justify-between items-center"
                    >
                      <div>
                        <strong>{addr.street}</strong>,{" "}
                        {addr.apartment && `${addr.apartment}, `}
                        {addr.city}, {addr.emirate}, {addr.country} -{" "}
                        {addr.postalCode}
                      </div>
                      <div className="d-flex gap-5 mt-10">
                        <button
                          onClick={() => handleEdit(addr)}
                          className="bg-success text-white px-12 py-5 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(addr._id)}
                          className="bg-btn-primecolor text-white px-12 py-5 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      case "orders":
        return (
          <div>
            <h5 className="mb-24 ">My Orders</h5>
            <p className="text-gray-500 ">View your past order history here.</p>

            <div className="cart-table py-48">
              <div className="overflow-x-auto scroll-sm scroll-sm-horizontal">
                <table className="table style-three">
                  <thead>
                    <tr>
                      <th className="h6 mb-0 text-lg fw-bold">Order ID</th>
                      <th className="h6 mb-0 text-lg fw-bold">Order Date</th>
                      <th className="h6 mb-0 text-lg fw-bold">Status</th>
                      <th className="h6 mb-0 text-lg fw-bold">Total Price</th>
                      <th className="h6 mb-0 text-lg fw-bold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length > 0 ? (
                      orders.map((order) => {
                        const orderDate = new Date(order.createdAt);
                        const today = new Date();
                        const diffTime = today - orderDate;
                        const diffDays = diffTime / (1000 * 60 * 60 * 24);

                        return (
                          <tr key={order._id}>
                            <td>#{order._id.slice(-6).toUpperCase()}</td>
                            <td>{orderDate.toLocaleDateString()}</td>
                            <td>
                              <span
                                className={`badge px-18 py-10 rounded-4 text-14 ${
                                  order.cartItems.some(
                                    (item) => item.returnStatus === "Requested"
                                  )
                                    ? "bg-info text-dark"
                                    : order.cartItems.some(
                                        (item) =>
                                          item.returnStatus === "Completed"
                                      )
                                    ? "bg-primary text-light"
                                    : order.status === "Delivered"
                                    ? "bg-success text-light"
                                    : "bg-warning text-dark"
                                }`}
                              >
                                {order.cartItems.find(
                                  (item) => item.returnStatus
                                )?.returnStatus ||
                                  order.status ||
                                  "Pending"}
                              </span>
                            </td>

                            <td>
                              <span className="text-lg h6 mb-0 fw-semibold">
                                AED {order.grandTotal.toFixed(2)}
                              </span>
                            </td>

                            <td>
                              <button
                                type="button"
                                className="btn btn-main py-8 px-16 rounded-8"
                                data-bs-toggle="modal"
                                data-bs-target={`#orderModal${order._id}`}
                              >
                                View Details
                              </button>

                              {/* ✅ Show Return button only if item is returnable and within 7 days */}
                              {order.cartItems.some(
                                (item) =>
                                  diffDays <= 7 && item.returnStatus === "None" // Only show if not returned yet
                              ) && (
                                <button
                                  style={{ marginLeft: "10px" }}
                                  type="button"
                                  className="btn btn-success py-8 px-16 rounded-8"
                                  onClick={() => {
                                    const item = order.cartItems.find(
                                      (i) => i.returnStatus === "None"
                                    );
                                    handleReturn(order._id, item._id);
                                  }}
                                >
                                  Return
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No orders found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "rfq":
        return (
          <div>
            <h5 className="mb-24">Request For Quotation</h5>
            <p className="text-gray-500 mb-20">
              Looking to place a bulk order with us? Please fill in the details
              below to request a quotation. Our team will review your
              requirements and get back to you with the best possible offer.
            </p>
            <form onSubmit={handleQuotationSubmit}>
              <div className="row gy-4">
                {/* Full Name */}
                <div className="col-sm-12">
                  <label className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4">
                    Full Name{" "}
                    <span className="text-danger text-xl line-height-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={quotationForm.username}
                    onChange={handleQuotationInputChange}
                    placeholder="Full name"
                    required
                    className="common-input px-16"
                  />
                </div>

                {/* Email */}
                <div className="col-sm-6 col-xs-6">
                  <label className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4">
                    Email Address{" "}
                    <span className="text-danger text-xl line-height-1">*</span>
                  </label>
                  <input
                    type="email"
                    name="useremail"
                    value={quotationForm.useremail}
                    readOnly
                    className="common-input px-16"
                  />
                </div>

                {/* Phone */}
                <div className="col-sm-6 col-xs-6">
                  <label className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4">
                    Mobile Number{" "}
                    <span className="text-danger text-xl line-height-1">*</span>
                  </label>
                  <PhoneInput
                    country="ae"
                    value={quotationForm.userphone}
                    onChange={handleQuotationPhoneChange}
                    inputProps={{ name: "userphone", required: true }}
                    containerClass="w-100"
                  />
                </div>

                {/* Request Type */}
                <div className="col-sm-12">
                  <label className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4">
                    Request Type{" "}
                    <span className="text-danger text-xl line-height-1">*</span>
                  </label>
                  <Select
                    isMulti
                    options={[
                      { value: "Sell", label: "Sell" },
                      { value: "Repair", label: "Repair" },
                      { value: "Buy", label: "Buy" },
                    ]}
                    value={quotationForm.requestType.map((r) => ({
                      value: r,
                      label: r,
                    }))}
                    onChange={handleQuotationRequestTypeChange}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>

                {/* Subjects */}
                {quotationForm.requestType.length > 0 && (
                  <div className="col-sm-12">
                    <label>Subjects</label>
                    <Select
                      isMulti
                      options={subjectOptions.map((s) => ({
                        value: s,
                        label: s,
                      }))}
                      value={quotationForm.subjects.map((s) => ({
                        value: s,
                        label: s,
                      }))}
                      onChange={handleQuotationSubjectsChange}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                  </div>
                )}

                {/* Reference */}
                <div className="col-sm-12">
                  <label className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4">
                    Subject/Reference
                  </label>
                  <input
                    type="text"
                    name="userreference"
                    value={quotationForm.userreference}
                    onChange={handleQuotationInputChange}
                    placeholder="Subject / Reference"
                    className="common-input px-16"
                  />
                </div>

                {/* Message */}
                <div className="col-sm-12">
                  <label className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4">
                    Comments / Questions{" "}
                    <span className="text-danger text-xl line-height-1">*</span>
                  </label>
                  <textarea
                    name="usermessage"
                    value={quotationForm.usermessage}
                    onChange={handleQuotationInputChange}
                    placeholder="Type your message"
                    required
                    className="common-input px-16"
                  />
                </div>

                {/* Submit */}
                <div className="col-sm-12 mt-32">
                  <button
                    type="submit"
                    className="btn btn-main py-18 px-32 rounded-8"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="my-account-section pt-80 mb-24">
      <div className="container container-lg">
        <div className="row g-24">
          {/* Sidebar */}
          <div className="col-lg-3">
            <div className="border border-gray-100 p-24 rounded-16 bg-silver">
              <ul className="account-sidebar nav flex-column gap-12">
                <li className="my-account-sidebar ">
                  <button
                    onClick={() => setActiveTab("details")}
                    className={`fw-medium py-8 px-12 rounded-8 text-15 ${
                      activeTab === "details" ? " text-danger" : " text-dark"
                    }`}
                  >
                    My Details
                  </button>
                </li>
                <li className="my-account-sidebar ">
                  <button
                    onClick={() => setActiveTab("address")}
                    className={` fw-medium py-8 px-12 rounded-8 ${
                      activeTab === "address" ? "text-danger" : "text-dark"
                    }`}
                  >
                    My Address Book
                  </button>
                </li>
                <li className="my-account-sidebar ">
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`fw-medium py-8 px-12 rounded-8 ${
                      activeTab === "orders" ? "text-danger" : "text-dark"
                    }`}
                  >
                    My Orders
                  </button>
                </li>
                <li className="my-account-sidebar ">
                  <button
                    onClick={() => setActiveTab("rfq")}
                    className={` fw-medium py-8 px-12 rounded-8 ${
                      activeTab === "rfq" ? "text-danger" : "text-dark"
                    }`}
                  >
                    Request For Quotation
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-9">
            <div className="border border-gray-100 p-24 rounded-16 pt-60 px-40 ">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Modals for each order */}
      {orders.map((order) => (
        <div
          className="modal fade"
          id={`orderModal${order._id}`}
          tabIndex="-1"
          aria-labelledby={`orderModalLabel${order._id}`}
          aria-hidden="true"
          key={order._id}
        >
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              {/* Header with Theme Color */}
              <div
                className="modal-header p-3 "
                style={{
                  background: "#bc0101",
                  color: "#fff",
                }}
              >
                <h5
                  style={{
                    color: "#fff",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                  className="modal-title p-8"
                  id={`orderModalLabel${order._id}`}
                >
                  Order Details - #{order._id.slice(-6).toUpperCase()}
                </h5>
              </div>

              <div className="modal-body p-8">
                {/* Order Summary */}
                <div className="mb-4 p-4 bg-light rounded-3 shadow-sm">
                  <h6 className="text-danger mb-3">Order Summary</h6>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`badge ${
                        order.status === "Delivered"
                          ? "bg-success"
                          : "bg-warning text-dark"
                      } py-2 px-3`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </p>

                  <p>
                    <strong>Payments:</strong>{" "}
                    <span className="fw-bold">{order.paymentMethod}</span>
                  </p>
                  <p>
                    <strong>Grand Total:</strong>{" "}
                    <span className="fw-bold">
                      AED {order.grandTotal.toFixed(2)}
                    </span>
                  </p>
                </div>

                {/* Products Table */}
                <div className="mb-4" style={{ padding: "5px" }}>
                  <table className="table table-hover table-striped table-bordered rounded-3 shadow-sm">
                    <thead className="table-dark">
                      <tr>
                        <th style={{ padding: "20px" }}>Product Name</th>
                        <th style={{ padding: "20px" }}>Qty</th>
                        <th style={{ padding: "20px" }}>Price</th>
                        <th style={{ padding: "20px" }}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.cartItems.map((item, idx) => (
                        <tr key={idx}>
                          <td style={{ padding: "20px" }}>
                            {item.productName.length > 50
                              ? item.productName.slice(0, 50) + "..."
                              : item.productName}
                          </td>

                          <td style={{ padding: "20px" }}>{item.qty}</td>
                          <td style={{ padding: "20px" }}>
                            AED {item.price.toFixed(2)}
                          </td>
                          <td style={{ padding: "20px" }}>
                            AED {item.total.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Billing Info */}
                <div className="p-4 bg-light rounded-3 shadow-sm">
                  <h6 className="text-danger mb-3">Billing Info</h6>
                  <p>
                    <strong>First Name:</strong> {order.user.firstName}{" "}
                    {order.user.lastName}
                  </p>
                  <p>
                    <strong>Last Name:</strong> {order.user.lastName}{" "}
                    {order.user.lastName}
                  </p>
                  <p>
                    <strong>Business:</strong> {order.user.businessName}
                  </p>
                  <p>
                    <strong>Country:</strong> {order.user.country}{" "}
                    {order.user.lastName}
                  </p>
                  <p>
                    <strong>Address:</strong> {order.user.address},{" "}
                    {order.user.city}, {order.user.state} -{" "}
                    {order.user.postCode}, {order.user.country}
                  </p>
                  <p>
                    <strong>Appartments:</strong> {order.user.apartment}{" "}
                    {order.user.lastName}
                  </p>
                  <p>
                    <strong>City:</strong> {order.user.city}{" "}
                    {order.user.lastName}
                  </p>
                  <p>
                    <strong>State:</strong> {order.user.state}{" "}
                    {order.user.lastName}
                  </p>
                  <p>
                    <strong>Post Code:</strong> {order.user.postCode}{" "}
                    {order.user.lastName}
                  </p>

                  <p>
                    <strong>Phone:</strong> {order.user.phone}
                  </p>
                  <p>
                    <strong>Email:</strong> {order.user.email}
                  </p>
                  {order.user.notes && (
                    <p>
                      <strong>Notes:</strong> {order.user.notes}
                    </p>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn"
                  style={{ backgroundColor: "#bc0101", color: "#fff" }}
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Account;
