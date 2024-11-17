// @ts-nocheck
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[--background-color] text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center mb-4">
              <span className="text-3xl font-extrabold text-white">
              KG  MovieStore
              </span>
            </Link>
            <p className="text-sm md:text-base text-gray-400">
              Your one-stop destination for all things cinema. Discover, buy,
              and enjoy the best movies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="mb-6 text-sm font-semibold text-white uppercase tracking-wider">
              Geners Links
            </h2>
            <ul className="text-gray-400 space-y-4">
              <li>
                <a
                  href="/DiscoverMovies"
                  className="hover:text-white hover:underline"
                >
                  Movies
                </a>
              </li>
              <li>
                <a
                  href="/DiscoverSeries"
                  className="hover:text-white hover:underline"
                >
                  Series
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h2 className="mb-6 text-sm font-semibold text-white uppercase tracking-wider">
              Catagories
            </h2>
            <ul className="text-gray-400 space-y-4">
              <li>
                <a
                  href="/catagories/DC"
                  className="hover:text-white hover:underline"
                >
                  DC
                </a>
              </li>
              <li>
                <a
                  href="/catagories/Arabic"
                  className="hover:text-white hover:underline"
                >
                  Arabic
                </a>
              </li>
              <li>
                <a
                  href="/catagories/Netflix"
                  className="hover:text-white hover:underline"
                >
                  Netflix
                </a>
              </li>
              <li>
                <a
                  href="/catagories/Marvel"
                  className="hover:text-white hover:underline"
                >
                  Marvel
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="mb-6 text-sm font-semibold text-white uppercase tracking-wider">
              Stay Updated
            </h2>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for exclusive deals and movie news.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none p-2 rounded-md"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex mt-8 space-x-6 justify-center sm:justify-start">
          <a href="#" className="text-gray-400 hover:text-white">
            <FaFacebook className="w-6 h-6" />
            <span className="sr-only">Facebook page</span>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <FaInstagram className="w-6 h-6" />
            <span className="sr-only">Instagram page</span>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <FaTwitter className="w-6 h-6" />
            <span className="sr-only">Twitter page</span>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <FaYoutube className="w-6 h-6" />
            <span className="sr-only">YouTube channel</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-800 pt-8 md:flex md:items-center md:justify-between">
          <div className="text-sm text-gray-400">
            © 2023 KG MovieStore. All rights reserved.
          </div>
          <div className="flex mt-4 space-x-6 sm:justify-center md:mt-0">
            <Link
              href="/privacy"
              className="text-sm text-gray-400 hover:text-white hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-400 hover:text-white hover:underline"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
