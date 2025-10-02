import React from "react";
import Preloader from "../helper/Preloader";

import ProductDetailsOne from "../components/ProductDetailsOne";
import NewArrivalTwo from "../components/NewArrivalTwo";
import ShippingOne from "../components/ShippingOne";

import FooterTwo from "../components/FooterTwo";
import BottomFooter from "../components/BottomFooter";
import Breadcrumb from "./../components/Breadcrumb";
import ScrollToTop from "react-scroll-to-top";
import ColorInit from "../helper/ColorInit";
import HeaderTwo from "../components/HeaderTwo";

const ProductDetailsPageOne = () => {
  return (
    <>
      {/* Preloader */}
      <Preloader />

      {/* ColorInit */}
      <ColorInit color={false} />

      {/* ScrollToTop */}
      <ScrollToTop smooth color="#9e2929ff" />

      {/* HeaderOne */}
      <HeaderTwo />

      {/* Breadcrumb */}
      <Breadcrumb title={"Product Details"} />

      {/* ProductDetailsOne */}
      <ProductDetailsOne />

      {/* NewArrivalTwo */}
      <NewArrivalTwo />

      {/* ShippingOne */}
      <ShippingOne />

      {/* FooterTwo */}
      <FooterTwo />

      {/* BottomFooter */}
      <BottomFooter />
    </>
  );
};

export default ProductDetailsPageOne;
