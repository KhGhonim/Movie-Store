import HeroSection from "../components/HeroSection";
import Catagories from "../components/Catagories";
import { Helmet } from "react-helmet-async";
import AdsBanner from "../components/AdsBanner/AdsBanner";
import CrouselTemplate from "../components/CrouselTemplate";

export default function LandingPage() {
  return (
    <div className=" relative bg-[--background-color] ">
      <Helmet>
        <title>KG Movie Store</title>
      </Helmet>
      <HeroSection />
      <CrouselTemplate
        Title="Popular Movies"
        ApiURL={import.meta.env.VITE_APP_Movie_API}
        ApiKey={import.meta.env.VITE_APP_API_Authorization}
        type="movies"
      />
      <Catagories />
      <CrouselTemplate
        Title="Trend TV Shows"
        ApiURL={import.meta.env.VITE_APP_TV_API}
        ApiKey={import.meta.env.VITE_APP_API_Authorization}
        type="tv"
      />
      <CrouselTemplate
        Title="Top Rated Movies"
        ApiURL={import.meta.env.VITE_APP_Movie_TopRated_API}
        ApiKey={import.meta.env.VITE_APP_API_Authorization}
        type="movies"
      />
      <AdsBanner />
      <CrouselTemplate
        Title="Top Rated TV"
        ApiURL={import.meta.env.VITE_APP_TV_TopRated_API}
        ApiKey={import.meta.env.VITE_APP_API_Authorization}
        type="tv"
      />

      <CrouselTemplate
        Title="Upcoming Movies"
        ApiURL={import.meta.env.VITE_APP_Upcoming_API}
        ApiKey={import.meta.env.VITE_APP_API_Authorization}
        type="movies"
      />
    </div>
  );
}
