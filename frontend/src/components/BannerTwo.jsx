import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const BannerTwo = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true, // smooth background transition
  };

  const slides = [
    {
      bg: "assets/images/bg/banner-two-bg.png",
      title: "Get The Sound You Love For Less",
      subtitle: "Starting at only $250",
      btnText: "Shop Now",
    },
    {
      bg: "assets/images/bg/banner-image2.png",
      title: "Premium Headphones With 40% Off",
      subtitle: "Limited Time Offer",
      btnText: "Explore Now",
    },
  ];

  return (
    <div className="banner-two mt-24">
      <div className="container container-lg">
        <div className="banner-two-wrapper d-flex align-items-start">
          <div className="banner-item-two-wrapper rounded-24 overflow-hidden position-relative arrow-center flex-grow-1 mb-0">
            <div className="banner-item-two__slider">
              <Slider {...settings}>
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className="banner-item-two position-relative"
                  >
                    {/* 🔥 Background image */}
                    <img
                      src={slide.bg}
                      alt={`Banner ${index + 1}`}
                      className="position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 z-n1 object-fit-cover rounded-24 img-fluid"
                    />

                    {/* 🔥 Black Overlay */}
                    <div
                      className="position-absolute top-0 start-0 w-100 h-100 rounded-24"
                      style={{
                        background: "rgba(0, 0, 0, 0.5)", // adjust darkness here (0.5 = 50%)
                        zIndex: 0,
                      }}
                    ></div>

                    {/* 🔥 Content */}
                    <div className="banner-item-two__content position-relative text-white z-1">
                      <span className="mb-8 h6 d-block">{slide.subtitle}</span>
                      <h2 className="banner-item-two__title bounce text-white">
                        {slide.title}
                      </h2>
                      <Link
                        to="/shop"
                        className="btn btn-outline-white d-inline-flex align-items-center rounded-pill gap-8 mt-48"
                      >
                        {slide.btnText}
                        <span className="icon text-xl d-flex">
                          <i className="ph ph-shopping-cart-simple" />
                        </span>
                      </Link>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerTwo;
