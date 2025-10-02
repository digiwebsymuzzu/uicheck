import { memo } from 'react';
import React from "react";
import Preloader from "../helper/Preloader";
import HeaderTwo from "../components/HeaderTwo";
import Breadcrumb from "../components/Breadcrumb";
import SanitaryShopSection from "../components/SanitaryShopSection";
import ShippingOne from "../components/ShippingOne";
import FooterTwo from "../components/FooterTwo";
import ColorInit from "../helper/ColorInit";
import ScrollToTop from "react-scroll-to-top";

const Sanitary = () => {
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

      {/* SanitaryShopSection */}
      <SanitaryShopSection />

      {/* ShippingTwo */}
      <ShippingOne />

      {/* FooterTwo */}
      <FooterTwo />
    </>
  );
};

export default memo(Sanitary);