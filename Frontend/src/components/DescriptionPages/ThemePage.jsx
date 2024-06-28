import PropTypes from "prop-types";
import { Link } from "react-router-dom";




export default function ThemePage({ result }) {
  console.log(result);
  const releaseDatee = result.first_air_date
    ? new Date(result.first_air_date).getFullYear()
    : null;
  return (
    <main className="h-full w-full bg-[--background-color] ">
      <div className="relative bg-cover bg-no-repeat h-screen  ">
        <img
          src={`https://image.tmdb.org/t/p/original${
            result.poster_path || result.backdrop_path
          }`}
          alt={result.original_title}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />

        <div className="relative bg-black opacity-80 h-full flex justify-center items-center max-md:flex-col ">

        <div className=" md:hidden w-1/2 py-30">
            <img
              className="rounded-lg shadow-lg w-72  object-cover "
              src={`https://image.tmdb.org/t/p/original${
                result.poster_path || result.backdrop_path
              }`}
              alt={result.title || result.original_title}
            />
          </div>
          <div className="container mx-auto px-4 py-7 flex flex-col justify-center items-center md:space-y-4   md:flex-grow">
            <h1 className="text-4xl max-sm:text-lg text-center font-bold text-white">
              {result.title || result.original_title || result.name || result.original_name}
            </h1>
            <div className="flex items-center space-x-2">
              <span className="text-white opacity-75">
                {result.releaseDate || releaseDatee}
              </span>
              {result.runtime && (
                <span className="text-white opacity-75">
                  {result.runtime} min
                </span>
              )}

              {result.number_of_episodes && (
                <span className="text-white opacity-75">
                  Total Episodes {result.number_of_episodes}
                </span>
              )}
            </div>
            <p className="text-white text-lg max-sm:text-sm opacity-75">{result.overview }</p>
            <div className="flex items-center space-x-4 mt-3">
              <Link to={`/trending/${result.id}`}>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
                Watch Trailer
              </button>
              </Link>
              <button className="px-4 py-2 text-white border border-white rounded-md hover:border-gray-300">
                Add to List
              </button>
            </div>
          </div>
          <div className="hidden md:block w-1/2 py-24">
            <img
              className="rounded-lg shadow-lg w-72  object-cover"
              src={`https://image.tmdb.org/t/p/original${
                result.poster_path || result.backdrop_path
              }`}
              alt={result.title || result.original_title}
            />
          </div>
        </div>
      </div>
    </main>
  );
}


ThemePage.propTypes = {
  result: PropTypes.string.isRequired,
};
