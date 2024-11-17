import SecoundCrosuel from "../components/SecoundCrosuel";
import FristCrousel from "../components/FristCrousel";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import Catagories from "../components/Catagories";
import { Helmet } from "react-helmet-async";
import AdsBanner from "../components/AdsBanner/AdsBanner";
import ThirdCrousel from "../components/ThirdCrousel";

export default function LandingPage() {
  return (
    <div className=" relative bg-[--background-color] ">
      <Helmet>
        <title>KG Movie Store</title>
      </Helmet>
      <Navbar />
      <HeroSection />
      <FristCrousel />
      <Catagories />
      <SecoundCrosuel />
      <AdsBanner/>
      <ThirdCrousel />
      <Footer />
    </div>
  );
}
