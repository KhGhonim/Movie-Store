import { useApi } from "../Hooks/ApiRequest";
import { useParams } from "react-router-dom";
import Crousel from "./SharedCrousel";

function SimilerWorks() {
  const { movieId } = useParams();
  const ApiURL = `${
    import.meta.env.VITE_APP_SearchTrending_API
  }${movieId}/similar?language=en-US&page=1`;
  const ApiKey = import.meta.env.VITE_APP_API_Authorization;
  const { Data, isLoading } = useApi(ApiURL, ApiKey);

  if (!Data || !Data.results || Data.results.length === 0) {
    return (
      <div className="p-4 text-white bg-gray-900">
        <p>No similar works found.</p>
      </div>
    );
  }

  return (
    <section className="mt-12 w-full mx-auto ">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-white">
        Similar Movies/Series
      </h1>
      <Crousel result={Data} isLoading={isLoading} Page={"movies"} />
    </section>
  );
}

export default SimilerWorks;
