import React from "react";
import Preloader from "../helper/Preloader";
import ColorInit from "../helper/ColorInit";
import HeaderTwo from "../components/HeaderTwo";
import Breadcrumb from "../components/Breadcrumb";
import FooterTwo from "../components/FooterTwo";
import BottomFooter from "../components/BottomFooter";
import ShippingOne from "../components/ShippingOne";

import ScrollToTop from "react-scroll-to-top";
import TermsCondition from "../components/TermsCondition";

const TermAndConditionPage = () => {
	return (
		<>
			{/* ColorInit */}
			<ColorInit color={true} />

			{/* ScrollToTop */}
			<ScrollToTop smooth color="#bc0101" />

			{/* Preloader */}
			<Preloader />

			{/* HeaderTwo */}
			<HeaderTwo category={true} />

			{/* Breadcrumb */}
			<Breadcrumb title={"Terms And Condition"} />

			{/* terms condition */}
			<TermsCondition />

			{/* ShippingOne */}
			<ShippingOne />

			{/* FooterTwo */}
			<FooterTwo />

			{/* BottomFooter */}
			<BottomFooter />
		</>
	);
};

export default TermAndConditionPage;
