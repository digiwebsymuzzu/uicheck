import { memo } from 'react';
import React from "react";
import Preloader from "../helper/Preloader";
import HeaderTwo from "../components/HeaderTwo";
import Breadcrumb from "../components/Breadcrumb";
import MachineryShopSection from "../components/MachineryShopSection";
import ShippingOne from "../components/ShippingOne";
import FooterTwo from "../components/FooterTwo";
import ColorInit from "../helper/ColorInit";
import ScrollToTop from "react-scroll-to-top";

const Machinery = () => {
  return (
    <>
      {/* ColorInit */}
      <ColorInit color={true} />

      {/* ScrollToTop */}
      <ScrollToTop smooth color="#FA6400" />

      {/* Preloader */}
      <Preloader />

      {/* HeaderOne */}
      <HeaderTwo category={true} />

      {/* Breadcrumb */}
      <Breadcrumb title={"Shop"} />

      {/* MachineryShopSection */}
      <MachineryShopSection />

      {/* ShippingTwo */}
      <ShippingOne />

      {/* FooterTwo */}
      <FooterTwo />
    </>
  );
};

export default memo(Machinery);