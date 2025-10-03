import React from "react";
import Slider from "react-slick";
import { useState, useEffect } from "react";

const BrandTwo = () => {
  const [brands, setBrands] = useState([]);
  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
      <button
        type="button"
        onClick={onClick}
        className={` ${className} slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-two-600 text-xl hover-bg-main-two-600 hover-text-white transition-1`}
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
        className={`${className} slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-two-600 text-xl hover-bg-main-two-600 hover-text-white transition-1`}
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
    slidesToShow: 8,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1599,
        settings: {
          slidesToShow: 7,
        },
      },
      {
        breakpoint: 1399,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 424,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 359,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch("https://147.93.108.82:5000/api/brand");
        const data = await res.json();
        if (data.success) {
          setBrands(data.data); // backend me "data" array return ho rha hai
        }
      } catch (err) {
        console.error("Error fetching brands:", err);
      }
    };
    fetchBrands();
  }, []);
  return (
    <div className="top-brand py-80">
      <div className="container container-lg">
        <div className="border border-gray-100 p-24 rounded-16">
          <div className="section-heading mb-24">
            <div className="flex-between mr-point flex-wrap gap-8">
              <h5 className="mb-0">Top Brands</h5>
            </div>
          </div>
          <div className="top-brand__slider">
            <Slider {...settings}>
              {brands.map((brand) => (
                <div key={brand._id}>
                  <div className="top-brand__item flex-center rounded-8 border border-gray-100 hover-border-gray-200 transition-1 px-8">
                    <img
                      src={brand.brand_img} // 👈 yaha backend se aayi image lagegi
                      alt={brand.name}
                      className="img-fluid"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandTwo;
