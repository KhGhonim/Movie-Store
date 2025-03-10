import { useParams } from "react-router-dom";
import Youtube from "./CatagoryPage/Youtube";
import { FaSpinner } from "react-icons/fa";
import NoMovieFound from "./NoMovieFound";
import { useApi } from "../Hooks/ApiRequest";
import Cast from "./Cast";
import SimilerWorks from "./SimilerWorks";

export default function TrendingPage() {
  const { movieId } = useParams();
  const ApiURL = `${import.meta.env.VITE_APP_SearchTrending_API}${movieId}`;
  const ApiKey = import.meta.env.VITE_APP_API_Authorization;
  const { Data } = useApi(ApiURL, ApiKey);

  if (!Data || Data.length === 0) {
    return (
      <div className="flex w-full h-dvh items-center justify-center">
        <FaSpinner className="animate-spin" />
      </div>
    );
  }
  if (
    Data.status_message === "The resource you requested could not be found."
  ) {
    return <NoMovieFound />;
  }

  const releaseData = new Date(Data.release_date).getFullYear();
  const imageUrl =
    `https://image.tmdb.org/t/p/original${Data?.backdrop_path} ` ||
    `https://image.tmdb.org/t/p/original${Data?.poster_path} ` ||
    "https://placeit-img-1-p.cdn.aws.placeit.net/uploads/stage/stage_image/14650/optimized_large_thumb_stage.jpg";
  return (
    <div>
      <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900  py-20">
        {/* Background Image */}
        <img
          src={imageUrl}
          alt={Data?.original_title}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Main Content */}
        <div className="relative z-10 w-full md:mx-auto md:max-w-7xl px-6 py-12">
          {/* Hero Section */}
          <div className="grid grid-cols-1 md:grid-cols-5 place-items-center md:gap-8">
            {/* Movie Poster */}
            <div className="flex w-full justify-center max-md:pb-5 col-span-2 items-center">
              <img
                src={`https://image.tmdb.org/t/p/original${
                  Data?.poster_path || Data?.backdrop_path
                }`}
                alt={Data?.original_title}
                className="h-[65dvh] md:h-[70dvh] xl:h-[80dvh] w-full rounded-lg shadow-lg ring-4 ring-[--background-color]"
              />
            </div>

            {/* Movie Details */}
            <div className="col-span-3 text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
                {Data?.title || Data?.original_title}
              </h1>
              <p className="text-sm md:text-lg lg:text-xl text-gray-300 mb-6">
                {Data?.overview}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400">
                    <span className="font-medium text-sm md:text-base lg:text-lg text-white">
                      Release Date:{" "}
                    </span>
                    {releaseData}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-medium text-sm md:text-base lg:text-lg text-white">
                      Runtime:{" "}
                    </span>
                    {Data?.runtime} minutes
                  </p>
                  <p className="text-gray-400">
                    <span className="font-medium text-sm md:text-base lg:text-lg text-white">
                      Origin Country:{" "}
                    </span>
                    {Data?.origin_country[0]}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">
                    <span className="font-medium text-sm md:text-base lg:text-lg text-white">
                      Rate:{" "}
                    </span>
                    {Data?.vote_average}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-medium text-sm md:text-base lg:text-lg text-white">
                      Genres:{" "}
                    </span>
                    {Data?.genres.map((item) => (
                      <span key={item.name} className="inline-block mr-2">
                        {item.name}
                      </span>
                    ))}
                  </p>

                  <p className="text-gray-400">
                    <span className="font-medium text-sm md:text-base lg:text-lg text-white">
                      Production Companies:{" "}
                    </span>
                    {Data?.production_companies.map((item) => (
                      <span
                        key={item.name}
                        className="inline-block mr-2 text-xs"
                      >
                        {item.name},
                      </span>
                    ))}
                  </p>
                </div>
              </div>
              <Cast />
            </div>
          </div>

          {/* Sections: Tabs */}
          <div className="mt-12 w-full mx-auto ">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-white">
              {" "}
              Trailer
            </h1>
            <Youtube />
            <SimilerWorks />
          </div>
        </div>
      </div>
    </div>
  );
}
