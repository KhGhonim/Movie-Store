import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// @ts-ignore
import video from '../../src/assets/video-file.png'
export default function HeroSection() {
  const [Data, setData] = useState([]);
  useEffect(() => {
    const fetchTrending = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZmFhZjFiNjhiMTFmNmFjZjUwZmUzYTg3NDJmMGMxNyIsIm5iZiI6MTcxOTE1OTc2Mi4wMjU5MjcsInN1YiI6IjY2Nzg0YTlmMmYzNGVjYmRhNzNiMjI1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HAl0urrcB3rZpMGmK6DOb1HNwVzZJHwx2-q7LU3J6v0 `,
        },
      };

      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/trending/all/day?language=en-US",
          options
        );
        const data = await response.json();
        setData(data.results);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchTrending();
  }, []);
  if (!Data || Data.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
      </div>
    );
  }

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


  return (
    <div className="relative   bg-gray-900  !overflow-hidden ">
      {/* PC Version */}
      <Swiper
        spaceBetween={20}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            const posterUrl = `https://image.tmdb.org/t/p/original${Data[index].poster_path}`;

            return `<img class=" !hidden lg:!block ${className}  custom-bullet   " src="${posterUrl}" alt="pagination-${
              index + 1
            }" />`;
          },
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper max-md:!hidden !overflow-hidden  "
      >
        {Data.map((item, index) => (
          <SwiperSlide className="" key={index}>
            <img
              className="h-screen w-full object-cover object-both"
              src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
              alt={`Slide ${index + 1}`}
            />

            <div className="absolute top-20 left-5 pt-3  z-40 opacity-50 hover:opacity-100   transition-opacity duration-500">
              <div className="bg-black bg-opacity-50 text-white rounded-3xl p-5 mb-5 w-96">
                <h4 className="text-2xl font-bold mb-3">
                  {item.title || item.original_name}
                </h4>
                <p className="text-base mb-3">
                  {truncateText(item.overview, 150)}
                </p>
                {item.overview.length > 100 && (
                  <Link
                    to={`/trending/${item.id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Show more
                  </Link>
                )}
              </div>

              <div className="flex justify-center items-center ">
                <div className="button-container relative inline-block">
                  <button className="border border-gray-200 p-3 m-4 rounded-3xl cursor-pointer bg-transparent backdrop-blur-sm relative overflow-hidden text-white gap-10">
                    Add to your FAV
                  </button>
                </div>
                <Link
                  to={`/trending/${item.id}`}
                  className="relative flex justify-center items-center border border-gray-200 p-3 m-3 rounded-3xl cursor-pointer bg-red-600 transition duration-700 ease-in-out hover:bg-red-900 text-white gap-2 "
                >
                  <button className="">Watch and download</button>
                  <img
                    src={video}
                    style={{ width: "20px", height: "20px", color: "white" }}
                    alt=""
                  />
                </Link>
              </div>
            </div>
            <div className="gradient-overlay"></div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Mobile Version */}
      <Swiper
        spaceBetween={20}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper md:!hidden"
      >
        {Data.map((item, index) => (
          <SwiperSlide key={index} className="swiper-slide--gradient">
            <img
              style={{ width: "100%", height: "100dvh" }}
              src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              alt={`Slide ${index + 1}`}
            />
            <div className="absolute top-80 left-5 z-40 opacity-50 hover:opacity-100 transition-opacity duration-500">
              <div className="bg-black bg-opacity-50 text-white rounded-3xl p-3  mb-3 ">
                <h4 className="text-xl font-bold mb-2 sm:mb-3">
                  {item.title || item.original_name}
                </h4>
                <p className="text-sm mb-2 ">
                  {truncateText(item.overview, 150)}
                </p>
                {item.overview.length > 100 && (
                  <Link
                  to={`/trending/${item.id}`}
                  className="text-blue-500 hover:text-blue-700"
                  >
                    Show more
                  </Link>
                )}
              </div>

              <div className="flex flex-col  justify-center items-center space-y-3">
                <div className="button-container relative inline-block">
                  <button className="border border-gray-200 p-2  rounded-3xl cursor-pointer bg-transparent backdrop-blur-sm text-white">
                    Add to your FAV
                  </button>
                </div>
                <Link
                    to={`/trending/${item.id}`}
                    className="flex justify-center items-center border border-gray-200 p-2  rounded-3xl cursor-pointer bg-red-600 transition duration-700 ease-in-out hover:bg-red-900 text-white space-x-2"
                >
                  <button>Watch and download</button>
                  <img
                    src={video}
                    className="!w-5 h-5"
                    alt="Video File"
                  />
                </Link>
              </div>
            </div>

            <div className="gradient-overlay"></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
