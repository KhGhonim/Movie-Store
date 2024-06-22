import { Link } from "react-router-dom";
// @ts-ignore
import poster from "../assets/Movies/poster.jpg";
 // Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";

export default function Crousel({ result }) {
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
            return (
              <SwiperSlide className="swiperslide relative" key={results.Name}>
                <div className=" relative w-72 max-sm:w-52 max-md:w-60 h-full mx-4 hover:scale-105 duration-300 cursor-pointer my-20 ">
                  <Link to={`/movies/${results.Name}`} className="w-full h-full ">
                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-70 transition-opacity duration-300 ease-in-out rounded-2xl">
                      <p className="text-2xl max-sm:text-base  font-bold text-center mt-16 text-[--text-color]">
                        {results.Name}
                      </p>
                    </div>

                    <div>
                      <div className="absolute top-2 left-0 bg-[--background-color] p-1 md:p-2 rounded-full   ">
                        <p className="text-xl max-sm:text-xs font-bold text-center text-[--text-color]">
                          {results.Quality}
                        </p>
                      </div>

                      <div className="absolute top-2 right-0 bg-[--background-Card-Color] p-1 md:p-2 rounded-full">
                        <p className="text-base max-sm:text-xs font-normal text-center text-[--text-color]">
                          {results.Year}
                        </p>
                      </div>
                    </div>

                    <img
                      src={poster}
                      alt="MoviePoster"
                      className="rounded-2xl object-cover h-60"
                    />

                    <div className="absolute bottom-2 max-sm:bottom-3 right-0 bg-[--background-color] p-1 md:p-2 rounded-l-3xl">
                      <p className="text-xl max-sm:text-xs font-bold text-center text-[--text-color]">
                        {results.Type}
                      </p>
                    </div>
                    <div className="absolute bottom-2 max-sm:bottom-3 left-0 bg-red-500 p-1 md:p-2 rounded-r-3xl">
                      <p className="text-base max-sm:text-xs font-bold text-center text-[--text-color]">
                        {results.EpisodeNumber === null
                          ? ""
                          : results.EpisodeNumber}
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
