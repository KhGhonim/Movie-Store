import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Coverimages, images, Smallimages } from "../db/db";

export default function HeroSection() {
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
            return `<img class=" !hidden lg:!block ${className}  custom-bullet   " src="${
              images[index]
            }" alt="pagination-${index + 1}" />`;
          },
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper max-md:!hidden !overflow-hidden  "
      >
        {Coverimages.map((image, index) => (
          <SwiperSlide className="" key={index}>
            <img
              className="  rounded-br-3xl rounded-bl-2xl"
              src={image}
              alt={`Slide ${index + 1}`}
            />

            <div className="absolute top-20 right-5  z-40">
            <img className="w-[400px] " src={images[index]} alt={`pagination-${index + 1}`} />

              <div className="flex justify-center items-center">
                <p></p>
                <p></p>
                <p></p>
                <p></p>
              </div>
              <div className="text-white font-bold text-xl">
                <h4>Description</h4>
              </div>

              <div className="flex justify-center items-center ">
                <div className="button-container relative inline-block">
                  <button className="border border-gray-200 p-3 m-4 rounded-3xl cursor-pointer bg-transparent backdrop-blur-sm relative overflow-hidden text-white gap-10">
                    Add to your FAV
                  </button>
                </div>
                <div className="relative flex justify-center items-center border border-gray-200 p-3 m-3 rounded-3xl cursor-pointer bg-red-600 transition duration-700 ease-in-out hover:bg-red-900 text-white gap-2 ">
                  <button className="">Watch and download</button>
                  <img
                    src="../../src/assets/video-file.png"
                    style={{ width: "20px", height: "20px", color: "white" }}
                    alt=""
                  />
                </div>
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
        {Smallimages.map((image, index) => (
          <SwiperSlide key={index} className="swiper-slide--gradient">
            <img
              style={{ width: "100%", height: "100dvh" }}
              src={image}
              alt={`Slide ${index + 1}`}
            />
            <div className="gradient-overlay"></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
