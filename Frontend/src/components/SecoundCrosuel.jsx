import { useEffect, useState } from "react";
import Crousel from "./SharedCrousel";

export default function Testimonials() {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZmFhZjFiNjhiMTFmNmFjZjUwZmUzYTg3NDJmMGMxNyIsIm5iZiI6MTcxOTE1OTc2Mi4wMjU5MjcsInN1YiI6IjY2Nzg0YTlmMmYzNGVjYmRhNzNiMjI1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HAl0urrcB3rZpMGmK6DOb1HNwVzZJHwx2-q7LU3J6v0 `,
        },
      };

      try {
        const response = await fetch('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc', options)

        const data = await response.json();
        setData(data.results);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchTrending();
  }, []);
  
  return (
    <div className="relative h-full   ">
      <div className=" relative  text-[--text-color]  pt-20  z-40 ">
        <div className="text-center ">
          <h1 className="text-5xl font-bold ">Series Store</h1>
        </div>
        <Crousel result={Data} Page={"tv"} />
      </div>
    </div>
  );
}
