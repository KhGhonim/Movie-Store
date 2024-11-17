import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
// @ts-ignore
import Stars from "../../assets/stars.png";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
export default function Drawer() {
  const [Type, setType] = useState(null);
  const [Languge, setLanguge] = useState(null);
  const [Year, setYear] = useState(null);
  const [Rate, setRate] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams("");

  const ref = useRef(null);
  const CloseDrawer = useRef(true);

  const handleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleType = (value) => {
    setType(value);
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("type", value);
      return newParams;
    });
  };

  const handleLanguge = (value) => {
    setLanguge(value);
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("language", value);
      return newParams;
    });
  };
  const handleLYear = (value) => {
    setYear(value);
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("year", value);
      return newParams;
    });
  };

  const handleRate = (value) => {
    setRate(value);
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("rate", value);
      return newParams;
    });
  };



  useEffect(() => {
    // Event handler for clicking outside the SignUp modal
    const HandleModelCloser = (eo) => {
      // Check if the click is not inside the SignUp div
      if (ref.current && !ref.current.contains(eo.target)) {
        // Close the modal
        handleDrawer();
      }
    };

    // Add the event listener for clicking outside the SignUp modal
    document.addEventListener("mousedown", HandleModelCloser);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("mousedown", HandleModelCloser);
    };
  }, []);


  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, index) => currentYear - index);

  const handleSearch = (eo) => {
    eo.preventDefault();
    if (Type) {
      searchParams.set("Type", Type);
    } else {
      searchParams.delete("Type");
    }
    if (Languge) {
      searchParams.set("Languge", Languge);
    } else {
      searchParams.delete("Languge");
    }
    if (Year) {
      searchParams.set("Year", Year);
    } else {
      searchParams.delete("Year");
    }
    if (Rate) {
      searchParams.set("Rate", Rate);
    } else {
      searchParams.delete("Rate");
    }
  };
  return (
    <div>
      {CloseDrawer ? (
        <aside
          className={` fixed inset-y-0  block transition-transform duration-300 ease-in-out ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          }  p-5 w-64 md:w-80 h-dvh  bg-[--background-Search]   rounded-2xl`}
          ref={ref}
        >
          {/* Drawer Handle */}
          <div
            className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2 cursor-pointer flex items-center justify-center bg-[--background-Card-log] text-white p-2 rounded-full"
            onClick={handleDrawer}
          >
            <div className="w-4 h-4 transition-transform duration-300 rounded-xl">
              {isDrawerOpen ? <FaArrowRight /> : <FaArrowLeft />}
            </div>
          </div>

          <form onSubmit={handleSearch} className="space-y-8 text-sm pt-20">
            <div className="space-y-2 ">
              <h2 className="text-sm font-semibold tracking-widest uppercase text-[--text-color] text-center mb-4">
                Choose What you Like
              </h2>

              <div className=" space-y-2 w-full ">
                <div
                  className="group flex flex-col gap-2 rounded-lg bg-[--background-Card-Search] hover:bg-[rgb(38,43,64)] cursor-pointer w-full p-5 text-white"
                  // @ts-ignore
                  tabIndex="1"
                >
                  <div className="flex cursor-pointer items-center justify-between font-bold">
                    <span>Type</span>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png"
                      className="h-2 w-3 transition-all duration-500 group-focus:-rotate-180"
                    />
                  </div>
                  <div className="invisible max-h-0 opacity-0 transition-all my-2 group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000">
                    <div className="grid grid-cols-3 gap-3">
                      <div
                        onClick={() => handleType("35")}
                        className="text-xs font-bold bg-gray-600 hover:bg-gray-700 w-full text-center p-1 rounded-2xl cursor-pointer"
                      >
                        Comedy
                      </div>
                      <div
                        onClick={() => handleType("28")}
                        className="text-xs font-bold bg-gray-600 hover:bg-gray-700 w-full text-center p-1 rounded-2xl cursor-pointer"
                      >
                        Action
                      </div>
                      <div
                        onClick={() => handleType("10749")}
                        className="text-xs font-bold bg-gray-600 hover:bg-gray-700 w-full text-center p-1 rounded-2xl cursor-pointer"
                      >
                        Romantic
                      </div>
                      <div
                        onClick={() => handleType("18")}
                        className="text-xs font-bold bg-gray-600 hover:bg-gray-700 w-full text-center p-1 rounded-2xl cursor-pointer"
                      >
                        Drama
                      </div>
                      <div
                        onClick={() => handleType("16")}
                        className="text-xs font-bold bg-gray-600 hover:bg-gray-700 w-full text-center p-1 rounded-2xl cursor-pointer"
                      >
                        Animation
                      </div>
                      <div
                        onClick={() => handleType("27")}
                        className="text-xs font-bold bg-gray-600 hover:bg-gray-700 w-full text-center p-1 rounded-2xl cursor-pointer"
                      >
                        Horror
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="group flex flex-col gap-2 rounded-lg bg-[rgb(44,51,111)] hover:bg-[rgb(33,38,85)] cursor-pointer w-full p-5 text-white"
                  // @ts-ignore
                  tabIndex="1"
                >
                  <div className="flex cursor-pointer items-center justify-between font-bold">
                    <span>Language</span>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png"
                      className="h-2 w-3 transition-all duration-500 group-focus:-rotate-180"
                    />
                  </div>
                  <div className="invisible max-h-0 opacity-0 transition-all my-2 group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000">
                    <div className="grid grid-cols-3 gap-3">
                      <div
                        onClick={() => handleLanguge("ar")}
                        className="text-xs font-bold bg-gray-600 hover:bg-gray-700 w-full text-center p-1 rounded-2xl cursor-pointer"
                      >
                        Arabic
                      </div>
                      <div
                        onClick={() => handleLanguge("en")}
                        className="text-xs font-bold bg-gray-600 hover:bg-gray-700 w-full text-center p-1 rounded-2xl cursor-pointer"
                      >
                        English
                      </div>
                      <div
                        onClick={() => handleLanguge("es")}
                        className="text-xs font-bold bg-gray-600 hover:bg-gray-700 w-full text-center p-1 rounded-2xl cursor-pointer"
                      >
                        Spanish
                      </div>
                      <div
                        onClick={() => handleLanguge("fr")}
                        className="text-xs font-bold bg-gray-600 hover:bg-gray-700 w-full text-center p-1 rounded-2xl cursor-pointer"
                      >
                        French
                      </div>
                      <div
                        onClick={() => handleLanguge("tr")}
                        className="text-xs font-bold bg-gray-600 hover:bg-gray-700 w-full text-center p-1 rounded-2xl cursor-pointer"
                      >
                        Turkish
                      </div>
                      <div
                        onClick={() => handleLanguge("ja")}
                        className="text-xs font-bold bg-gray-600 hover:bg-gray-700 w-full text-center p-1 rounded-2xl cursor-pointer"
                      >
                        Japanese
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="group flex flex-col gap-2 rounded-lg bg-[rgb(83,103,255)] hover:bg-[rgba(69,86,212,0.92)] cursor-pointer w-full  p-5 text-white"
                  // @ts-ignore
                  tabIndex="1"
                >
                  <div className="flex cursor-pointer items-center justify-between font-bold">
                    <span> Year </span>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png"
                      className="h-2 w-3 transition-all duration-500 group-focus:-rotate-180"
                    />
                  </div>
                  <div className="invisible max-h-0 opacity-0 transition-all my-2 group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000">
                    <div className="grid grid-cols-3 gap-3 ">
                      {years.map((year) => (
                        <option
                          className="text-xs font-bold bg-gray-600 hover:bg-gray-700 w-full text-center p-1 rounded-2xl"
                          key={year}
                          value={year}
                          onClick={() => handleLYear(year)}
                        >
                          {year}
                        </option>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  className="group flex flex-col gap-2 rounded-lg bg-[rgb(44,51,111)] hover:bg-[rgb(33,38,85)] cursor-pointer w-full p-5 text-white"
                  // @ts-ignore
                  tabIndex="1"
                >
                  <div className="flex cursor-pointer items-center justify-between font-bold">
                    <span>Rate</span>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png"
                      className="h-2 w-3 transition-all duration-500 group-focus:-rotate-180"
                    />
                  </div>
                  <div className="invisible max-h-0 opacity-0 transition-all my-2 group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000">
                    <div className="grid grid-cols-3 gap-3">
                      {[5, 6, 7, 8, 9].map((rate) => (
                        <div
                          className="text-lg font-bold bg-gray-600 hover:bg-gray-700 w-full text-center rounded-2xl flex justify-center items-center gap-1 p-2"
                          key={rate}
                          onClick={() => handleRate(rate)}
                        >
                          {rate}
                          <img
                            src={Stars}
                            className="h-5 w-5 transition-all duration-500 group-focus:-rotate-180"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </aside>
      ) : null}
    </div>
  );
}
