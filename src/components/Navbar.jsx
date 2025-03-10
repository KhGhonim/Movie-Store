// @ts-ignore
import { useEffect, useRef, useState } from "react";
// @ts-ignore
import menubar from "../assets/menu-bar.png";
// @ts-ignore
import Close from "../assets/cross.png";
// @ts-ignore
import house from "../assets/house.png";
import Logo from "../assets/Kogo.png";

// @ts-ignore
import Series from "../assets/drama.png";
// @ts-ignore
import application from "../assets/application.png";
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
import NonProfilePic from "../assets/NonProfilePic.jpg";
import SignIn from "../Pages/Auth/SignIn/SignIn";
import SignUp from "../Pages/Auth/SignUp/SignUp";
import Search from "./Search";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import ErrorPage from "../Pages/Error/ErrorPage";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WatchList from "./WatchList";
import { FaSpinner } from "react-icons/fa";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [MenuPosition, setMenuPosition] = useState("");
  const [Model, setModel] = useState("hidden");
  const [SignUpModel, setSignUpModel] = useState("hidden");
  const [user, loading, error] = useAuthState(auth);

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

  if (loading) {
    return (
      <div className="flex w-full h-dvh items-center justify-center">
        <FaSpinner className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return <ErrorPage />;
  }
  return (
    <div id="nav" className=" relative  ">
      <header className="bg-transparent absolute top-2 left-0 right-0 w-full z-30  px-4 sm:px-6 lg:px-8">
        <div className="">
          <div className="flex h-16 items-center justify-between">
            {/* logo */}

            <div className="flex   items-center justify-between gap-2 md:gap-5">
              <div className="flex   items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full bg-[--background-Card-log] ">
                <img src={Logo} className="w-6 h-6 md:w-8 md:h-8 " />
              </div>
              <a
                className="block   text-white font-semibold text-lg md:text-4xl "
                href="/"
              >
                <h1>
                  KG
                  <span className="text-red-500">Movie</span>{" "}
                </h1>
              </a>
            </div>

            {/* Big Screen Navbar */}

            <div className="flex items-center md:gap-12">
              <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <a
                      className="text-white  hover:text-red-500 transition-all duration-500 ease-out font-semibold text-xl"
                      href="/DiscoverMovies"
                    >
                      Movies
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-white  hover:text-red-500 transition-all duration-500 ease-out font-semibold text-xl"
                      href="/DiscoverSeries"
                    >
                      Series
                    </a>
                  </li>

                  <li>
                    <Search />
                  </li>
                </ul>
              </nav>

              {/* Dark Mode */}

              <div>
                <DarkMode />
              </div>

              {user && <WatchList />}

              <div className="flex items-center gap-4">
                {/* Login and Register for Big Screens */}
                {!user && (
                  <div className="sm:flex sm:gap-4">
                    <div
                      className=" hidden md:block rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow cursor-pointer focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      onClick={ModelOpener}
                    >
                      Login
                    </div>

                    <div className="hidden sm:flex">
                      <div
                        className="rounded-md bg-[--background-Card-log] px-5 py-2.5 text-sm font-medium text-white cursor-pointer  hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-300 "
                        onClick={SignUpModelOpener}
                      >
                        Register
                      </div>
                    </div>
                  </div>
                )}

                {user && (
                  <div className="sm:flex sm:gap-4">
                    <div
                      className=" hidden md:block rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow cursor-pointer focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      onClick={() => {
                        signOut(auth)
                          .then(() => {
                            toast.success("Logged Out Successfully");
                          })
                          .catch((error) => {
                            toast.error(error.message);
                          });
                      }}
                    >
                      Log Out
                    </div>
                  </div>
                )}

                {user && (
                  <div className="hidden md:flex sm:gap-4">
                    <a
                      rel="noopener noreferrer"
                      href="/Profile"
                      className="flex items-center p-2 space-x-3 rounded-md  bg-[--background-Card-log]"
                    >
                      {" "}
                      <img
                        width={20}
                        src={Settings}
                        alt="Search"
                        className=" "
                      />
                      <span>Settings</span>
                    </a>
                  </div>
                )}

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
                      className="relative flex flex-col  h-full  p-3 w-60 bg-[--background-color] dark:text-gray-800 rounded-lg z-50"
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

                        <Search />
                        <div className="flex-1">
                          <ul className="pt-2 pb-4 space-y-1 text-sm">
                            <li className="rounded-lg hover:bg-gray-100 hover:text-gray-900 text-[--text-color] hover:font-semibold">
                              <a
                                rel="noopener noreferrer"
                                href="/"
                                className="flex items-center p-2 space-x-3 rounded-md  "
                              >
                                <img
                                  width={25}
                                  src={house}
                                  alt="Home"
                                  className=" "
                                />
                                <span>Home</span>
                              </a>
                            </li>
                            <li className="rounded-lg hover:bg-gray-100 hover:text-gray-900 text-[--text-color] hover:font-semibold">
                              <a
                                rel="noopener noreferrer"
                                href="/DiscoverMovies"
                                className="flex items-center p-2 space-x-3 rounded-md  "
                              >
                                <img
                                  width={25}
                                  src={Movie}
                                  alt="Movies"
                                  className=" "
                                />

                                <span>Movies</span>
                              </a>
                            </li>
                            <li className="rounded-lg hover:bg-gray-100 hover:text-gray-900 text-[--text-color] hover:font-semibold">
                              <a
                                rel="noopener noreferrer"
                                href="/DiscoverSeries"
                                className="flex items-center p-2 space-x-3 rounded-md  "
                              >
                                <img
                                  width={25}
                                  src={Series}
                                  alt="Series"
                                  className=" "
                                />

                                <span>Series</span>
                              </a>
                            </li>

                            <li>
                              <details className="group [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex cursor-pointer items-center justify-between  px-2 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 text-[--text-color] hover:font-semibold">
                                  <div className="flex items-center gap-2">
                                    <img
                                      width={25}
                                      src={application}
                                      alt="application"
                                      className=" "
                                    />
                                    <span className="text-sm font-medium">
                                      {" "}
                                      Catagories{" "}
                                    </span>
                                  </div>

                                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </span>
                                </summary>

                                <ul className="mt-2 space-y-1 px-4">
                                  <li>
                                    <a
                                      href="/catagories/Marvel"
                                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                      Marvel
                                    </a>
                                  </li>

                                  <li>
                                    <a
                                      href="/catagories/Netflix"
                                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                      Netflix
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="/catagories/DC"
                                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                      DC
                                    </a>
                                  </li>

                                  <li>
                                    <a
                                      href="/catagories/Arabic"
                                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                      Arabic
                                    </a>
                                  </li>
                                </ul>
                              </details>
                            </li>

                            {user && (
                              <li className="rounded-lg hover:bg-gray-100 hover:text-gray-900 text-[--text-color] hover:font-semibold">
                                <a
                                  rel="noopener noreferrer"
                                  href="/Profile"
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
                            )}

                            {user && (
                              <li className="rounded-lg hover:bg-gray-100 hover:text-gray-900 text-[--text-color] hover:font-semibold">
                                <div
                                  rel="noopener noreferrer"
                                  className="flex items-center p-2 space-x-3 rounded-md  "
                                  onClick={() => {
                                    signOut(auth)
                                      .then(() => {
                                        toast.success(
                                          "Logged Out Successfully"
                                        );
                                      })
                                      .catch((error) => {
                                        toast.error(error.message);
                                      });
                                  }}
                                >
                                  <img
                                    width={25}
                                    src={LogOut}
                                    alt="Search"
                                    className=" "
                                  />
                                  <span>Logout</span>
                                </div>
                              </li>
                            )}

                            {!user && (
                              <li className="rounded-lg hover:bg-gray-100 hover:text-gray-900 text-[--text-color] hover:font-semibold">
                                <div
                                  rel="noopener noreferrer"
                                  className="flex items-center p-2 space-x-3 rounded-md  "
                                  onClick={ModelOpener}
                                >
                                  <img
                                    width={25}
                                    src={LogIn}
                                    alt="Search"
                                    className=" "
                                  />
                                  <span>LogIn</span>
                                </div>
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                      {user ? (
                        <div className="sticky bottom-0 border-t-2">
                          <div className=" inset-x-0 flex items-center p-2  space-x-4 justify-self-end rounded-lg">
                            <img
                              src={user.photoURL}
                              alt={user.displayName}
                              className="w-12 h-12 rounded-full object-cover dark:bg-gray-500"
                            />
                            <div>
                              <h2 className="text-lg font-semibold text-[--text-color]">
                                {user.displayName}
                              </h2>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="sticky bottom-0 border-t-2">
                          <div className=" inset-x-0 flex items-center p-2  space-x-4 justify-self-end rounded-lg">
                            <img
                              src={NonProfilePic}
                              alt=""
                              className="w-12 h-12 rounded-full object-cover dark:bg-gray-500"
                            />
                            <div>
                              <h2 className="text-lg font-semibold text-[--text-color]">
                                Please Sign In to see your profile
                              </h2>
                            </div>
                          </div>
                        </div>
                      )}
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
