import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import PropTypes from "prop-types";
import { FaPlay } from "react-icons/fa6";
// @ts-ignore
import Starts from "../assets/stars.png";

Crousel.propTypes = {
  result: PropTypes.array.isRequired,
};
Crousel.propTypes = {
  Page: PropTypes.string.isRequired,
};
Crousel.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default function Crousel({ result, Page, isLoading }) {

  if (isLoading) {
    return (
      <Swiper
        slidesPerView={1}
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
        {Array.from({ length: 10 }).map((_, index) => (
          <SwiperSlide key={index} className="swiperslide relative">
            <div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-96">
              <div className="h-48 rounded-t dark:bg-gray-300"></div>
              <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-50">
                <div className="w-full h-6 rounded dark:bg-gray-300"></div>
                <div className="w-full h-6 rounded dark:bg-gray-300"></div>
                <div className="w-3/4 h-6 rounded dark:bg-gray-300"></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
  return (
    <div className="relative">
      <Link
        to={Page === "movies" ? "/DiscoverMovies" : "/DiscoverSeries"}
        className="absolute right-5 rounded-full z-50 transition-all duration-300 ease-in-out cursor-pointer border border-gray-100 py-1 px-4 md:py-2 md:px-6 text-white bg-transparent hover:bg-white hover:text-red-500"
      >
        <h2 className="font-bold">View More</h2>
      </Link>
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
          {result?.results?.map((results) => {
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

            if (results.backdrop_path === null) {
              return null;
            }
            return (
              <SwiperSlide
                className="swiperslide relative"
                key={results.backdrop_path}
              >
                <div className="relative w-72 max-sm:w-52 max-md:w-60 h-full mx-4 hover:scale-105 duration-300 cursor-pointer my-20">
                  <Link to={`/${Page}/${results.id}`} className="w-full h-full">
                    <div className="absolute inset-0  z-30 bg-black group opacity-0 hover:opacity-70 transition-opacity duration-300 ease-in-out rounded-2xl">
                      <p className="text-2xl max-sm:text-base font-bold text-center mt-16 text-gray-50">
                        {results.title || results.original_name}
                      </p>

                      {/* YouTube-like Play Button */}
                      <div className="absolute inset-0 z-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-red-600 w-20 h-14 flex justify-center items-center rounded-full shadow-lg hover:shadow-red-500/50 transition-all duration-300">
                          <FaPlay className="text-white text-3xl" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="absolute top-2 left-0 bg-[--background-color] p-1 md:p-2 rounded-full">
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
                      loading="lazy"
                      alt={results.title}
                      className="rounded-2xl object-cover h-full w-full"
                    />

                    <div className="absolute bottom-2 w-6 md:w-10 max-sm:bottom-3 right-0 bg-[--background-color] p-1 md:p-2 rounded-l-3xl">
                      <p className=" text-sm md:text-xl font-bold text-center text-[--text-color]">
                        {Rating}
                        <img
                          src={Starts}
                          alt="rating"
                          className=" object-cover"
                        />
                      </p>
                    </div>
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
