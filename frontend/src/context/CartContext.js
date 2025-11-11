import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const [wishlist, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  const navigate = useNavigate();

  const getToken = () => localStorage.getItem("token");

  // Fetch cart items from backend
  const fetchCart = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await axios.get("https://udemandme.com/api/addToCart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setCart(res.data.cart);
    } catch (err) {
      console.error(err);
    }
  };

  // Add product to cart
  // const addToCart = async (product, qty = 1, attribute = null) => {
  //   const token = getToken();
  //   if (!token) {
  //     navigate("/login"); // 👈 redirect if not logged in
  //     return;
  //   }

  //   try {
  //     const res = await axios.post(
  //       "https://udemandme.com/api/addToCart/add",
  //       { productId: product._id, qty, attribute },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     if (res.data.success) {
  //       toast.success("Product added to cart");
  //       fetchCart();
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Failed to add product to cart");
  //   }
  // };
  const addToCart = async (product, qty = 1, selectedAttributes = []) => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }
    // Check if product with same attribute already exists
    // const existingItem = cart.find(
    //   (item) =>
    //     item.productId._id === product._id &&
    //     (!attribute || item.attribute?.attributeId === attribute.attributeId)
    // );
    const existingItem = cart.find(
      (item) => item?.productId?._id === product._id
    );

    if (existingItem) {
      toast.info("Product already in cart");
      return;
    }

    try {
      const res = await axios.post(
        "https://udemandme.com/api/addToCart/add",
        {
          productId: product._id,
          qty,
          selectedAttributes, // selected attribute
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success("Product added to cart");
        fetchCart(); // context update
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product to cart");
    }
  };
  // Update quantity
  const updateCartQty = async (cartItemId, qty) => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await axios.post(
        "https://udemandme.com/api/addToCart/update",
        { cartId: cartItemId, qty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) fetchCart();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update cart");
    }
  };

  // Delete cart item
  const deleteCartItem = async (cartItemId) => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await axios.delete(
        `https://udemandme.com/api/addToCart/delete/${cartItemId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) fetchCart();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete item");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Fetch wishlist
  const fetchWishlist = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch("https://udemandme.com/api/whichlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setWishlist(data.wishlist);
        setWishlistCount(data.wishlist.length);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Add to wishlist
  const addToWishlist = async (productId) => {
    const token = getToken();
    if (!token) return navigate("/login");

    try {
      const res = await fetch("https://udemandme.com/api/whichlist/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (data.success) {
        setWishlist((prev) => [...prev, data.wishlist]);
        setWishlistCount((prev) => prev + 1);
        toast.success("Added to wishlist!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Remove from wishlist
  const removeFromWishlist = async (wishlistId) => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(
        `https://udemandme.com/api/whichlist/delete/${wishlistId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (data.success) {
        setWishlist((prev) => prev.filter((item) => item._id !== wishlistId));
        setWishlistCount((prev) => prev - 1);
        toast.success("Removed from wishlist");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Aur provider me incl

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        wishlistCount,
        setCart,
        addToCart,
        updateCartQty,
        deleteCartItem,
        fetchCart,
        addToWishlist,
        removeFromWishlist,
        fetchWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
