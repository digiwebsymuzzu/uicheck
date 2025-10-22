import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BannerTwo = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    arrows: false,
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          zIndex: 2,
        }}
      >
        <ul style={{ margin: 0, padding: 0, display: "flex", gap: "8px" }}>
          {dots}
        </ul>
      </div>
    ),
    customPaging: () => (
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.5)",
          transition: "all 0.3s ease",
        }}
      ></div>
    ),
  };

  const slides = [{ bg: "assets/images/bg/demo-banner.png" }];

  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              width: "100%",
              height: "70vh",
              display: "flex", // ✅ flex to remove inline-block gaps
            }}
          >
            <img
              src={slide.bg}
              alt={`Slide ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        ))}
      </Slider>

      {/* 🔥 Remove slick-slider gaps completely */}
    </div>
  );
};

export default BannerTwo;
