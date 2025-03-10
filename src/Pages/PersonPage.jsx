import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useApi } from "../Hooks/ApiRequest";

export default function PersonPage() {
  const { personId } = useParams();
  const ApiURL = `${
    import.meta.env.VITE_APP_Cast_API
  }${personId}?language=en-US`;
  const ApiKey = import.meta.env.VITE_APP_API_Authorization;
  const { Data, isLoading } = useApi(ApiURL, ApiKey);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
      </div>
    );

  return (
    <div className="relative min-h-screen text-white">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original${Data?.profile_path}")`,
        }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-80" />

      {/* Actor Details */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-7xl mx-auto p-8 text-center"
      >
        {/* Actor Image */}
        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={`https://image.tmdb.org/t/p/w500${Data?.profile_path}`}
          alt={Data?.name}
          className="w-40 h-40 md:w-56 md:h-56 rounded-full mx-auto shadow-lg border-4 border-white"
        />

        {/* Actor Name */}
        <h1 className="text-4xl md:text-5xl font-bold mt-4">{Data?.name}</h1>
        <p className="text-lg text-gray-300 italic">
          {Data?.known_for_department}
        </p>

        {/* Additional Info */}
        <div className="mt-4 space-y-2 text-lg">
          {Data?.birthday && (
            <p>
              🎂 <span className="font-bold">Birthday:</span> {Data.birthday}
            </p>
          )}
          {Data?.place_of_birth && (
            <p>
              📍 <span className="font-bold">Place of Birth:</span>{" "}
              {Data.place_of_birth}
            </p>
          )}
          {Data?.also_known_as?.length > 0 && (
            <p>
              🏷️ <span className="font-bold">Also Known As:</span>{" "}
              {Data.also_known_as.join(", ")}
            </p>
          )}
        </div>

        {/* Biography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="mt-6 bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-md"
        >
          <h2 className="text-2xl font-semibold mb-2">Biography</h2>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            {Data.biography || "No biography available."}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
