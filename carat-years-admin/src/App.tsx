import { Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import Layout from "./layout/Layout";
import RedirectIfAuthenticated from "./layout/RedirectIfAuthenticated";
import ProtectedRoute from "./layout/ProtectedRoute";
import NotFound from "./pages/NotFound";

const Login = lazy(() => import("./pages/auth/Login"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));

const Order = lazy(() => import("./pages/order/Order"));
const DetailOrder = lazy(() => import("./pages/order/DetailOrder"));

const ProductCategory = lazy(() => import("./pages/products/ProductCategory"));
const Products = lazy(() => import("./pages/products/Products"));
const NewProduct = lazy(() => import("./pages/products/NewProduct"));
const DetailProduct = lazy(() => import("./pages/products/DetailProduct"));
const Rate = lazy(() => import("./pages/products/Rate"));
const Discount = lazy(() => import("./pages/products/Discount"));

const DetailUser = lazy(() => import("./pages/user/DetailUser"));
const User = lazy(() => import("./pages/user/User"));

const ContactForm = lazy(() => import("./pages/ContactForm"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Faq = lazy(() => import("./pages/Faq"));
const NewsletterSub = lazy(() => import("./pages/NewsletterSub"));
const Profile = lazy(() => import("./pages/Profile"));
const SuperAdmin = lazy(() => import("./pages/SuperAdmin"));
const Testimonial = lazy(() => import("./pages/Testimonial"));

export default function App() {
  return (
    <>
      <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          <Route element={<RedirectIfAuthenticated />}>
            <Route path="/" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="*" element={<NotFound />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/orders" element={<Order />} />
              <Route path="/dashboard/orders/:id" element={<DetailOrder />} />
              <Route path="/dashboard/products" element={<Products />} />
              <Route path="/dashboard/products/new" element={<NewProduct />} />
              <Route
                path="/dashboard/products/:id"
                element={<DetailProduct />}
              />
              <Route
                path="/dashboard/products/product-category"
                element={<ProductCategory />}
              />
              <Route path="/dashboard/products/rate" element={<Rate />} />
              <Route
                path="/dashboard/products/discount"
                element={<Discount />}
              />
              <Route path="/dashboard/users" element={<User />} />
              <Route path="/dashboard/users/:id" element={<DetailUser />} />
              <Route path="/dashboard/faqs" element={<Faq />} />
              <Route path="/dashboard/contact-form" element={<ContactForm />} />
              <Route
                path="/dashboard/newsletter-subscribers"
                element={<NewsletterSub />}
              />
              <Route path="/dashboard/profile" element={<Profile />} />
              <Route path="/dashboard/super-admin" element={<SuperAdmin />} />
              <Route path="/dashboard/testimonials" element={<Testimonial />} />
              <Route path="/dashboard/users" element={<User />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
