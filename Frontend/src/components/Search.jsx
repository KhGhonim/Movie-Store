import { useEffect, useState } from "react";
// @ts-ignore
import SearchBar from "../assets/searchbar.png";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

export default function Search() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [Query, setQuery] = useState("");
  const [SearchResults, setSearchResults] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZmFhZjFiNjhiMTFmNmFjZjUwZmUzYTg3NDJmMGMxNyIsIm5iZiI6MTcxOTE1OTc2Mi4wMjU5MjcsInN1YiI6IjY2Nzg0YTlmMmYzNGVjYmRhNzNiMjI1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HAl0urrcB3rZpMGmK6DOb1HNwVzZJHwx2-q7LU3J6v0",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/search/multi?query={${Query}}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setSearchResults(response))
      .catch((err) => console.error(err));
  }, [Query]);

  return (
    <div className="relative flex items-center">
      <input
        type="text"
        name="search"
        value={Query}
        id="search"
        className={`w-0 max-sm:w-full max-sm:pl-10 transition-all duration-500 ease-in-out border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${
          isExpanded
            ? "max-sm:w-full max-sm:py-2 max-sm:pl-10 max-sm:text-sm max-sm:rounded-md max-sm:focus:outline-none w-[300px] pl-10 pr-4 py-2"
            : "w-0 p-0 overflow-hidden"
        }`}
        placeholder="Search..."
        onFocus={() => setIsExpanded(true)}
        onBlur={() => setIsExpanded(false)}
        onChange={(eo) => {
          let value = eo.target.value;
          setQuery(value);
        }}
      />
      <button
        className="absolute left-1 top-1/2 transform -translate-y-1/2 border border-transparent p-1 bg-transparent hover:bg-gray-50 rounded-lg"
        aria-label="Search"
        onClick={() => setIsExpanded(true)}
      >
        <img
          src={SearchBar} // Make sure SearchBarIcon is a valid import or URL
          alt="Search"
          className="w-6 h-6"
        />
      </button>

      <div className="absolute  top-full left-0 mt-1 w-full  bg-[--background-color] rounded-lg z-10 max-h-[400px] overflow-y-auto">
        {SearchResults &&
          SearchResults.results.map((result, index) => {
            const year = new Date(result.first_air_date).getFullYear();

            if (
              !result.poster_path &&
              !result.backdrop_path &&
              !result.vote_average &&
              !result.media_type &&
              !year
            )
              return null;

            return (
              <Link
                key={index}
                to={`/${
                  result.media_type === "tv"
                    ? "tv"
                    : result.media_type === "movie"
                    ? "movies"
                    : "people"
                }/${result.id}`}
                className="flex items-center p-2 w-full border-b border-gray-700 hover:bg-[--background-color] h-32 scroll-auto"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${
                    result.poster_path || result.profile_path
                  }`}
                  alt={result.title || result.name}
                  className="w-12 h-16 object-cover mr-3 rounded-xl"
                />
                <div className="flex-1">
                  <h3 className="text-[--text-color] font-semibold">
                    {result.title || result.name}
                  </h3>
                  <div className="flex items-center text-[--text-color]">
                    <AiFillStar color="gold" size={20} />
                    <span className="ml-2 text-babyblue">
                      {result.vote_average}
                    </span>
                  </div>
                </div>
                <p className="text-center  text-[--text-color] text-lg font-bold">
                  {result.media_type}
                </p>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
