import { useEffect, useState } from "react";
import Crousel from "./SharedCrousel";

export default function FourthCrousel() {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const url =
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";

    const fetchTrending = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZmFhZjFiNjhiMTFmNmFjZjUwZmUzYTg3NDJmMGMxNyIsIm5iZiI6MTczMTg1NTI5Ny42NDM5Mywic3ViIjoiNjY3ODRhOWYyZjM0ZWNiZGE3M2IyMjU0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9._5BKyXId0buzsVytwXV-hMNT-OvcFuSry2S4Orlul34",
        },
      };

      try {
        const response = await fetch(url, options);

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
          <h1 className="text-5xl font-bold ">Upcoming Movies</h1>
        </div>
        <Crousel result={Data} Page={"tv"} />
      </div>
    </div>
  );
}
