import React from "react";
import Preloader from "../helper/Preloader";

import ProductListOne from "../components/ProductListOne";

import RecommendedOne from "../components/RecommendedOne";
import HotDealsOne from "../components/HotDealsOne";

import BestSellsOne from "../components/BestSellsOne";

import ShippingOne from "../components/ShippingOne";

import BottomFooter from "../components/BottomFooter";
import ScrollToTop from "react-scroll-to-top";
import ColorInit from "../helper/ColorInit";
const HomePageOne = () => {
  return (
    <>
      {/* Preloader */}
      <Preloader />

      {/* ScrollToTop */}
      <ScrollToTop smooth color="#299E60" />

      {/* ColorInit */}
      <ColorInit color={false} />

      {/* ProductListOne */}
      <ProductListOne />

      {/* RecommendedOne */}
      <RecommendedOne />

      {/* HotDealsOne */}
      <HotDealsOne />

      {/* BestSellsOne */}
      <BestSellsOne />

      {/* ShippingOne */}
      <ShippingOne />

      {/* BottomFooter */}
      <BottomFooter />
    </>
  );
};

export default HomePageOne;
