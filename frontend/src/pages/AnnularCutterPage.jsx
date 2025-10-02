import React from "react";
import Preloader from "../helper/Preloader";
import ColorInit from "../helper/ColorInit";
import HeaderTwo from "../components/HeaderTwo";
import Breadcrumb from "../components/Breadcrumb";
import FooterTwo from "../components/FooterTwo";
import BottomFooter from "../components/BottomFooter";

import ScrollToTop from "react-scroll-to-top";
import AnnularCutter from "../components/AnnularCutter";

const AnnularCutterPage = () => {
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
			<Breadcrumb title={"Annular Cutter"} />
			{/*Annularcutter */}

			<AnnularCutter />
			{/* FooterTwo */}
			<FooterTwo />

			{/* BottomFooter */}
			<BottomFooter />
		</>
	);
};
export default AnnularCutterPage;
