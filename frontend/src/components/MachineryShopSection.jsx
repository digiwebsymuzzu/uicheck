import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { Link } from "react-router-dom";
// import ReactSlider from "react-slider";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

const ShopSection = () => {
  const { addToCart } = useContext(CartContext);
  let [grid, setGrid] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  const [activeFilterGroup, setActiveFilterGroup] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);


    //REPLACE your current useEffect for fetching categories
useEffect(() => {
  const fetchCategories = async (pageNum = 1) => {
    try {
      const res = await fetch(`http://localhost:5000/api/categories?page=${pageNum}&limit=12`);
      const data = await res.json();
      if (data.success) {
        if (pageNum === 1) {
          setCategories(data.data);
        } else {
          setCategories(prev => [...prev, ...data.data]);
        }
        setPages(data.pages || 1);
        setPage(pageNum);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };
  fetchCategories(1);
}, []);

// Observer to trigger category lazy load
const categoryObserver = useRef();
const lastCategoryRef = useCallback(
  (node) => {
    if (loading) return;
    if (categoryObserver.current) categoryObserver.current.disconnect();
    categoryObserver.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && page < pages) {
        fetch(`http://localhost:5000/api/categories?page=${page + 1}&limit=12`)
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              setCategories(prev => [...prev, ...data.data]);
              setPage(page + 1);
            }
          })
          .catch(err => console.error("Error loading more categories:", err));
      }
    });
    if (node) categoryObserver.current.observe(node);
  },
  [page, pages, loading]
);


  //   for managing letter case by frontend
  const formatCategoryName = (name) => {
    return name
      .toLowerCase()
      .split(/[\s-]/) // split by space or hyphen
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "); // join back with space
  };
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const res = await fetch("https://udemandme.cloud/api/attributes");
        const data = await res.json();
        if (data.success) {
          setAttributes(data.data);
        }
      } catch (err) {
        console.error("Error fetching attributes:", err);
      }
    };
    fetchAttributes();
  }, [page]);

  let [active, setActive] = useState(false);
  let sidebarController = () => {
    setActive(!active);
  };
  const displayName = (name) => {
    switch (name) {
      case "Shoe Size Required":
        return "Shoe Size"; // shorten it
      default:
        return name; // fallback to original
    }
  };

const fetchProducts = async (pageToLoad = 1) => {
  setLoading(true);
  try {
    const superParentName = "machinery";
    const limit = 40; // Load 40 products at a time

    const res = await fetch(
      `https://udemandme.cloud/api/products/superparent/${superParentName}?page=${pageToLoad}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (data.success) {
      const formattedProducts = data.products.map((product) => ({
        ...product,
        productCategories: product.categories || [], // consistent mapping
      }));

      // Append new products to existing list
      setProducts((prev) => [...prev, ...formattedProducts]);
      setPages(data.pages); // total pages from API
      setPage(data.page); // current page from API
    } else {
      console.error(data.message || "Failed to fetch products");
    }
  } catch (err) {
    console.error("Error fetching products:", err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchProducts(page);
  }, [page]); // ✅ page add kar diya
  const [sortOption, setSortOption] = useState("default");
  const [originalProducts, setOriginalProducts] = useState([]);

  const handleSort = (e) => {
    const value = e.target.value;
    setSortOption(value);

    let sortedProducts = [...products];

    if (value === "low") {
      sortedProducts.sort(
        (a, b) =>
          (a.productSalePriceInr || a.productRegularPriceInr) -
          (b.productSalePriceInr || b.productRegularPriceInr)
      );
    } else if (value === "high") {
      sortedProducts.sort(
        (a, b) =>
          (b.productSalePriceInr || b.productRegularPriceInr) -
          (a.productSalePriceInr || a.productRegularPriceInr)
      );
    } else {
      // default case → reset karo
      sortedProducts = [...originalProducts];
    }

    setProducts(sortedProducts);
  };
  // Infinite scroll logic
  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page < pages) {
          fetchProducts(page + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, page, pages]
  );


  // Filter
const handleFilterSelect = (group, value) => {
  if (!activeFilterGroup || activeFilterGroup === group) {
    let newSelected = [];
    if (selectedFilters.includes(value)) {
      newSelected = selectedFilters.filter(v => v !== value); // deselect
    } else {
      newSelected = [...selectedFilters, value]; // select
    }
    setSelectedFilters(newSelected);

    if (newSelected.length === 0) {
      setActiveFilterGroup(null); // reset if nothing selected
    } else {
      setActiveFilterGroup(group);
    }
  } else {
    // switching to a new group
    setActiveFilterGroup(group);
    setSelectedFilters([value]);
  }
};


 useEffect(() => {
  if (activeFilterGroup && selectedFilters.length > 0) {
    const params = new URLSearchParams({
      page: 1,
      limit: 20,
    });

    if (activeFilterGroup === 'category') {
      params.append('category', selectedFilters.join(','));
    } else {
      params.append('attribute', activeFilterGroup);
      params.append('values', selectedFilters.join(','));
    }

    fetch(`http://localhost:5000/api/products/filter?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProducts(data.products);
          setPages(data.pages);
          setPage(1);
        }
      })
      .catch(err => console.error(err));
  } else if (!activeFilterGroup) {
    // No filter → fetch default products
    fetchProducts(1);
  }
}, [selectedFilters, activeFilterGroup]);

  return (
    <section className="shop py-80">
      <div className={`side-overlay ${active && "show"}`}></div>
      <div className="container container-lg">
        <div className="row">
          {/* Sidebar Start */}
          <div className="col-12  col-lg-3">
            {" "}
            {/* col-12 = mobile full width, col-lg-3 = desktop */}
            <div
              className={`shop-sidebar ${
                active ? "d-block" : "d-none d-lg-block"
              }`}
              style={{
                position: "sticky",
                top: "80px",
                maxHeight: "calc(100vh - 100px)",
                overflowY: "auto",
                zIndex: 999,
                backgroundColor: "white",
              }}
            >
              {/* Mobile Close Button */}
              <button
                onClick={sidebarController}
                type="button"
                className="shop-sidebar__close d-lg-none d-flex w-32 h-32 flex-center border border-gray-100 rounded-circle hover-bg-main-600 position-absolute end-0 me-3 mt-3 hover-text-white hover-border-main-600"
              >
                <i className="ph ph-x" />
              </button>

              {/* Sidebar Content */}
              <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                  Product Category
                </h6>
                <ul className="max-h-540 overflow-y-auto scroll-sm">
  {categories.map((cat, index) => (
    <li
      key={cat._id}
      className="mb-24"
      ref={index === categories.length - 1 ? lastCategoryRef : null} // 👈 attach observer to last
    >
      <div className="form-check common-check">
        <input
          type="checkbox"
          id={`category-${cat._id}`}
          className="form-check-input"
          checked={
            activeFilterGroup === "category" &&
            selectedFilters.includes(cat.name)
          }
          disabled={activeFilterGroup && activeFilterGroup !== "category"}
          onChange={() => handleFilterSelect("category", cat.name)}
        />
        <label
          htmlFor={`category-${cat._id}`}
          className="form-check-label text-gray-900 hover-text-main-600"
        >
          {formatCategoryName(cat.name)}
        </label>
      </div>
    </li>
  ))}
</ul>
              </div>

              {attributes.map((attr) => (
                <div
                  key={attr.id}
                  className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32"
                >
                  <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                    Filter by {displayName(attr.name)}
                  </h6>
                   <ul className="max-h-540 overflow-y-auto scroll-sm">
      {attr.items.map((item, index) => (
        <li key={item.id || index} className="mb-24">
          <div className="form-check common-check">
            <input
              type="checkbox"
              id={`${attr.slug}-${index}`}
              className="form-check-input"
              checked={
                activeFilterGroup === attr.name &&
                selectedFilters.includes(item.name)
              }
              disabled={
                activeFilterGroup && activeFilterGroup !== attr.name
              }
              onChange={() => handleFilterSelect(attr.name, item.name)}
            />
            <label
              htmlFor={`${attr.slug}-${index}`}
              className="form-check-label"
            >
              {item.name}
            </label>
          </div>
        </li>
      ))}
    </ul>
                </div>
              ))}

            </div>
          </div>
          {/* Sidebar End */}

          {/* Content Start */}
          <div className="col-lg-9">
            {/* Top Start */}
            <div className="flex-between gap-16 flex-wrap mb-40 ">
              <span className="text-gray-900">
                Showing Total {products.length} result
              </span>
              <div className="position-relative flex-align gap-16 flex-wrap">
                <div className="list-grid-btns flex-align gap-16">
                  <button
                    onClick={() => setGrid(true)}
                    type="button"
                    className={`w-44 h-44 flex-center border rounded-6 text-2xl list-btn border-gray-100 ${
                      grid === true && "border-main-600 text-white bg-main-600"
                    }`}
                  >
                    <i className="ph-bold ph-list-dashes" />
                  </button>
                  <button
                    onClick={() => setGrid(false)}
                    type="button"
                    className={`w-44 h-44 flex-center border rounded-6 text-2xl grid-btn border-gray-100 ${
                      grid === false && "border-main-600 text-white bg-main-600"
                    }`}
                  >
                    <i className="ph ph-squares-four" />
                  </button>
                </div>
                <div className="position-relative text-gray-500 flex-align gap-4 text-14">
                  <select
                    value={sortOption}
                    onChange={handleSort}
                    className="form-control common-input px-14 py-14 text-inherit rounded-6 w-auto"
                    id="sorting"
                  >
                    {/* <option value="default">Sort By Price</option> */}
                    <option value="low">Low to High</option>
                    <option value="high">High to Low</option>
                  </select>
                </div>
                <button
                  onClick={sidebarController}
                  type="button"
                  className="w-44 h-44 d-lg-none d-flex flex-center border border-gray-100 rounded-6 text-2xl sidebar-btn"
                >
                  <i className="ph-bold ph-funnel" />
                </button>
              </div>
            </div>
            {/* Top End */}
            <div className={`list-grid-wrapper ${grid && "list-view"}`}>
              {products.map((product) => (
                <div
                  key={product.id}
                  className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2"
                >
                  <Link
                    to={`/product-details/${product.productSlug}`}
                    state={{ id: product._id }}
                    className="product-card__thumb flex-center rounded-8 position-relative"
                  >
                    <img
                      src={
                        product.productMainImage ||
                        "assets/images/thumbs/productu.png" // fallback
                      }
                      alt={product.productName}
                      className="w-auto max-w-unset product-img"
                    />
                   
                    {new Date(product.createdAt) >
                      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                      <span className="product-card__badge bg-primary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                        New
                      </span>
                    )}
                  </Link>

                  <div
                    style={{ marginTop: "8px" }}
                    className="product-card__content mt-16"
                  >
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

                     
                    {/* ✅ Stock Status */}
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
                        {product.productStock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                    <span className="text-sm h6 primecolor pb-1 mt-4">
                      {product?.productCategories
                        ?.slice(0, 2) // sirf pehli 2 categories
                        .map((cat) => cat.name)
                        .join(", ")}
                    </span>

                    <div className="product-card__price my-20">
                      <span
                        className="text-gray-400 text-md fw-semibold text-decoration-line-through"
                        style={{ marginRight: "10px" }}
                      >
                        AED {product.productRegularPriceInr}
                      </span>
                      <span className="text-heading text-md fw-semibold ml-2">
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

                          const payload = product?.productSalePriceInr
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
                            : null;

                          addToCart(product, 1, payload);
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
              ))}
    
    </div>



            {/* Pagination Start */}
            <div>
              <div>
                {products.map((product, index) => {
                  if (index === products.length - 1) {
                    return (
                      <div key={product.id} ref={lastProductRef}>
                        {product.name}
                      </div>
                    );
                  } else {
                    return <div key={product.id}>{product.name}</div>;
                  }
                })}
              </div>
              {loading && <p>Loading...</p>}
            </div>
            {/* Pagination End */}
          </div>
          {/* Content End */}
        </div>
      </div>
    </section>
  );
};

export default ShopSection;