import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import PropTypes from "prop-types";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cast from "../../components/Cast";
ThemePage.propTypes = {
  result: PropTypes.object.isRequired,
};
export default function ThemePage({ result }) {
  const [user] = useAuthState(auth);
  const releaseDatee = result.first_air_date
    ? new Date(result.first_air_date).getFullYear()
    : null;

  return (
    <main className="relative min-h-screen w-full bg-[--background-color]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={`https://image.tmdb.org/t/p/original${
            result.poster_path || result.backdrop_path
          }`}
          alt={result.original_title}
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center px-6 py-20 md:py-32 space-y-8 md:space-y-0 md:space-x-10">
        <div className="flex justify-center items-center">
          <img
            className="rounded-xl shadow-2xl ring-4 ring-white/10 w-80 h-auto object-cover transition-transform transform hover:scale-105"
            src={`https://image.tmdb.org/t/p/original${
              result.poster_path || result.backdrop_path
            }`}
            alt={result.title || result.original_title}
          />
        </div>

        {/* Text and Action Section */}
        <div className="max-w-2xl text-center md:text-left space-y-6 md:space-y-8">
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-md">
            {result.title ||
              result.original_title ||
              result.name ||
              result.original_name}
          </h1>

          {/* Release Info */}
          <div className="flex flex-wrap justify-center md:justify-start items-center space-x-8 text-white/80">
            {releaseDatee && (
              <span className="text-lg sm:text-xl">{releaseDatee}</span>
            )}
            {result.releaseDate && (
              <span className="text-lg sm:text-xl">{result.releaseDate}</span>
            )}
            {result.runtime && (
              <span className="text-lg sm:text-xl">{result.runtime} min</span>
            )}
            {result.number_of_episodes && (
              <span className="text-lg sm:text-xl">{`Episodes: ${result.number_of_episodes}`}</span>
            )}
          </div>

          {/* Overview */}
          <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
            {result.overview}
          </p>

          {/* Cast Component */}
          <Cast />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Watch Trailer Button */}
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white font-semibold rounded-full shadow-lg transition-transform transform hover:scale-105">
              Watch Trailer
            </button>

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
              className="px-8 py-3 bg-white text-gray-800 border-2 border-gray-800 rounded-full shadow-lg font-semibold transition-transform transform hover:scale-105 hover:bg-gray-100"
            >
              Add to List
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
