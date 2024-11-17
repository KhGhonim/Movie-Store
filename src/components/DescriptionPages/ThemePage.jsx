import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import PropTypes from "prop-types";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ThemePage({ result }) {
  const [user] = useAuthState(auth);

  const releaseDatee = result.first_air_date
    ? new Date(result.first_air_date).getFullYear()
    : null;
  return (
    <main className="h-full w-full bg-[--background-color] ">
      <div className="relative bg-cover bg-no-repeat h-full md:h-screen  ">
        <img
          src={`https://image.tmdb.org/t/p/original${
            result.poster_path || result.backdrop_path
          }`}
          alt={result.original_title}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />

        <div className="relative bg-black bg-opacity-70 h-full flex flex-col md:flex-row justify-center items-center py-20 md:py-32 px-6 space-y-8 md:space-y-0">
          {/* Image Section for Mobile and Desktop */}
          <div className="w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0">
            <img
              className="rounded-xl shadow-2xl w-80 h-auto object-cover transition-transform transform hover:scale-105"
              src={`https://image.tmdb.org/t/p/original${
                result.poster_path || result.backdrop_path
              }`}
              alt={result.title || result.original_title}
            />
          </div>

          {/* Content Section */}
          <div className="container mx-auto flex flex-col justify-center items-center text-center md:text-left space-y-6 md:space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-extrabold leading-tight">
              {result.title ||
                result.original_title ||
                result.name ||
                result.original_name}
            </h1>

            {/* Release Info */}
            <div className="flex justify-center items-center space-x-8 text-white opacity-80">
              <span className="text-lg sm:text-xl">
                {result.releaseDate || releaseDatee}
              </span>
              {result.runtime && (
                <span className="text-lg sm:text-xl">{result.runtime} min</span>
              )}
              {result.number_of_episodes && (
                <span className="text-lg sm:text-xl">{`Total Episodes: ${result.number_of_episodes}`}</span>
              )}
            </div>

            {/* Overview Section */}
            <p className="text-lg sm:text-xl max-w-3xl mx-auto text-white opacity-90">
              {result.overview}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Watch Trailer Button */}
              <Link to={`/trending/${result.id}`} className="w-full sm:w-auto">
                <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-blue-900 transition duration-300 transform hover:scale-105">
                  Watch Trailer
                </button>
              </Link>

              {/* Add to List Button */}
              <button
                onClick={async () => {
                  if (!user) {
                    toast.error("You must be logged in");
                    return;
                  }

                  try {
                    const itemData = {
                      id: result.id,
                      poster_path: result.poster_path,
                      title: result.title,
                    };

                    await setDoc(
                      doc(db, user.uid, result.id.toString()),
                      itemData
                    );
                    toast.success(
                      `Added ${result.title || result.original_name} to FAV!`
                    );
                  } catch (error) {
                    toast.error(error.message);
                  }
                }}
                className="px-8 py-3 bg-white text-gray-800 border-2 border-gray-800 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105"
              >
                Add to List
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

ThemePage.propTypes = {
  result: PropTypes.string.isRequired,
};
