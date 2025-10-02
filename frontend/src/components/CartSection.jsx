import React, { useContext } from "react";
import { Link } from "react-router-dom";
import QuantityControl from "../helper/QuantityControl";
import { CartContext } from "../context/CartContext";

const CartPage = () => {
  const { cart, updateCartQty, deleteCartItem } = useContext(CartContext);

  // Function to calculate price based on product + selected attribute
  // Function to calculate price based on product + selected attributes
  const getProductPrice = (
    product,
    currency = "INR",
    selectedAttributes = []
  ) => {
    if (!product) return 0;

    let totalSale = 0;
    let totalRegular = 0;
    let hasValidSalePrice = false;

    if (selectedAttributes && selectedAttributes.length > 0) {
      selectedAttributes.forEach((attr) => {
        if (currency === "INR") {
          if (attr.attributeSalePriceInr > 0) {
            totalSale += attr.attributeSalePriceInr;
            hasValidSalePrice = true;
          }
          if (attr.attributeRegularPriceInr > 0) {
            totalRegular += attr.attributeRegularPriceInr;
          }
        } else {
          if (attr.attributeSalePriceUsd > 0) {
            totalSale += attr.attributeSalePriceUsd;
            hasValidSalePrice = true;
          }
          if (attr.attributeRegularPriceUsd > 0) {
            totalRegular += attr.attributeRegularPriceUsd;
          }
        }
      });

      // Agar sale price missing hai to product ke base price lo
      if (!hasValidSalePrice) {
        totalSale =
          currency === "INR"
            ? product.productSalePriceInr || 0
            : product.productSalePriceUsd || 0;
        totalRegular =
          currency === "INR"
            ? product.productRegularPriceInr || 0
            : product.productRegularPriceUsd || 0;
      }
    } else {
      // agar koi attribute select nahi hua
      totalSale =
        currency === "INR"
          ? product.productSalePriceInr || product.productRegularPriceInr
          : product.productSalePriceUsd || product.productRegularPriceUsd;

      totalRegular =
        currency === "INR"
          ? product.productRegularPriceInr || 0
          : product.productRegularPriceUsd || 0;
    }

    return totalSale > 0 ? totalSale : totalRegular;
  };

  // Subtotal calculation
  const subtotal =
    cart?.reduce(
      (acc, item) =>
        acc +
        getProductPrice(item.productId, "INR", item.selectedAttributes) *
          item.qty,
      0
    ) || 0;

  const tax = 10; // Example tax
  const total = subtotal + tax;

  // Empty Cart View
  if (!cart || cart.length === 0) {
    return (
      <section className="cart py-80">
        <div className="container text-center">
          <h3 className="mb-24">🛒 Your cart is empty</h3>
          <Link to="/shop" className="btn btn-main rounded-8 px-32 py-16">
            Go to Shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart py-80">
      <div className="container container-lg">
        <div className="row gy-4">
          {/* Cart Table */}
          <div className="col-xl-9 col-lg-8">
            <div className="cart-table border border-gray-100 rounded-8 px-40 py-48">
              <div className="overflow-x-auto scroll-sm scroll-sm-horizontal">
                <table className="table style-three">
                  <thead>
                    <tr>
                      <th>Delete</th>
                      <th>Product Name</th>
                      <th>Attributes</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => {
                      const price = getProductPrice(
                        item.productId,
                        "INR",
                        item.selectedAttributes // ✅ ab array pass kar rahe hai
                      );

                      return (
                        <tr key={item._id}>
                          {/* Delete Button */}
                          <td>
                            <button
                              type="button"
                              className="remove-tr-btn flex-align gap-12 hover-text-danger-600"
                              onClick={() => deleteCartItem(item._id)}
                            >
                              <i className="ph ph-x-circle text-2xl d-flex" />
                              Remove
                            </button>
                          </td>

                          {/* Product Name */}
                          <td>
                            <Link
                              to={`/product-details/${item.productId?.productSlug}`}
                              state={{ id: item.productId?._id }}
                              className="text-black fw-normal text-md"
                            >
                              {item.productId?.productName}
                            </Link>
                          </td>

                          {/* Attributes */}
                          <td>
                            {Array.isArray(item.selectedAttributes) &&
                            item.selectedAttributes.length > 0 ? (
                              item.selectedAttributes.map((attr, index) => (
                                <span
                                  key={index}
                                  className="badge bg-dark text-white me-1"
                                >
                                  {attr.attributeName && attr.attributeValue
                                    ? `${attr.attributeName}: ${attr.attributeValue}`
                                    : "Empty"}
                                </span>
                              ))
                            ) : (
                              <span className="badge bg-secondary text-white">
                                Empty
                              </span>
                            )}
                          </td>

                          {/* Price */}
                          <td>AED {price}</td>

                          {/* Quantity */}
                          <td>
                            <span className="ms-2">{item.qty}</span>
                          </td>

                          {/* Subtotal */}
                          <td>AED {parseFloat(price * item.qty).toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="col-xl-3 col-lg-4">
            <div className="cart-sidebar border border-gray-100 rounded-8 px-24 py-40">
              <h6 className="text-xl mb-32">Cart Totals</h6>

              <div className="bg-color-three rounded-8 p-24">
                <div className="mb-32 flex-between gap-8">
                  <span>Subtotal</span>
                  <span>AED {parseFloat(subtotal).toFixed(2)}</span>
                </div>
                <div className="mb-32 flex-between gap-8">
                  <span>Estimated Delivery</span>
                  <span>Free</span>
                </div>
                <div className="mb-0 flex-between gap-8">
                  <span>Taxes</span>
                  <span>AED {tax}</span>
                </div>
              </div>

              <div className="bg-color-three rounded-8 p-24 mt-24">
                <div className="flex-between gap-8">
                  <span>Total</span>
                  <span>AED {parseFloat(total).toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="btn btn-main mt-40 py-18 w-100 rounded-8"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
