import React, { memo } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

const SampleNextArrow = memo(function SampleNextArrow(props) {
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
});

const SamplePrevArrow = memo(function SamplePrevArrow(props) {
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
});

const DealsOne = () => {
  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1599,
        settings: {
          slidesToShow: 5,
        },
      },
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

  // ✅ Fetch products by superparent (Construction)
  const fetchProducts = async () => {
    try {
      const superParentName = "construction";
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
        // Map productCategories to match your UI (optional, but keeps code consistent)
        const formattedProducts = data.products.map((product) => ({
          ...product,
          productCategories: product.categories || [], // rename for UI mapping
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
    <section className="deals-weeek pt-80">
      <div className="container container-lg">
        <div className="border border-gray-100 p-24 rounded-16">
          <div className="section-heading mb-24">
            <div className="flex-between flex-wrap gap-8">
              <h5 className="mb-0">Construction</h5>
              <div className="flex-align mr-point gap-16">
                <Link
                  to="/shop"
                  className="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
                >
                  View All Deals
                </Link>
              </div>
            </div>
          </div>

          <div className="deals-week-slider arrow-style-two">
            <Slider {...settings}>
              {products.map((product) => (
                <div key={product._id}>
                  <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                    <Link
                      to={`/product-details/${product.productSlug}`}
                      state={{ id: product._id }}
                      className="product-card__thumb flex-center rounded-8 position-relative"
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
                        >
                          {product.productName}
                        </Link>
                      </h6>
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
                          {product.productStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </span>
                      </div>

                      <span className="text-sm h6 primecolor pb-1">
                        {product?.productCategories
                          ?.slice(0, 2) // sirf pehli 2 categories
                          .map((cat) => cat.name)
                          .join(", ")}
                      </span>

                      {/* <span className="text-gray-400 px-3">
											{product?.productCategories
												?.map((cat) => cat.name)
												.join(", ")}
											</span> */}

                      <div className="product-card__price my-20">
                        <span
                          className="text-dark text-md fw-semibold text-decoration-line-through"
                          style={{ marginRight: "6px" }}
                        >
                          AED {product.productRegularPriceInr}
                        </span>
                        <span className="text-gray-400 text-md fw-semibold">
                          AED {product.productSalePriceInr}
                        </span>
                      </div>

                      <div className="w-full flex flex-col items-stretch">
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
                          className="product-card__cart btn bg-dark text-light hover-bg-main-600 hover-text-white py-3 rounded-8 flex justify-center items-center gap-2 fw-medium w-full text-center text-sm sm:text-base"
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
                          className="product-card__cart btn bg-success-btn text-light hover-text-white py-3 rounded-8 flex justify-center items-center gap-2 fw-medium w-full text-center mt-3 sm:mt-3 text-sm sm:text-base"
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
    </section>
  );
};

export default DealsOne;
