import { Link, useParams } from "react-router-dom";
import { useApi } from "../Hooks/ApiRequest";

function Cast() {
  const { movieId } = useParams();
  const ApiURL = `${
    import.meta.env.VITE_APP_SearchTrending_API
  }${movieId}/credits`;
  const ApiKey = import.meta.env.VITE_APP_API_Authorization;

  const { Data } = useApi(ApiURL, ApiKey);
  return (
    <>
      {Data.cast && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
          {Data?.cast?.slice(0, 8).map((actor) => {
            if (actor.profile_path === null) {
              return null;
            }
            return (
              <Link
                to={`/PersonDiscover/${actor.id}`}
                key={actor.id}
                className="text-center text-gray-300"
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                  alt={actor.name}
                  loading="lazy"
                  className="w-20  mx-auto rounded-2xl shadow-md"
                />
                <p className="mt-2">{actor.name}</p>
                <p className="text-sm text-gray-500">as {actor.character}</p>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Cast;
