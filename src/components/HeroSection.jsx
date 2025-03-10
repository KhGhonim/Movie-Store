import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useState } from "react";
import { Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// @ts-ignore
import video from "../../src/assets/video-file.png";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaSpinner } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useApi } from "../Hooks/ApiRequest";
export default function HeroSection() {
  const [user, loading] = useAuthState(auth);
  const [activeIndex, setActiveIndex] = useState(0);
  const ApiURL = import.meta.env.VITE_APP_HeroSection_API;
  const ApiKey = import.meta.env.VITE_APP_API_Authorization;
  const { Data, isLoading } = useApi(ApiURL, ApiKey);

  const handleAddToFavorites = async (item) => {
    if (!user) {
      toast.error("You must be logged in");
      return;
    }

    try {
      const itemData = {
        id: item.id,
        poster_path: item.poster_path,
        title: item.title || item.original_name,
        media_type: item.media_type,
      };

      await setDoc(doc(db, user.uid, item.id.toString()), itemData);
      toast.success(`Added ${item.title || item.original_name} to FAV!`);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const fadeInBoxVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const slideDownButtonVariant = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.4, ease: "easeOut" },
    },
  };

  if (loading || isLoading) {
    return (
      <div className="flex w-full h-dvh items-center justify-center">
        <FaSpinner className="animate-spin" />
      </div>
    );
  }

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  if (Data?.results && Data?.results.length > 0) {
    return (
      <div className="relative bg-gray-900  h-dvh !overflow-hidden ">
        {/* PC Version */}
        <Swiper
          spaceBetween={5}
          centeredSlides={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          grabCursor={true}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              const posterUrl = `https://image.tmdb.org/t/p/original${Data?.results[index].poster_path}`;
              return `<img class=" !hidden lg:!block ${className}  custom-bullet" src="${posterUrl}" alt="pagination-${
                index + 1
              }" />`;
            },
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          navigation={true}
          modules={[Autoplay, Pagination]}
          className="mySwiper max-md:!hidden !overflow-hidden"
        >
          {Data?.results?.map((item, index) => (
            <SwiperSlide className="" key={index}>
              <img
                className="h-screen w-full object-cover object-both"
                src={`https://image.tmdb.org/t/p/original${item?.backdrop_path}`}
                alt={`Slide ${index + 1}`}
              />

              {activeIndex === index && (
                <motion.div
                  key={item?.id}
                  variants={fadeInBoxVariant}
                  initial="hidden"
                  animate="visible"
                  className="absolute top-20 left-5 pt-3 z-40 opacity-50 hover:opacity-100 transition-opacity duration-500"
                >
                  {/* Info Box */}
                  <motion.div className="bg-black bg-opacity-50 text-white rounded-3xl p-5 mb-5 w-96">
                    <h4 className="text-2xl font-bold mb-3">
                      {item?.title || item?.original_name}
                    </h4>
                    <p className="text-base mb-3">
                      {truncateText(item?.overview, 150)}
                    </p>
                    {item?.overview.length > 100 && (
                      <Link
                        to={`/trending/${item?.id}`}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Show more
                      </Link>
                    )}
                  </motion.div>

                  {/* Buttons with staggered animation */}
                  <motion.div className="flex justify-center items-center">
                    <motion.div
                      variants={slideDownButtonVariant}
                      initial="hidden"
                      animate="visible"
                      className="button-container relative inline-block"
                    >
                      <button
                        onClick={() => handleAddToFavorites(item)}
                        className="border overflow-hidden border-gray-200 p-3 m-4 rounded-3xl cursor-pointer bg-transparent backdrop-blur-sm text-white"
                      >
                        Add to your FAV
                      </button>
                    </motion.div>

                    <motion.div
                      variants={slideDownButtonVariant}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        to={`/trending/${item?.id}`}
                        className="relative flex justify-center items-center border border-gray-200 p-3 m-3 rounded-3xl cursor-pointer bg-red-600 transition duration-700 ease-in-out hover:bg-red-900 text-white gap-2"
                      >
                        <button>Watch Trailer</button>
                        <img
                          src={video}
                          alt=""
                          style={{ width: "20px", height: "20px" }}
                        />
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
              <div className="gradient-overlay" />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Mobile Version */}
        <Swiper
          spaceBetween={5}
          centeredSlides={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          grabCursor={true}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Navigation]}
          className="mySwiper md:!hidden"
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {Data.results.map((item, index) => (
            <SwiperSlide key={index} className="swiper-slide--gradient">
              <img
                style={{ width: "100%", height: "100dvh" }}
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                alt={`Slide ${index + 1}`}
              />

              {/* AnimatePresence for smooth animations */}
              <AnimatePresence mode="wait">
                {activeIndex === index && (
                  <motion.div
                    key={item?.id}
                    variants={fadeInBoxVariant}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-80 left-5 z-40 opacity-50 hover:opacity-100 transition-opacity duration-500"
                  >
                    {/* Info Box */}
                    <motion.div className="bg-black bg-opacity-50 text-white rounded-3xl p-3 mb-3">
                      <h4 className="text-xl font-bold mb-2 sm:mb-3">
                        {item?.title || item?.original_name}
                      </h4>
                      <p className="text-sm mb-2">
                        {truncateText(item?.overview, 150)}
                      </p>
                      {item?.overview.length > 100 && (
                        <Link
                          to={`/trending/${item?.id}`}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Show more
                        </Link>
                      )}
                    </motion.div>

                    {/* Buttons with staggered animation */}
                    <motion.div className="flex flex-col justify-center items-center space-y-3">
                      <motion.div
                        variants={slideDownButtonVariant}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="button-container relative inline-block"
                      >
                        <button
                          onClick={() => handleAddToFavorites(item)}
                          className="border border-gray-200 overflow-hidden p-2 rounded-3xl cursor-pointer bg-transparent backdrop-blur-sm text-white"
                        >
                          Add to your FAV
                        </button>
                      </motion.div>

                      <motion.div
                        variants={slideDownButtonVariant}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <Link
                          to={`/trending/${item.id}`}
                          className="flex justify-center items-center border border-gray-200 p-2 rounded-3xl cursor-pointer bg-red-600 transition duration-700 ease-in-out hover:bg-red-900 text-white space-x-2"
                        >
                          <button>Watch Trailer</button>
                          <img
                            src={video}
                            className="!w-5 h-5"
                            alt="Video File"
                          />
                        </Link>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="gradient-overlay"></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }
}
