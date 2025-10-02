import React from "react";

import Preloader from "../helper/Preloader";
import ColorInit from "../helper/ColorInit";
import HeaderTwo from "../components/HeaderTwo";

import FooterTwo from "../components/FooterTwo";
import BottomFooter from "../components/BottomFooter";

import ScrollToTop from "react-scroll-to-top";

import ContactRepairingRequest from "../components/ContactRepairingRequest";
const ContactRepairPage = () => {
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

			{/* contact Enquiry */}
			<ContactRepairingRequest />

			{/* FooterTwo */}
			<FooterTwo />

			{/* BottomFooter */}
			<BottomFooter />
		</>
	);
};
export default ContactRepairPage;
