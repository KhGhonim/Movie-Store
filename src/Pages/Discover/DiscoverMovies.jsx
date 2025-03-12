import Drawer from "../../components/CatagoryPage/Drawer";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DiscoverGlobalTheme from "./DiscoverGlobalTheme";

export default function DiscoverMovies() {
  const [DiscoverMovieData, setDiscoverMovieData] = useState([]);
  const [searchParams] = useSearchParams();
  const year = searchParams.get("year");
  const rate = searchParams.get("rate");
  const language = searchParams.get("language");
  const type = searchParams.get("type");
  useEffect(() => {
    window.top.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetchDiscoverMoives = async (
      year,
      rating,
      language,
      type,
      page = 1
    ) => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: import.meta.env.VITE_APP_API_Authorization,
        },
      };
      let url = `${
        import.meta.env.VITE_APP_DiscoverMovie_API
      }?language=${language}&sort_by=popularity.desc&page=${page}`;

      if (year) {
        url += `&primary_release_year=${year}`;
      }

      if (rating) {
        url += `&vote_average.gte=${rating}`;
      }

      if (type) {
        url += `&with_genres=${type}`;
      }
      if (language) {
        url += `&with_original_language=${language}`;
      }

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.results.map((movie) => ({ ...movie, media_type: "movie" }));
    };

    fetchDiscoverMoives(year, rate, language, type).then((data) => {
      setDiscoverMovieData(data);
    });
  }, [year, rate, language, type]);

  return (
    <div>
      <DiscoverGlobalTheme
        // @ts-ignore
        result={DiscoverMovieData}
      />
      <div className="fixed bottom-0 left-0 ">
        <Drawer />
      </div>
    </div>
  );
}
