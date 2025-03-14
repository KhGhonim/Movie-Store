import PropTypes from "prop-types";
import { FaSpinner } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

DiscoverGlobalTheme.propTypes = {
  result: PropTypes.string.isRequired,
};

const truncateText = (text, maxLength) => {
  // Check if the text is longer than the maximum length
  if (text.length > maxLength) {
    // Truncate the text and add ellipsis
    return `${text.substring(0, maxLength)}...`;
  }
  // Return the original text if it is not longer than the maximum length
  return text;
};

export default function DiscoverGlobalTheme({ result }) {
  const location = useLocation().pathname.split("/")[1];
  if (!result || result.length === 0) {
    return (
      <div className="flex w-full h-dvh items-center justify-center">
        <FaSpinner className="animate-spin" />
      </div>
    );
  }

  return (
    <main className="h-full !bg-[--background-color] w-full relative flex justify-center items-center flex-wrap py-16">
      {result.map((item) => {
        if (!item.poster_path && !item.backdrop_path) return null;
        return (
          <Link
            to={`/${location !== "DiscoverSeries" ? "movies" : "tv"}/${
              item.id
            }`}
            key={item.id}
          >
            <div className="w-72 h-[500px] overflow-hidden  p-5 rounded-lg shadow-md hover:shadow-xl border hover:border-[--background-Card-log] transition-all ease-in-out duration-500 bg-gray-200 mt-5 cursor-pointer m-2">
              <img
                src={`https://image.tmdb.org/t/p/original${
                  item.poster_path || item.backdrop_path
                }`}
                alt={item.title}
                className="object-cover object-center w-full rounded-md h-72 dark:bg-gray-500"
              />
              <div className="mt-6 mb-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="block text-xs font-medium tracking-widest uppercase text-[--background-Card-log]">
                    {item.media_type}
                  </span>
                  <span className="block text-xs font-medium tracking-widest uppercase text-[--background-Card-log]">
                    {item.original_language}
                  </span>
                </div>
                <h2 className="text-xl font-semibold tracking-wide">
                  {item.name || item.title}
                </h2>
              </div>
              <p className="dark:text-gray-800">
                {truncateText(item.overview, 90)}
              </p>
            </div>
          </Link>
        );
      })}
    </main>
  );
}
