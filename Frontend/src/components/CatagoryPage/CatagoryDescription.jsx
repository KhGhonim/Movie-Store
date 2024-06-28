// @ts-nocheck
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Youtube from "./Youtube";

export default function CatagoryDescription() {
  const [activeTab, setActiveTab] = useState("Trailer");
  const [CatagoryDescriptionPage, setCatagoryDescriptionPage] = useState([]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const { trending } = useParams();

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZmFhZjFiNjhiMTFmNmFjZjUwZmUzYTg3NDJmMGMxNyIsIm5iZiI6MTcxOTE1OTc2Mi4wMjU5MjcsInN1YiI6IjY2Nzg0YTlmMmYzNGVjYmRhNzNiMjI1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HAl0urrcB3rZpMGmK6DOb1HNwVzZJHwx2-q7LU3J6v0",
      },
    };

    const DataFetching = async () => {
      try {
        await fetch(
          `https://api.themoviedb.org/3/search/multi?query=${trending}`,
          options
        )
          .then((response) => response.json())
          .then((response) => setCatagoryDescriptionPage(response.results[0]))
          .catch((err) => console.error(err));
      } catch (error) {
        console.log(error.message);
      }
    };
    DataFetching();
  }, [trending]);


  if (!CatagoryDescriptionPage || CatagoryDescriptionPage.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin bg-[--background-color]"></div>
      </div>
    );
  }

  return (
    <div>
      <Navbar/>
 <div className="movie-section relative flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="movie-bg-image absolute inset-0 w-full h-full">
        <img
          src={`https://image.tmdb.org/t/p/original${
            CatagoryDescriptionPage.poster_path ||
            CatagoryDescriptionPage.backdrop_path
          }`}
          alt="Movie background"
          className="w-full h-full object-cover filter brightness-50"
        />
      </div>
      <div className="movie-info-container relative z-10 flex flex-col items-center py-20 md:py-8 px-4 sm:px-6 lg:px-8 text-white bg-black bg-opacity-60 rounded-3xl  shadow-2xl max-w-3xl mx-auto">
        <div className="movie-poster-wrapper mb-6">
          <img
            src={`https://image.tmdb.org/t/p/original${
              CatagoryDescriptionPage.backdrop_path ||
              CatagoryDescriptionPage.poster_path
            }`}
            alt="Movie poster"
            className="w-60 h-96 object-cover rounded-3xl shadow-lg"
          />
        </div>
        <div className="movie-details flex-grow text-center">
          <h2 className="movie-title text-3xl md:text-4xl font-bold mb-4">
            {CatagoryDescriptionPage.name || CatagoryDescriptionPage.title}
          </h2>
          <p className="movie-description mb-8 text-lg md:text-xl leading-relaxed">
            {CatagoryDescriptionPage.overview}
          </p>
          <div className="movie-tabs w-full">
            <ul className="tabs-nav flex justify-center space-x-8 mb-6">
              <li
                className={`tab-item px-4 py-2 cursor-pointer border-b-2 ${
                  activeTab === "Trailer" ? "border-gray-200" : "border-transparent"
                }`}
                onClick={() => handleTabClick("Trailer")}
              >
                Trailer
              </li>
              <li
                className={`tab-item px-4 py-2 cursor-pointer border-b-2 ${
                  activeTab === "Cast" ? "border-gray-200" : "border-transparent"
                }`}
                onClick={() => handleTabClick("Cast")}
              >
                Cast
              </li>
            </ul>
            <div className="tabs-content">
              <div
                className={`tab-pane ${
                  activeTab === "Trailer" ? "block" : "hidden"
                }`}
              >

                  <Youtube result={CatagoryDescriptionPage}/>

              </div>
              <div
                className={`tab-pane ${
                  activeTab === "Cast" ? "block" : "hidden"
                }`}
              >
                <ul className="cast-list list-none p-0">
                {CatagoryDescriptionPage.name || CatagoryDescriptionPage.title}

                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
