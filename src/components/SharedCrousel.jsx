import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import PropTypes from "prop-types";
// @ts-ignore
import Starts from "../assets/stars.png";

Crousel.propTypes = {
  result: PropTypes.array.isRequired,
};
Crousel.propTypes = {
  Page: PropTypes.string.isRequired,
};


export default function Crousel({ result, Page }) {
  if (!result || result.length === 0) {
    return (
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide className="swiperslide relative">
          <div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-96">
            <div className="h-48 rounded-t dark:bg-gray-300"></div>
            <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-50">
              <div className="w-full h-6 rounded dark:bg-gray-300"></div>
              <div className="w-full h-6 rounded dark:bg-gray-300"></div>
              <div className="w-3/4 h-6 rounded dark:bg-gray-300"></div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    );
  }
  return (
    <div>
      <Swiper
        slidesPerView={2}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 0,
          },
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <div className="relative w-full h-screen    ">
          {result.map((results) => {
            const releaseDate = results.release_date
              ? new Date(results.release_date).getFullYear()
              : null;
            const firstAirDate = results.first_air_date
              ? new Date(results.first_air_date).getFullYear()
              : null;
            const displayYear = releaseDate || firstAirDate;
            const Rating = results.vote_average
              ? new Number(results.vote_average).toFixed()
              : null;
            return (
              <SwiperSlide
                className="swiperslide relative"
                key={results.backdrop_path}
              >
                <div className=" relative w-72 max-sm:w-52 max-md:w-60 h-full mx-4 hover:scale-105 duration-300 cursor-pointer my-20 ">
                  <Link to={`/${Page}/${results.id}`} className="w-full h-full ">
                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-70 transition-opacity duration-300 ease-in-out rounded-2xl">
                      <p className="text-2xl max-sm:text-base  font-bold text-center mt-16 text-[#fff]">
                        {results.title || results.original_name}
                      </p>
                    </div>

                    <div>
                      <div className="absolute top-2 left-0 bg-[--background-color] p-1 md:p-2 rounded-full   ">
                        <p className="text-xl max-sm:text-xs capitalize font-bold text-center text-[--text-color]">
                          {results.original_language}
                        </p>
                      </div>

                      <div className="absolute top-2 right-0 bg-[--background-color] p-1 md:p-2 rounded-full">
                        <p className="text-base max-sm:text-xs font-normal text-center text-[--text-color]">
                          {displayYear}
                        </p>
                      </div>
                    </div>

                    <img
                      src={`https://image.tmdb.org/t/p/w500${
                        results.poster_path || results.backdrop_path
                      }`}
                      alt={results.title}
                      className="rounded-2xl object-cover h-full w-full   "
                    />

                    <div className="absolute bottom-2 max-sm:bottom-3 right-0 bg-[--background-color] p-1 md:p-2 rounded-l-3xl">
                      <p className="text-xl max-sm:text-xs font-bold text-center text-[--text-color]">
                        {Rating}
                        <img
                          src={Starts}
                          alt="rating"
                          style={{ width: "30px" }}
                        />
                      </p>
                    </div>
                    {/* <div className="absolute bottom-2 max-sm:bottom-3 left-0 bg-red-500 p-1 md:p-2 rounded-r-3xl">
                      <p className="text-base max-sm:text-xs font-bold text-center text-[--text-color]">
                        {results.EpisodeNumber === null
                          ? ""
                          : results.EpisodeNumber}
                      </p>
                    </div> */}
                  </Link>
                </div>
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
    </div>
  );
}

