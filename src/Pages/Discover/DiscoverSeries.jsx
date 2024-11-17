import Navbar from "../../components/Navbar";
import Drawer from "../../components/CatagoryPage/Drawer";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DiscoverGlobalTheme from "./DiscoverGlobalTheme";

export default function DiscoverMovies() {
  const [DiscoverSeries, setDiscoverSeries] = useState([]);
  const [searchParams] = useSearchParams();
  const year = searchParams.get("year");
  const rate = searchParams.get("rate");
  const language = searchParams.get("language");
  const type = searchParams.get("type");



  useEffect(() => {
    const fetchDiscoverMoives = async (year, rating, language, type, page=1) => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTM0YjVlYjEyMjMxNDlkYTZjYWQ0ZWVhYjU5ZTQ4MiIsInN1YiI6IjY2M2E5ZGQ1M2Q2YmIzYmRhOTI3NmY0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ABEAo1GkaGt_KMj2AEzEZPB3cTtJrSAzm7Lxh2fHBXc",
        },
      };
      let url = `https://api.themoviedb.org/3/discover/tv?language=${language}&sort_by=popularity.desc&page=${page}`;

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
      setDiscoverSeries(data);
    });
  }, [year, rate, language, type]);


  return (
    <div>
      <Navbar />
      <DiscoverGlobalTheme 
// @ts-ignore
      result={DiscoverSeries}/>
      <div className="fixed bottom-0 left-0 ">
        <Drawer />
      </div>
    </div>
  );
}
