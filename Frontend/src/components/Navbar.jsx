// @ts-ignore
import { useEffect, useRef, useState } from "react";
// @ts-ignore
import menubar from "../assets/menu-bar.png";
// @ts-ignore
import Close from "../assets/cross.png";
// @ts-ignore
import search from "../assets/search.png";
// @ts-ignore
import house from "../assets/house.png";
// @ts-ignore
import BestChoice from "../assets/best-choice.png";
// @ts-ignore
import Series from "../assets/drama.png";
// @ts-ignore
import Books from "../assets/stack-of-books.png";
// @ts-ignore
import Movie from "../assets/watching-a-movie.png";
// @ts-ignore
import Settings from "../assets/settings.png";
// @ts-ignore
import LogIn from "../assets/log-in.png";
// @ts-ignore
import LogOut from "../assets/logout.png";
import DarkMode from "./DarkMode";
// @ts-ignore
import AddProduct from "../assets/add-to-cart.png";
import SignIn from "../Pages/Auth/SignIn/SignIn";
import SignUp from "../Pages/Auth/SignUp/SignUp";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [MenuPosition, setMenuPosition] = useState("");
  const [Model, setModel] = useState("hidden");
  const [SignUpModel, setSignUpModel] = useState("hidden");
  /**
   Sets the state of the Sign In Model to "hidden", closing the modal.
   */
  const ModelCloser = () => {
    setModel("hidden");
  };
  /**
   Sets the state of the Sign In Model to "block", opening the modal.
   */

  const ModelOpener = () => {
    setModel("block");
  };

  /**
   Sets the state of the Sign up Model to "hidden", closing the modal.
   */

  const SignUpModelCloser = () => {
    setSignUpModel("hidden");
  };
  /**
   Sets the state of the Sign up Model to "block", opening the modal.
   */
  const SignUpModelOpener = () => {
    setSignUpModel("block");
  };

  // Switching to SignIn Model
  const SignInDirection = () => {
    SignUpModelCloser();
    ModelOpener();
  };

  // Switching to SignUp Model

  const SignUpDirection = () => {
    SignUpModelOpener();
    ModelCloser();
  };
  const HandleMenu = () => {
    setShowMenu((prev) => !prev);
  };
  const ref = useRef(null);
  const toggleButtonRef = useRef(null);
  const MyMenuRef = useRef(null);

  /**
   * This useEffect hook handles the logic of closing the menu when the user clicks outside of it.
   * It adds a click event listener to the document and removes it when the component is unmounted.
   * The function handleClickOutside checks if the clicked element is outside of the menu and the toggle button.
   * If it is, it sets the showMenu state to false, which hides the menu.
   */
  useEffect(() => {
    const handleClickOutside = (eo) => {
      if (
        ref.current &&
        !ref.current.contains(eo.target) &&
        MyMenuRef.current &&
        !MyMenuRef.current.contains(eo.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(eo.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 70) {
        setMenuPosition("top-0");
      } else {
        setMenuPosition("");
      }
    };

    // Attach the event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className=" relative  ">
      <header className="bg-transparent absolute top-2 left-0 w-full z-50  px-4 sm:px-6 lg:px-8">
        <div className="">
          <div className="flex h-16 items-center justify-between">
            {/* logo */}

            <div className="flex items-center justify-between gap-2 md:gap-5">
              <div className="flex  items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full bg-[--background-Card-log] ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  className="flex-shrink-0 w-4 h-4 md:w-6 md:h-6 rounded-full dark:text-gray-50"
                >
                  <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z"></path>
                </svg>
              </div>
              <a
                className="block text-white font-semibold text-sm md:text-xl "
                href="/"
              >
                <h1>
                  KG Book
                  <span className="text-red-500 ml-2">
                    and Movie Store
                  </span>{" "}
                </h1>
              </a>
            </div>

            {/* Big Screen Navbar */}

            <div className="flex items-center md:gap-12">
              <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <a
                      className="text-white transition hover:text-red-500 font-semibold text-lg"
                      href="#"
                    >
                      Movies
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-white transition hover:text-red-500 font-semibold text-lg"
                      href="#"
                    >
                      Series
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-white transition hover:text-red-500 font-semibold text-lg"
                      href="#"
                    >
                      Books
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-white transition hover:text-red-500 font-semibold text-lg"
                      href="#"
                    >
                      Best Sellers
                    </a>
                  </li>
                </ul>
              </nav>

              {/* Dark Mode */}

              <div>
                <DarkMode />
              </div>

              <div className="hidden md:block  min-w-5 sm:pr-2">
                <a
                  className=" rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-violet-300 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
                  href="/AddMovie"
                >
                  Add Products
                </a>
              </div>

              <div className="flex items-center gap-4">
                {/* Login and Register for Big Screens */}
                <div className="sm:flex sm:gap-4">
                  <div
                    className=" hidden md:block rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow cursor-pointer focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    onClick={ModelOpener}
                  >
                    Login
                  </div>

                  <div className="hidden sm:flex">
                    <div
                      className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-white cursor-pointer  hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                      onClick={SignUpModelOpener}
                    >
                      Register
                    </div>
                  </div>
                </div>

                {/* Mobile Toggle Button */}

                <div className="block md:hidden">
                  <button
                    ref={toggleButtonRef}
                    onClick={HandleMenu}
                    className="rounded p-2 hover:shadow-sm"
                  >
                    <img
                      style={{ width: "25px", height: "25px" }}
                      src={menubar}
                      alt="menubar"
                    />
                  </button>

                  {/* Mobile Menu */}

                  <div
                    ref={MyMenuRef}
                    className={`fixed h-full ${MenuPosition}  z-50 right-0  transition-transform duration-300 ease-in-out ${
                      showMenu ? "translate-x-0" : "translate-x-full"
                    }  `}
                  >
                    <div
                      ref={ref}
                      className="relative flex flex-col  h-full  p-3 w-60 bg-[--background-Menu] dark:text-gray-800 rounded-lg z-50"
                    >
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center justify-between text-[--text-color] font-bold">
                          <h2>Dashboard</h2>
                          <img
                            onClick={() => {
                              setShowMenu(false);
                            }}
                            src={Close}
                            width={40}
                            height={40}
                            alt=""
                            className="p-2"
                          />
                        </div>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center py-4">
                            <img
                              width={35}
                              src={search}
                              alt="Search"
                              className="p-2 "
                            />
                          </span>
                          <input
                            type="search"
                            name="Search"
                            placeholder="Search..."
                            className="w-full py-2 pl-10 text-sm dark:border- rounded-md focus:outline-none dark:bg-gray-100 dark:text-gray-800 focus:dark:bg-gray-50"
                          />
                        </div>
                        <div className="flex-1">
                          <ul className="pt-2 pb-4 space-y-1 text-sm">
                            <li className="rounded-lg hover:bg-gray-100 hover:text-gray-900 text-[--text-color] hover:font-semibold">
                              <a
                                rel="noopener noreferrer"
                                href="#"
                                className="flex items-center p-2 space-x-3 rounded-md  "
                              >
                                <img
                                  width={25}
                                  src={AddProduct}
                                  alt="Search"
                                  className=" "
                                />
                                <span>Add Product</span>
                              </a>
                            </li>

                            <li className="rounded-lg hover:bg-gray-100 hover:text-gray-900 text-[--text-color] hover:font-semibold">
                              <a
                                rel="noopener noreferrer"
                                href="#"
                                className="flex items-center p-2 space-x-3 rounded-md  "
                              >
                                <img
                                  width={25}
                                  src={house}
                                  alt="Search"
                                  className=" "
                                />
                                <span>Home</span>
                              </a>
                            </li>
                            <li className="rounded-lg hover:bg-gray-100 hover:text-gray-900 text-[--text-color] hover:font-semibold">
                              <a
                                rel="noopener noreferrer"
                                href="#"
                                className="flex items-center p-2 space-x-3 rounded-md  "
                              >
                                <img
                                  width={25}
                                  src={Movie}
                                  alt="Search"
                                  className=" "
                                />

                                <span>Movies</span>
                              </a>
                            </li>
                            <li className="rounded-lg hover:bg-gray-100 hover:text-gray-900 text-[--text-color] hover:font-semibold">
                              <a
                                rel="noopener noreferrer"
                                href="#"
                                className="flex items-center p-2 space-x-3 rounded-md  "
                              >
                                <img
                                  width={25}
                                  src={Series}
                                  alt="Search"
                                  className=" "
                                />

                                <span>Series</span>
                              </a>
                            </li>
                            <li className="rounded-lg hover:bg-gray-100 hover:text-gray-900 text-[--text-color] hover:font-semibold">
                              <a
                                rel="noopener noreferrer"
                                href="#"
                                className="flex items-center p-2 space-x-3 rounded-md  "
                              >
                                {" "}
                                <img
                                  width={25}
                                  src={Books}
                                  alt="Search"
                                  className=" "
                                />
                                <span>Books</span>
                              </a>
                            </li>
                            <li className="rounded-lg hover:bg-gray-100 hover:text-gray-900 text-[--text-color] hover:font-semibold">
                              <a
                                rel="noopener noreferrer"
                                href="#"
                                className="flex items-center p-2 space-x-3 rounded-md  "
                              >
                                <img
                                  width={25}
                                  src={BestChoice}
                                  alt="Search"
                                  className=" "
                                />

                                <span>Best Sellers</span>
                              </a>
                            </li>
                            <li className="rounded-lg hover:bg-gray-100 hover:text-gray-900 text-[--text-color] hover:font-semibold">
                              <a
                                rel="noopener noreferrer"
                                href="#"
                                className="flex items-center p-2 space-x-3 rounded-md  "
                              >
                                {" "}
                                <img
                                  width={25}
                                  src={Settings}
                                  alt="Search"
                                  className=" "
                                />
                                <span>Settings</span>
                              </a>
                            </li>
                            <li className="rounded-lg hover:bg-gray-100 hover:text-gray-900 text-[--text-color] hover:font-semibold">
                              <a
                                rel="noopener noreferrer"
                                href="/SignOut"
                                className="flex items-center p-2 space-x-3 rounded-md  "
                              >
                                <img
                                  width={25}
                                  src={LogOut}
                                  alt="Search"
                                  className=" "
                                />
                                <span>Logout</span>
                              </a>
                            </li>

                            <li className="rounded-lg hover:bg-gray-100 hover:text-gray-900 text-[--text-color] hover:font-semibold">
                              <a
                                rel="noopener noreferrer"
                                href="/SignIn"
                                className="flex items-center p-2 space-x-3 rounded-md  "
                              >
                                <img
                                  width={25}
                                  src={LogIn}
                                  alt="Search"
                                  className=" "
                                />
                                <span>LogIn</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="sticky bottom-0">
                        <div className=" inset-x-0 flex items-center p-2 mt-28 space-x-4 justify-self-end rounded-lg">
                          <img
                            src="https://source.unsplash.com/100x100/?portrait"
                            alt=""
                            className="w-12 h-12 rounded-xlg dark:bg-gray-500"
                          />
                          <div>
                            <h2 className="text-lg font-semibold text-[--text-color]">
                              Leroy Jenkins
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <SignIn
        SignUpDirection={SignUpDirection}
        Model={Model}
        ModelCloser={ModelCloser}
      />
      <SignUp
        SignInDirection={SignInDirection}
        SignUpModel={SignUpModel}
        SignUpModelCloser={SignUpModelCloser}
        ModelOpener={ModelOpener}
      />
    </div>
  );
}
