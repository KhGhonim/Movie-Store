import Testimonials from "../components/SecoundCrosuel";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import TopBooks from "../components/Catagories";
import { Helmet } from "react-helmet-async";
import { ToastContainer } from "react-toastify";

export default function LandingPage() {
  return (
    <div className=" relative bg-[--background-color] ">
      <Helmet>
        <title>KG Book Store</title>
      </Helmet>
      <Navbar />
      <HeroSection />
      <Banner />
      <TopBooks />
      <Testimonials />
      <Footer />
      <ToastContainer />
    </div>
  );
}
