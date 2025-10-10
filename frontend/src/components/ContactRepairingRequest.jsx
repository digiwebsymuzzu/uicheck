import React, { useState } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
const ContactRepairingRequest = () => {
  const [phone, setPhone] = useState("");
  const options = [
    { value: "DEWALT", label: "DEWALT" },
    { value: "STANLEY", label: "STANLEY" },
    { value: "EUROBOOR", label: "EUROBOOR" },
    { value: "AEG", label: "Aeg" },
    { value: "PROMOTECH", label: "PROMOTECH" },
    { value: "OTHER", label: "OTHER" },
  ];
  return (
    <>
      <section className="contact py-80">
        <div className="container container-lg">
          <div className="row gy-5">
            <div className="col-lg-7">
              <div className="contact-box border border-gray-100 rounded-16 px-24 py-40">
                <form action="#">
                  <h6 className="mb-32">Repair Details</h6>
                  <div className="row gy-4">
                    {/* Full Name */}
                    <div className="col-sm-12">
                      <label
                        htmlFor="name"
                        className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4"
                      >
                        Full Name{" "}
                        <span className="text-danger text-xl line-height-1">
                          *
                        </span>
                      </label>
                      <input
                        type="text"
                        className="common-input px-16"
                        id="name"
                        placeholder="Full name"
                      />
                    </div>
                    {/* Mobile Number with +971 */}
                    <div className="col-sm-6 col-xs-6">
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
                          country={"ae"} // Default country (India in this case)
                          value={phone}
                          onChange={(phone) => setPhone(phone)}
                          inputClass="phone-custom-input"
                          containerClass="w-100"
                          inputProps={{
                            name: "phone",
                            required: true,
                            autoFocus: false,
                          }}
                        />
                      </div>
                    </div>
                    {/* Email Address */}
                    <div className="col-sm-6 col-xs-6">
                      <label
                        htmlFor="email"
                        className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4"
                      >
                        Email Address{" "}
                        <span className="text-danger text-xl line-height-1">
                          *
                        </span>
                      </label>
                      <input
                        type="email"
                        className="common-input px-16"
                        id="email"
                        placeholder="Email address"
                      />
                    </div>
                    {/* File Upload */}
                    <div className="col-sm-12">
                      <label
                        htmlFor="file"
                        className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4"
                      >
                        Upload file{" "}
                        <span className="text-danger text-xl line-height-1">
                          *
                        </span>
                      </label>
                      <input
                        type="file"
                        className=" text-danger mb-2"
                        id="file"
                      />
                      <small className="text-muted d-block">
                        Maximum file size upload is 500KB & allowed formats are
                        jpg, jpeg, pdf, docx, png.
                      </small>
                      <small className="text-muted d-block">
                        For more file upload kindly email here{" "}
                        <a href="mailto:info@udemandme.com">
                          info@udemandme.com
                        </a>{" "}
                        or WhatsApp us at <strong>+971-50-2530888</strong>.
                      </small>
                    </div>
                    {/* Request Type Dropdown multiple select  */}
                    <div className="col-sm-12">
                      <label
                        htmlFor="requestType"
                        className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4"
                      >
                        Request For Repair{" "}
                        <span className="text-danger text-xl line-height-1">
                          *
                        </span>
                      </label>
                      <Select
                        isMulti
                        options={options}
                        className="basic-multi-select"
                        classNamePrefix="select"
                      />
                    </div>

                    <div className="col-sm-12">
                      <label
                        htmlFor="subject"
                        className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4"
                      >
                        Subject/Reference{" "}
                      </label>
                      <input
                        type="text"
                        className="common-input px-16"
                        id="subject"
                        placeholder="subject"
                      />
                    </div>
                    {/* Comments / Questions */}
                    <div className="col-sm-12">
                      <label
                        htmlFor="message"
                        className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4"
                      >
                        Comments / Questions{" "}
                        <span className="text-danger text-xl line-height-1">
                          *
                        </span>
                      </label>
                      <textarea
                        className="common-input px-16"
                        id="message"
                        placeholder="Type your message"
                        defaultValue={""}
                      />
                    </div>
                    {/* Submit Button */}
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
                    to="mailto: info@udemandme.com"
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
export default ContactRepairingRequest;
