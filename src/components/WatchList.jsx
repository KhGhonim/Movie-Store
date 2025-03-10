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
    <div  className="relative flex flex-col items-center justify-center">
      {/* Watchlist Button */}
      <div
        className="hidden md:flex items-center gap-2 rounded-md bg-[--background-Card-log] px-6 py-2 text-base font-medium text-white shadow-lg cursor-pointer transition-all duration-300 ease-in-out"
        onClick={ModelWatchListOpener}
      >
        WatchList
        {isExpanded ? (
          <FaArrowUp className="ml-1" />
        ) : (
          <FaArrowDown className="ml-1" />
        )}
      </div>

      {/* Expanded Watchlist Content */}
      {isExpanded && (
        <div  className="absolute top-full left-0 mt-2 w-full md:w-96 max-w-md bg-[--background-color] text-white rounded-lg shadow-xl z-20 overflow-hidden">
          {WillBeWatchedData.length > 0 ? (
            <div className="max-h-[400px] overflow-y-auto">
              {WillBeWatchedData.map((result, index) => (
                <Link
                  key={index}
                  to={`/trending/${result.id}`}
                  className="flex items-center p-4 gap-4 border-b border-gray-700 hover:bg-indigo-700 hover:text-gray-100 transition-colors duration-200"
                >
                  {/* Thumbnail */}
                  <img
                    src={`https://image.tmdb.org/t/p/original${
                      result.poster_path || result.backdrop_path
                    }`}
                    alt={result.title}
                    className="w-12 h-16 rounded-lg shadow-md object-cover"
                  />
                  {/* Details */}
                  <div className="flex flex-col flex-grow text-sm">
                    <h3 className="font-semibold text-[--text-color] truncate">
                      {result.title}
                    </h3>
                    <p className="text-gray-300">{result.media_type}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-300">
              <p className="text-lg">Your Watchlist is Empty</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
