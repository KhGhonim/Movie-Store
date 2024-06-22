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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<LandingPage />} />
      <Route path="/AddMovie" element={<AddMovie />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/SignIn" element={<SignIn  />} />
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
