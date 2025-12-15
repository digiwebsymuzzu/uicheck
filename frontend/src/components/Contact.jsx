import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Contact = () => {
  const [phone, setPhone] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.email || !form.message) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://udemandme.com/api/contact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(
          "Thank you for your query, you will soon receive a reply via email or call"
        );

        setForm({
          name: "",
          phone: "",
          email: "",
          message: "",
        });
      } else {
        toast.error("Unable to send message. Please try again.");
      }
    } catch (error) {
      toast.error("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact py-80">
      <div className="container container-lg">
        <div className="row gy-5">
          <div className="col-lg-6">
            <div className="contact-box border border-gray-100 rounded-16 px-24 py-40">
              <form onSubmit={handleSubmit} noValidate>
                <h6 className="mb-32">Your Details</h6>

                {/* FULL NAME */}
                <div className="mb-16">
                  <label className="text-sm fw-semibold mb-4">
                    Full Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="common-input px-16"
                    placeholder="Full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* PHONE */}
                <div className="mb-16">
                  <label className="text-sm fw-semibold mb-4">
                    Mobile Number <span className="text-danger">*</span>
                  </label>
                  <PhoneInput
                    country={"in"}
                    value={form.phone}
                    onChange={(phone) =>
                      setForm((prev) => ({ ...prev, phone }))
                    }
                    inputClass="phone-custom-input"
                    containerClass="w-100"
                    inputProps={{ required: true }}
                  />
                </div>

                {/* EMAIL */}
                <div className="mb-16">
                  <label className="text-sm fw-semibold mb-4">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="common-input px-16"
                    placeholder="Email address"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* MESSAGE */}
                <div className="mb-24">
                  <label className="text-sm fw-semibold mb-4">
                    Message <span className="text-danger">*</span>
                  </label>
                  <textarea
                    name="message"
                    className="common-input px-16"
                    placeholder="Type your message"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* SUBMIT */}
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
          <div className="col-lg-6">
            <div className="contact-box border border-gray-100 rounded-16 px-24 py-40">
              <h6 className="mb-35">Get In Touch</h6>
              <h4 className="mb-24 text-bold text-danger">
                Al Sukoon General Trading Company LLC.
              </h4>

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
              <div className="mt-28 flex-align flex-wrap gap-16">
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
      </div>
    </section>
  );
};

export default Contact;
