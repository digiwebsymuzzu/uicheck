import React, { useState } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import toast from "react-hot-toast";
import "react-phone-input-2/lib/bootstrap.css";

const ContactEnquiry = () => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    requestType: "",
    brands: [],
    reference: "",
    message: "",
    file: null,
  });

  const options = [
    { value: "DEWALT", label: "DEWALT" },
    { value: "STANLEY", label: "STANLEY" },
    { value: "EUROBOOR", label: "EUROBOOR" },
    { value: "AEG", label: "AEG" },
    { value: "PROMOTECH", label: "PROMOTECH" },
    { value: "OTHER", label: "OTHER" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.phone ||
      !form.email ||
      !form.requestType ||
      !form.message ||
      form.brands.length === 0
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("phone", form.phone);
      formData.append("email", form.email);
      formData.append("requestType", form.requestType);
      formData.append("brands", form.brands.map((b) => b.value).join(", "));
      formData.append("reference", form.reference);
      formData.append("message", form.message);

      if (form.file) {
        formData.append("file", form.file);
      }

      const response = await fetch("https://udemandme.com/api/enquiry", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        toast.success(
          "Thank you for your enquiry. We will contact you shortly."
        );

        setForm({
          name: "",
          phone: "",
          email: "",
          requestType: "",
          brands: [],
          reference: "",
          message: "",
          file: null,
        });
      } else {
        toast.error("Unable to send enquiry. Please try again.");
      }
    } catch (err) {
      toast.error("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <section className="contact py-80">
        <div className="container container-lg">
          <div className="row gy-5">
            <div className="col-lg-7">
              <div className="contact-box border border-gray-100 rounded-16 px-24 py-40">
                <form onSubmit={handleSubmit} noValidate>
                  <h6 className="mb-32">Your Enquiry</h6>

                  <input
                    type="text"
                    name="name"
                    className="common-input px-16 mb-16"
                    placeholder="Full Name *"
                    value={form.name}
                    onChange={handleChange}
                  />

                  <PhoneInput
                    country="ae"
                    value={form.phone}
                    onChange={(val) =>
                      setForm((prev) => ({ ...prev, phone: val }))
                    }
                    inputClass="phone-custom-input"
                    containerClass="w-100 mb-16"
                  />

                  <input
                    type="email"
                    name="email"
                    className="common-input px-16 mb-16"
                    placeholder="Email Address *"
                    value={form.email}
                    onChange={handleChange}
                  />

                  <input
                    type="file"
                    className="mb-16"
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        file: e.target.files[0],
                      }))
                    }
                  />
                  <small className="text-muted d-block mb-16">
                    Optional – Max 500KB (jpg, jpeg, png, pdf, docx)
                  </small>

                  <select
                    name="requestType"
                    className="common-input px-16 mb-16"
                    value={form.requestType}
                    onChange={handleChange}
                  >
                    <option value="">Select Request Type *</option>
                    <option value="Sell">Sell</option>
                    <option value="Repair">Repair</option>
                    <option value="Buy">Buy</option>
                  </select>

                  <Select
                    isMulti
                    options={options}
                    value={form.brands}
                    onChange={(selected) =>
                      setForm((prev) => ({ ...prev, brands: selected }))
                    }
                    className="mb-16"
                    placeholder="Select Brands *"
                  />

                  <input
                    type="text"
                    name="reference"
                    className="common-input px-16 mb-16"
                    placeholder="Subject / Reference"
                    value={form.reference}
                    onChange={handleChange}
                  />

                  <textarea
                    name="message"
                    className="common-input px-16 mb-24"
                    placeholder="Comments / Questions *"
                    value={form.message}
                    onChange={handleChange}
                  />

                  <button
                    type="submit"
                    className="btn btn-main py-18 px-32 rounded-8"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Submit"}
                  </button>
                </form>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="contact-box border border-gray-100 rounded-16 px-24 py-40">
                <h6 className="mb-48">Get In Touch</h6>
                <div className="flex-align gap-16 mb-16">
                  <span className="w-40 h-40 flex-center rounded-circle border border-gray-100 text-main-two-600 text-2xl flex-shrink-0">
                    <i className="ph-fill ph-phone-call text-danger" />
                  </span>
                  <Link
                    to="tel:+971-50-2530888"
                    className="text-md text-gray-900 hover-text-main-600"
                  >
                    +971-50-2530888
                  </Link>
                </div>
                <div className="flex-align gap-16 mb-16">
                  <span className="w-40 h-40 flex-center rounded-circle border border-gray-100 text-main-two-600 text-2xl flex-shrink-0">
                    <i className="ph-fill ph-envelope text-danger" />
                  </span>
                  <Link
                    to="mailto:info@udemandme.com"
                    className="text-md text-gray-900 hover-text-main-600"
                  >
                    info@udemandme.com
                  </Link>
                </div>
                <div className="flex-align gap-16 mb-0">
                  <span className="w-40 h-40 flex-center rounded-circle border border-gray-100 text-main-two-600 text-2xl flex-shrink-0">
                    <i className="ph-fill ph-map-pin text-danger" />
                  </span>
                  <span className="text-md text-gray-900 ">
                    PO Box 2975, Makan No. 46387 07765, No. 7,8,9 Nasser Yousuf
                    Nasser Al Nuaimi, 35 Street – Hasan Bin Haitham Street,
                    Sanaiyya,New Industrial Area, Ajman, United Arab Emirates
                  </span>
                </div>
              </div>
              <div className="mt-24 flex-align flex-wrap gap-16">
                <Link
                  to="tel:+971-50-2530888"
                  className="bg-neutral-600 hover-bg-main-600 rounded-8 p-10 px-16 flex-between flex-wrap gap-8 flex-grow-1"
                >
                  <span className="text-white fw-medium">
                    Get Support On Call
                  </span>
                  <span className="w-36 h-36 bg-black rounded-8 flex-center text-xl text-white">
                    <i className="ph ph-headset" />
                  </span>
                </Link>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=PO+Box+2975,+Makan+No.+46387+07765,+No.+7,+8,+9+Nasser+Yousuf+Nasser+Al+Nuaimi,+35+Street+–+Hasan+Bin+Haitham+Street,+Sanaiyya,+New+Industrial+Area,+Ajman,+United+Arab+Emirates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-neutral-600 hover-bg-main-600 rounded-8 p-10 px-16 flex-between flex-wrap gap-8 flex-grow-1"
                >
                  <span className="text-white fw-medium">Get Direction</span>
                  <span className="w-36 h-36 bg-black rounded-8 flex-center text-xl text-white">
                    <i className="ph ph-map-pin" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ContactEnquiry;
