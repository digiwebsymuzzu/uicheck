import { Route, Routes, Router } from "react-router-dom";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import HomePageOne from "./pages/HomePageOne";
import PhosphorIconInit from "./helper/PhosphorIconInit";
import HomePageTwo from "./pages/HomePageTwo";
import ShopPage from "./pages/ShopPage";
import ProductDetailsPageOne from "./pages/ProductDetailsPageOne";
import ProductDetailsPageTwo from "./pages/ProductDetailsPageTwo";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AccountPage from "./pages/AccountPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import ContactPage from "./pages/ContactPage";
import ContactEnquiryPage from "./pages/ContactEnquiryPage";
import ContactRepairPage from "./pages/ContactRepairPage";
import AboutUdemandme from "./pages/AboutUdemandme";
import DewaltHistoryPage from "./pages/DewaltHistoryPage";

import UsefullLinkFormulaePage from "./pages/UsefulLinkFormulaePage";
import SafetyInWeldingPage from "./pages/SafetyInWeldingPage";
import WeldingTechniquesPage from "./pages/WeldingTechniquesPage";
import OnlinePurchasePage from "./pages/OnlinePurchasePage";
import AnnularCutterPage from "./pages/AnnularCutterPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermAndConditionPage from "./pages/TermAndConditionPage";
import ReturnPolicyPage from "./pages/ReturnPolicyPage";
import PaymentPolicyPage from "./pages/PaymentPolicyPage";
import ShippingDeliveryPage from "./pages/ShippingDeliveryPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { ToastContainer } from "react-toastify";
import Whichlist from "./pages/Whichlist";
import Construction from "./pages/Construction";
import Machinery from "./pages/Machinery";
import Sanitary from "./pages/Sanitary";
import Automotive from "./pages/Automotive";
import OilAndGas from "./pages/OilAndGas";

function App() {
  return (
    <>
      <RouteScrollToTop />
      <PhosphorIconInit />

      <Routes>
        <Route exact path="/index-two" element={<HomePageOne />} />
        <Route exact path="/" element={<HomePageTwo />} />
        <Route exact path="/shop" element={<ShopPage />} />
        <Route
          path="/product-details/:slug"
          element={<ProductDetailsPageOne />}
        />
        <Route
          exact
          path="/product-details-two"
          element={<ProductDetailsPageTwo />}
        />
        <Route exact path="/cart" element={<CartPage />} />
        <Route exact path="/wishlist" element={<Whichlist />} />
        <Route exact path="/checkout" element={<CheckoutPage />} />
        <Route exact path="/account" element={<AccountPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/blog" element={<BlogPage />} />
        <Route exact path="/blog-details/:slug" element={<BlogDetailsPage />} />
        <Route exact path="/contact" element={<ContactPage />} />
        <Route exact path="/contact-enquiry" element={<ContactEnquiryPage />} />
        <Route
          exact
          path="/contact-repair-details"
          element={<ContactRepairPage />}
        />
        <Route exact path="/about-udemandme" element={<AboutUdemandme />} />
        <Route exact path="/dewalt-history" element={<DewaltHistoryPage />} />
        <Route
          exact
          path="/usefull-links"
          element={<UsefullLinkFormulaePage />}
        />
        <Route
          exact
          path="/safety-for-welding"
          element={<SafetyInWeldingPage />}
        />
        <Route
          exact
          path="/welding-techniques"
          element={<WeldingTechniquesPage />}
        />
        <Route
          exact
          path="/why-to-do-online-purchases"
          element={<OnlinePurchasePage />}
        />
        <Route
          exact
          path="/annular-cutter-portable-cutters"
          element={<AnnularCutterPage />}
        />
        <Route
          exact
          path="/annular-cutter-portable-cutters"
          element={<AnnularCutterPage />}
        />
        <Route exact path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route
          exact
          path="/annular-cutter-portable-cutters"
          element={<AnnularCutterPage />}
        />
        <Route exact path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route
          exact
          path="/terms-and-condition"
          element={<TermAndConditionPage />}
        />
        <Route exact path="/return-policy" element={<ReturnPolicyPage />} />
        <Route exact path="/payment-policy" element={<PaymentPolicyPage />} />
        <Route
          exact
          path="/shipping-delivery"
          element={<ShippingDeliveryPage />}
        />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/construction" element={<Construction />} />
        <Route exact path="/machinery" element={<Machinery />} />
        <Route exact path="/electrical-items" element={<Sanitary />} />
        <Route exact path="/automotive" element={<Automotive />} />
        <Route exact path="/oil-and-gas" element={<OilAndGas />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
