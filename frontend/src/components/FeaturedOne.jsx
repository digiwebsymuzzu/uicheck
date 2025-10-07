import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const FeaturedOne = () => {
  const [products, setProducts] = useState([]);

  // Fetch products for Automotive superparent
  const fetchProducts = async () => {
    try {
      const superParentName = "automotive";
      const res = await fetch(
        `https://udemandme.cloud/api/products/superparent/${superParentName}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();

      if (data.success) {
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

  useEffect(() => {
    fetchProducts();
  }, []);

  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${className} slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-neutral-600 text-xl hover-bg-neutral-600 hover-text-white transition-1`}
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
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [{ breakpoint: 991, settings: { slidesToShow: 1 } }],
  };

  return (
    <section className="featured-products">
      <div className="container container-lg">
        <div className="row g-4 flex-wrap-reverse">
          <div className="col-xxl-8">
            <div className="border border-gray-100 p-24 rounded-16">
              <div className="section-heading mb-24">
                <div className="flex-between flex-wrap gap-8">
                  <h5 className="mb-0">Automotive</h5>
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

              <div className="row gy-4 featured-product-slider">
                <Slider {...settings}>
                  {products.map((product) => (
                    <div key={product._id} className="col-xxl-6">
                      <div className="featured-products__sliders">
                        <div className="mt-24 product-card d-flex gap-16 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                          <Link
                            to={`/product-details/${product.productSlug}`}
                            state={{ id: product._id }}
                            className="product-card__thumb flex-center h-unset rounded-8 bg-gray-50 position-relative w-unset flex-shrink-0 p-24"
                          >
                            {product.discountPercent && (
                              <span className="product-card__badge bg-danger-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                Sale {product.discountPercent}%
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
                          <div className="product-card__content my-20 flex-grow-1">
                            <h6 className="title text-lg fw-semibold mb-12">
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
                            </div>
                            <span className="text-xs h6 primecolor pb-1">
                              {product.productCategories
                                .slice(0, 2)
                                .map((cat) => cat.name)
                                .join(", ")}
                            </span>
                            <div className="product-card__price my-20">
                              {product.productRegularPriceInr && (
                                <span className="text-dark text-md fw-semibold text-decoration-line-through"
                                style={{ marginRight: "6px" }}>
                                  AED {product.productRegularPriceInr}
                                </span>
                              )}
                              <span className="text-gray-400 text-md fw-semibold">
                                AED {product.productSalePriceInr}{" "}
                              </span>
                            </div>
                            <div className="d-flex gap-10">
                              <Link
                                to="/cart"
                                className="product-card__cart btn bg-btn-primecolor text-light mx-2 hover-text-white py-11 px-10 rounded-8 flex-center gap-8 fw-medium"
                              >
                                Add To Cart{" "}
                                <i className="ph ph-shopping-cart" />
                              </Link>
                              <Link
                                to="/cart"
                                className="product-card__cart btn bg-success-btn text-light hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                              >
                                <i className="ph ph-whatsapp-logo"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>

          {/* Right side static banner */}
          <div className="col-xxl-4">
            <div className="position-relative rounded-16 bg-light-purple overflow-hidden p-28 pb-0 z-1 text-center h-100">
              <img
                src="assets/images/bg/featured-product-bg.png"
                alt=""
                className="position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100 cover-img"
              />
              <div className="py-xl-4 text-center">
                <span className="h6 mb-20 text-white">
                  Automotive Smart Deal
                </span>
                <div className="flex-center gap-12 text-white">
                  <br></br>
                </div>
                <Link
                  to="/shop"
                  className="mt-16 mb-24 btn btn-main-two fw-medium d-inline-flex align-items-center rounded-pill gap-8"
                >
                  Shop Now
                  <span className="icon text-xl d-flex">
                    <i className="ph ph-arrow-right" />
                  </span>
                </Link>
              </div>
              <img
                src="assets/images/thumbs/featured-product-img.png"
                alt=""
                className="d-xxl-inline-flex d-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedOne;
