import React from 'react'
import Preloader from "../helper/Preloader";
import ColorInit from "../helper/ColorInit";
import HeaderTwo from "../components/HeaderTwo";
import Breadcrumb from "../components/Breadcrumb";
import FooterTwo from "../components/FooterTwo";
import BottomFooter from "../components/BottomFooter";
import ShippingOne from "../components/ShippingOne";
import ScrollToTop from "react-scroll-to-top";
import Wishlist from '../components/Whichlist';  // 👈 yaha naam sahi karo

const WishlistPage = () => {   // 👈 page ka naam alag rakha
  return (
    <>
      {/* ColorInit */}
      <ColorInit color={true} />

      {/* ScrollToTop */}
      <ScrollToTop smooth color="#FA6400" />

      {/* Preloader */}
      <Preloader />

      {/* HeaderTwo */}
      <HeaderTwo category={true} />

      {/* Breadcrumb */}
      <Breadcrumb title={"Wishlist"} /> {/* 👈 title bhi sahi kiya */}

      {/* Wishlist Section */}
      <Wishlist />   {/* 👈 imported component use karna hai */}

      {/* ShippingOne */}
      <ShippingOne />

      {/* FooterTwo */}
      <FooterTwo />

      {/* BottomFooter */}
      <BottomFooter />
    </>
  )
}

export default WishlistPage;
