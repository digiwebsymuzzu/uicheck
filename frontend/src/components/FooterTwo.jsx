import React from "react";
import { Link } from "react-router-dom";

const FooterTwo = () => {
  return (
    <footer className="footer py-80 bg-dark">
      <div className="container container-lg footer">
        <div className="row gy-3">
          {/* Column 1: Logo & Contact */}
          <div className="col-lg-4 col-md-12 ">
            <div className="footer-item ">
              <div className="footer-item__logo mb-3">
                <Link to="/">
                  <img src="/assets/images/logo/logo-two.png" alt="Logo" />
                </Link>
              </div>
              <p className="mb-24 mt-20 text-light">
                UdemandMe is a UAE-based e-commerce platform designed for the
                modern shopper, combining convenience, speed, and reliability.
                We offer a comprehensive range of products—from industrial tools
                and building materials to machinery and electrical supplies—all
                available through one trusted online destination.
              </p>
              <ul class="flex-align gap-16">
                <li>
                  <a
                    class="w-44 h-44 flex-center bg-main-two-50 text-white text-xl rounded-8 hover-bg-main-two-600 hover-text-white"
                    href="https://www.facebook.com/share/1A92seP43P/?mibextid=wwXIfr"
                  >
                    <i
                      class="ph-fill ph-facebook-logo"
                      style={{ fontSize: "30px" }}
                    ></i>
                  </a>
                </li>
                <li>
                  <a
                    class="w-44 h-44 flex-center bg-main-two-50 text-white text-xl rounded-8 hover-bg-main-two-600 hover-text-white"
                    href="https://www.instagram.com/udemand_me?igsh=MTZncWpvMzBwcXA2eA=="
                  >
                    <i
                      class="ph-fill ph-instagram-logo"
                      style={{ fontSize: "30px" }}
                    ></i>
                  </a>
                </li>
                <li>
                  <a
                    class="w-44 h-44 flex-center bg-main-two-50 text-white text-xl rounded-8 hover-bg-main-two-600 hover-text-white"
                    href="https://www.linkedin.com/company/udemandme2/"
                  >
                    <i
                      class="ph-fill ph-linkedin-logo"
                      style={{ fontSize: "30px" }}
                    ></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 2: About Us */}
          {/* <div className="col-lg-2 col-md-6">
            <div className="footer-item">
              <h6 className="footer-item__title primecolor">About Us</h6>
              <ul className="footer-menu">
                <li className="mb-2">
                  <Link
                    to="/about-udemandme"
                    className="text-light hover-text-main-600"
                  >
                    About
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/dewalt-history"
                    className="text-light hover-text-main-600"
                  >
                    Dewalt History
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/usefull-links"
                    className="text-light hover-text-main-600"
                  >
                    Useful Links Formulae/Table
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/safety-for-welding"
                    className="text-light hover-text-main-600"
                  >
                    Safety In Welding
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/welding-techniques"
                    className="text-light hover-text-main-600"
                  >
                    Welding Technique
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/why-to-do-online-purchases"
                    className="text-light hover-text-main-600"
                  >
                    Online Awareness
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/annular-cutter-portable-cutters"
                    className="text-light hover-text-main-600"
                  >
                    Annular Cutter (Portable Cutter)
                  </Link>
                </li>
              </ul>
            </div>
          </div> */}

          {/* Column 3: Policies */}
          <div className="col-lg-2 col-md-6">
            <div className="footer-item main">
              <h6 className="footer-item__title primecolor">Information</h6>
              <ul className="footer-menu">
                <li className="mb-2">
                  <Link
                    to="/about-udemandme"
                    className="text-light hover-text-main-600"
                  >
                    About Us
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/contact"
                    className="text-light hover-text-main-600"
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/return-policy"
                    className="text-light hover-text-main-600"
                  >
                    Return & Refund Policy
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/privacy-policy"
                    className="text-light hover-text-main-600"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/terms-and-condition"
                    className="text-light hover-text-main-600"
                  >
                    Terms and Condition
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: My Account */}
          <div className="col-lg-2 col-md-6">
            <div className="footer-item main">
              <h6 className="footer-item__title primecolor">My Account</h6>
              <ul className="footer-menu">
                <li className="mb-2">
                  <Link to="/login" className="text-light hover-text-main-600">
                    Login
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/register"
                    className="text-light hover-text-main-600"
                  >
                    Register
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/shop" className="text-light hover-text-main-600">
                    Order History
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/cart" className="text-light hover-text-main-600">
                    Shopping Cart
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/wishlist"
                    className="text-light hover-text-main-600"
                  >
                    Wishlist
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 5: Shop on The Go */}
          <div className="col-lg-3 col-md-6">
            <div className="footer-item main">
              <h6 className="footer-item__title primecolor">Shop on The Go</h6>
              <div className="d-flex align-items-center gap-2 mb-2 mt-5">
                <i className="ph-fill ph-phone-call primecolor fs-5" />
                <Link
                  to="tel:+971-50-2530888"
                  className="text-md text-light hover-text-main-600 mx-3"
                >
                  +971-50-2530888
                </Link>
              </div>
              <div className="d-flex align-items-center gap-2 mb-2 mt-4">
                <i className="ph-fill ph-envelope primecolor fs-5" />
                <Link
                  to="mailto:info@udemandme.com"
                  className="text-md text-light hover-text-main-600 mx-3"
                >
                  info@udemandme.com
                </Link>
              </div>
              <div className="d-flex align-items-start gap-2 mt-5">
                <i className="ph-fill ph-map-pin primecolor fs-5" />
                <span className="text-md text-light mx-3">
                  PO Box 2975, Makan No. 46387 07765, No. 7,8,9 Nasser Yousuf
                  Nasser Al Nuaimi, 35 Street – Hasan Bin Haitham Street,
                  Sanaiyya, New Industrial Area, Ajman, United Arab Emirates
                </span>
              </div>
            </div>
          </div>
        </div>

        <a
          href="https://wa.me/971502530888?text=Hi%2C%20I%20want%20to%20know%20more%20about%20your%20services"
          className="whatsapp-float d-flex align-items-center text-decoration-none text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png"
            alt="WhatsApp"
            className="whatsapp-logo me-2"
          />
        </a>
      </div>
    </footer>
  );
};

export default FooterTwo;
