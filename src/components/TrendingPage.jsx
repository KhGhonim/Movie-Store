import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Youtube from "./CatagoryPage/Youtube";
import { FaSpinner } from "react-icons/fa";

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
      <div className="flex w-full h-full items-center justify-center">
        <FaSpinner className="animate-spin" />
      </div>
    );
  }

  const releaseData = new Date(TrendingPage.release_date).getFullYear();
  console.log(TrendingPage);
  return (
    <div>
      <Navbar />

      <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900  py-10">
        {/* Background Image */}
        <img
          src={`https://image.tmdb.org/t/p/original${
            TrendingPage?.poster_path || TrendingPage?.backdrop_path
          }`}
          alt={TrendingPage?.original_title}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Main Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-12">
          {/* Hero Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Movie Poster */}
            <div className="flex justify-center">
              <img
                src={`https://image.tmdb.org/t/p/original${
                  TrendingPage?.poster_path || TrendingPage?.backdrop_path
                }`}
                alt={TrendingPage?.original_title}
                className="w-full max-w-[280px] rounded-lg shadow-lg ring-4 ring-gray-700"
              />
            </div>

            {/* Movie Details */}
            <div className="col-span-2 text-white">
              <h1 className="text-5xl font-extrabold mb-4">
                {TrendingPage?.title || TrendingPage?.original_title}
              </h1>
              <p className="text-lg text-gray-300 mb-6">
                {TrendingPage?.overview}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400">
                    <span className="font-medium text-white">
                      Release Date:{" "}
                    </span>
                    {releaseData}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-medium text-white">Runtime: </span>
                    {TrendingPage?.runtime} minutes
                  </p>
                  <p className="text-gray-400">
                    <span className="font-medium text-white">
                      Origin Country:{" "}
                    </span>
                    {TrendingPage?.origin_country[0]}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">
                    <span className="font-medium text-white">Rate: </span>
                    {TrendingPage?.vote_average}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-medium text-white">Genres: </span>
                    {TrendingPage?.genres.map((item) => (
                      <span key={item.name} className="inline-block mr-2">
                        {item.name}
                      </span>
                    ))}
                  </p>

                  <p className="text-gray-400">
                    <span className="font-medium text-white">
                      Production Companies:{" "}
                    </span>
                    {TrendingPage?.production_companies.map((item) => (
                      <span key={item.name} className="inline-block mr-2 text-xs">
                        {item.name},
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sections: Tabs */}
          <div className="mt-12">
            {/* Tabs Navigation */}
            <ul className="flex-wrap flex justify-center space-x-8 mb-6">
              <li
                className={`tab-item px-6 py-2 cursor-pointer text-lg font-medium text-white ${
                  activeTab === "Trailer"
                    ? "border-b-4 border-white"
                    : "border-transparent"
                }`}
                onClick={() => handleTabClick("Trailer")}
              >
                Trailer
              </li>
              <li
                className={`tab-item px-6 py-2 cursor-pointer text-lg font-medium text-white ${
                  activeTab === "Cast"
                    ? "border-b-4 border-white"
                    : "border-transparent"
                }`}
                onClick={() => handleTabClick("Cast")}
              >
                Cast
              </li>
              <li
                className={`tab-item px-6 py-2 cursor-pointer text-lg font-medium text-white ${
                  activeTab === "Reviews"
                    ? "border-b-4 border-white"
                    : "border-transparent"
                }`}
                onClick={() => handleTabClick("Reviews")}
              >
                Reviews
              </li>
              <li
                className={`tab-item px-6 py-2 cursor-pointer text-lg font-medium text-white ${
                  activeTab === "Similar"
                    ? "border-b-4 border-white"
                    : "border-transparent"
                }`}
                onClick={() => handleTabClick("Similar")}
              >
                Similar Movies
              </li>
            </ul>

            {/* Tab Content */}
            <div className="w-full mx-auto ">
              {/* Trailer */}
              <div
                className={`tab-pane ${
                  activeTab === "Trailer" ? "block" : "hidden"
                }`}
              >
                <Youtube result={TrendingPage} />
              </div>

              {/* Cast Section */}
              <div
                className={`tab-pane ${
                  activeTab === "Cast" ? "block" : "hidden"
                }`}
              >
                {/* Cast Section */}
                {TrendingPage.cast && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {TrendingPage?.cast?.map((actor) => (
                      <div key={actor.id} className="text-center text-gray-300">
                        <img
                          src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                          alt={actor.name}
                          className="w-full max-w-[120px] mx-auto rounded-full shadow-md"
                        />
                        <p className="mt-2">{actor.name}</p>
                        <p className="text-sm text-gray-500">
                          as {actor.character}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {!TrendingPage.cast && (
                  <div className="text-center  text-3xl text-white font-bold mb-10">
                    <p className="mt-2">Cast information not available.</p>
                  </div>
                )}
              </div>

              {/* Reviews Section */}
              <div
                className={`tab-pane ${
                  activeTab === "Reviews" ? "block" : "hidden"
                }`}
              >
                {TrendingPage.reviews && (
                  <div className="space-y-6">
                  {TrendingPage?.reviews?.map((review) => (
                    <div
                      key={review.id}
                      className="p-4 border border-gray-700 rounded-md bg-gray-800 text-gray-300"
                    >
                      <p className="font-medium text-white">{review.author}</p>
                      <p className="mt-2">{review.content}</p>
                    </div>
                  ))}
                </div>
                )}

                {!TrendingPage.reviews && (
                  <div className="text-center  text-3xl text-white font-bold mb-10">
                    <p className="mt-2">No reviews available.</p>
                  </div>
                )}
              </div>

              {/* Similar Movies Section */}
              <div
                className={`tab-pane ${
                  activeTab === "Similar" ? "block" : "hidden"
                }`}
              >
                {TrendingPage.similar && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {TrendingPage?.similar?.map((movie) => (
                      <div key={movie.id} className="text-center text-gray-300">
                        <img
                          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                          alt={movie.title}
                          className="w-full max-w-[150px] mx-auto rounded-lg shadow-lg"
                        />
                        <p className="mt-2">{movie.title}</p>
                      </div>
                    ))}
                  </div>
                )}

                {!TrendingPage.similar && (
                  <div className="text-center  text-3xl text-white font-bold mb-10">
                    <p className="mt-2">Similar movies not available.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
