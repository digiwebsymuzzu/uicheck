import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";

const NewArrivalTwo = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  // Fetch 5 random products on component render
  const fetchRandomProducts = async () => {
    try {
      const res = await fetch("https://udemandme.cloud/api/products?limit=50");
      const data = await res.json();
      if (data.success && data.products.length) {
        const shuffled = data.products.sort(() => 0.4 - Math.random());
        setProducts(shuffled.slice(0, 4)); // 5 products
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchRandomProducts();
  }, []);

  if (!products.length)
    return <p className="text-center mt-10">Loading products...</p>;

  return (
    <section className="new-arrival pb-80">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-20">You Might Also Like</h5>
        </div>

        <div className="row g-4">
          {products.map((item) => (
            <div key={item._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                <Link
                  to={`/product-details/${item.productSlug}`}
                  state={{ id: item._id }}
                  className="product-card__thumb flex-center rounded-8 position-relative"
                >
                  {item.isSold && (
                    <span className="product-card__badge bg-main-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                      Sold
                    </span>
                  )}
                  <img
                    src={item.productImages?.[0] || item.productMainImage}
                    alt={item.name}
                    className="w-auto"
                    style={{ width: "85px" }}
                  />
                </Link>
                <div className="product-card__content mt-16">
                  <h6 className="title text-lg fw-semibold mt-12 mb-8">
                    <Link
                      to={`/product-details/${item.productSlug}`}
                      state={{ id: item._id }}
                      className="link text-line-2"
                      tabIndex={0}
                    >
                      {item.productName}
                    </Link>
                  </h6>

                  <div className="mt-8">
                    <div
                      className="progress w-100 bg-color-three rounded-pill h-4"
                      role="progressbar"
                      aria-label="Stock"
                      aria-valuenow={item.productStock}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className={`progress-bar rounded-pill ${
                          item.productStock > 0 ? "bg-success" : "bg-danger"
                        }`}
                        style={{
                          width: `${Math.min(item.productStock, 100)}%`,
                        }}
                      />
                    </div>

                    <span
                      className={`text-xs fw-medium mt-8 d-block ${
                        item.productStock > 0 ? "text-success" : "text-danger"
                      }`}
                    >
                      {item.productStock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                  <span className="text-sm h6 primecolor pb-1 mt-4">
                    {item?.productCategories
                      ?.slice(0, 2)
                      .map((cat) => cat.name)
                      .join(", ")}
                  </span>

                  <div className="product-card__price my-20">
                    <span
                      className="text-gray-400 text-md fw-semibold text-decoration-line-through"
                      style={{ marginRight: "10px" }}
                    >
                      AED {item.productRegularPriceInr}  
                    </span>
                    <span className="text-heading text-md fw-semibold ml-2">
                      AED {item.productSalePriceInr}{" "}
                    </span>
                  </div>

                  <div className="w-full flex flex-col items-stretch">
                    <button
                      onClick={() => {
                        if (!item?._id) {
                          toast.error("Product not available");
                          return;
                        }

                        const payload = item?.productSalePriceInr
                          ? [
                              {
                                attributeName: null,
                                attributeValue: null,
                                attributeId: null,
                                attributeSalePriceInr: item.productSalePriceInr,
                                attributeRegularPriceInr:
                                  item.productRegularPriceInr,
                                attributeSalePriceUsd: item.productSalePriceUsd,
                                attributeRegularPriceUsd:
                                  item.productRegularPriceUsd,
                              },
                            ]
                          : [];

                        console.log("Add To Cart Payload:", {
                          product: item,
                          quantity: 1,
                          attributes: payload,
                        });

                        addToCart(item, 1, payload);
                      }}
                      className="product-card__cart btn bg-dark text-light hover-bg-main-600 hover-text-white py-3 rounded-8 flex justify-center items-center gap-2 fw-medium w-full text-center text-sm sm:text-base"
                    >
                      Add To Cart <i className="ph ph-shopping-cart" />
                    </button>

                     <Link
  to="#"
  onClick={() => {
    const productUrl = `${window.location.origin}/product-details/${product.productSlug}`;
    const message = `Check out this product: ${product.productName}\n${productUrl}`;

    // WhatsApp link for a specific number
    const whatsappUrl = `https://wa.me/971502530888?text=${encodeURIComponent(message)}`;
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
    </section>
  );
};

export default NewArrivalTwo;
