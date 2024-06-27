// @ts-nocheck
import { Link } from "react-router-dom";
import facebook from "../../src/assets/facebook.png";
import linkedin from "../../src/assets/linkedin.png";
import instagram from "../../src/assets/instagram.png";

export default function Footer() {
  return (
    <footer className=" px-4 divide-y dark:bg-gray-400 dark:text-gray-900 z-50 ">
      <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3">
          <Link
            to="#"
            rel="noopener noreferrer"
            className="flex justify-center space-x-3 lg:justify-start"
          >
            <div className="flex items-center justify-center  w-8 h-8 md:w-12 md:h-12 rounded-full bg-[--background-Card-log]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                fill="currentColor"
                className="flex-shrink-0 w-5 h-5 rounded-full dark:text-gray-50"
              >
                <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z"></path>
              </svg>
            </div>
            <div className="block text-white font-semibold text-sm md:text-3xl">
              <h1>
                KG
                <span className="text-red-500 ml-2"> Movie Store</span>
              </h1>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase dark:text-gray-900">
              Product
            </h3>
            <ul className="space-y-1">
              <li>
                <Link rel="noopener noreferrer" to="#">
                  Features
                </Link>
              </li>
              <li>
                <Link rel="noopener noreferrer" to="#">
                  Integrations
                </Link>
              </li>
              <li>
                <Link rel="noopener noreferrer" to="#">
                  Pricing
                </Link>
              </li>
              <li>
                <Link rel="noopener noreferrer" to="#">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase dark:text-gray-900">
              Company
            </h3>
            <ul className="space-y-1">
              <li>
                <Link rel="noopener noreferrer" to="#">
                  Privacy
                </Link>
              </li>
              <li>
                <Link rel="noopener noreferrer" to="#">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="uppercase dark:text-gray-900">Developers</h3>
            <ul className="space-y-1">
              <li>
                <Link rel="noopener noreferrer" to="#">
                  Public API
                </Link>
              </li>
              <li>
                <Link rel="noopener noreferrer" to="#">
                  Documentation
                </Link>
              </li>
              <li>
                <Link rel="noopener noreferrer" to="#">
                  Guides
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <div className="uppercase dark:text-gray-900">Social media</div>
            <div className="flex justify-start space-x-3">
              <Link
                rel="noopener noreferrer"
                to="#"
                title="Facebook"
                className="flex items-center p-1 hover:scale-110 transition-transform duration-200 ease-in-out"
              >
                <img
                  src={facebook}
                  alt="facebook"
                  width={30}
                  className="rounded-3xl"
                />
              </Link>
              <Link
                rel="noopener noreferrer"
                to="#"
                title="Twitter"
                className="flex items-center p-1 hover:scale-110 transition-transform duration-200 ease-in-out"
              >
                <img
                  src={instagram}
                  alt="instagram"
                  width={30}
                  className="rounded-3xl"
                />
              </Link>
              <Link
                rel="noopener noreferrer"
                to="#"
                title="Instagram"
                className="flex items-center p-1 hover:scale-110 transition-transform duration-200 ease-in-out"
              >
                <img
                  src={linkedin}
                  alt="linkedin"
                  width={30}
                  className="rounded-3xl"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="py-6 text-sm text-center dark:text-gray-600">
        © 1968 Khaled Ghonim. All rights reserved.
      </div>
    </footer>
  );
}
