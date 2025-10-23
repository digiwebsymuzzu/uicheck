import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BannerTwo = () => {
  const settings = {
    dots: false, // ✅ Dots removed
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    pauseOnHover: false,
    arrows: false, // ✅ Arrows hidden for clean look
  };

  const slides = [{ bg: "assets/images/bg/demo-banner.png" }];

  return (
    <div className="banner-two mt-24">
      <div className="container container-lg">
        <div className="banner-two-wrapper d-flex align-items-start">
          {/* ✅ Responsive height & rounded edges */}
          <div
            className="banner-item-two-wrapper position-relative flex-grow-1 mb-0"
            style={{
              overflow: "hidden",
              height: "100%",
              borderRadius: "24px",
            }}
          >
            <Slider {...settings}>
              {slides.map((slide, index) => (
                <div key={index} className="position-relative w-100 h-100">
                  {/* ✅ Full-cover responsive image */}
                  <img
                    src={slide.bg}
                    alt={`Banner ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "24px",
                    }}
                  />
                  {/* ✅ Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      borderRadius: "24px",
                    }}
                  ></div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      {/* ✅ Responsive styles */}
    </div>
  );
};

export default BannerTwo;
