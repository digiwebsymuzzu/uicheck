import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Slider from "react-slick";
import DOMPurify from "dompurify";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import axios from "axios";

const ProductDetailsOne = ({ productId }) => {
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [added, setAdded] = useState(false);
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, setWishlistCount } = useContext(CartContext);
  const { slug } = useParams();
  const location = useLocation();
  const { id } = location.state || {};
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [rating, setRating] = useState(0); // User selected rating
  const [hover, setHover] = useState(0); // Hover highlight ke liye
  const [reviews, setReviews] = useState([]);

  // sirf first 2 reviews
  const displayedReviews = reviews.slice(0, 2);

  // increment & decrement
  const [quantity, setQuantity] = useState(1);
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const settingsThumbs = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
  };

  const fetchProduct = async (id) => {
    try {
      const res = await fetch(`https://udemandme.cloud/api/products/${id}`, {
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.success) {
        setProduct(data.product);
        // Set main image from DB
        if (data.product.productImages?.length > 0) {
          setMainImage(data.product.productImages[0]);
        } else {
          setMainImage(data.product.productMainImage || "");
        }
      } else {
        console.error(data.message || "Failed to fetch product");
      }
    } catch (err) {
      console.error("Error fetching product:", err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const handleAddToCart = () => {
    const selectedAttrs = Object.entries(selectedAttributes).map(
      ([attrName, val]) => ({
        attributeId: val._id,
        attributeName: attrName,
        attributeValue: val.attributeValue,
        attributeRegularPriceInr:
          val.attributeRegularPriceInr > 0
            ? val.attributeRegularPriceInr
            : product.productRegularPriceInr,
        attributeSalePriceInr:
          val.attributeSalePriceInr > 0
            ? val.attributeSalePriceInr
            : product.productSalePriceInr,
        attributeRegularPriceUsd:
          val.attributeRegularPriceUsd > 0
            ? val.attributeRegularPriceUsd
            : product.productRegularPriceUsd,
        attributeSalePriceUsd:
          val.attributeSalePriceUsd > 0
            ? val.attributeSalePriceUsd
            : product.productSalePriceUsd,
      })
    );

    // ✅ Hamesha array bhej rahe hai
    addToCart(product, quantity, selectedAttrs);
  };

  const handleWishlist = async () => {
    if (!product?._id) return; // ❌ Safety check
    if (added) return; // Already added, do nothing

    const success = await addToWishlist(product);
    if (success) {
      setAdded(true);
      setWishlistCount((prev) => prev + 1); // Header ka count update
      toast.success("Added to wishlist!");
    }
  };

  if (!product?._id || added) return null; // Hide button if already in wishlist

  // Handle attribute selection
  // Handle attribute select / unselect
  const handleSelect = (attrName, valueObj) => {
    setSelectedAttributes((prev) => {
      // check if already selected
      if (prev[attrName]?.attributeValue === valueObj.attributeValue) {
        // unselect if same clicked again
        const updated = { ...prev };
        delete updated[attrName];
        return updated;
      } else {
        // select new
        return { ...prev, [attrName]: valueObj };
      }
    });
  };

  // --- Calculate price ---
  let unitSalePrice = 0;
  let unitRegularPrice = 0;

  const selectedAttrValues = Object.values(selectedAttributes);

  if (selectedAttrValues.length > 0) {
    let hasValidSalePrice = false;

    selectedAttrValues.forEach((val) => {
      if (val?.attributeSalePriceInr > 0) {
        unitSalePrice += val.attributeSalePriceInr;
        hasValidSalePrice = true;
      }
      if (val?.attributeRegularPriceInr > 0) {
        unitRegularPrice += val.attributeRegularPriceInr;
      }
    });

    if (!hasValidSalePrice) {
      unitSalePrice = product?.productSalePriceInr || 0;
      unitRegularPrice = product?.productRegularPriceInr || 0;
    }
  } else {
    unitSalePrice = product?.productSalePriceInr || 0;
    unitRegularPrice = product?.productRegularPriceInr || 0;
  }

  // ✅ Ab total price hamesha quantity ke hisaab se nikalo
  const finalSalePrice = unitSalePrice * quantity;
  const finalRegularPrice = unitRegularPrice * quantity;

  const handlereview = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const reviewTitle = e.target.reviewtitle.value.trim();
    const reviewText = e.target.reviewtext.value.trim();

    // 🚨 Required fields check
    if (!rating || !reviewTitle || !reviewText) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        "https://udemandme.cloud/api/reviews/add",
        {
          productId: product._id,
          rating,
          reviewTitle,
          reviewText,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        toast.success("Review submitted successfully");
        e.target.reset();
        setRating(0);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to submit review");
    }
  };

  return (
    <section className="product-details py-80">
      <small style={{ display: "none" }}>Slug: {slug}</small>
      <div className="container container-lg">

        <div className="row gy-4">

          {/*First COlumn*/}

          <div className="col-lg-9">
            <div className="row gy-4">
              <div className="col-xl-6">
                <div className="product-details__left">
                  <div className="product-details__thumb-slider border border-gray-100 rounded-16">
                    <div className="">
                      <div className="product-details__thumb flex-center h-100">
                        <img
                          src={product.productMainImage}
                          alt={product.productName}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/assets/images/thumbs/productu.png";
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-24">
                    <div className="product-details__images-slider">
                      {product.productImages.length > 0 && (
                        <Slider {...settingsThumbs}>
                          {product.productImages?.map((image, index) => (
                            <div
                              className="center max-w-120 max-h-120 h-100 flex-center border border-gray-100 rounded-16 p-8"
                              key={index}
                              onClick={() => setMainImage(image)}
                            >
                              <img
                                className="thum"
                                src={image}
                                alt={`Thumbnail ${index}`}
                              />
                            </div>
                          ))}
                        </Slider>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="product-details__content">
                  <h5 className="mb-12">{product?.productName}</h5>
                  <div className="flex-align flex-wrap gap-12">
                    <span className="text-gray-900">
                      {" "}
                      <span className="text-gray-400">SKU:</span>
                      {product?.productSku}{" "}
                    </span>
                  </div>
                  <span className="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block" />
                  <h6 className="mb-24">Product Short Description</h6>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        product?.productShortDescription
                      ),
                    }}
                  />

                  <span className="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block" />

                  <div className=" d-flex justify-content-between flex-wrap gap-32">
                    <div className="flex-align gap-8">
                      <span className="text-md text-gray-500 text-decoration-line-through">
                        AED {parseFloat(finalRegularPrice).toFixed(2)}
                      </span>

                      <h5 className="mb-0 text-xl">
                        AED {parseFloat(finalSalePrice).toFixed(2)}
                      </h5>
                    </div>
                    <div className="flex-align gap-12">
                      {!added && (
                        <button
                          onClick={handleWishlist}
                          className="w-52 h-52 flex-center rounded-circle bg-btn-gray text-light"
                        >
                          <i className="ph ph-heart" />
                        </button>
                      )}
                    </div>
                  </div>
                  <span className="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block" />
                  <div className="mb-20">
                    <span className="text-dark">Category :</span>
                    <span className="text-gray-400 px-3">
                      {product?.productCategories
                        ?.map((cat) => cat.name)
                        .join(", ")}
                    </span>
                  </div>
                  {product?.productAttributes?.map((attr) => (
                    <div
                      key={attr._id}
                      className="mb-10 d-flex align-items-center gap-3 flex-wrap"
                    >
                      {/* Attribute Name (Shade / Size / Color etc.) */}
                      <span className="fw-bold text-dark">
                        {attr.attributeName} :
                      </span>

                      {/* Attribute Values (buttons) */}
                      <div className="d-flex align-items-center gap-2 flex-wrap">
                        {attr.attributeValues?.map((val) => {
                          const isSelected =
                            selectedAttributes[attr.attributeName]
                              ?.attributeValue === val.attributeValue;

                          return (
                            <button
                              key={val._id}
                              type="button"
                              className={`btn btn-sm border-0 ${
                                isSelected
                                  ? "bg-black text-white"
                                  : "text-white"
                              }`}
                              style={{
                                backgroundColor: isSelected
                                  ? "black"
                                  : "#bc0101",
                              }}
                              onClick={() =>
                                handleSelect(attr.attributeName, val)
                              }
                            >
                              {val.attributeValue}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  <span className="text-gray-900 d-block mb-8">Quantity:</span>
                  <div className="flex-between gap-16 flex-wrap">
                    <div className="flex-align flex-wrap gap-16">
                      <div className="border border-gray-100 rounded-pill py-9 px-16 flex-align">
                        <button
                          onClick={decrementQuantity}
                          type="button"
                          className="quantity__minus p-4 text-gray-700 hover-text-main-600 flex-center"
                        >
                          <i className="ph ph-minus" />
                        </button>
                        <input
                          type="number"
                          className="quantity__input border-0 text-center w-32 text-dark"
                          value={quantity}
                          readOnly
                        />
                        <button
                          onClick={incrementQuantity}
                          type="button"
                          className="quantity__plus p-4 text-gray-700 hover-text-main-600 flex-center"
                        >
                          <i className="ph ph-plus" />
                        </button>
                      </div>
                      <button
                        onClick={handleAddToCart}
                        className="btn bg-btn-yellow rounded-pill flex-align d-inline-flex gap-8 px-48"
                      >
                        <i className="ph ph-shopping-cart" /> Add To Cart
                      </button>
                      <Link
  to="#"
  onClick={() => {
    const productUrl = `${window.location.origin}/product-details/${product.productSlug}`;
    const message = `Check out this product:\n\n${product.productName}\n${productUrl}`;

    const whatsappUrl = `https://wa.me/971502530888?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  }}
  className="btn bg-success-btn rounded-pill flex-align d-inline-flex gap-8"
>
  <i className="ph ph-whatsapp-logo" /> Order on WhatsApp
</Link>


                    </div>
                  </div>
                  <span className="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block" />
                </div>
              </div>
            </div>
          </div>

          {/*Second Column*/}

          <div className="col-lg-3">
            <div className="product-details__sidebar border border-gray-100 rounded-16 overflow-hidden">
              <div className="p-24">
                <div className="flex-between bg-main-600 rounded-pill p-8">
                  <div className="flex-align gap-8">
                    <span className="w-44 h-44 bg-white rounded-circle flex-center text-2xl">
                      <i className="ph ph-storefront" />
                    </span>
                    <span className="text-white">by Udemandme</span>
                  </div>
                  <Link
                    to="/shop"
                    className="btn btn-white rounded-pill text-uppercase"
                  >
                    View Store
                  </Link>
                </div>
              </div>
              <div className="p-24  d-flex align-items-start gap-24 border-bottom  border-top border-gray-100">
                <span className="w-44 h-44 bg-btn-primecolor text-light rounded-circle flex-center text-2xl flex-shrink-0">
                  <i className="ph-fill ph-truck" />
                </span>
                <div className="">
                  <h6 className="text-sm mb-8 text-dark">Fast Delivery</h6>
                  <p className=" text-dark">
                    Lightning-fast shipping, guaranteed.
                  </p>
                </div>
              </div>
              <div className="p-24  d-flex align-items-start gap-24 border-bottom border-gray-100">
                <span className="w-44 h-44 bg-btn-primecolor text-light rounded-circle flex-center text-2xl flex-shrink-0">
                  <i className="ph-fill ph-arrow-u-up-left" />
                </span>
                <div className="">
                  <h6 className="text-sm mb-8 text-dark">
                    Free 90-day returns
                  </h6>
                  <p className=" text-dark">
                    Shop risk-free with easy returns.
                  </p>
                </div>
              </div>
              <div className="p-24  d-flex align-items-start gap-24 border-bottom border-gray-100">
                <span className="w-44 h-44 bg-btn-primecolor text-light rounded-circle flex-center text-2xl flex-shrink-0">
                  <i className="ph-fill ph-check-circle" />
                </span>
                <div className="">
                  <h6 className="text-sm mb-8 text-dark">
                    Pickup available at Shop location
                  </h6>
                  <p className=" text-dark">Usually ready in 24 hours</p>
                </div>
              </div>
              <div className="p-24  d-flex align-items-start gap-24 border-bottom border-gray-100">
                <span className="w-44 h-44 bg-btn-primecolor text-light rounded-circle flex-center text-2xl flex-shrink-0">
                  <i className="ph-fill ph-credit-card" />
                </span>
                <div className="">
                  <h6 className="text-sm mb-8 text-dark">Payment</h6>
                  <p className=" text-dark">
                    Payment upon receipt of goods, Payment by card in the
                    department, Google Pay, Online card.
                  </p>
                </div>
              </div>
              <div className="p-24  d-flex align-items-start gap-24 border-bottom border-gray-100">
                <span className="w-44 h-44 bg-btn-primecolor text-light rounded-circle flex-center text-2xl flex-shrink-0">
                  <i className="ph-fill ph-check-circle" />
                </span>
                <div className="">
                  <h6 className="text-sm mb-8 text-dark">Warranty</h6>
                  <p className=" text-dark">
                    The Consumer Protection Act does not provide for the return
                    of this product of proper quality.
                  </p>
                </div>
              </div>
              <div className="p-24  d-flex align-items-start gap-24 border-bottom border-gray-100">
                <span className="w-44 h-44 bg-btn-primecolor text-light rounded-circle flex-center text-2xl flex-shrink-0">
                  <i className="ph-fill ph-package" />
                </span>
                <div className="">
                  <h6 className="text-sm mb-8 text-dark">Packaging</h6>
                  <p className=" text-dark">
                    Research &amp; development value proposition graphical user
                    interface investor.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/*Row end Product Up*/}

        <div className="pt-80">
          <div className="product-dContent border rounded-24">
            <div className="product-dContent__header border-bottom border-gray-100 flex-between flex-wrap gap-16">
              <ul
                className="nav common-tab nav-pills mb-3"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active "
                    id="pills-description-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-description"
                    type="button"
                    role="tab"
                    aria-controls="pills-description"
                    aria-selected="true"
                  >
                    Description
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-reviews-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-reviews"
                    type="button"
                    role="tab"
                    aria-controls="pills-reviews"
                    aria-selected="false"
                  >
                    Reviews
                  </button>
                </li>
              </ul>
              <Link
                to="#"
                className="btn bg-dark rounded-16 flex-align gap-8 text-dark hover-bg-main-600 "
              >
                100% Satisfaction Guaranteed
              </Link>
            </div>

            <div className="product-dContent__box">
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-description"
                  role="tabpanel"
                  aria-labelledby="pills-description-tab"
                  tabIndex={0}
                >

                  {/* Product Desc */}

                  <div className="mb-40">
                    <h6 className="mb-24">Product Description</h6>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          product?.productLongDescription
                        ),
                      }}
                    />
                  </div>


                  {/* Product Specification */}

                  <div className="mb-40">
                    <h6 className="mb-24">Product Specifications</h6>
                    <ul className="mt-32">
                      {product?.productName?.trim() && (
                        <li className="text-gray-400 mb-14 flex-align gap-14">
                          <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                            <i className="ph ph-check" />
                          </span>
                          <span className="text-heading fw-medium">
                            Product Name:
                            <span className="text-gray-500">
                              {" "}
                              {product.productName}
                            </span>
                          </span>
                        </li>
                      )}

                      {product?.productBrands?.length > 0 && (
                        <li className="text-gray-400 mb-14 flex-align gap-14">
                          <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                            <i className="ph ph-check" />
                          </span>
                          <span className="text-heading fw-medium">
                            Brand:
                            <span className="text-gray-500">
                              {" "}
                              {product.productBrands[0].name}
                            </span>
                          </span>
                        </li>
                      )}

                      {product?.productSku && (
                        <li className="text-gray-400 mb-14 flex-align gap-14">
                          <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                            <i className="ph ph-check" />
                          </span>
                          <span className="text-heading fw-medium">
                            Item Code:
                            <span className="text-gray-500">
                              {" "}
                              {product.productSku}
                            </span>
                          </span>
                        </li>
                      )}

                      {product?.productCategories?.length > 0 && (
                        <li className="text-gray-400 mb-14 flex-align gap-14">
                          <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                            <i className="ph ph-check" />
                          </span>
                          <span className="text-heading fw-medium">
                            Categories:
                            <span className="text-gray-500">
                              {" "}
                              {product.productCategories
                                .map((cat) => cat.name)
                                .join(", ")}
                            </span>
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  </div>




                  <div
                  className="tab-pane fade"
                  id="pills-reviews"
                  role="tabpanel"
                  aria-labelledby="pills-reviews-tab"
                  tabIndex={0}
                >
                  <div className="row g-4">
                      <div className="col-lg-12">
                      <div className="align-items-start gap-24">
                        <div className="d-flex align-items-start gap-24 pb-44 border-bottom border-gray-100 mb-44">
                          <div>
                            {reviews.length === 0 ? (
                              <p className="text-muted">No reviews yet.</p>
                            ) : (
                              reviews.slice(0, 2).map((review) => (
                                <div
                                  key={review._id}
                                  className="flex-grow-1 border-bottom pb-32 mb-32"
                                >
                                  <div className="flex-align gap-8">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <span
                                        key={star}
                                        className={`text-15 fw-medium d-flex ${
                                          review.rating >= star
                                            ? "text-warning-600"
                                            : "text-gray-400"
                                        }`}
                                      >
                                        <i className="ph-fill ph-star" />
                                      </span>
                                    ))}
                                  </div>
                                  <h6 className="mb-14 text-md mt-24">
                                    {review.reviewTitle}
                                  </h6>
                                  <p className="text-gray-700">
                                    {review.reviewText}
                                  </p>
                                </div>
                              ))
                            )}
                          </div>
                        </div>


                        <div className="reviews-list mt-48">
                          {displayedReviews.map((review) => (
                            <div
                              key={review._id}
                              className="flex-grow-1 border-bottom pb-32 mb-32"
                            >
                              <div className="flex-between align-items-start gap-8">
                                <div>
                                  <h6 className="mb-12 text-md">
                                    {review.userId?.name || "Anonymous"}
                                  </h6>
                                  <div className="flex-align gap-8">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <span
                                        key={star}
                                        className={`text-15 fw-medium d-flex ${
                                          review.rating >= star
                                            ? "text-warning-600"
                                            : "text-gray-400"
                                        }`}
                                      >
                                        <i className="ph-fill ph-star" />
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <span className="text-gray-800 text-xs">
                                  {new Date(
                                    review.createdAt
                                  ).toLocaleDateString()}
                                </span>
                              </div>

                              <h6 className="mb-14 text-md mt-24">
                                {review.reviewTitle}
                              </h6>
                              <p className="text-gray-700">
                                {review.reviewText}
                              </p>

                              <div className="flex-align gap-20 mt-44">
                                <button className="flex-align gap-12 text-gray-700 hover-text-main-600">
                                  <i className="ph-bold ph-thumbs-up" />
                                  Like
                                </button>
                                <span className="flex-align gap-12 text-gray-700">
                                  <i className="ph-bold ph-arrow-bend-up-left" />
                                  Reply
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      


                      <div className="mt-56">
                          <h6 className="mb-24">Write a Review</h6>
                          <span className="text-heading mb-8">
                            What is it like to Product?
                          </span>

                          {/* ⭐ Star Rating */}
                          <div className="flex-align gap-12">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className={`fw-medium d-flex cursor-pointer transition-all ${
                                  (hover || rating) >= star
                                    ? "text-warning-600"
                                    : "text-muted"
                                }`}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(0)}
                                style={{ fontSize: "28px" }}
                              >
                                <i className="ph-fill ph-star" />
                              </span>
                            ))}
                          </div>

                          {/* Selected rating show */}
                          {rating > 0 && (
                            <p className="mt-3 text-success text-lg">
                              You selected: <strong>{rating}</strong> star(s)
                            </p>
                          )}
                        </div>


                        <div className="mt-32">
                          <form onSubmit={handlereview}>
                            <div className="mb-32">
                              <label
                                htmlFor="title"
                                className="text-neutral-600 mb-8"
                              >
                                Review Title
                              </label>
                              <input
                                type="text"
                                className="common-input rounded-8"
                                id="title"
                                name="reviewtitle"
                                placeholder="Great Products"
                              />
                            </div>
                            <div className="mb-32">
                              <label
                                htmlFor="desc"
                                className="text-neutral-600 mb-8"
                              >
                                Review Content
                              </label>
                              <textarea
                                className="common-input rounded-8"
                                id="desc"
                                name="reviewtext"
                              />
                            </div>
                            <button
                              type="submit"
                              className="btn btn-main rounded-pill mt-48"
                            >
                              Submit Review
                            </button>
                          </form>
                        </div>


                    </div>

                    {/*Row End Review*/}


        </div>
                  </div>
                </div>

                     
                
                
              </div>



              
              </div>



            </div>
          </div>

              </div>
              </section>
      
   
  );
};

export default ProductDetailsOne;
