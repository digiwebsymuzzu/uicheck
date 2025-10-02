import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

const Whichlist = () => {
  const { wishlist, removeFromWishlist, fetchWishlist, setWishlistCount } = useContext(CartContext);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  if (!wishlist.length) {
    return (
      <section className="cart py-80">
        <div className="container text-center">
          <h3 className="mb-24">💔 Your Wishlist is Empty</h3>
          <Link to="/shop" className="btn btn-main rounded-8 px-32 py-16">Go to Shop</Link>
        </div>
      </section>
    );
  }

  const handleRemove = async (itemId) => {
    const success = await removeFromWishlist(itemId);
    if (success) {
      setWishlistCount(prev => prev - 1);
      toast.success("Removed from wishlist");
    }
  };

  return (
    <section className="cart py-80">
      <div className="container container-lg">
        <div className="row gy-4">
          <div className="col-xl-8 col-lg-8 mx-auto">
            <div className="cart-table border border-gray-100 rounded-8 px-40 py-48">
              <div className="overflow-x-auto scroll-sm">
                <table className="table style-three">
                  <thead>
                    <tr>
                      <th>Delete</th>
                      <th>Product Name</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlist.map((item) => {
                      const product = item.productId;

                      // Crash-proof check
                      if (!product) {
                        return (
                          <tr key={item._id}>
                            <td colSpan="3" className="text-center">
                              Product unavailable.{" "}
                              <button
                                onClick={() => handleRemove(item._id)}
                                className="remove-tr-btn flex-align gap-12 hover-text-danger-600"
                              >
                                <i className="ph ph-x-circle text-2xl" />
                                Remove
                              </button>
                            </td>
                          </tr>
                        );
                      }

                      const price = product.productSalePriceInr || product.productRegularPriceInr;

                      return (
                        <tr key={item._id}>
                          <td>
                            <button
                              onClick={() => handleRemove(item._id)}
                              className="remove-tr-btn flex-align gap-12 hover-text-danger-600"
                            >
                              <i className="ph ph-x-circle text-2xl" />
                              Remove
                            </button>
                          </td>
                          <td>
                            <div className="table-product d-flex align-items-center gap-24">
                              <Link
                                to={`/product-details/${product.productSlug}`}
                                state={{ id: product._id }}
                                className="table-product__thumb border border-gray-100 rounded-8 flex-center"
                              >
                                <img src={product.productMainImage} alt={product.productName} />
                              </Link>
                              <div className="table-product__content text-start">
                                <h6 className="title text-lg fw-semibold mb-8">
                                  <Link
                                    to={`/product-details/${product.productSlug}`}
                                    state={{ id: product._id }}
                                    className="link text-line-2"
                                  >
                                    {product.productName}
                                  </Link>
                                </h6>
                              </div>
                            </div>
                          </td>
                          <td>${price}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Whichlist;
