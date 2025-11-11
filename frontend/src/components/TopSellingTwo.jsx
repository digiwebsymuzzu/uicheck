import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import { useEffect, useState, useContext } from "react";

const TopSellingTwo = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
      <button
        type="button"
        onClick={onClick}
        className={` ${className} slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-neutral-600 text-xl hover-bg-neutral-600 hover-text-white transition-1`}
      >
        <i className="ph ph-caret-right" />
      </button>
    );
  }
  function SamplePrevArrow(props) {
    const { className, onClick } = props;

    return (
      <button
        type="button"
        onClick={onClick}
        className={`${className} slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-neutral-600 text-xl hover-bg-neutral-600 hover-text-white transition-1`}
      >
        <i className="ph ph-caret-left" />
      </button>
    );
  }
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1399,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const fetchProducts = async () => {
    try {
      const superParentName = "sanitary";
      const res = await fetch(
        `https://udemandme.com/api/products/superparent/${superParentName}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        // Map categories for UI consistency
        const formattedProducts = data.products.map((product) => ({
          ...product,
          productCategories: product.categories || [],
        }));

        setProducts(formattedProducts);
      } else {
        console.error(data.message || "Failed to fetch products");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Run on component mount
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <section className="recommended pb-80 mb-24">
      <div className="container container-lg">
        <div className="row g-12">
          <div className="col-xxl-4">
            <div className="position-relative rounded-16 bg-light-purple overflow-hidden p-28 z-1 text-center h-100">
              <img
                src="assets/images/bg/recommended-bg.png"
                alt=""
                className="position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100 cover-img"
              />

              <div className="py-xl-4 text-center">
                <span className="h6 text-white">
                  UNIT CLAMPMETER MULTIMETER
                </span>
              </div>

              <img
                src="assets/images/thumbs/electrical-items.png"
                alt=""
                className="d-xxl-block d-none"
                style={{ display: "block", margin: "0 auto" }}
              />

              {/* Shop Now Button */}
              <div className="text-center mt-4">
                <Link
                  class="btn btn-outline-white rounded-pill gap-8 mt-20"
                  tabindex="0"
                  to="/shop"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xxl-8">
            <div className="border border-gray-100 p-24 rounded-16">
              <div className="section-heading mb-24">
                <div className="flex-between flex-wrap gap-8">
                  <h5 className="mb-0">Electrical Items</h5>
                  <div className="flex-align mr-point gap-16">
                    <Link
                      to="/electrical-items"
                      className="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
                    >
                      Visit Electrical Items Shop
                    </Link>
                  </div>
                </div>
              </div>
              <div className="recommended-slider">
                <Slider {...settings}>
                  {products.map((product) => (
                    <div key={product._id}>
                      <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                        <Link
                          to={`/product-details/${product.productSlug}`}
                          state={{ id: product._id }}
                          className="product-card__thumb flex-center rounded-8  position-relative"
                        >
                          {new Date(product.createdAt) >
                            new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                            <span className="product-card__badge bg-tertiary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                              Best Seller{" "}
                            </span>
                          )}
                          <img
                            src={
                              product.productMainImage ||
                              "assets/images/thumbs/productu.png"
                            }
                            alt={product.productName}
                            className="w-auto"
                          />
                        </Link>
                        <div className="product-card__content mt-16">
                          {/* <span className="text-light bg-main-50 text-sm fw-medium py-4 px-8">
													19%OFF
												</span> */}
                          <h6 className="title text-lg fw-semibold my-16">
                            <Link
                              to={`/product-details/${product.productSlug}`}
                              state={{ id: product._id }}
                              className="link text-line-2"
                              tabIndex={0}
                            >
                              {product.productName}
                            </Link>
                          </h6>
                          {/* <div className="mt-8">
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
                                  width: `${Math.min(
                                    product.productStock,
                                    100
                                  )}%`,
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
                              {product.productStock > 0
                                ? "In Stock"
                                : "Out of Stock"}
                            </span>
                          </div> */}
                          <span className="text-xs h6 primecolor ">
                            {product?.productCategories
                              ?.slice(0, 2)
                              .map((cat) => cat.name)
                              .join(", ")}
                          </span>
                          <div className="product-card__price mb-12">
                            <span
                              className="text-gray-400 text-md fw-semibold text-decoration-line-through "
                              style={{ marginRight: "6px" }}
                            >
                              AED {product.productRegularPriceInr}
                            </span>
                            <span className="text-heading text-md fw-semibold ">
                              AED {product.productSalePriceInr}
                            </span>
                          </div>
                          <div className="custom-flex-wrapper gap-16">
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
                              className="product-card__cart btn bg-btn-primecolor text-light hover-text-white py-11 rounded-8 flex-center gap-8 fw-medium"
                              tabIndex={0}
                            >
                              Add To Cart <i className="ph ph-shopping-cart" />
                            </button>
                            <Link
                              to="#"
                              onClick={() => {
                                const productUrl = `${window.location.origin}/product-details/${product.productSlug}`;
                                const message = `Check out this product:\n\n*${product.productName}*\n${productUrl}`;

                                const whatsappUrl = `https://wa.me/971502530888?text=${encodeURIComponent(
                                  message
                                )}`;
                                window.open(whatsappUrl, "_blank");
                              }}
                              className="product-card__cart btn bg-success-btn text-light hover-text-white flex-center fw-medium"
                              style={{
                                width: "50px", // 👈 same width
                                height: "50px", // 👈 same height
                                borderRadius: "50%", // 👈 makes it circular
                                padding: "0", // 👈 optional: centers content
                              }}
                            >
                              <i className="ph ph-whatsapp-logo"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellingTwo;
