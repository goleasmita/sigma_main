import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/routes/PrivateRoute";
import UserDashboard from "./pages/user/UserDashboard";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProducts from "./pages/admin/CreateProducts";
import Users from "./pages/admin/Users";
import Enquiries from "./pages/admin/Enquiries";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import GearlessLifts from "./pages/products/GearlessLifts";
import Goods from "./pages/products/Goods";
import HomeLifts from "./pages/products/HomeLifts";
import Hydraulic from "./pages/products/Hydraulic";
import PassengerAuto from "./pages/products/PassengerAuto";
import PassengerManual from "./pages/products/PassengerManual";
import Stretcher from "./pages/products/Stretcher";
import Car from "./pages/products/Car";
import Products from "./pages/products/Products";
// import CarStack from "./pages/products/CarStack";
import Capsule from "./pages/products/Capsule";
import Service from "./pages/products/Service";
import DumbWaiter from "./pages/products/DumbWaiter";
import ScrollToTop from "./ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <ScrollToTop /> {/* 👈 Add this here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<UserDashboard />} />
          </Route>

          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/create-category" element={<CreateCategory />} />
            <Route path="admin/create-products" element={<CreateProducts />} />
            <Route path="admin/users" element={<Users />} />
            <Route path="admin/enquiry" element={<Enquiries />} />
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />

          <Route path="/products" element={<Products />}>
            <Route path="gearless" element={<GearlessLifts />} />
            <Route path="goods" element={<Goods />} />
            <Route path="homelifts" element={<HomeLifts />} />
            <Route path="hydraulic" element={<Hydraulic />} />
            <Route path="passenger-auto" element={<PassengerAuto />} />
            <Route path="passenger-manual" element={<PassengerManual />} />
            <Route path="stretcher" element={<Stretcher />} />
            <Route path="car" element={<Car />} />
            {/* <Route path="car-stack" element={<CarStack />} /> */}
            <Route path="capsule" element={<Capsule />} />
            <Route path="service" element={<Service />} />
            <Route path="dumb" element={<DumbWaiter />} />
          </Route>
        </Routes>
        <Footer />
        {/* ✅ Floating WhatsApp button on every page */}
        <WhatsAppButton />
      </BrowserRouter>
    </div>
  );
}
