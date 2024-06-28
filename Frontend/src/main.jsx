import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LandingPage from "./Pages/LandingPage.jsx";
import AddMovie from "./Pages/AddMovie.jsx/AddMovie.jsx";
import ErrorPage from "./Pages/Error/ErrorPage.jsx";
import SignIn from "./Pages/Auth/SignIn/SignIn.jsx";
import SignUp from "./Pages/Auth/SignUp/SignUp.jsx";

import CatagoryPage from "../src/components/CatagoryPage/CatagoryPage.jsx";
import MovieDescriptionPage from "../src/components/DescriptionPages/MovieDescriptionPage.jsx";
import TVDescriptionPage from "../src/components/DescriptionPages/TVDescriptionPage.jsx";
import TrendingPage from "../src/components/TrendingPage.jsx";
import CatagoryDescription from "../src/components/CatagoryPage/CatagoryDescription.jsx";
import DiscoverMovies from "../src/Pages/Discover/DiscoverMovies.jsx";
import DiscoverSeries from "../src/Pages/Discover/DiscoverSeries.jsx";
import PersonPage from "../src/Pages/PersonPage.jsx";
import Profile from "../src/Pages/Profile.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<LandingPage />} />
      <Route path="/AddMovie" element={<AddMovie />} />
      <Route path="/DiscoverMovies" element={<DiscoverMovies />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/DiscoverSeries" element={<DiscoverSeries />} />
      <Route path="PersonDiscover/:personId" element={<PersonPage />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/movies/:movieId" element={<MovieDescriptionPage />} />
      <Route path="/tv/:tvId" element={<TVDescriptionPage />} />
      <Route path="/catagories/:movieId" element={<CatagoryPage />} />
      <Route path="/trending/:movieId" element={<TrendingPage />} />
      <Route
        path="/catagories/:movieId/:trending"
        element={<CatagoryDescription />}
      />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);
