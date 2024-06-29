import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function WatchList() {
  const [user] = useAuthState(auth);
  const [isExpanded, setIsExpanded] = useState(false);
  const [value] = useCollection(user ? collection(db, user.uid) : null);
  const [WillBeWatchedData, setWillBeWatchedData] = useState([]);

  useEffect(() => {
    if (value) {
      setWillBeWatchedData(value.docs.map((doc) => doc.data()));
    }
  }, [value]);

  const ModelWatchListOpener = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="relative flex items-center justify-center">
      <div
        className="hidden md:flex md:justify-center md:items-center md:gap-1 transition-all duration-500 ease-in-out rounded-md bg-[--background-Card-log] px-5 py-2.5 text-sm font-medium text-white shadow cursor-pointer focus:outline-none focus:ring-4"
        onClick={ModelWatchListOpener}
      >
        WatchList
        {isExpanded ? <FaArrowUp /> : <FaArrowDown />}
      </div>

      {isExpanded && WillBeWatchedData.length > 0 && (
        <div className="absolute top-full left-0 mt-1 w-full bg-[--background-color] text-white rounded-lg z-10 h-[400px] overflow-y-auto">
          {WillBeWatchedData.map((result, index) => {
            return (
              <Link
                key={index}
                className="flex items-center p-2 w-full border-b border-gray-700 hover:bg-[--background-color] hover:underline h-32 scroll-auto"
                to={`/trending/${result.id}`}
              >
                <div className="w-10">
                  <img
                    src={`https://image.tmdb.org/t/p/original${
                      result.poster_path || result.backdrop_path
                    }`}
                    alt={result.title}
                    className="rounded-lg shadow-lg w-10 h-10 object-cover"
                  />
                </div>
                <div className="flex flex-col gap-4 w-2/3 text-xs text-center">
                  <h3 className="text-[--text-color] font-semibold">
                    {result.title}
                  </h3>
                  <h3 className="text-[--text-color] font-semibold">
                    {result.media_type}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {isExpanded && WillBeWatchedData.length === 0 && (
        <div className="absolute top-full left-0 mt-1 w-full bg-[--background-color] text-white text-center rounded-lg z-10 h-contain p-6 overflow-y-auto">
          Watchlist is empty
        </div>
      )}
    </div>
  );
}
