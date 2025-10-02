import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PromotionalTwo = () => {
  const items = [
    {
      bg: "promo-bg-img3.png",
      thumb: "promo-img3.png",
      title: "Welding Machines",
      //   subtitle: "Start From $250",
    },
    {
      bg: "promo-bg-img3.png",
      thumb: "promo-bg-img32.png",
      title: "Welding Rods",
      //   subtitle: "Start From $250",
    },
    {
      bg: "promo-bg-img3.png",
      thumb: "promo-bg-img323.png",
      title: "Cutting Tips",
      //   subtitle: "Start From $250",
    },
    {
      bg: "promo-bg-img3.png",
      thumb: "promo-img3.png",
      title: "Welding Machines",
      //   subtitle: "Start From $250",
    },
    {
      bg: "promo-bg-img3.png",
      thumb: "promo-bg-img32.png",
      title: "Welding Rods",
      //   subtitle: "Start From $250",
    },
    {
      bg: "promo-bg-img3.png",
      thumb: "promo-bg-img323.png",
      title: "Cutting Tips",
      //   subtitle: "Start From $250",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="promotional-banner mt-32 overflow-hidden">
      <div className="container container-lg overflow-hidden">
        <Slider {...settings}>
          {items.map((item, index) => (
            <div key={index} className="w-100">
              <div className="position-relative rounded-16 overflow-hidden z-1 p-32">
                <img
                  src={`assets/images/bg/${item.bg}`}
                  alt=""
                  className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover z-n1"
                />
                <div className="flex-between flex-wrap gap-16">
                  <div>
                    <span className="text-heading text-sm mb-8">
                      {item.subtitle}
                    </span>
                    <h6 className="mb-0">{item.title}</h6>
                    <Link
                      to="/shop"
                      className="d-inline-flex align-items-center gap-8 mt-16 text-heading text-md fw-medium border border-top-0 border-end-0 border-start-0 border-gray-900 hover-text-main-two-600 hover-border-main-two-600"
                    >
                      Shop Now
                      <span className="icon text-md d-flex">
                        <i className="ph ph-plus" />
                      </span>
                    </Link>
                  </div>
                  <div className="pe-xxl-4">
                    <img
                      src={`assets/images/thumbs/${item.thumb}`}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default PromotionalTwo;
