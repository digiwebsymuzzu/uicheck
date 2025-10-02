import React from "react";

import Preloader from "../helper/Preloader";
import ColorInit from "../helper/ColorInit";
import HeaderTwo from "../components/HeaderTwo";

import FooterTwo from "../components/FooterTwo";
import BottomFooter from "../components/BottomFooter";

import ScrollToTop from "react-scroll-to-top";
import UsefullLinks from "../components/UsefullLinks";
import Breadcrumb from "../components/Breadcrumb";

const UsefullLinkFormulaePage = () => {
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
			<Breadcrumb title={"Usefull Links Formulae & Table"} />
			{/* Usefull links*/}
			<UsefullLinks />
			{/* FooterTwo */}
			<FooterTwo />

			{/* BottomFooter */}
			<BottomFooter />
		</>
	);
};
export default UsefullLinkFormulaePage;
