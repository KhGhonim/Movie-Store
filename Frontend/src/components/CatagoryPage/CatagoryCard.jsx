import PropTypes from "prop-types";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

/**
 * Truncates a given text to a maximum length and adds ellipsis if necessary.
 */
const truncateText = (text, maxLength) => {
  // Check if the text is longer than the maximum length
  if (text.length > maxLength) {
    // Truncate the text and add ellipsis
    return `${text.substring(0, maxLength)}...`;
  }
  // Return the original text if it is not longer than the maximum length
  return text;
};

CatagoryCard.propTypes = {
  CatagoryData: PropTypes.array.isRequired,
};


export default function CatagoryCard({ CatagoryData }) {
  const [currentPage, setcurrentPage] = useState(1);
  /**
   * Number of items to display on each page.   */
  let itemsPerPage = 9;
  /**
   * Calculate the index of the last item to display on the current page.
   */
  const indexOfLastItem = currentPage * itemsPerPage;
  /**
   * Calculate the index of the first item to display on the current page.
   */
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  /**
   * Slice the CatagoryData array to get the items to display on the current page.
   */
  const currentItems = CatagoryData.slice(indexOfFirstItem, indexOfLastItem);
  /**
   * Calculate the total number of pages needed to display all items.
   */
  const totalPages = Math.ceil(CatagoryData.length / itemsPerPage);

  /**
   * Increment the current page state by 1, if possible.
   */
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setcurrentPage(currentPage + 1);
    }
  };

  /**
   * Decrement the current page state by 1, if possible.
   */
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setcurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full min-h-screen">
      <div className="relative   flex flex-wrap justify-center">
        {currentItems.map((item) => {
          if (!item.poster_path && !item.backdrop_path) return null;

          return (
            <Link key={item.id} to={`${item.name || item.title}`}>
              <div className="w-72 h-[500px] overflow-hidden  p-5 rounded-lg shadow-md hover:shadow-xl border hover:border-[--text-colorForCatagory] transition-all ease-in-out duration-500 dark:bg-gray-50 dark:text-gray-900 mt-5 cursor-pointer m-2">
                <img
                  src={`https://image.tmdb.org/t/p/w500${
                    item.poster_path || item.backdrop_path
                  }`}
                  alt={item.title}
                  className="object-cover object-center w-full rounded-md h-72 dark:bg-gray-500"
                />
                <div className="mt-6 mb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="block text-xs font-medium tracking-widest uppercase text-[--text-colorForCatagory]">
                      {item.media_type}
                    </span>
                    <span className="block text-xs font-medium tracking-widest uppercase text-[--text-colorForCatagory]">
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
      </div>
      <div className="items-center space-y-2 text-xs sm:space-y-0 sm:space-x-3 sm:flex py-4  justify-center ">
        <div className="space-x-1">
          <button
            onClick={handlePreviousPage}
            title="previous"
            type="button"
            className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow text-white bg-[--text-colorForCatagory] hover:bg-[--text-colorForCatagory] hover:text-grey-900 hover:scale-110 transition-transform duration-200 ease-in-out"
          >
            <FaArrowLeft />
          </button>
          <span className=" px-2 p-1 bg-slate-400 rounded-full text-white text-xl">
            {currentPage}
          </span>

          <button
            onClick={handleNextPage}
            title="next"
            type="button"
            className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow text-white bg-[--text-colorForCatagory] hover:bg-[--text-colorForCatagory] hover:text-grey-900 hover:scale-110 transition-transform duration-200 ease-in-out"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

