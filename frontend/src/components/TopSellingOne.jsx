import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import { useEffect, useState, useContext } from "react";

const TopSellingOne = () => {
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
  // ✅ Fetch products from backend
  const fetchProducts = async () => {
    try {
      const superParentName = "oil and gas";
      const res = await fetch(
        `https://udemandme.cloud/api/products/superparent/${superParentName}`,
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

  // ✅ Run on component mount
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <section className="top-selling-products pt-80">
      <div className="container container-lg">
        <div className="border border-gray-100 p-24 rounded-16">
          <div className="section-heading mb-24">
            <div className="flex-between flex-wrap gap-8">
              <h5 className="mb-0">Oil and Gas</h5>
              <div className="flex-align mr-point gap-16">
                <Link
                  to="/oil-and-gas"
                  className="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
                >
                  Visit Oil and Gas Shop
                </Link>
              </div>
            </div>
          </div>
          <div className="row g-12">
            <div className="col-md-4">
              <div className="position-relative rounded-16 overflow-hidden p-28 z-1 text-center">
                <img
                  src="assets/images/bg/deal-bg.png"
                  alt=""
                  className="position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100"
                />
                <div className="py-xl-4">
                  <h6 className="mb-4 fw-semibold">Gas Regulator</h6>
                  <h5 className="mb-40 fw-semibold">
                    Heavy & Meduim Duty Regulators
                  </h5>
                  <Link
                    to="/shop"
                    className="btn text-heading border-neutral-600 hover-bg-neutral-600 hover-text-white py-16 px-24 flex-center d-inline-flex rounded-pill gap-8 fw-medium"
                    tabIndex={0}
                  >
                    Shop Now{" "}
                    <i className="ph ph-shopping-cart text-xl d-flex" />
                  </Link>
                </div>
                <div className="d-md-block d-none mt-36">
                  <img src="assets/images/thumbs/oilgas.png" alt="" />
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="top-selling-product-slider arrow-style-two">
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
                            <span className="product-card__badge bg-primary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                              New
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

                          <span className="text-xs h6 primecolor  ">
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
                          <div className="custom-flex-wrapper">
                            <button
                              onClick={() => {
                                if (!product?._id) {
                                  toast.error("Product not available");
                                  return;
                                }
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

export default TopSellingOne;
