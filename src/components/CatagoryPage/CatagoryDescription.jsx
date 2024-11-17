import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Youtube from "./Youtube";
import { FaSpinner } from "react-icons/fa";

export default function CatagoryDescription() {
  const [CatagoryDescriptionPage, setCatagoryDescriptionPage] = useState([]);
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

  console.log(CatagoryDescriptionPage);

  if (!CatagoryDescriptionPage || CatagoryDescriptionPage.length === 0) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <FaSpinner className="animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="relative min-h-screen bg-gradient-to-t from-black via-gray-900 to-black text-white">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={`https://image.tmdb.org/t/p/original${
              CatagoryDescriptionPage.poster_path ||
              CatagoryDescriptionPage.backdrop_path
            }`}
            alt="Movie background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto py-16 px-6 space-y-12">
          {/* Movie Header */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Movie Poster */}
            <div className="w-full md:w-1/3">
              <img
                src={`https://image.tmdb.org/t/p/original${
                  CatagoryDescriptionPage.poster_path ||
                  CatagoryDescriptionPage.backdrop_path
                }`}
                alt="Movie poster"
                className="w-full rounded-lg shadow-xl"
              />
            </div>
            {/* Movie Info */}
            <div className="w-full md:w-2/3">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {CatagoryDescriptionPage.name || CatagoryDescriptionPage.title}
              </h1>
              <p className="text-lg leading-relaxed text-gray-300 mb-8">
                {CatagoryDescriptionPage.overview}
              </p>
              <div className="space-y-4 text-gray-400">
                <p>
                  <span className="font-semibold text-white">
                    Release Date:
                  </span>{" "}
                  {CatagoryDescriptionPage.release_date}
                </p>
                <p>
                  <span className="font-semibold text-white">Rate:</span>{" "}
                  {CatagoryDescriptionPage.vote_average}
                </p>
              </div>
            </div>
          </div>

          {/* Trailer Section */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Watch Trailer</h2>
            <div className="w-full aspect-w-16 aspect-h-9">
              <Youtube result={CatagoryDescriptionPage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
