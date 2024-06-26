import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Youtube from "./CatagoryPage/Youtube";

export default function TrendingPage() {
  const [TrendingPage, setTrendingPage] = useState(null);
  const [activeTab, setActiveTab] = useState("Trailer");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const { movieId } = useParams();
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
        await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, options)
          .then((response) => response.json())
          .then((response) => setTrendingPage(response))
          .catch((err) => console.error(err));
      } catch (error) {
        console.log(error.message);
      }
    };
    DataFetching();
  }, [movieId]);

  if (!TrendingPage || TrendingPage.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin bg-[--background-color]"></div>
      </div>
    );
  }

  console.log(TrendingPage);
  const releaseData = new Date(TrendingPage.release_date).getFullYear();

  return (
    <div>
      <Navbar />
      {/* <main className="min-h-screen w-full bg-gradient-to-b from-gray-800 to-black">
        <div className="relative md:h-screen  flex items-center justify-center p-4 md:p-8 max-sm:py-20">
          <img
            src={`https://image.tmdb.org/t/p/original${
              TrendingPage.poster_path || TrendingPage.backdrop_path
            }`}
            alt={TrendingPage.original_title}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center bg-black bg-opacity-70 rounded-lg p-6 md:p-10 shadow-2xl max-w-5xl space-y-6 md:space-y-0 md:space-x-8">
            <div className="w-full md:w-1/3 transform transition-transform duration-500 hover:scale-105">
              <img
                className="rounded-lg shadow-lg cursor-pointer object-cover"
                src={`https://image.tmdb.org/t/p/original${
                  TrendingPage.poster_path || TrendingPage.backdrop_path
                }`}
                alt={TrendingPage.title || TrendingPage.original_title}
              />
            </div>
            <div className="w-full md:w-2/3 text-center md:text-left space-y-4">
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-md">
                {TrendingPage.title ||
                  TrendingPage.original_title ||
                  TrendingPage.name ||
                  TrendingPage.original_name}
              </h1>
              <div className="text-lg text-gray-300 mb-4">
                <span>{TrendingPage.releaseDate}</span>
                {TrendingPage.runtime && (
                  <span> • {TrendingPage.runtime} min</span>
                )}
                {TrendingPage.number_of_episodes && (
                  <span>
                    {" "}
                    • Total Episodes {TrendingPage.number_of_episodes}
                  </span>
                )}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {TrendingPage.overview}
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-800 transition duration-300">
                  Watch Trailer
                </button>
                <button className="px-6 py-2 text-white border border-white rounded-full hover:scale-95 hover:border-gray-300  transition duration-300">
                  Add to List
                </button>
              </div>
            </div>
          </div>
        </div>
      </main> */}

      <div className="relative w-full h-full md:h-dvh  overflow-hidden py-4">
        <img
          src={`https://image.tmdb.org/t/p/original${
            TrendingPage.poster_path || TrendingPage.backdrop_path
          }`}
          alt={TrendingPage.original_title}
          width="1920"
          height="1080"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ aspectRatio: "1920 / 1080", objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid justify-items-center grid-cols-1 gap-8 md:grid-cols-3  ">
            <div className="col-span-1 md:col-span-1 ">
              <img
                src={`https://image.tmdb.org/t/p/original${
                  TrendingPage.backdrop_path || TrendingPage.poster_path
                }`}
                alt={TrendingPage.original_title}
                width="200"
                height="300"
                className="w-full max-w-[200px] rounded-lg shadow-lg"
                style={{ aspectRatio: "200 / 300", objectFit: "cover" }}
              />
            </div>
            <div className="col-span-2 md:col-span-2">
              <h1 className="text-3xl font-bold text-white">
                {" "}
                {TrendingPage.title ||
                  TrendingPage.original_title ||
                  TrendingPage.name ||
                  TrendingPage.original_name}
              </h1>
              <p className="mt-4 text-lg text-gray-300">
                {TrendingPage.overview}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div className="text-gray-400">
                  <span className="font-medium text-white">Release Date: </span>{" "}
                  {releaseData}
                </div>
                <div className="text-gray-400">
                  <span className="font-medium text-white">
                    Runtime: {TrendingPage.runtime}
                  </span>{" "}
                  minutes
                </div>
                <div className="text-gray-400">
                  <span className="font-medium text-white">Tagline:</span>{" "}
                  {TrendingPage.tagline}
                </div>
                <div className="text-gray-400">
                  <span className="font-medium text-white">Director:</span>{" "}
                  Christopher Nolan
                </div>
                <div className="text-gray-400 ">
                  <span className="font-medium text-white">Genre:</span>{" "}
                  {TrendingPage.genres.map((item) => {
                    return (
                      <p className=" inline-block mr-1 " key={item.name}>
                        {item.name}{" "}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="movie-tabs w-full my-3">
            <ul className="tabs-nav flex justify-center space-x-8 mb-6">
              <li
                className={`tab-item px-4 py-2 cursor-pointer border-b-2 text-white ${
                  activeTab === "Trailer" ? "border-gray-200" : "border-transparent"
                }`}
                onClick={() => handleTabClick("Trailer")}
              >
                Trailer
              </li>
              <li
                className={`tab-item px-4 py-2 cursor-pointer border-b-2 text-white ${
                  activeTab === "Cast" ? "border-gray-200" : "border-transparent"
                }`}
                onClick={() => handleTabClick("Cast")}
              >
                Cast
              </li>
            </ul>
            <div className="tabs-content text-white">
              <div
                className={`tab-pane ${
                  activeTab === "Trailer" ? "block" : "hidden"
                }  flex justify-center rounded-3xl `}
              >
                  <Youtube result={TrendingPage}/>


              </div>
              <div
                className={`tab-pane ${
                  activeTab === "Cast" ? "block" : "hidden"
                }`}
              >
                <ul className="cast-list list-none p-0 ">

                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
