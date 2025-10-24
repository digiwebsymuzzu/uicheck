import React from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import { useEffect, useState, useContext } from "react";

const TrendingOne = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  // ✅ Fetch products from backend
  const fetchProducts = async () => {
    try {
      const superParentName = "machinery";
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
    <section className="trending-productss pt-80">
      <div className="container container-lg">
        <div className="border border-gray-100 p-24 rounded-16">
          <div className="section-heading mb-24">
            <div className="flex-between flex-wrap gap-8">
              <h5 className="mb-0">Machinery</h5>
            </div>
          </div>

          <div className="trending-products-box rounded-16 overflow-hidden flex-between position-relative mb-24">
            <div className="d-md-block d-none ps-xxl-5 ps-md-4">
              <img
                src="assets/images/thumbs/trending-products-img1.png"
                alt=""
              />
            </div>
            <div className="trending-products-box__content px-4 d-block w-100 text-center py-32">
              <h6 className="mb-0 trending-products-box__title">
                Industrial Machinery
              </h6>
              <div className=" mt-5 mr-point gap-16">
                <Link
                  to="/machinery"
                  className="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
                >
                  Explore Now
                </Link>
              </div>
            </div>
            <div className="d-md-block d-none pe-xxl-5 me-xxl-5 pe-md-4">
              <img
                src="assets/images/thumbs/trending-products-img2.png"
                alt=""
              />
            </div>
          </div>

          {/* Products row */}
          <div className="row g-12">
            {products.slice(0, 6).map((product) => (
              <div
                key={product._id}
                className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6"
              >
                <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                  <Link
                    to={`/product-details/${product.productSlug}`}
                    state={{ id: product._id }}
                    className="product-card__thumb flex-center rounded-8 position-relative"
                  >
                    {new Date(product.createdAt) >
                      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                      <span className="product-card__badge bg-tertiary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                        Best Seller
                      </span>
                    )}
                    <img
                      src={
                        product.productMainImage ||
                        "assets/images/thumbs/productu.png"
                      }
                      alt={product.productName || "Product Image"}
                      className="w-auto macimg"
                    />
                  </Link>

                  <div className="product-card__content mt-16">
                    {product.discountPercent && (
                      <span className="text-light bg-success-50 text-sm fw-medium py-4 px-8">
                        {product.discountPercent}%OFF
                      </span>
                    )}
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
                    </div> */}

                    <span className="text-xs h6 primecolor">
                      {product?.productCategories
                        ?.slice(0, 2)
                        .map((cat) => cat.name)
                        .join(", ")}
                    </span>

                    <div className="product-card__price mb-12">
                      {product.productRegularPriceInr && (
                        <span
                          className="text-gray-400 text-md fw-semibold text-decoration-line-through"
                          style={{ marginRight: "6px" }}
                        >
                          AED {product.productRegularPriceInr}
                        </span>
                      )}
                      <span className="text-heading text-md fw-semibold">
                        AED {product.productSalePriceInr}{" "}
                      </span>
                    </div>

                    <div className="w-full flex flex-col items-stretch">
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
                        className="product-card__cart btn bg-dark text-light hover-bg-main-600 hover-text-white py-3 rounded-8 flex justify-center items-center gap-2 fw-medium w-full text-center text-sm sm:text-base"
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
                        className="product-card__cart btn bg-success-btn text-light hover-text-white py-3 rounded-8 flex justify-center items-center gap-2 fw-medium w-full text-center mt-3 sm:mt-3 text-sm sm:text-base"
                      >
                        <i className="ph ph-whatsapp-logo"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingOne;
