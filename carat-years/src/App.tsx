import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import Layout from "./layout/Layout";
import AccountLayout from "./pages/account/AccountLayout";
import CookieConsent from "./components/shared/CookieConsent";
import SubscribePopup from "./components/shared/SubscribePopup";
import ProtectedRoute from "./layout/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const Shopping = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/auth/Login"));
const LoginOTP = lazy(() => import("./pages/auth/login-otp"));
const SignUpForm = lazy(() => import("./pages/auth/SignUp"));
const VerifyAccount = lazy(() => import("./pages/auth/VerifyAccount"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));

const AccountInfo = lazy(() => import("./pages/account/AccountInfo"));
const ChangePassword = lazy(() => import("./pages/account/ChangePassword"));
const AddressBook = lazy(() => import("./pages/account/AddressBook"));
const CaratPoints = lazy(() => import("./pages/account/CaratPoints"));
const OrderHistory = lazy(() => import("./pages/account/OrderHistory"));
const Wishlist = lazy(() => import("./pages/account/Wishlist"));
const Newsletter = lazy(() => import("./pages/account/NewsLetter"));
const Logout = lazy(() => import("./pages/account/Logout"));
const DeleteAccount = lazy(() => import("./pages/account/DeletAccount"));
const Checkout = lazy(() => import("./pages/checkout/Checkout"));

const FAQPage = lazy(() => import("./pages/FAQPage"));
const RefundPolicy = lazy(() => import("./pages/policies/RefundPolicy"));
const PrivacyPolicy = lazy(() => import("./pages/policies/PrivacyPolicy"));
const Delivery = lazy(() => import("./pages/policies/Delivery"));
const Finance = lazy(() => import("./pages/policies/Finance"));
const Lifetime = lazy(() => import("./pages/policies/Lifetime"));
const Insurance = lazy(() => import("./pages/policies/Insurance"));
const Valuations = lazy(() => import("./pages/policies/Valuations"));
const CarePlan = lazy(() => import("./pages/policies/CarePlan"));
const Gift = lazy(() => import("./pages/policies/Gift"));
const Blog = lazy(() => import("./pages/discover/BlogPage"));
const EngagementGuide = lazy(() => import("./pages/discover/EngagementGuide"));
const WeddingRingGuide = lazy(() => import("./pages/discover/Wedding"));
const DiamondEducation = lazy(
  () => import("./pages/discover/DiamondEducation"),
);
const MetalGuide = lazy(() => import("./pages/discover/MetalGuide"));
const NaturalDiamondGuide = lazy(
  () => import("./pages/discover/NaturalDiamondGuide"),
);
const LabGrownDiamondGuide = lazy(
  () => import("./pages/discover/LabGrownDiamondGuide"),
);
const GemstoneBuyingGuide = lazy(
  () => import("./pages/discover/GemstoneBuyingGuide"),
);
const RingSizeGuide = lazy(() => import("./pages/discover/RingSizeGuide"));
const DigitalRingSizer = lazy(
  () => import("./pages/discover/DigitalRingSizer"),
);
const DiamondCutGuide = lazy(() => import("./pages/discover/DiamondCutGuide"));
const JewelleryCareGuide = lazy(
  () => import("./pages/discover/JewelleryCareGuide"),
);
const BespokeEngagementRing = lazy(
  () => import("./pages/discover/BespokeEngagementRing"),
);
const EngagementRingCalculator = lazy(
  () => import("./pages/discover/EngagementRingCalculator"),
);
const HallmarkingGuide = lazy(
  () => import("./pages/discover/HallmarkingGuide"),
);
const BookAppointment = lazy(() => import("./pages/conatct/BookAppointment"));
const ContactUs = lazy(() => import("./pages/conatct/ContactUs"));
const VisitStores = lazy(() => import("./pages/conatct/VisitStores"));

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return (
    <Suspense fallback={<div className="min-h-dvh bg-black" />}>
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          {/* Public routes */}
          <Route index element={<Home />} />
          <Route path="product" element={<Shopping />} />
          <Route path="product/:category/:id" element={<ProductDetail />} />
          <Route path="login" element={<Login />} />
          <Route path="login-otp" element={<LoginOTP />} />
          <Route path="signup" element={<SignUpForm />} />
          <Route path="verify" element={<VerifyAccount />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="faqs" element={<FAQPage />} />
          <Route path="refund-policy" element={<RefundPolicy />} />
          <Route path="delivery" element={<Delivery />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="finance" element={<Finance />} />
          <Route path="lifetime" element={<Lifetime />} />
          <Route path="insurance" element={<Insurance />} />
          <Route path="valuations" element={<Valuations />} />
          <Route path="care-plan" element={<CarePlan />} />
          <Route path="gift" element={<Gift />} />
          <Route path="*" element={<NotFound />} />

          <Route element={<ProtectedRoute />}>
            <Route path="account" element={<AccountLayout />}>
              <Route index element={<AccountInfo />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="address-book" element={<AddressBook />} />
              <Route path="caratpoints" element={<CaratPoints />} />
              <Route path="orders" element={<OrderHistory />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="newsletter" element={<Newsletter />} />
              <Route path="logout" element={<Logout />} />
              <Route path="delete" element={<DeleteAccount />} />
            </Route>
            <Route path="checkout" element={<Checkout />} />
          </Route>

          <Route path="blog" element={<Blog />} />
          <Route path="engagement-guide" element={<EngagementGuide />} />
          <Route path="wedding" element={<WeddingRingGuide />} />
          <Route path="diamond-education" element={<DiamondEducation />} />
          <Route path="metal-guide" element={<MetalGuide />} />
          <Route
            path="natural-diamond-guide"
            element={<NaturalDiamondGuide />}
          />
          <Route
            path="lab-grown-diamond-guide"
            element={<LabGrownDiamondGuide />}
          />
          <Route path="gemstone-guide" element={<GemstoneBuyingGuide />} />
          <Route path="ring-size-guide" element={<RingSizeGuide />} />
          <Route path="digital-ring-sizer" element={<DigitalRingSizer />} />
          <Route path="diamond-cut-guide" element={<DiamondCutGuide />} />
          <Route path="jewellery-care-guide" element={<JewelleryCareGuide />} />
          <Route path="bespoke" element={<BespokeEngagementRing />} />
          <Route
            path="engagement-ring-calculator"
            element={<EngagementRingCalculator />}
          />
          <Route path="hallmarking" element={<HallmarkingGuide />} />
          {/* contact details */}
          <Route path="book-appointment" element={<BookAppointment />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="visit-stores" element={<VisitStores />} />
        </Route>
      </Routes>

      <CookieConsent variant="center" />

      <SubscribePopup />
    </Suspense>
  );
}
