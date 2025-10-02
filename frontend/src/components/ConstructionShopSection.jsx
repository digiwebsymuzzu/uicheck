import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { Link } from "react-router-dom";
// import ReactSlider from "react-slider";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

const ShopSection = () => {
  const { addToCart } = useContext(CartContext);
  let [grid, setGrid] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://147.93.108.82:5000/api/categories");
        const data = await res.json();
        if (data.success) {
          setCategories(data.data); // set categories
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);
  //   for managing letter case by frontend
  const formatCategoryName = (name) => {
    return name
      .toLowerCase()
      .split(/[\s-]/) // split by space or hyphen
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "); // join back with space
  };
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const res = await fetch("http://147.93.108.82:5000/api/attributes");
        const data = await res.json();
        if (data.success) {
          setAttributes(data.data);
        }
      } catch (err) {
        console.error("Error fetching attributes:", err);
      }
    };
    fetchAttributes();
  }, [page]);

  let [active, setActive] = useState(false);
  let sidebarController = () => {
    setActive(!active);
  };
  const displayName = (name) => {
    switch (name) {
      case "Shoe Size Required":
        return "Shoe Size"; // shorten it
      default:
        return name; // fallback to original
    }
  };

const fetchProducts = async (pageToLoad = 1) => {
  setLoading(true);
  try {
    const superParentName = "construction";
    const limit = 40; // Load 40 products at a time

    const res = await fetch(
      `http://147.93.108.82:5000/api/products/superparent/${superParentName}?page=${pageToLoad}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (data.success) {
      const formattedProducts = data.products.map((product) => ({
        ...product,
        productCategories: product.categories || [], // consistent mapping
      }));

      // Append new products to existing list
      setProducts((prev) => [...prev, ...formattedProducts]);
      setPages(data.pages); // total pages from API
      setPage(data.page); // current page from API
    } else {
      console.error(data.message || "Failed to fetch products");
    }
  } catch (err) {
    console.error("Error fetching products:", err);
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    fetchProducts(page);
  }, [page]); // ✅ page add kar diya

  
  const [sortOption, setSortOption] = useState("default");
  const [originalProducts, setOriginalProducts] = useState([]);

  const handleSort = (e) => {
    const value = e.target.value;
    setSortOption(value);

    let sortedProducts = [...products];

    if (value === "low") {
      sortedProducts.sort(
        (a, b) =>
          (a.productSalePriceInr || a.productRegularPriceInr) -
          (b.productSalePriceInr || b.productRegularPriceInr)
      );
    } else if (value === "high") {
      sortedProducts.sort(
        (a, b) =>
          (b.productSalePriceInr || b.productRegularPriceInr) -
          (a.productSalePriceInr || a.productRegularPriceInr)
      );
    } else {
      // default case → reset karo
      sortedProducts = [...originalProducts];
    }

    setProducts(sortedProducts);
  };
  // Infinite scroll logic
  const lastProductRef = useCallback(
  (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && page < pages) {
        fetchProducts(page + 1); // load next 40 products
      }
    });

    if (node) observer.current.observe(node);
  },
  [loading, page, pages]
);


  return (
    <section className="shop py-80">
      <div className={`side-overlay ${active && "show"}`}></div>
      <div className="container container-lg">
        <div className="row">
          {/* Sidebar Start */}
          <div className="col-12  col-lg-3">
            {" "}
            {/* col-12 = mobile full width, col-lg-3 = desktop */}
            <div
              className={`shop-sidebar ${
                active ? "d-block" : "d-none d-lg-block"
              }`}
              style={{
                position: "sticky",
                top: "80px",
                maxHeight: "calc(100vh - 100px)",
                overflowY: "auto",
                zIndex: 999,
                backgroundColor: "white",
              }}
            >
              {/* Mobile Close Button */}
              <button
                onClick={sidebarController}
                type="button"
                className="shop-sidebar__close d-lg-none d-flex w-32 h-32 flex-center border border-gray-100 rounded-circle hover-bg-main-600 position-absolute end-0 me-3 mt-3 hover-text-white hover-border-main-600"
              >
                <i className="ph ph-x" />
              </button>

              {/* Sidebar Content */}
              <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                  Product Category
                </h6>
                <ul className="max-h-540 overflow-y-auto scroll-sm">
                  {categories.map((cat) => (
                    <li key={cat.id} className="mb-24">
                      <Link
                        to={`/shop/${cat._id}`}
                        className="text-gray-900 hover-text-main-600"
                      >
                        {formatCategoryName(cat.name)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {attributes.map((attr) => (
                <div
                  key={attr.id}
                  className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32"
                >
                  <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                    Filter by {displayName(attr.name)}
                  </h6>
                  <ul className="max-h-540 overflow-y-auto scroll-sm">
                    {attr.items.map((item, index) => (
                      <li key={item.id || index} className="mb-24">
                        <div className="form-check common-check common-radio">
                          <input
                            className="form-check-input"
                            type="radio"
                            name={attr.slug}
                            id={`${attr.slug}-${index}`}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`${attr.slug}-${index}`}
                          >
                            {item.name}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="shop-sidebar__box rounded-8">
                <img src="assets/images/thumbs/advertise-img1.png" alt="" />
              </div>
            </div>
          </div>
          {/* Sidebar End */}

          {/* Content Start */}
          <div className="col-lg-9">
            {/* Top Start */}
            <div className="flex-between gap-16 flex-wrap mb-40 ">
              <span className="text-gray-900">
                Showing Total {products.length} result
              </span>
              <div className="position-relative flex-align gap-16 flex-wrap">
                <div className="list-grid-btns flex-align gap-16">
                  <button
                    onClick={() => setGrid(true)}
                    type="button"
                    className={`w-44 h-44 flex-center border rounded-6 text-2xl list-btn border-gray-100 ${
                      grid === true && "border-main-600 text-white bg-main-600"
                    }`}
                  >
                    <i className="ph-bold ph-list-dashes" />
                  </button>
                  <button
                    onClick={() => setGrid(false)}
                    type="button"
                    className={`w-44 h-44 flex-center border rounded-6 text-2xl grid-btn border-gray-100 ${
                      grid === false && "border-main-600 text-white bg-main-600"
                    }`}
                  >
                    <i className="ph ph-squares-four" />
                  </button>
                </div>
                <div className="position-relative text-gray-500 flex-align gap-4 text-14">
                  {/* <label
                    htmlFor="sorting"
                    className="text-inherit flex-shrink-0"
                  >
                    Sort by:{" "}
                  </label> */}
                  <select
                    value={sortOption}
                    onChange={handleSort}
                    className="form-control common-input px-14 py-14 text-inherit rounded-6 w-auto"
                    id="sorting"
                  >
                    {/* <option value="default">Sort By Price</option> */}
                    <option value="low">Low to High</option>
                    <option value="high">High to Low</option>
                  </select>
                </div>
                <button
                  onClick={sidebarController}
                  type="button"
                  className="w-44 h-44 d-lg-none d-flex flex-center border border-gray-100 rounded-6 text-2xl sidebar-btn"
                >
                  <i className="ph-bold ph-funnel" />
                </button>
              </div>
            </div>
            {/* Top End */}
            <div className={`list-grid-wrapper ${grid && "list-view"}`}>
              {products.map((product) => (
                <div
                  key={product.id}
                  className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2"
                >
                  <Link
                    to={`/product-details/${product.productSlug}`}
                    state={{ id: product._id }}
                    className="product-card__thumb flex-center rounded-8 position-relative"
                  >
                    <img
                      src={
                        product.productMainImage ||
                        "assets/images/thumbs/productu.png" // fallback
                      }
                      alt={product.productName}
                      className="w-auto max-w-unset product-img"
                    />
                    {/* <span className="product-card__badge bg-primary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                      New 
                    </span> */}
                    {new Date(product.createdAt) >
                      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                      <span className="product-card__badge bg-primary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                        New
                      </span>
                    )}
                  </Link>

                  <div
                    style={{ marginTop: "8px" }}
                    className="product-card__content mt-16"
                  >
                    <h6 className="title text-lg fw-semibold mt-12 mb-8">
                      <Link
                        to={`/product-details/${product.productSlug}`}
                        state={{ id: product._id }}
                        className="link text-line-2"
                        tabIndex={0}
                      >
                        {product.productName}
                      </Link>
                    </h6>

                    {/* <div className="flex-align mb-20 mt-16 gap-6"> */}
                    {/* <span className="text-xs fw-medium text-gray-500">
                        {product.rating || 4.5}
                      </span> */}
                    {/* <span className="text-15 fw-medium text-warning-600 d-flex">
                        <i className="ph-fill ph-star" />
                      </span> */}
                    {/* <span className="text-xs fw-medium text-gray-500">
                        (17k)
                      </span> */}
                    {/* </div> */}

                    {/* <div className="mt-8">
                      <div
                        className="progress w-100 bg-color-three rounded-pill h-4"
                        role="progressbar"
                        aria-label="Basic example"
                        aria-valuenow={35}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className="progress-bar bg-main-two-600 rounded-pill"
                          style={{ width: "35%" }}
                        />
                      </div>
                      <span className="text-gray-900 text-xs fw-medium mt-8">
                        Sold: {product.stockStatus || 0} 
                      </span>
                    </div> */}
                    {/* ✅ Stock Status */}
                    <div className="mt-8">
                      <div
                        className="progress w-100 bg-color-three rounded-pill h-4"
                        role="progressbar"
                        aria-label="Stock"
                        aria-valuenow={product.productStock}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className={`progress-bar rounded-pill ${
                            product.productStock > 0
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                          style={{
                            width: `${Math.min(product.productStock, 100)}%`,
                          }}
                        />
                      </div>

                      <span
                        className={`text-xs fw-medium mt-8 d-block ${
                          product.productStock > 0
                            ? "text-success"
                            : "text-danger"
                        }`}
                      >
                        {product.productStock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>

                    <div className="product-card__price my-20">
                      <span
                        className="text-gray-400 text-md fw-semibold text-decoration-line-through"
                        style={{ marginRight: "10px" }}
                      >
                        AED {product.productRegularPriceInr} {/* ✅ fallback */}
                      </span>
                      <span className="text-heading text-md fw-semibold ml-2">
                        AED {product.productSalePriceInr}{" "}
                        {/* <span className="text-gray-500 fw-normal">/Qty</span> */}
                      </span>
                    </div>
                    <div className="custom-flex-wrapper">
                      <button
                        onClick={() => {
                          if (!product?._id) {
                            toast.error("Product not available");
                            return;
                          }

                          // Shop page: attributes nahi, bas sale price bhejna
                          addToCart(
                            product,
                            1,
                            product?.productSalePriceInr
                              ? {
                                  attributeName: null,
                                  attributeValue: null,
                                  attributeId: null,
                                  attributeSalePriceInr:
                                    product.productSalePriceInr,
                                  attributeRegularPriceInr:
                                    product.productRegularPriceInr,
                                  attributeSalePriceUsd:
                                    product.productSalePriceUsd,
                                  attributeRegularPriceUsd:
                                    product.productRegularPriceUsd,
                                }
                              : null
                          );
                        }}
                        className="product-card__cart btn bg-dark text-light hover-bg-main-600 hover-text-white py-11 rounded-8 flex-center gap-8 fw-medium"
                      >
                        Add To Cart <i className="ph ph-shopping-cart" />
                      </button>
                      <Link
                        to="#"
                        onClick={() => {
                          const productUrl = `${window.location.origin}/product/${product.slug}`;
                          const message = `Check out this product:\n\n*${product.productName}*\n${productUrl}\n\nImage: ${product.productMainImage}`;

                          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
                            message
                          )}`;
                          window.open(whatsappUrl, "_blank");
                        }}
                        className="product-card__cart btn bg-success-btn text-light hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                      >
                        <i className="ph ph-whatsapp-logo"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {/* <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                <Link
                  to="/product-details"
                  className="product-card__thumb flex-center rounded-8  position-relative"
                >
                  <img
                    src="assets/images/thumbs/productu.png"
                    alt=""
                    className="w-auto max-w-unset"
                  />
                  <span className="product-card__badge bg-primary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                    Best Salesdsd{" "}
                  </span>
                </Link>
                <div className="product-card__content mt-16">
                  <h6 className="title text-lg fw-semibold mt-12 mb-8">
                    <Link
                      to="/product-details"
                      className="link text-line-2"
                      tabIndex={0}
                    >
                      Taylor Farms Broccoli Florets Vegetables
                    </Link>
                  </h6>
                  <div className="flex-align mb-20 mt-16 gap-6">
                    <span className="text-xs fw-medium text-gray-500">4.8</span>
                    <span className="text-15 fw-medium text-warning-600 d-flex">
                      <i className="ph-fill ph-star" />
                    </span>
                    <span className="text-xs fw-medium text-gray-500">
                      (17k)
                    </span>
                  </div>
                  <div className="mt-8">
                    <div
                      className="progress w-100 bg-color-three rounded-pill h-4"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={35}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="progress-bar bg-main-two-600 rounded-pill"
                        style={{ width: "35%" }}
                      />
                    </div>
                    <span className="text-gray-900 text-xs fw-medium mt-8">
                      Sold: 18/35
                    </span>
                  </div>
                  <div className="product-card__price my-20">
                    <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                      $28.99
                    </span>
                    <span className="text-heading text-md fw-semibold ">
                      $14.99{" "}
                      <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                    </span>
                  </div>
                  <Link
                    to="/cart"
                    className="product-card__cart btn bg-dark text-light hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                    tabIndex={0}
                  >
                    Add To Cart <i className="ph ph-shopping-cart" />
                  </Link>
                </div>
              </div> */}
              {/* <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                <Link
                  to="/product-details"
                  className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                >
                  <img
                    src="assets/images/thumbs/productu.png"
                    alt=""
                    className="w-auto max-w-unset"
                  />
                </Link>
                <div className="product-card__content mt-16">
                  <h6 className="title text-lg fw-semibold mt-12 mb-8">
                    <Link
                      to="/product-details"
                      className="link text-line-2"
                      tabIndex={0}
                    >
                      Taylor Farms Broccoli Florets Vegetables
                    </Link>
                  </h6>
                  <div className="flex-align mb-20 mt-16 gap-6">
                    <span className="text-xs fw-medium text-gray-500">4.8</span>
                    <span className="text-15 fw-medium text-warning-600 d-flex">
                      <i className="ph-fill ph-star" />
                    </span>
                    <span className="text-xs fw-medium text-gray-500">
                      (17k)
                    </span>
                  </div>
                  <div className="mt-8">
                    <div
                      className="progress w-100 bg-color-three rounded-pill h-4"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={35}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="progress-bar bg-main-two-600 rounded-pill"
                        style={{ width: "35%" }}
                      />
                    </div>
                    <span className="text-gray-900 text-xs fw-medium mt-8">
                      Sold: 18/35
                    </span>
                  </div>
                  <div className="product-card__price my-20">
                    <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                      $28.99
                    </span>
                    <span className="text-heading text-md fw-semibold ">
                      $14.99{" "}
                      <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                    </span>
                  </div>
                  <Link
                    to="/cart"
                    className="product-card__cart btn bg-dark text-light hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                    tabIndex={0}
                  >
                    Add To Cart <i className="ph ph-shopping-cart" />
                  </Link>
                </div>
              </div> */}
              {/* <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                <Link
                  to="/product-details"
                  className="product-card__thumb flex-center rounded-8  position-relative"
                >
                  <img
                    src="assets/images/thumbs/productu.png"
                    alt=""
                    className="w-auto max-w-unset"
                  />
                  <span className="product-card__badge bg-primary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                    Best Sale{" "}
                  </span>
                </Link>
                <div className="product-card__content mt-16">
                  <h6 className="title text-lg fw-semibold mt-12 mb-8">
                    <Link
                      to="/product-details"
                      className="link text-line-2"
                      tabIndex={0}
                    >
                      Taylor Farms Broccoli Florets Vegetables
                    </Link>
                  </h6>
                  <div className="flex-align mb-20 mt-16 gap-6">
                    <span className="text-xs fw-medium text-gray-500">4.8</span>
                    <span className="text-15 fw-medium text-warning-600 d-flex">
                      <i className="ph-fill ph-star" />
                    </span>
                    <span className="text-xs fw-medium text-gray-500">
                      (17k)
                    </span>
                  </div>
                  <div className="mt-8">
                    <div
                      className="progress w-100 bg-color-three rounded-pill h-4"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={35}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="progress-bar bg-main-two-600 rounded-pill"
                        style={{ width: "35%" }}
                      />
                    </div>
                    <span className="text-gray-900 text-xs fw-medium mt-8">
                      Sold: 18/35
                    </span>
                  </div>
                  <div className="product-card__price my-20">
                    <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                      $28.99
                    </span>
                    <span className="text-heading text-md fw-semibold ">
                      $14.99{" "}
                      <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                    </span>
                  </div>
                  <Link
                    to="/cart"
                    className="product-card__cart btn bg-dark text-light hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                    tabIndex={0}
                  >
                    Add To Cart <i className="ph ph-shopping-cart" />
                  </Link>
                </div>
              </div> */}
              {/* <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                <Link
                  to="/product-details"
                  className="product-card__thumb flex-center rounded-8  position-relative"
                >
                  <img
                    src="assets/images/thumbs/productu.png"
                    alt=""
                    className="w-auto max-w-unset"
                  />
                  <span className="product-card__badge bg-primary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                    Best Sale{" "}
                  </span>
                </Link>
                <div className="product-card__content mt-16">
                  <h6 className="title text-lg fw-semibold mt-12 mb-8">
                    <Link
                      to="/product-details"
                      className="link text-line-2"
                      tabIndex={0}
                    >
                      Taylor Farms Broccoli Florets Vegetables
                    </Link>
                  </h6>
                  <div className="flex-align mb-20 mt-16 gap-6">
                    <span className="text-xs fw-medium text-gray-500">4.8</span>
                    <span className="text-15 fw-medium text-warning-600 d-flex">
                      <i className="ph-fill ph-star" />
                    </span>
                    <span className="text-xs fw-medium text-gray-500">
                      (17k)
                    </span>
                  </div>
                  <div className="mt-8">
                    <div
                      className="progress w-100 bg-color-three rounded-pill h-4"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={35}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="progress-bar bg-main-two-600 rounded-pill"
                        style={{ width: "35%" }}
                      />
                    </div>
                    <span className="text-gray-900 text-xs fw-medium mt-8">
                      Sold: 18/35
                    </span>
                  </div>
                  <div className="product-card__price my-20">
                    <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                      $28.99
                    </span>
                    <span className="text-heading text-md fw-semibold ">
                      $14.99{" "}
                      <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                    </span>
                  </div>
                  <Link
                    to="/cart"
                    className="product-card__cart btn bg-dark text-light hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                    tabIndex={0}
                  >
                    Add To Cart <i className="ph ph-shopping-cart" />
                  </Link>
                </div>
              </div> */}
              {/* <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                <Link
                  to="/product-details"
                  className="product-card__thumb flex-center rounded-8  position-relative"
                >
                  <img
                    src="assets/images/thumbs/productu.png"
                    alt=""
                    className="w-auto max-w-unset"
                  />
                  <span className="product-card__badge bg-primary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                    Best Sale{" "}
                  </span>
                </Link>
                <div className="product-card__content mt-16">
                  <h6 className="title text-lg fw-semibold mt-12 mb-8">
                    <Link
                      to="/product-details"
                      className="link text-line-2"
                      tabIndex={0}
                    >
                      Taylor Farms Broccoli Florets Vegetables
                    </Link>
                  </h6>
                  <div className="flex-align mb-20 mt-16 gap-6">
                    <span className="text-xs fw-medium text-gray-500">4.8</span>
                    <span className="text-15 fw-medium text-warning-600 d-flex">
                      <i className="ph-fill ph-star" />
                    </span>
                    <span className="text-xs fw-medium text-gray-500">
                      (17k)
                    </span>
                  </div>
                  <div className="mt-8">
                    <div
                      className="progress w-100 bg-color-three rounded-pill h-4"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={35}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="progress-bar bg-main-two-600 rounded-pill"
                        style={{ width: "35%" }}
                      />
                    </div>
                    <span className="text-gray-900 text-xs fw-medium mt-8">
                      Sold: 18/35
                    </span>
                  </div>
                  <div className="product-card__price my-20">
                    <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                      $28.99
                    </span>
                    <span className="text-heading text-md fw-semibold ">
                      $14.99{" "}
                      <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                    </span>
                  </div>
                  <Link
                    to="/cart"
                    className="product-card__cart btn bg-dark text-light hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                    tabIndex={0}
                  >
                    Add To Cart <i className="ph ph-shopping-cart" />
                  </Link>
                </div>
              </div> */}
              {/* <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                <Link
                  to="/product-details"
                  className="product-card__thumb flex-center rounded-8  position-relative"
                >
                  <img
                    src="assets/images/thumbs/productu.png"
                    alt=""
                    className="w-auto max-w-unset"
                  />
                  <span className="product-card__badge bg-primary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                    Best Sale{" "}
                  </span>
                </Link>
                <div className="product-card__content mt-16">
                  <h6 className="title text-lg fw-semibold mt-12 mb-8">
                    <Link
                      to="/product-details"
                      className="link text-line-2"
                      tabIndex={0}
                    >
                      Taylor Farms Broccoli Florets Vegetables
                    </Link>
                  </h6>
                  <div className="flex-align mb-20 mt-16 gap-6">
                    <span className="text-xs fw-medium text-gray-500">4.8</span>
                    <span className="text-15 fw-medium text-warning-600 d-flex">
                      <i className="ph-fill ph-star" />
                    </span>
                    <span className="text-xs fw-medium text-gray-500">
                      (17k)
                    </span>
                  </div>
                  <div className="mt-8">
                    <div
                      className="progress w-100 bg-color-three rounded-pill h-4"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={35}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="progress-bar bg-main-two-600 rounded-pill"
                        style={{ width: "35%" }}
                      />
                    </div>
                    <span className="text-gray-900 text-xs fw-medium mt-8">
                      Sold: 18/35
                    </span>
                  </div>
                  <div className="product-card__price my-20">
                    <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                      $28.99
                    </span>
                    <span className="text-heading text-md fw-semibold ">
                      $14.99{" "}
                      <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                    </span>
                  </div>
                  <Link
                    to="/cart"
                    className="product-card__cart btn bg-dark text-light hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                    tabIndex={0}
                  >
                    Add To Cart <i className="ph ph-shopping-cart" />
                  </Link>
                </div>
              </div> */}
              {/* <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                <Link
                  to="/product-details"
                  className="product-card__thumb flex-center rounded-8  position-relative"
                >
                  <img
                    src="assets/images/thumbs/productu.png"
                    alt=""
                    className="w-auto max-w-unset"
                  />
                  <span className="product-card__badge bg-primary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                    Best Sale{" "}
                  </span>
                </Link>
                <div className="product-card__content mt-16">
                  <h6 className="title text-lg fw-semibold mt-12 mb-8">
                    <Link
                      to="/product-details"
                      className="link text-line-2"
                      tabIndex={0}
                    >
                      Taylor Farms Broccoli Florets Vegetables
                    </Link>
                  </h6>
                  <div className="flex-align mb-20 mt-16 gap-6">
                    <span className="text-xs fw-medium text-gray-500">4.8</span>
                    <span className="text-15 fw-medium text-warning-600 d-flex">
                      <i className="ph-fill ph-star" />
                    </span>
                    <span className="text-xs fw-medium text-gray-500">
                      (17k)
                    </span>
                  </div>
                  <div className="mt-8">
                    <div
                      className="progress w-100 bg-color-three rounded-pill h-4"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={35}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="progress-bar bg-main-two-600 rounded-pill"
                        style={{ width: "35%" }}
                      />
                    </div>
                    <span className="text-gray-900 text-xs fw-medium mt-8">
                      Sold: 18/35
                    </span>
                  </div>
                  <div className="product-card__price my-20">
                    <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                      $28.99
                    </span>
                    <span className="text-heading text-md fw-semibold ">
                      $14.99{" "}
                      <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                    </span>
                  </div>
                  <Link
                    to="/cart"
                    className="product-card__cart btn bg-dark text-light hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                    tabIndex={0}
                  >
                    Add To Cart <i className="ph ph-shopping-cart" />
                  </Link>
                </div>
              </div> */}
              {/* <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                <Link
                  to="/product-details"
                  className="product-card__thumb flex-center rounded-8  position-relative"
                >
                  <img
                    src="assets/images/thumbs/productu.png"
                    alt=""
                    className="w-auto max-w-unset"
                  />
                  <span className="product-card__badge bg-primary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                    Best Sale{" "}
                  </span>
                </Link>
                <div className="product-card__content mt-16">
                  <h6 className="title text-lg fw-semibold mt-12 mb-8">
                    <Link
                      to="/product-details"
                      className="link text-line-2"
                      tabIndex={0}
                    >
                      Taylor Farms Broccoli Florets Vegetables
                    </Link>
                  </h6>
                  <div className="flex-align mb-20 mt-16 gap-6">
                    <span className="text-xs fw-medium text-gray-500">4.8</span>
                    <span className="text-15 fw-medium text-warning-600 d-flex">
                      <i className="ph-fill ph-star" />
                    </span>
                    <span className="text-xs fw-medium text-gray-500">
                      (17k)
                    </span>
                  </div>
                  <div className="mt-8">
                    <div
                      className="progress w-100 bg-color-three rounded-pill h-4"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={35}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="progress-bar bg-main-two-600 rounded-pill"
                        style={{ width: "35%" }}
                      />
                    </div>
                    <span className="text-gray-900 text-xs fw-medium mt-8">
                      Sold: 18/35
                    </span>
                  </div>
                  <div className="product-card__price my-20">
                    <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                      $28.99
                    </span>
                    <span className="text-heading text-md fw-semibold ">
                      $14.99{" "}
                      <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                    </span>
                  </div>
                  <Link
                    to="/cart"
                    className="product-card__cart btn bg-dark text-light hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                    tabIndex={0}
                  >
                    Add To Cart <i className="ph ph-shopping-cart" />
                  </Link>
                </div>
              </div> */}
              {/* <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                <Link
                  to="/product-details"
                  className="product-card__thumb flex-center rounded-8  position-relative"
                >
                  <img
                    src="assets/images/thumbs/productu.png"
                    alt=""
                    className="w-auto max-w-unset"
                  />
                  <span className="product-card__badge bg-primary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                    Best Sale{" "}
                  </span>
                </Link>
                <div className="product-card__content mt-16">
                  <h6 className="title text-lg fw-semibold mt-12 mb-8">
                    <Link
                      to="/product-details"
                      className="link text-line-2"
                      tabIndex={0}
                    >
                      Taylor Farms Broccoli Florets Vegetables
                    </Link>
                  </h6>
                  <div className="flex-align mb-20 mt-16 gap-6">
                    <span className="text-xs fw-medium text-gray-500">4.8</span>
                    <span className="text-15 fw-medium text-warning-600 d-flex">
                      <i className="ph-fill ph-star" />
                    </span>
                    <span className="text-xs fw-medium text-gray-500">
                      (17k)
                    </span>
                  </div>
                  <div className="mt-8">
                    <div
                      className="progress w-100 bg-color-three rounded-pill h-4"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={35}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="progress-bar bg-main-two-600 rounded-pill"
                        style={{ width: "35%" }}
                      />
                    </div>
                    <span className="text-gray-900 text-xs fw-medium mt-8">
                      Sold: 18/35
                    </span>
                  </div>
                  <div className="product-card__price my-20">
                    <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                      $28.99
                    </span>
                    <span className="text-heading text-md fw-semibold ">
                      $14.99{" "}
                      <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                    </span>
                  </div>
                  <Link
                    to="/cart"
                    className="product-card__cart btn bg-dark text-light hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                    tabIndex={0}
                  >
                    Add To Cart <i className="ph ph-shopping-cart" />
                  </Link>
                </div>
              </div> */}
              {/* <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                <Link
                  to="/product-details"
                  className="product-card__thumb flex-center rounded-8  position-relative"
                >
                  <img
                    src="assets/images/thumbs/productu.png"
                    alt=""
                    className="w-auto max-w-unset"
                  />
                  <span className="product-card__badge bg-primary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                    Best Sale{" "}
                  </span>
                </Link>
                <div className="product-card__content mt-16">
                  <h6 className="title text-lg fw-semibold mt-12 mb-8">
                    <Link
                      to="/product-details"
                      className="link text-line-2"
                      tabIndex={0}
                    >
                      Taylor Farms Broccoli Florets Vegetables
                    </Link>
                  </h6>
                  <div className="flex-align mb-20 mt-16 gap-6">
                    <span className="text-xs fw-medium text-gray-500">4.8</span>
                    <span className="text-15 fw-medium text-warning-600 d-flex">
                      <i className="ph-fill ph-star" />
                    </span>
                    <span className="text-xs fw-medium text-gray-500">
                      (17k)
                    </span>
                  </div>
                  <div className="mt-8">
                    <div
                      className="progress w-100 bg-color-three rounded-pill h-4"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={35}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="progress-bar bg-main-two-600 rounded-pill"
                        style={{ width: "35%" }}
                      />
                    </div>
                    <span className="text-gray-900 text-xs fw-medium mt-8">
                      Sold: 18/35
                    </span>
                  </div>
                  <div className="product-card__price my-20">
                    <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                      $28.99
                    </span>
                    <span className="text-heading text-md fw-semibold ">
                      $14.99{" "}
                      <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                    </span>
                  </div>
                  <Link
                    to="/cart"
                    className="product-card__cart btn bg-dark text-light hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                    tabIndex={0}
                  >
                    Add To Cart <i className="ph ph-shopping-cart" />
                  </Link>
                </div>
              </div> */}
              {/* <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                <Link
                  to="/product-details"
                  className="product-card__thumb flex-center rounded-8  position-relative"
                >
                  <img
                    src="assets/images/thumbs/productu.png"
                    alt=""
                    className="w-auto max-w-unset"
                  />
                  <span className="product-card__badge bg-primary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                    Best Sale{" "}
                  </span>
                </Link>
                <div className="product-card__content mt-16">
                  <h6 className="title text-lg fw-semibold mt-12 mb-8">
                    <Link
                      to="/product-details"
                      className="link text-line-2"
                      tabIndex={0}
                    >
                      Taylor Farms Broccoli Florets Vegetables
                    </Link>
                  </h6>
                  <div className="flex-align mb-20 mt-16 gap-6">
                    <span className="text-xs fw-medium text-gray-500">4.8</span>
                    <span className="text-15 fw-medium text-warning-600 d-flex">
                      <i className="ph-fill ph-star" />
                    </span>
                    <span className="text-xs fw-medium text-gray-500">
                      (17k)
                    </span>
                  </div>
                  <div className="mt-8">
                    <div
                      className="progress w-100 bg-color-three rounded-pill h-4"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={35}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="progress-bar bg-main-two-600 rounded-pill"
                        style={{ width: "35%" }}
                      />
                    </div>
                    <span className="text-gray-900 text-xs fw-medium mt-8">
                      Sold: 18/35
                    </span>
                  </div>
                  <div className="product-card__price my-20">
                    <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                      $28.99
                    </span>
                    <span className="text-heading text-md fw-semibold ">
                      $14.99{" "}
                      <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                    </span>
                  </div>
                  <Link
                    to="/cart"
                    className="product-card__cart btn bg-dark text-light hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                    tabIndex={0}
                  >
                    Add To Cart <i className="ph ph-shopping-cart" />
                  </Link>
                </div>
              </div> */}
              {/* <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                <Link
                  to="/product-details"
                  className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                >
                  <img
                    src="assets/images/thumbs/product-two-img13.png"
                    alt=""
                    className="w-auto max-w-unset"
                  />
                </Link>
                <div className="product-card__content mt-16">
                  <h6 className="title text-lg fw-semibold mt-12 mb-8">
                    <Link
                      to="/product-details"
                      className="link text-line-2"
                      tabIndex={0}
                    >
                      Taylor Farms Broccoli Florets Vegetables
                    </Link>
                  </h6>
                  <div className="flex-align mb-20 mt-16 gap-6">
                    <span className="text-xs fw-medium text-gray-500">4.8</span>
                    <span className="text-15 fw-medium text-warning-600 d-flex">
                      <i className="ph-fill ph-star" />
                    </span>
                    <span className="text-xs fw-medium text-gray-500">
                      (17k)
                    </span>
                  </div>
                  <div className="mt-8">
                    <div
                      className="progress w-100 bg-color-three rounded-pill h-4"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={35}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="progress-bar bg-main-two-600 rounded-pill"
                        style={{ width: "35%" }}
                      />
                    </div>
                    <span className="text-gray-900 text-xs fw-medium mt-8">
                      Sold: 18/35
                    </span>
                  </div>
                  <div className="product-card__price my-20">
                    <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                      $28.99
                    </span>
                    <span className="text-heading text-md fw-semibold ">
                      $14.99{" "}
                      <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                    </span>
                  </div>
                  <Link
                    to="/cart"
                    className="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                    tabIndex={0}
                  >
                    Add To Cart <i className="ph ph-shopping-cart" />
                  </Link>
                </div>
              </div> */}
              {/* <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                <Link
                  to="/product-details"
                  className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                >
                  <img
                    src="assets/images/thumbs/product-two-img14.png"
                    alt=""
                    className="w-auto max-w-unset"
                  />
                </Link>
                <div className="product-card__content mt-16">
                  <h6 className="title text-lg fw-semibold mt-12 mb-8">
                    <Link
                      to="/product-details"
                      className="link text-line-2"
                      tabIndex={0}
                    >
                      Taylor Farms Broccoli Florets Vegetables
                    </Link>
                  </h6>
                  <div className="flex-align mb-20 mt-16 gap-6">
                    <span className="text-xs fw-medium text-gray-500">4.8</span>
                    <span className="text-15 fw-medium text-warning-600 d-flex">
                      <i className="ph-fill ph-star" />
                    </span>
                    <span className="text-xs fw-medium text-gray-500">
                      (17k)
                    </span>
                  </div>
                  <div className="mt-8">
                    <div
                      className="progress w-100 bg-color-three rounded-pill h-4"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={35}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="progress-bar bg-main-two-600 rounded-pill"
                        style={{ width: "35%" }}
                      />
                    </div>
                    <span className="text-gray-900 text-xs fw-medium mt-8">
                      Sold: 18/35
                    </span>
                  </div>
                  <div className="product-card__price my-20">
                    <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                      $28.99
                    </span>
                    <span className="text-heading text-md fw-semibold ">
                      $14.99{" "}
                      <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                    </span>
                  </div>
                  <Link
                    to="/cart"
                    className="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                    tabIndex={0}
                  >
                    Add To Cart <i className="ph ph-shopping-cart" />
                  </Link>
                </div>
              </div>
              <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                <Link
                  to="/product-details"
                  className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                >
                  <span className="product-card__badge bg-primary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                    Best Sale{" "}
                  </span>
                  <img
                    src="assets/images/thumbs/product-two-img15.png"
                    alt=""
                    className="w-auto max-w-unset"
                  />
                </Link>
                <div className="product-card__content mt-16">
                  <h6 className="title text-lg fw-semibold mt-12 mb-8">
                    <Link
                      to="/product-details"
                      className="link text-line-2"
                      tabIndex={0}
                    >
                      Taylor Farms Broccoli Florets Vegetables
                    </Link>
                  </h6>
                  <div className="flex-align mb-20 mt-16 gap-6">
                    <span className="text-xs fw-medium text-gray-500">4.8</span>
                    <span className="text-15 fw-medium text-warning-600 d-flex">
                      <i className="ph-fill ph-star" />
                    </span>
                    <span className="text-xs fw-medium text-gray-500">
                      (17k)
                    </span>
                  </div>
                  <div className="mt-8">
                    <div
                      className="progress w-100 bg-color-three rounded-pill h-4"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={35}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="progress-bar bg-main-two-600 rounded-pill"
                        style={{ width: "35%" }}
                      />
                    </div>
                    <span className="text-gray-900 text-xs fw-medium mt-8">
                      Sold: 18/35
                    </span>
                  </div>
                  <div className="product-card__price my-20">
                    <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                      $28.99
                    </span>
                    <span className="text-heading text-md fw-semibold ">
                      $14.99{" "}
                      <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                    </span>
                  </div>
                  <Link
                    to="/cart"
                    className="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                    tabIndex={0}
                  >
                    Add To Cart <i className="ph ph-shopping-cart" />
                  </Link>
                </div>
              </div>
              <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                <Link
                  to="/product-details"
                  className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                >
                  <span className="product-card__badge bg-warning-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                    New
                  </span>
                  <img
                    src="assets/images/thumbs/product-two-img15.png"
                    alt=""
                    className="w-auto max-w-unset"
                  />
                </Link>
                <div className="product-card__content mt-16">
                  <h6 className="title text-lg fw-semibold mt-12 mb-8">
                    <Link
                      to="/product-details"
                      className="link text-line-2"
                      tabIndex={0}
                    >
                      Taylor Farms Broccoli Florets Vegetables
                    </Link>
                  </h6>
                  <div className="flex-align mb-20 mt-16 gap-6">
                    <span className="text-xs fw-medium text-gray-500">4.8</span>
                    <span className="text-15 fw-medium text-warning-600 d-flex">
                      <i className="ph-fill ph-star" />
                    </span>
                    <span className="text-xs fw-medium text-gray-500">
                      (17k)
                    </span>
                  </div>
                  <div className="mt-8">
                    <div
                      className="progress w-100 bg-color-three rounded-pill h-4"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={35}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="progress-bar bg-main-two-600 rounded-pill"
                        style={{ width: "35%" }}
                      />
                    </div>
                    <span className="text-gray-900 text-xs fw-medium mt-8">
                      Sold: 18/35
                    </span>
                  </div>
                  <div className="product-card__price my-20">
                    <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                      $28.99
                    </span>
                    <span className="text-heading text-md fw-semibold ">
                      $14.99{" "}
                      <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                    </span>
                  </div>
                  <Link
                    to="/cart"
                    className="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                    tabIndex={0}
                  >
                    Add To Cart <i className="ph ph-shopping-cart" />
                  </Link>
                </div>
              </div>
              <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                <Link
                  to="/product-details"
                  className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                >
                  <img
                    src="assets/images/thumbs/product-two-img1.png"
                    alt=""
                    className="w-auto max-w-unset"
                  />
                  <span className="product-card__badge bg-primary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                    Best Sale{" "}
                  </span>
                </Link>
                <div className="product-card__content mt-16">
                  <h6 className="title text-lg fw-semibold mt-12 mb-8">
                    <Link
                      to="/product-details"
                      className="link text-line-2"
                      tabIndex={0}
                    >
                      Taylor Farms Broccoli Florets Vegetables
                    </Link>
                  </h6>
                  <div className="flex-align mb-20 mt-16 gap-6">
                    <span className="text-xs fw-medium text-gray-500">4.8</span>
                    <span className="text-15 fw-medium text-warning-600 d-flex">
                      <i className="ph-fill ph-star" />
                    </span>
                    <span className="text-xs fw-medium text-gray-500">
                      (17k)
                    </span>
                  </div>
                  <div className="mt-8">
                    <div
                      className="progress w-100 bg-color-three rounded-pill h-4"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={35}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="progress-bar bg-main-two-600 rounded-pill"
                        style={{ width: "35%" }}
                      />
                    </div>
                    <span className="text-gray-900 text-xs fw-medium mt-8">
                      Sold: 18/35
                    </span>
                  </div>
                  <div className="product-card__price my-20">
                    <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                      $28.99
                    </span>
                    <span className="text-heading text-md fw-semibold ">
                      $14.99{" "}
                      <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                    </span>
                  </div>
                  <Link
                    to="/cart"
                    className="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                    tabIndex={0}
                  >
                    Add To Cart <i className="ph ph-shopping-cart" />
                  </Link>
                </div>
              </div>
              <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                <Link
                  to="/product-details"
                  className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                >
                  <img
                    src="assets/images/thumbs/product-two-img2.png"
                    alt=""
                    className="w-auto max-w-unset"
                  />
                </Link>
                <div className="product-card__content mt-16">
                  <h6 className="title text-lg fw-semibold mt-12 mb-8">
                    <Link
                      to="/product-details"
                      className="link text-line-2"
                      tabIndex={0}
                    >
                      Taylor Farms Broccoli Florets Vegetables
                    </Link>
                  </h6>
                  <div className="flex-align mb-20 mt-16 gap-6">
                    <span className="text-xs fw-medium text-gray-500">4.8</span>
                    <span className="text-15 fw-medium text-warning-600 d-flex">
                      <i className="ph-fill ph-star" />
                    </span>
                    <span className="text-xs fw-medium text-gray-500">
                      (17k)
                    </span>
                  </div>
                  <div className="mt-8">
                    <div
                      className="progress w-100 bg-color-three rounded-pill h-4"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={35}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="progress-bar bg-main-two-600 rounded-pill"
                        style={{ width: "35%" }}
                      />
                    </div>
                    <span className="text-gray-900 text-xs fw-medium mt-8">
                      Sold: 18/35
                    </span>
                  </div>
                  <div className="product-card__price my-20">
                    <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                      $28.99
                    </span>
                    <span className="text-heading text-md fw-semibold ">
                      $14.99{" "}
                      <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                    </span>
                  </div>
                  <Link
                    to="/cart"
                    className="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                    tabIndex={0}
                  >
                    Add To Cart <i className="ph ph-shopping-cart" />
                  </Link>
                </div>
              </div>
              <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                <Link
                  to="/product-details"
                  className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                >
                  <img
                    src="assets/images/thumbs/product-two-img3.png"
                    alt=""
                    className="w-auto max-w-unset"
                  />
                </Link>
                <div className="product-card__content mt-16">
                  <h6 className="title text-lg fw-semibold mt-12 mb-8">
                    <Link
                      to="/product-details"
                      className="link text-line-2"
                      tabIndex={0}
                    >
                      Taylor Farms Broccoli Florets Vegetables
                    </Link>
                  </h6>
                  <div className="flex-align mb-20 mt-16 gap-6">
                    <span className="text-xs fw-medium text-gray-500">4.8</span>
                    <span className="text-15 fw-medium text-warning-600 d-flex">
                      <i className="ph-fill ph-star" />
                    </span>
                    <span className="text-xs fw-medium text-gray-500">
                      (17k)
                    </span>
                  </div>
                  <div className="mt-8">
                    <div
                      className="progress w-100 bg-color-three rounded-pill h-4"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={35}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="progress-bar bg-main-two-600 rounded-pill"
                        style={{ width: "35%" }}
                      />
                    </div>
                    <span className="text-gray-900 text-xs fw-medium mt-8">
                      Sold: 18/35
                    </span>
                  </div>
                  <div className="product-card__price my-20">
                    <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                      $28.99
                    </span>
                    <span className="text-heading text-md fw-semibold ">
                      $14.99{" "}
                      <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                    </span>
                  </div>
                  <Link
                    to="/cart"
                    className="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                    tabIndex={0}
                  >
                    Add To Cart <i className="ph ph-shopping-cart" />
                  </Link>
                </div>
              </div>
              <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                <Link
                  to="/product-details"
                  className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                >
                  <span className="product-card__badge bg-danger-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                    Sale 50%{" "}
                  </span>
                  <img
                    src="assets/images/thumbs/product-two-img4.png"
                    alt=""
                    className="w-auto max-w-unset"
                  />
                </Link>
                <div className="product-card__content mt-16">
                  <h6 className="title text-lg fw-semibold mt-12 mb-8">
                    <Link
                      to="/product-details"
                      className="link text-line-2"
                      tabIndex={0}
                    >
                      Taylor Farms Broccoli Florets Vegetables
                    </Link>
                  </h6>
                  <div className="flex-align mb-20 mt-16 gap-6">
                    <span className="text-xs fw-medium text-gray-500">4.8</span>
                    <span className="text-15 fw-medium text-warning-600 d-flex">
                      <i className="ph-fill ph-star" />
                    </span>
                    <span className="text-xs fw-medium text-gray-500">
                      (17k)
                    </span>
                  </div>
                  <div className="mt-8">
                    <div
                      className="progress w-100 bg-color-three rounded-pill h-4"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={35}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="progress-bar bg-main-two-600 rounded-pill"
                        style={{ width: "35%" }}
                      />
                    </div>
                    <span className="text-gray-900 text-xs fw-medium mt-8">
                      Sold: 18/35
                    </span>
                  </div>
                  <div className="product-card__price my-20">
                    <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                      $28.99
                    </span>
                    <span className="text-heading text-md fw-semibold ">
                      $14.99{" "}
                      <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                    </span>
                  </div>
                  <Link
                    to="/cart"
                    className="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                    tabIndex={0}
                  >
                    Add To Cart <i className="ph ph-shopping-cart" />
                  </Link>
                </div>
              </div> */}
            </div>
            {/* Pagination Start */}
            {/* <ul className="pagination flex-center flex-wrap gap-16">
              <li className="page-item">
                <Link
                  className="page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100"
                  to="#"
                >
                  <i className="ph-bold ph-arrow-left" />
                </Link>
              </li>
              <li className="page-item active">
                <Link
                  className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                  to="#"
                >
                  01
                </Link>
              </li>
              <li className="page-item">
                <Link
                  className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                  to="#"
                >
                  02
                </Link>
              </li>
              <li className="page-item">
                <Link
                  className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                  to="#"
                >
                  03
                </Link>
              </li>
              <li className="page-item">
                <Link
                  className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                  to="#"
                >
                  04
                </Link>
              </li>
              <li className="page-item">
                <Link
                  className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                  to="#"
                >
                  05
                </Link>
              </li>
              <li className="page-item">
                <Link
                  className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                  to="#"
                >
                  06
                </Link>
              </li>
              <li className="page-item">
                <Link
                  className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                  to="#"
                >
                  07
                </Link>
              </li>
              <li className="page-item">
                <Link
                  className="page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100"
                  to="#"
                >
                  <i className="ph-bold ph-arrow-right" />
                </Link>
              </li>
            </ul> */}
            <div>
              {/* <h2>Products</h2> */}
              <div>
                {products.map((product, index) => {
                  if (index === products.length - 1) {
                    return (
                      <div key={product.id} ref={lastProductRef}>
                        {product.name}
                      </div>
                    );
                  } else {
                    return <div key={product.id}>{product.name}</div>;
                  }
                })}
                </div>
              {loading && <p>Loading...</p>}
            </div>
            {/* Pagination End */}
          </div>
          {/* Content End */}
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
