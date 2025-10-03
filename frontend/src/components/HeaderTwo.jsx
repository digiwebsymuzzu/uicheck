import React, { useEffect, useState, useRef } from "react";
import query from "jquery";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
import { useContext } from "react";
import { CartContext } from "../context/CartContext"; // path sahi karo
import axios from "axios";
import { debounce } from "lodash";

// import { toast } from "react-toastify";
const HeaderTwo = ({ category }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { cart } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [scroll, setScroll] = useState(false);
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  // const [wishlistCount, setWishlistCount] = useState(0);
  const { wishlistCount, fetchWishlist } = useContext(CartContext);

  const token = localStorage.getItem("token");
  const { setCart } = useContext(CartContext);

  const wrapperRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://udemandme.cloud/api/categories");
        const data = await res.json();
        if (data.success) {
          setCategories(data.data); // store categories in state
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const name = localStorage.getItem("loggedInUser");
    if (name) setUser(name);
  }, []);
  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset < 150) {
        setScroll(false);
      } else if (window.pageYOffset > 150) {
        setScroll(true);
      }
      return () => (window.onscroll = null);
    };
    const selectElement = query(".js-example-basic-single");
    selectElement.select2();

    return () => {
      if (selectElement.data("select2")) {
        selectElement.select2("destroy");
      }
    };
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setCart();
    handleSuccess("Logout Successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  // This function will handle protected navigation
  const handleProtectedClick = (e, path) => {
    e.preventDefault(); // stop default Link navigation
    if (user) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  // Set the default language
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const handleLanguageChange = (language) => {
    console.log(language);
    setSelectedLanguage(language);
  };

  // Set the default currency
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  // Mobile menu support
  const [menuActive, setMenuActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const handleMenuClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const handleMenuToggle = () => {
    setMenuActive(!menuActive);
  };

  // Search control support
  const [activeSearch, setActiveSearch] = useState(false);
  const handleSearchToggle = () => {
    setActiveSearch(!activeSearch);
  };

  // category control support
  const [activeCategory, setActiveCategory] = useState(false);
  const handleCategoryToggle = () => {
    setActiveCategory(!activeCategory);
  };
  const [activeIndexCat, setActiveIndexCat] = useState(null);
  const handleCatClick = (index) => {
    setActiveIndexCat(activeIndexCat === index ? null : index);
  };
  // const fetchWishlistCount = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) return;

  //   try {
  //     const res = await fetch("https://udemandme.cloud/api/whichlist", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     const data = await res.json();
  //     if (data.success) setWishlistCount(data.wishlist.length);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchWishlistCount();
  // }, []);
  useEffect(() => {
    fetchWishlist(); // Page load pe count fetch
  }, []);
  // Debounce function
  // Debounced API call
  const fetchProducts = debounce(async (query) => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(
        `https://udemandme.cloud/api/products/product/search?name=${query}`
      );
      setProducts(res.data.products || []);
    } catch (err) {
      console.error(err);
      setProducts([]);
    }
    setLoading(false);
  }, 500);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setDropdownOpen(true);
    fetchProducts(value);
  };
  const handleProductClick = (product) => {
    navigate(`/product-details/${product._id}`, {
      state: { id: product._id }, // id ke through details page
    });
    setSearchTerm("");
  };

  // Detect click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="overlay" />
      <div
        className={`side-overlay ${(menuActive || activeCategory) && "show"}`}
      />
      {/* ==================== Search Box Start Here ==================== */}

      <form action="#" className={`search-box ${activeSearch && "active"}`}>
        <button
          onClick={handleSearchToggle}
          type="button"
          className="search-box__close position-absolute inset-block-start-0 inset-inline-end-0 m-16 w-48 h-48 border border-gray-100 rounded-circle flex-center text-white hover-text-gray-800 hover-bg-white text-2xl transition-1"
        >
          <i className="ph ph-x" />
        </button>

        <div className="container">
          <div className="position-relative">
            <input
              type="text"
              className="form-control py-16 px-24 text-xl rounded-pill pe-64"
              placeholder="Search for a product or brandsds"
              value={searchTerm}
              onChange={handleChange}
            />

            {/* Dropdown same as desktop */}
            {searchTerm && (
              <div
                className="dropdown-menu show w-100 mt-2 shadow"
                style={{
                  maxHeight: "350px",
                  overflowY: "auto",
                  borderRadius: "0.5rem",
                }}
              >
                {loading && (
                  <span className="dropdown-item text-muted">Loading...</span>
                )}

                {!loading && products.length === 0 && (
                  <span className="dropdown-item text-muted">
                    No products found
                  </span>
                )}

                {!loading &&
                  products.map((product) => (
                    <div
                      key={product._id}
                      className="d-flex align-items-center p-3 mb-1 rounded shadow-sm"
                      style={{
                        cursor: "pointer",
                        transition: "background 0.2s, transform 0.1s",
                        backgroundColor: "#fff",
                      }}
                      onClick={() => handleProductClick(product)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f1f3f5";
                        e.currentTarget.style.transform = "scale(1.01)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#fff";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      <img
                        src={product.productMainImage || "/placeholder.png"}
                        alt={product.productName}
                        className="rounded me-3"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="flex-grow-1">
                        <div className="fw-semibold text-dark">
                          {product.productName}
                        </div>
                        {product.productSalePriceInr > 0 ? (
                          <div className="text-danger fw-bold">
                            AED {product.productSalePriceInr}
                          </div>
                        ) : (
                          <div className="text-muted">Price not available</div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </form>

      {/* ==================== Search Box End Here ==================== */}
      {/* ==================== Mobile Menu Start Here ==================== */}
      <div
        className={`mobile-menu scroll-sm d-lg-none d-block ${
          menuActive && "active"
        }`}
      >
        <button
          onClick={() => {
            handleMenuToggle();
            setActiveIndex(null);
          }}
          type="button"
          className="close-button"
        >
          <i className="ph ph-x" />{" "}
        </button>
        <div className="mobile-menu__inner">
          <Link to="/" className="mobile-menu__logo">
            <img src="/assets/images/logo/mob-logo.png" alt="Logo" />
          </Link>
          <div className="mobile-menu__menu">
            {/* Nav Menu Start */}
            <ul className="nav-menu flex-align nav-menu--mobile">
              <li
                onClick={() => handleMenuClick(0)}
                className="on-hover-item nav-menu__item"
              >
                <Link to="/" className="nav-menu__link">
                  Home
                </Link>
              </li>
              <li
                onClick={() => handleMenuClick(4)}
                className={`on-hover-item nav-menu__item has-submenu ${
                  activeIndex === 4 ? "d-block" : ""
                }`}
              >
                <Link to="#" className="nav-menu__link">
                  About
                </Link>
                <ul
                  className={`on-hover-dropdown common-dropdown nav-submenu scroll-sm ${
                    activeIndex === 4 ? "open" : ""
                  }`}
                >
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/about-udemandme"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      About
                    </Link>
                  </li>
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/dewalt-history"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      Dewalt History
                    </Link>
                  </li>
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/usefull-links"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      Useful Links Formulae/Table
                    </Link>
                  </li>
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/safety-for-welding"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      Safety In Welding
                    </Link>
                  </li>
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/welding-techniques"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      Welding Technique
                    </Link>
                  </li>
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/why-to-do-online-purchases"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      Online Awareness
                    </Link>
                  </li>
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/annular-cutter-portable-cutters"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      Annular Cutter (Portable Cutter)
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                onClick={() => handleMenuClick(1)}
                className={`on-hover-item nav-menu__item  ${
                  activeIndex === 1 ? "d-block" : ""
                }`}
              >
                <Link to="/shop" className="nav-menu__link">
                  Shop
                </Link>
              </li>
              <li className="on-hover-item nav-menu__item ">
                <Link to="/construction" className="nav-menu__link">
                  Construction
                </Link>
              </li>
              <li className="on-hover-item nav-menu__item ">
                <Link to="/oil-and-gas" className="nav-menu__link">
                  Oil and Gas
                </Link>
              </li>
              <li className="on-hover-item nav-menu__item ">
                <Link to="/machinery" className="nav-menu__link">
                  Machinery
                </Link>
              </li>
              <li className="on-hover-item nav-menu__item ">
                <Link to="/automotive" className="nav-menu__link">
                  Automotive
                </Link>
              </li>
              <li className="on-hover-item nav-menu__item ">
                <Link to="/sanitary" className="nav-menu__link">
                  Sanitary
                </Link>
              </li>

              <li className="on-hover-item nav-menu__item ">
                <Link to="/blog" className="nav-menu__link">
                  Blog
                </Link>
              </li>
              <li
                onClick={() => handleMenuClick(7)}
                className={`on-hover-item nav-menu__item has-submenu ${
                  activeIndex === 7 ? "d-block" : ""
                }`}
              >
                <Link to="#" className="nav-menu__link">
                  Contact
                </Link>
                <ul
                  className={`on-hover-dropdown common-dropdown nav-submenu scroll-sm ${
                    activeIndex === 7 ? "open" : ""
                  }`}
                >
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/contact"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      Contact
                    </Link>
                  </li>
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/contact-enquiry"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      Your Enquiry
                    </Link>
                  </li>
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/contact-repair-details"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      Request For Repairing
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            {/* Nav Menu End */}
          </div>
        </div>
      </div>
      {/* ==================== Mobile Menu End Here ==================== */}
      {/* ======================= Middle Header Two Start ========================= */}
      <header className="header-middle style-two bg-color-neutral">
        <div className="container container-lg">
          <nav className="header-inner flex-between">
            {/* Logo Start */}
            <div className="logo">
              <Link to="/" className="link">
                <img src="/assets/images/logo/logo-two.png" alt="Logo" />
              </Link>
            </div>
            {/* Logo End  */}
            {/* form Category Start */}
            <div className="flex-align gap-16">
              <div className="select-dropdown-for-home-two d-lg-none d-block">
                {/* Dropdown Select Start */}
                {/* <ul className="header-top__right style-two flex-align flex-wrap">
                  <li className="on-hover-item border-right-item border-right-item-sm-space has-submenu arrow-white">
                 
                    <Link
                      to="#"
                      className="selected-text text-heading text-sm py-8"
                    >
                      {selectedLanguage}
                    </Link>
                    <ul className="selectable-text-list on-hover-dropdown common-dropdown common-dropdown--sm max-h-200 scroll-sm px-0 py-8">
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleLanguageChange("English")}
                        >
                          <img
                            src="assets/images/thumbs/flag1.png"
                            alt="English"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          English
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleLanguageChange("UAE")}
                        >
                          <img
                            src="assets/images/thumbs/flag2.png"
                            alt="UAE"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          UAE
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="on-hover-item border-right-item border-right-item-sm-space has-submenu arrow-white">
                   
                    <Link
                      to="#"
                      className="selected-text text-heading text-sm py-8"
                    >
                      {selectedCurrency}
                    </Link>
                    <ul className="selectable-text-list on-hover-dropdown common-dropdown common-dropdown--sm max-h-200 scroll-sm px-0 py-8">
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleCurrencyChange("USD")}
                        >
                          <img
                            src="assets/images/thumbs/flag1.png"
                            alt="USD"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          USD
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleCurrencyChange("AED")}
                        >
                          <img
                            src="assets/images/thumbs/flag2.png"
                            alt="AED"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          AED
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul> */}
              </div>
              <form
                ref={wrapperRef}
                className="position-relative w-100"
                onSubmit={(e) => e.preventDefault()}
                style={{ maxWidth: "600px", margin: "0 auto" }}
              >
                <input
                  type="text"
                  className="form-control rounded-pill shadow-sm d-none d-md-block"
                  placeholder="Search for a product or brand"
                  value={searchTerm}
                  onChange={handleChange}
                  style={{ padding: "12px 20px", width: "60vh" }}
                />

                {dropdownOpen && searchTerm && (
                  <div
                    className="dropdown-menu show w-100 mt-2 shadow-sm d-none d-md-block"
                    style={{
                      maxHeight: "350px",
                      overflowY: "auto",
                      borderRadius: "0.5rem",
                    }}
                  >
                    {loading && (
                      <span className="dropdown-item text-muted">
                        Loading...
                      </span>
                    )}

                    {!loading && products.length === 0 && (
                      <span className="dropdown-item text-muted">
                        No products found
                      </span>
                    )}

                    {!loading &&
                      products.map((product) => (
                        <div
                          key={product._id}
                          className="d-flex align-items-center p-3 mb-1 rounded shadow-sm"
                          style={{ cursor: "pointer", backgroundColor: "#fff" }}
                          onClick={() => handleProductClick(product)}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#f1f3f5")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "#fff")
                          }
                        >
                          <img
                            src={product.productMainImage || "/placeholder.png"}
                            alt={product.productName}
                            className="rounded me-3"
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                            }}
                          />
                          <div className="flex-grow-1">
                            <div className="fw-semibold text-dark">
                              {product.productName}
                            </div>
                            {product.productSalePriceInr > 0 ? (
                              <div className="text-danger fw-bold">
                                AED {product.productSalePriceInr}
                              </div>
                            ) : (
                              <div className="text-muted">
                                Price not available
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </form>
            </div>
            {/* form Category start */}
            {/* Header Middle Right start */}
            <div className="header-right flex-align d-lg-block d-none">
              <div className="header-two-activities flex-align flex-wrap gap-32">
                <button
                  type="button"
                  className="flex-align search-icon d-lg-none d-flex gap-4 item-hover-two"
                >
                  <span className="text-2xl text-white d-flex position-relative item-hover__text">
                    <i className="ph ph-magnifying-glass" />
                  </span>
                </button>
                {/* <Link
                  to="/account"
                  className="flex-align flex-column gap-8 item-hover-two"
                >
                  <span className="text-2xl text-white d-flex position-relative item-hover__text">
                    <i className="ph ph-user" />
                  </span>

                  <span className="text-md text-white item-hover__text d-none d-lg-flex">
                    Profile
                  </span>
                </Link> */}
                {/* if user login then show this  */}
                {user ? (
                  <div
                    className="dropdown"
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                  >
                    {/* Login Button */}
                    <button
                      className={`btn btn-primary dropdown-toggle ${
                        open ? "show" : ""
                      }`}
                      type="button"
                      style={{
                        backgroundColor: open ? "black" : "",
                        border: "none",
                      }}
                    >
                      <i className="ph ph-user me-1"></i>
                      <span className="btn-text"> Welcome, {user} </span>
                    </button>

                    {/* Dropdown */}
                    <div className="login-dropdown">
                      <a className="dropdown-item" href="/account">
                        My Profile
                      </a>
                      <a className="dropdown-item" href="/account">
                        Orders
                      </a>
                      <a className="dropdown-item" href="/wishlist">
                        Wishlist
                      </a>
                      {/* <a className="dropdown-item" href="/rewards">
                        Rewards
                      </a> */}
                      {/* <a className="dropdown-item" href="/giftcards">
                        Gift Cards
                      </a> */}
                      <button
                        className="btn bg-btn-primecolor"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="dropdown"
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                  >
                    {/* Login Button */}
                    <button
                      className={`btn btn-primary dropdown-toggle ${
                        open ? "show" : ""
                      }`}
                      type="button"
                      style={{
                        backgroundColor: open ? "black" : "",
                        border: "none",
                      }}
                      onClick={() => {
                        if (!user) navigate("/login"); // if not logged in, go to login page
                      }}
                    >
                      <i className="ph ph-user me-1"></i>
                      <span className="btn-text">
                        {user ? `Welcome, ${user}` : "Login"}
                      </span>
                    </button>

                    {/* Dropdown */}
                    <div className="login-dropdown">
                      <div className="signup-row">
                        <span className="text-muted small">New customer?</span>
                        <a href="/register" className="signup-btn">
                          Sign Up
                        </a>
                      </div>

                      <hr className="dropdown-divider" />

                      <Link
                        className="dropdown-item"
                        to="/account"
                        onClick={(e) => handleProtectedClick(e, "/account")}
                      >
                        My Profile
                      </Link>
                      <a className="dropdown-item" href="/login">
                        Cart
                      </a>
                      <a className="dropdown-item" href="/login">
                        Wishlist
                      </a>
                    </div>
                  </div>
                )}
                {/* if user not login then show this and navigate each time login page and do only signup */}

                <Link
                  to="/wishlist"
                  className="flex-align flex-column gap-8 item-hover-two"
                >
                  <span className="text-2xl text-white d-flex position-relative me-6 mt-6 item-hover__text">
                    <i className="ph ph-heart" />
                    <span className="w-16 h-16 flex-center rounded-circle bg-main-two-600 text-white text-xs position-absolute top-n6 end-n4">
                      {wishlistCount}
                    </span>
                  </span>
                  <span className="text-md text-white item-hover__text d-none d-lg-flex">
                    Wishlist
                  </span>
                </Link>
                <Link
                  to="/cart"
                  className="flex-align flex-column gap-8 item-hover-two"
                >
                  <span className="text-2xl text-white d-flex position-relative me-6 mt-6 item-hover__text">
                    <i className="ph ph-shopping-cart-simple" />
                    <span className="w-16 h-16 flex-center rounded-circle bg-main-two-600 text-white text-xs position-absolute top-n6 end-n4">
                      {token ? cart.length : 0}
                    </span>
                  </span>
                  <span className="text-md text-white item-hover__text d-none d-lg-flex">
                    Cart
                  </span>
                </Link>
              </div>
            </div>
            {/* Header Middle Right End  */}
          </nav>
        </div>
      </header>
      {/* ======================= Middle Header Two End ========================= */}
      {/* ==================== Header Two Start Here ==================== */}
      <header
        className={`header bg-white border-bottom border-gray-100 ${
          scroll && "fixed-header"
        }`}
      >
        <div className="container container-lg">
          <nav className="header-inner d-flex justify-content-between gap-8">
            <div className="flex-align menu-category-wrapper">
              {/* Category Dropdown Start */}
              {/* <div
                className={`category-two ${
                  category === false ? "d-block" : "d-none"
                } `}
              >
                <button
                  onClick={handleCategoryToggle}
                  type="button"
                  className="category__button flex-align gap-8 fw-medium  p-16 text-dark"
                >
                  <span className="icon text-2xl d-xs-flex d-none">
                    <i className="ph ph-dots-nine" />
                  </span>
                  <span className="d-sm-flex d-none">All</span>{" "}
                  Categorieshhhhhhhhhhhhh
                  <span className="arrow-icon text-xl d-flex">
                    <i className="ph ph-caret-down" />
                  </span>
                </button>
                <div
                  className={`responsive-dropdown cat common-dropdown d-lg-none d-block nav-submenu p-0 submenus-submenu-wrapper shadow-none border border-gray-100 ${
                    activeCategory && "active"
                  }`}
                >
                  <button
                    onClick={() => {
                      handleCategoryToggle();
                      setActiveIndexCat(null);
                    }}
                    type="button"
                    className="close-responsive-dropdown rounded-circle text-xl position-absolute inset-inline-end-0 inset-block-start-0 mt-4 me-8 d-lg-none d-flex"
                  >
                    <i className="ph ph-x" />{" "}
                  </button>
                  <div className="logo px-16 d-lg-none d-block">
                    <Link to="/" className="link">
                      <img src="assets/images/logo/logo.png" alt="Logo" />
                    </Link>
                  </div>
                  <ul className="scroll-sm p-0 py-8 overflow-y-auto">
                    <li
                      onClick={() => handleCatClick(0)}
                      className={`has-submenus-submenu ${
                        activeIndexCat === 0 ? "active" : ""
                      }`}
                    >
                      <Link
                        onClick={() => setActiveIndexCat(null)}
                        to="#"
                        className="text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0"
                      >
                        <span>Cell Phone</span>
                        <span className="icon text-md d-flex ms-auto">
                          <i className="ph ph-caret-right" />
                        </span>
                      </Link>
                      <div
                        className={`submenus-submenu py-16 ${
                          activeIndexCat === 0 ? "open" : ""
                        }`}
                      >
                        <h6 className="text-lg px-16 submenus-submenu__title">
                          Cell Phone
                        </h6>
                        <ul className="submenus-submenu__list max-h-300 overflow-y-auto scroll-sm">
                          <li>
                            <Link to="/shop">Samsung</Link>
                          </li>
                          <li>
                            <Link to="/shop">Iphone</Link>
                          </li>
                          <li>
                            <Link to="/shop">Vivo</Link>
                          </li>
                          <li>
                            <Link to="/shop">Oppo</Link>
                          </li>
                          <li>
                            <Link to="/shop">Itel</Link>
                          </li>
                          <li>
                            <Link to="/shop">Realme</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li
                      onClick={() => handleCatClick(1)}
                      className={`has-submenus-submenu ${
                        activeIndexCat === 1 ? "active" : ""
                      }`}
                    >
                      <Link
                        to="#"
                        className="text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0"
                      >
                        <span>Wear</span>
                        <span className="icon text-md d-flex ms-auto">
                          <i className="ph ph-caret-right" />
                        </span>
                      </Link>
                      <div
                        className={`submenus-submenu py-16 ${
                          activeIndexCat === 1 ? "open" : ""
                        }`}
                      >
                        <h6 className="text-lg px-16 submenus-submenu__title">
                          Wear
                        </h6>
                        <ul className="submenus-submenu__list max-h-300 overflow-y-auto scroll-sm">
                          <li>
                            <Link to="/shop">Samsung</Link>
                          </li>
                          <li>
                            <Link to="/shop">Iphone</Link>
                          </li>
                          <li>
                            <Link to="/shop">Vivo</Link>
                          </li>
                          <li>
                            <Link to="/shop">Oppo</Link>
                          </li>
                          <li>
                            <Link to="/shop">Itel</Link>
                          </li>
                          <li>
                            <Link to="/shop">Realme</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li
                      onClick={() => handleCatClick(2)}
                      className={`has-submenus-submenu ${
                        activeIndexCat === 2 ? "active" : ""
                      }`}
                    >
                      <Link
                        to="#"
                        className="text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0"
                      >
                        <span>Computer</span>
                        <span className="icon text-md d-flex ms-auto">
                          <i className="ph ph-caret-right" />
                        </span>
                      </Link>
                      <div
                        className={`submenus-submenu py-16 ${
                          activeIndexCat === 2 ? "open" : ""
                        }`}
                      >
                        <h6 className="text-lg px-16 submenus-submenu__title">
                          Computer
                        </h6>
                        <ul className="submenus-submenu__list max-h-300 overflow-y-auto scroll-sm">
                          <li>
                            <Link to="/shop">Samsung</Link>
                          </li>
                          <li>
                            <Link to="/shop">Iphone</Link>
                          </li>
                          <li>
                            <Link to="/shop">Vivo</Link>
                          </li>
                          <li>
                            <Link to="/shop">Oppo</Link>
                          </li>
                          <li>
                            <Link to="/shop">Itel</Link>
                          </li>
                          <li>
                            <Link to="/shop">Realme</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li
                      onClick={() => handleCatClick(3)}
                      className={`has-submenus-submenu ${
                        activeIndexCat === 3 ? "active" : ""
                      }`}
                    >
                      <Link
                        to="#"
                        className="text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0"
                      >
                        <span>Headphone</span>
                        <span className="icon text-md d-flex ms-auto">
                          <i className="ph ph-caret-right" />
                        </span>
                      </Link>
                      <div
                        className={`submenus-submenu py-16 ${
                          activeIndexCat === 3 ? "open" : ""
                        }`}
                      >
                        <h6 className="text-lg px-16 submenus-submenu__title">
                          Headphone
                        </h6>
                        <ul className="submenus-submenu__list max-h-300 overflow-y-auto scroll-sm">
                          <li>
                            <Link to="/shop">Samsung</Link>
                          </li>
                          <li>
                            <Link to="/shop">Iphone</Link>
                          </li>
                          <li>
                            <Link to="/shop">Vivo</Link>
                          </li>
                          <li>
                            <Link to="/shop">Oppo</Link>
                          </li>
                          <li>
                            <Link to="/shop">Itel</Link>
                          </li>
                          <li>
                            <Link to="/shop">Realme</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li
                      onClick={() => handleCatClick(4)}
                      className={`has-submenus-submenu ${
                        activeIndexCat === 4 ? "active" : ""
                      }`}
                    >
                      <Link
                        to="#"
                        className="text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0"
                      >
                        <span>Smart Screen</span>
                        <span className="icon text-md d-flex ms-auto">
                          <i className="ph ph-caret-right" />
                        </span>
                      </Link>
                      <div
                        className={`submenus-submenu py-16 ${
                          activeIndexCat === 4 ? "open" : ""
                        }`}
                      >
                        <h6 className="text-lg px-16 submenus-submenu__title">
                          Smart Screen
                        </h6>
                        <ul className="submenus-submenu__list max-h-300 overflow-y-auto scroll-sm">
                          <li>
                            <Link to="/shop">Samsung</Link>
                          </li>
                          <li>
                            <Link to="/shop">Iphone</Link>
                          </li>
                          <li>
                            <Link to="/shop">Vivo</Link>
                          </li>
                          <li>
                            <Link to="/shop">Oppo</Link>
                          </li>
                          <li>
                            <Link to="/shop">Itel</Link>
                          </li>
                          <li>
                            <Link to="/shop">Realme</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li
                      onClick={() => handleCatClick(5)}
                      className={`has-submenus-submenu ${
                        activeIndexCat === 5 ? "active" : ""
                      }`}
                    >
                      <Link
                        to="#"
                        className="text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0"
                      >
                        <span>Smart Home</span>
                        <span className="icon text-md d-flex ms-auto">
                          <i className="ph ph-caret-right" />
                        </span>
                      </Link>
                      <div
                        className={`submenus-submenu py-16 ${
                          activeIndexCat === 5 ? "open" : ""
                        }`}
                      >
                        <h6 className="text-lg px-16 submenus-submenu__title">
                          Smart Home
                        </h6>
                        <ul className="submenus-submenu__list max-h-300 overflow-y-auto scroll-sm">
                          <li>
                            <Link to="/shop">Samsung</Link>
                          </li>
                          <li>
                            <Link to="/shop">Iphone</Link>
                          </li>
                          <li>
                            <Link to="/shop">Vivo</Link>
                          </li>
                          <li>
                            <Link to="/shop">Oppo</Link>
                          </li>
                          <li>
                            <Link to="/shop">Itel</Link>
                          </li>
                          <li>
                            <Link to="/shop">Realme</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li
                      onClick={() => handleCatClick(6)}
                      className={`has-submenus-submenu ${
                        activeIndexCat === 6 ? "active" : ""
                      }`}
                    >
                      <Link
                        to="#"
                        className="text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0"
                      >
                        <span>Digital Accessories</span>
                        <span className="icon text-md d-flex ms-auto">
                          <i className="ph ph-caret-right" />
                        </span>
                      </Link>
                      <div
                        className={`submenus-submenu py-16 ${
                          activeIndexCat === 6 ? "open" : ""
                        }`}
                      >
                        <h6 className="text-lg px-16 submenus-submenu__title">
                          Digital Accessories
                        </h6>
                        <ul className="submenus-submenu__list max-h-300 overflow-y-auto scroll-sm">
                          <li>
                            <Link to="/shop">Samsung</Link>
                          </li>
                          <li>
                            <Link to="/shop">Iphone</Link>
                          </li>
                          <li>
                            <Link to="/shop">Vivo</Link>
                          </li>
                          <li>
                            <Link to="/shop">Oppo</Link>
                          </li>
                          <li>
                            <Link to="/shop">Itel</Link>
                          </li>
                          <li>
                            <Link to="/shop">Realme</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li
                      onClick={() => handleCatClick(7)}
                      className={`has-submenus-submenu ${
                        activeIndexCat === 7 ? "active" : ""
                      }`}
                    >
                      <Link
                        to="#"
                        className="text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0"
                      >
                        <span> Value Added Services</span>
                        <span className="icon text-md d-flex ms-auto">
                          <i className="ph ph-caret-right" />
                        </span>
                      </Link>
                      <div
                        className={`submenus-submenu py-16 ${
                          activeIndexCat === 7 ? "open" : ""
                        }`}
                      >
                        <h6 className="text-lg px-16 submenus-submenu__title">
                          {" "}
                          Value Added Services
                        </h6>
                        <ul className="submenus-submenu__list max-h-300 overflow-y-auto scroll-sm">
                          <li>
                            <Link to="/shop">Samsung</Link>
                          </li>
                          <li>
                            <Link to="/shop">Iphone</Link>
                          </li>
                          <li>
                            <Link to="/shop">Vivo</Link>
                          </li>
                          <li>
                            <Link to="/shop">Oppo</Link>
                          </li>
                          <li>
                            <Link to="/shop">Itel</Link>
                          </li>
                          <li>
                            <Link to="/shop">Realme</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li
                      onClick={() => handleCatClick(8)}
                      className={`has-submenus-submenu ${
                        activeIndexCat === 8 ? "active" : ""
                      }`}
                    >
                      <Link
                        to="#"
                        className="text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0"
                      >
                        <span>Car Products</span>
                        <span className="icon text-md d-flex ms-auto">
                          <i className="ph ph-caret-right" />
                        </span>
                      </Link>
                      <div
                        className={`submenus-submenu py-16 ${
                          activeIndexCat === 8 ? "open" : ""
                        }`}
                      >
                        <h6 className="text-lg px-16 submenus-submenu__title">
                          Car Products
                        </h6>
                        <ul className="submenus-submenu__list max-h-300 overflow-y-auto scroll-sm">
                          <li>
                            <Link to="/shop">Samsung</Link>
                          </li>
                          <li>
                            <Link to="/shop">Iphone</Link>
                          </li>
                          <li>
                            <Link to="/shop">Vivo</Link>
                          </li>
                          <li>
                            <Link to="/shop">Oppo</Link>
                          </li>
                          <li>
                            <Link to="/shop">Itel</Link>
                          </li>
                          <li>
                            <Link to="/shop">Realme</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li
                      onClick={() => handleCatClick(9)}
                      className={`has-submenus-submenu ${
                        activeIndexCat === 9 ? "active" : ""
                      }`}
                    >
                      <Link
                        to="#"
                        className="text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0"
                      >
                        <span>Ecological Products</span>
                        <span className="icon text-md d-flex ms-auto">
                          <i className="ph ph-caret-right" />
                        </span>
                      </Link>
                      <div
                        className={`submenus-submenu py-16 ${
                          activeIndexCat === 9 ? "open" : ""
                        }`}
                      >
                        <h6 className="text-lg px-16 submenus-submenu__title">
                          Ecological Products
                        </h6>
                        <ul className="submenus-submenu__list max-h-300 overflow-y-auto scroll-sm">
                          <li>
                            <Link to="/shop">Samsung</Link>
                          </li>
                          <li>
                            <Link to="/shop">Iphone</Link>
                          </li>
                          <li>
                            <Link to="/shop">Vivo</Link>
                          </li>
                          <li>
                            <Link to="/shop">Oppo</Link>
                          </li>
                          <li>
                            <Link to="/shop">Itel</Link>
                          </li>
                          <li>
                            <Link to="/shop">Realme</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li
                      onClick={() => handleCatClick(10)}
                      className={`has-submenus-submenu ${
                        activeIndexCat === 10 ? "active" : ""
                      }`}
                    >
                      <Link
                        to="#"
                        className="text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0"
                      >
                        <span>Flat</span>
                        <span className="icon text-md d-flex ms-auto">
                          <i className="ph ph-caret-right" />
                        </span>
                      </Link>
                      <div
                        className={`submenus-submenu py-16 ${
                          activeIndexCat === 10 ? "open" : ""
                        }`}
                      >
                        <h6 className="text-lg px-16 submenus-submenu__title">
                          Flat
                        </h6>
                        <ul className="submenus-submenu__list max-h-300 overflow-y-auto scroll-sm">
                          <li>
                            <Link to="/shop">Samsung</Link>
                          </li>
                          <li>
                            <Link to="/shop">Iphone</Link>
                          </li>
                          <li>
                            <Link to="/shop">Vivo</Link>
                          </li>
                          <li>
                            <Link to="/shop">Oppo</Link>
                          </li>
                          <li>
                            <Link to="/shop">Itel</Link>
                          </li>
                          <li>
                            <Link to="/shop">Realme</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li
                      onClick={() => handleCatClick(11)}
                      className={`has-submenus-submenu ${
                        activeIndexCat === 11 ? "active" : ""
                      }`}
                    >
                      <Link
                        to="#"
                        className="text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0"
                      >
                        <span>Commercial Terminal</span>
                        <span className="icon text-md d-flex ms-auto">
                          <i className="ph ph-caret-right" />
                        </span>
                      </Link>
                      <div
                        className={`submenus-submenu py-16 ${
                          activeIndexCat === 11 ? "open" : ""
                        }`}
                      >
                        <h6 className="text-lg px-16 submenus-submenu__title">
                          Commercial Terminal
                        </h6>
                        <ul className="submenus-submenu__list max-h-300 overflow-y-auto scroll-sm">
                          <li>
                            <Link to="/shop">Samsung</Link>
                          </li>
                          <li>
                            <Link to="/shop">Iphone</Link>
                          </li>
                          <li>
                            <Link to="/shop">Vivo</Link>
                          </li>
                          <li>
                            <Link to="/shop">Oppo</Link>
                          </li>
                          <li>
                            <Link to="/shop">Itel</Link>
                          </li>
                          <li>
                            <Link to="/shop">Realme</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li
                      onClick={() => handleCatClick(12)}
                      className={`has-submenus-submenu ${
                        activeIndexCat === 12 ? "active" : ""
                      }`}
                    >
                      <Link
                        to="#"
                        className="text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0"
                      >
                        <span>Headphone</span>
                        <span className="icon text-md d-flex ms-auto">
                          <i className="ph ph-caret-right" />
                        </span>
                      </Link>
                      <div
                        className={`submenus-submenu py-16 ${
                          activeIndexCat === 12 ? "open" : ""
                        }`}
                      >
                        <h6 className="text-lg px-16 submenus-submenu__title">
                          Headphone
                        </h6>
                        <ul className="submenus-submenu__list max-h-300 overflow-y-auto scroll-sm">
                          <li>
                            <Link to="/shop">Samsung</Link>
                          </li>
                          <li>
                            <Link to="/shop">Iphone</Link>
                          </li>
                          <li>
                            <Link to="/shop">Vivo</Link>
                          </li>
                          <li>
                            <Link to="/shop">Oppo</Link>
                          </li>
                          <li>
                            <Link to="/shop">Itel</Link>
                          </li>
                          <li>
                            <Link to="/shop">Realme</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li
                      onClick={() => handleCatClick(13)}
                      className={`has-submenus-submenu ${
                        activeIndexCat === 13 ? "active" : ""
                      }`}
                    >
                      <Link
                        to="#"
                        className="text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0"
                      >
                        <span>Smart Screen</span>
                        <span className="icon text-md d-flex ms-auto">
                          <i className="ph ph-caret-right" />
                        </span>
                      </Link>
                      <div
                        className={`submenus-submenu py-16 ${
                          activeIndexCat === 13 ? "open" : ""
                        }`}
                      >
                        <h6 className="text-lg px-16 submenus-submenu__title">
                          Smart Screen
                        </h6>
                        <ul className="submenus-submenu__list max-h-300 overflow-y-auto scroll-sm">
                          <li>
                            <Link to="/shop">Samsung</Link>
                          </li>
                          <li>
                            <Link to="/shop">Iphone</Link>
                          </li>
                          <li>
                            <Link to="/shop">Vivo</Link>
                          </li>
                          <li>
                            <Link to="/shop">Oppo</Link>
                          </li>
                          <li>
                            <Link to="/shop">Itel</Link>
                          </li>
                          <li>
                            <Link to="/shop">Realme</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div> */}
              {/* <div
                className={`category main  on-hover-item  text-white ${
                  category === true ? "d-block" : "d-none"
                }`}
              >
                <button
                  type="button"
                  className="category__button flex-align gap-8 fw-medium p-16  border-gray-100 text-dark"
                >
                  <span className="icon text-2xl d-xs-flex d-none">
                    <i className="ph ph-dots-nine" />
                  </span>
                  <span className="d-sm-flex d-none">All</span> Categories
                  <span className="arrow-icon text-xl d-flex">
                    <i className="ph ph-caret-down" />
                  </span>
                </button>
                <div className="responsive-dropdown on-hover-dropdown common-dropdown nav-submenu p-0 submenus-submenu-wrapper">
                  <button
                    type="button"
                    className="close-responsive-dropdown rounded-circle text-xl position-absolute inset-inline-end-0 inset-block-start-0 mt-4 me-8 d-lg-none d-flex"
                  >
                    <i className="ph ph-x" />{" "}
                  </button>
                  <div className="logo px-16 d-lg-none d-block">
                    <Link to="/" className="link">
                      <img src="assets/images/logo/logo.png" alt="Logo" />
                    </Link>
                  </div>
                  <ul className="scroll-sm p-0 py-8 w-300 max-h-400 overflow-y-auto">
                    <li className="has-submenus-submenu">
                      <Link
                        to="#"
                        className="text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0"
                      >
                        <span className="text-xl d-flex">
                          <i className="ph ph-carrot" />
                        </span>
                        <span>Vegetables &amp; Fruit</span>
                        <span className="icon text-md d-flex ms-auto">
                          <i className="ph ph-caret-right" />
                        </span>
                      </Link>
                      <div className="submenus-submenu py-16">
                        <h6 className="text-lg px-16 submenus-submenu__title">
                          Vegetables &amp; Fruit
                        </h6>
                        <ul className="submenus-submenu__list max-h-300 overflow-y-auto scroll-sm">
                          <li>
                            <Link to="/shop">Potato &amp; Tomato</Link>
                          </li>
                          <li>
                            <Link to="/shop">Cucumber &amp; Capsicum</Link>
                          </li>
                          <li>
                            <Link to="/shop">Leafy Vegetables</Link>
                          </li>
                          <li>
                            <Link to="/shop">Root Vegetables</Link>
                          </li>
                          <li>
                            <Link to="/shop">Beans &amp; Okra</Link>
                          </li>
                          <li>
                            <Link to="/shop">Cabbage &amp; Cauliflower</Link>
                          </li>
                          <li>
                            <Link to="/shop">Gourd &amp; Drumstick</Link>
                          </li>
                          <li>
                            <Link to="/shop">Specialty</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="has-submenus-submenu">
                      <Link
                        to="#"
                        className="text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0"
                      >
                        <span className="text-xl d-flex">
                          <i className="ph ph-brandy" />
                        </span>
                        <span>Beverages</span>
                        <span className="icon text-md d-flex ms-auto">
                          <i className="ph ph-caret-right" />
                        </span>
                      </Link>
                      <div className="submenus-submenu py-16">
                        <h6 className="text-lg px-16 submenus-submenu__title">
                          Beverages
                        </h6>
                        <ul className="submenus-submenu__list max-h-300 overflow-y-auto scroll-sm">
                          <li>
                            <Link to="/shop">Soda &amp; Cocktail Mix </Link>
                          </li>
                          <li>
                            <Link to="/shop"> Sports &amp; Energy Drinks</Link>
                          </li>
                          <li>
                            <Link to="/shop"> Non Alcoholic Drinks</Link>
                          </li>
                          <li>
                            <Link to="/shop"> Packaged Water </Link>
                          </li>
                          <li>
                            <Link to="/shop"> Spring Water</Link>
                          </li>
                          <li>
                            <Link to="/shop"> Flavoured Water </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="has-submenus-submenu">
                      <Link
                        to="#"
                        className="text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0"
                      >
                        <span className="text-xl d-flex">
                          <i className="ph ph-brandy" />
                        </span>
                        <span>Meats &amp; Seafood</span>
                        <span className="icon text-md d-flex ms-auto">
                          <i className="ph ph-caret-right" />
                        </span>
                      </Link>
                      <div className="submenus-submenu py-16">
                        <h6 className="text-lg px-16 submenus-submenu__title">
                          Meats &amp; Seafood
                        </h6>
                        <ul className="submenus-submenu__list max-h-300 overflow-y-auto scroll-sm">
                          <li>
                            <Link to="/shop"> Fresh Meat </Link>
                          </li>
                          <li>
                            <Link to="/shop"> Frozen Meat</Link>
                          </li>
                          <li>
                            <Link to="/shop"> Marinated Meat</Link>
                          </li>
                          <li>
                            <Link to="/shop"> Fresh &amp; Frozen Meat</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="has-submenus-submenu">
                      <Link
                        to="#"
                        className="text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0"
                      >
                        <span className="text-xl d-flex">
                          <i className="ph ph-brandy" />
                        </span>
                        <span>Breakfast &amp; Dairy</span>
                        <span className="icon text-md d-flex ms-auto">
                          <i className="ph ph-caret-right" />
                        </span>
                      </Link>
                      <div className="submenus-submenu py-16">
                        <h6 className="text-lg px-16 submenus-submenu__title">
                          Breakfast &amp; Dairy
                        </h6>
                        <ul className="submenus-submenu__list max-h-300 overflow-y-auto scroll-sm">
                          <li>
                            <Link to="/shop"> Oats &amp; Porridge</Link>
                          </li>
                          <li>
                            <Link to="/shop"> Kids Cereal</Link>
                          </li>
                          <li>
                            <Link to="/shop"> Muesli</Link>
                          </li>
                          <li>
                            <Link to="/shop"> Flakes</Link>
                          </li>
                          <li>
                            <Link to="/shop"> Granola &amp; Cereal Bars</Link>
                          </li>
                          <li>
                            <Link to="/shop"> Instant Noodles</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="has-submenus-submenu">
                      <Link
                        to="#"
                        className="text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0"
                      >
                        <span className="text-xl d-flex">
                          <i className="ph ph-brandy" />
                        </span>
                        <span>Frozen Foods</span>
                        <span className="icon text-md d-flex ms-auto">
                          <i className="ph ph-caret-right" />
                        </span>
                      </Link>
                      <div className="submenus-submenu py-16">
                        <h6 className="text-lg px-16 submenus-submenu__title">
                          Frozen Foods
                        </h6>
                        <ul className="submenus-submenu__list max-h-300 overflow-y-auto scroll-sm">
                          <li>
                            <Link to="/shop"> Instant Noodles </Link>
                          </li>
                          <li>
                            <Link to="/shop"> Hakka Noodles</Link>
                          </li>
                          <li>
                            <Link to="/shop"> Cup Noodles</Link>
                          </li>
                          <li>
                            <Link to="/shop"> Vermicelli</Link>
                          </li>
                          <li>
                            <Link to="/shop"> Instant Pasta</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="has-submenus-submenu">
                      <Link
                        to="#"
                        className="text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0"
                      >
                        <span className="text-xl d-flex">
                          <i className="ph ph-brandy" />
                        </span>
                        <span>Biscuits &amp; Snacks</span>
                        <span className="icon text-md d-flex ms-auto">
                          <i className="ph ph-caret-right" />
                        </span>
                      </Link>
                      <div className="submenus-submenu py-16">
                        <h6 className="text-lg px-16 submenus-submenu__title">
                          Biscuits &amp; Snacks
                        </h6>
                        <ul className="submenus-submenu__list max-h-300 overflow-y-auto scroll-sm">
                          <li>
                            <Link to="/shop"> Salted Biscuits </Link>
                          </li>
                          <li>
                            <Link to="/shop"> Marie, Health, Digestive</Link>
                          </li>
                          <li>
                            <Link to="/shop">
                              {" "}
                              Cream Biscuits &amp; Wafers{" "}
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop"> Glucose &amp; Milk biscuits</Link>
                          </li>
                          <li>
                            <Link to="/shop"> Cookies</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="has-submenus-submenu">
                      <Link
                        to="#"
                        className="text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0"
                      >
                        <span className="text-xl d-flex">
                          <i className="ph ph-brandy" />
                        </span>
                        <span>Grocery &amp; Staples</span>
                        <span className="icon text-md d-flex ms-auto">
                          <i className="ph ph-caret-right" />
                        </span>
                      </Link>
                      <div className="submenus-submenu py-16">
                        <h6 className="text-lg px-16 submenus-submenu__title">
                          Grocery &amp; Staples
                        </h6>
                        <ul className="submenus-submenu__list max-h-300 overflow-y-auto scroll-sm">
                          <li>
                            <Link to="/shop"> Lemon, Ginger &amp; Garlic </Link>
                          </li>
                          <li>
                            <Link to="/shop"> Indian &amp; Exotic Herbs</Link>
                          </li>
                          <li>
                            <Link to="/shop"> Orangic Vegetables</Link>
                          </li>
                          <li>
                            <Link to="/shop">Orangic Fruits </Link>
                          </li>
                          <li>
                            <Link to="/shop"> Orangic Dry Fruits</Link>
                          </li>
                          <li>
                            <Link to="/shop"> Orangic Dals &amp; pulses</Link>
                          </li>
                          <li>
                            <Link to="/shop"> Orangic Millet &amp; Flours</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div> */}
              {/* Category Dropdown End  */}
              {/* Menu Start  */}
              <div className="header-menu d-lg-block d-none">
                {/* Nav Menu Start */}
                <ul className="nav-menu flex-align ">
                  <li className=" nav-menu__item ">
                    <Link to="/" className="nav-menu__link">
                      Home
                    </Link>
                  </li>
                  <li className="on-hover-item nav-menu__item has-submenu">
                    <Link to="/contact" className="nav-menu__link">
                      About
                    </Link>
                    <ul className="on-hover-dropdown common-dropdown nav-submenu scroll-sm">
                      <li className="common-dropdown__item nav-submenu__item">
                        <NavLink
                          to="/about-udemandme"
                          className={(navData) =>
                            navData.isActive
                              ? "common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage"
                              : "common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                          }
                        >
                          About
                        </NavLink>
                      </li>
                      <li className="common-dropdown__item nav-submenu__item">
                        <NavLink
                          to="/dewalt-history"
                          className={(navData) =>
                            navData.isActive
                              ? "common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage"
                              : "common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                          }
                        >
                          Dewalt History
                        </NavLink>
                      </li>
                      <li className="common-dropdown__item nav-submenu__item">
                        <NavLink
                          to="/usefull-links"
                          className={(navData) =>
                            navData.isActive
                              ? "common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage"
                              : "common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                          }
                        >
                          Usefull Links Formulae/Table
                        </NavLink>
                      </li>
                      <li className="common-dropdown__item nav-submenu__item">
                        <NavLink
                          to="/safety-for-welding"
                          className={(navData) =>
                            navData.isActive
                              ? "common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage"
                              : "common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                          }
                        >
                          Safety In Welding
                        </NavLink>
                      </li>

                      <li className="common-dropdown__item nav-submenu__item">
                        <NavLink
                          to="/welding-techniques"
                          className={(navData) =>
                            navData.isActive
                              ? "common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage"
                              : "common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                          }
                        >
                          Welding Technique
                        </NavLink>
                      </li>
                      <li className="common-dropdown__item nav-submenu__item">
                        <NavLink
                          to="/why-to-do-online-purchases"
                          className={(navData) =>
                            navData.isActive
                              ? "common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage"
                              : "common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                          }
                        >
                          Online Awareness
                        </NavLink>
                      </li>
                      <li className="common-dropdown__item nav-submenu__item">
                        <NavLink
                          to="/annular-cutter-portable-cutters"
                          className={(navData) =>
                            navData.isActive
                              ? "common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage"
                              : "common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                          }
                        >
                          Annular Cutter (Portable Cutter)
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className="on-hover-item nav-menu__item">
                    <Link to="/shop" className="nav-menu__link">
                      Shop
                    </Link>
                    {/* <ul className="on-hover-dropdown common-dropdown nav-submenu scroll-sm">
                      <li className="common-dropdown__item nav-submenu__item">
                        <NavLink
                          to="/shop"
                          className={(navData) =>
                            navData.isActive
                              ? "common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage"
                              : "common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                          }
                        >
                          Shop
                        </NavLink>
                      </li>
                      <li className="common-dropdown__item nav-submenu__item">
                        <NavLink
                          to="/product-details"
                          className={(navData) =>
                            navData.isActive
                              ? "common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage"
                              : "common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                          }
                        >
                          {" "}
                          Shop Details
                        </NavLink>
                      </li>
                    </ul> */}
                  </li>
                  <li className="on-hover-item nav-menu__item ">
                    <Link to="/construction" className="nav-menu__link">
                      Construction
                    </Link>
                  </li>
                  <li className="on-hover-item nav-menu__item ">
                    <Link to="/oil-and-gas" className="nav-menu__link">
                      Oil and Gas
                    </Link>
                  </li>
                  <li className="on-hover-item nav-menu__item ">
                    <Link to="/machinery" className="nav-menu__link">
                      Machinery
                    </Link>
                  </li>
                  <li className="on-hover-item nav-menu__item ">
                    <Link to="/automotive" className="nav-menu__link">
                      Automotive
                    </Link>
                  </li>
                  <li className="on-hover-item nav-menu__item ">
                    <Link to="/sanitary" className="nav-menu__link">
                      Sanitary
                    </Link>
                  </li>

                  <li className="on-hover-item nav-menu__item ">
                    <Link to="/blog" className="nav-menu__link">
                      Blog
                    </Link>
                  </li>
                  <li
                    onClick={() => handleMenuClick(4)}
                    className={`on-hover-item nav-menu__item has-submenu ${
                      activeIndex === 7 ? "d-block" : ""
                    }`}
                  >
                    <Link to="#" className="nav-menu__link">
                      Contact
                    </Link>
                    <ul
                      className={`on-hover-dropdown common-dropdown nav-submenu scroll-sm ${
                        activeIndex === 7 ? "open" : ""
                      }`}
                    >
                      <li className="common-dropdown__item nav-submenu__item">
                        <Link
                          onClick={() => setActiveIndex(null)}
                          to="/contact"
                          className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                        >
                          {" "}
                          Contact
                        </Link>
                      </li>
                      <li className="common-dropdown__item nav-submenu__item">
                        <Link
                          onClick={() => setActiveIndex(null)}
                          to="/contact-enquiry"
                          className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                        >
                          {" "}
                          Your Enquiry
                        </Link>
                      </li>
                      <li className="common-dropdown__item nav-submenu__item">
                        <Link
                          onClick={() => setActiveIndex(null)}
                          to="/contact-repair-details"
                          className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                        >
                          {" "}
                          Request For Repairing
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
                {/* Nav Menu End */}
              </div>
              {/* Menu End  */}
            </div>
            {/* Header Right start */}
            <div className="header-right flex-align">
              <div className="select-dropdown-for-home-two d-lg-block d-none">
                {/* Dropdown Select Start */}
                {/* <ul className="header-top__right style-two flex-align flex-wrap">
                  <li className="on-hover-item border-right-item border-right-item-sm-space has-submenu arrow-white">
                    
                    <Link
                      to="#"
                      className="selected-text text-heading text-sm py-8"
                    >
                      {selectedLanguage}
                    </Link>
                    <ul className="selectable-text-list on-hover-dropdown common-dropdown common-dropdown--sm max-h-200 scroll-sm px-0 py-8">
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleLanguageChange("English")}
                        >
                          <img
                            src="assets/images/thumbs/flag1.png"
                            alt="English"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          English
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleLanguageChange("UAE")}
                        >
                          <img
                            src="assets/images/thumbs/flag2.png"
                            alt="UAE"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          UAE
                        </Link>
                      </li>
                    </ul>
                  </li> */}
                {/* <li className="on-hover-item border-right-item border-right-item-sm-space has-submenu arrow-white">
                   
                    <Link
                      to="#"
                      className="selected-text text-heading text-sm py-8"
                    >
                      {selectedCurrency}
                    </Link>
                    <ul className="selectable-text-list on-hover-dropdown common-dropdown common-dropdown--sm max-h-200 scroll-sm px-0 py-8">
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleCurrencyChange("USD")}
                        >
                          <img
                            src="assets/images/thumbs/flag1.png"
                            alt="USD"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          USD
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                          onClick={() => handleCurrencyChange("AED")}
                        >
                          <img
                            src="assets/images/thumbs/flag2.png"
                            alt="AED"
                            className="w-16 h-12 rounded-4 border border-gray-100"
                          />
                          AED
                        </Link>
                      </li>
                    </ul>
                  </li> */}
                {/* </ul> */}
                {/* Dropdown Select End */}
              </div>
              <div className="me-8 d-lg-none d-block">
                <div className="header-two-activities flex-align flex-wrap gap-32">
                  <button
                    onClick={handleSearchToggle}
                    type="button"
                    className="flex-align search-icon d-lg-none d-flex gap-4 item-hover-two"
                  >
                    <span className="text-2xl text-white d-flex position-relative item-hover__text">
                      <i className="ph ph-magnifying-glass" />
                    </span>
                  </button>
                  {/* <Link
                    to="/account"
                    className="flex-align flex-column gap-8 item-hover-two"
                  >
                    <span className="text-2xl text-white d-flex position-relative item-hover__text">
                      <i className="ph ph-user" />
                    </span>
                    <span className="text-md text-white item-hover__text d-none d-lg-flex">
                      Profile
                    </span>
                  </Link> */}
                  {/* Login Dropdown */}

                  <Link
                    to="/cart"
                    className="flex-align flex-column gap-8 item-hover-two"
                  >
                    <span className="text-2xl text-white d-flex position-relative me-6 mt-6 item-hover__text">
                      <i className="ph ph-shopping-cart-simple" />
                      <span className="w-16 h-16 flex-center rounded-circle bg-main-two-600 text-white text-xs position-absolute top-n6 end-n4">
                        2
                      </span>
                    </span>
                    <span className="text-md text-white item-hover__text d-none d-lg-flex">
                      Cart
                    </span>
                  </Link>
                </div>
              </div>
              <button
                onClick={handleMenuToggle}
                type="button"
                className="toggle-mobileMenu d-lg-none ms-3n text-gray-800 text-4xl d-flex"
              >
                {" "}
                <i className="ph ph-list" />{" "}
              </button>
            </div>
            {/* Header Right End  */}
          </nav>
        </div>
      </header>
      {/* ==================== Header End Here ==================== */}
    </>
  );
};

export default HeaderTwo;
