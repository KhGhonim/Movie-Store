import Crousel from "./SharedCrousel";
import { useEffect, useState } from "react";
export default function FristCrousel() {
  const [Data, setData] = useState(null);

  useEffect(() => {
    const FetchingData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZmFhZjFiNjhiMTFmNmFjZjUwZmUzYTg3NDJmMGMxNyIsIm5iZiI6MTcxOTE1OTc2Mi4wMjU5MjcsInN1YiI6IjY2Nzg0YTlmMmYzNGVjYmRhNzNiMjI1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HAl0urrcB3rZpMGmK6DOb1HNwVzZJHwx2-q7LU3J6v0 `,
        },
      };
      try {
        const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)


        const data = await response.json();
        setData(data.results || []);
        
      } catch (err) {
        console.error(err.message);
      }
    };
    FetchingData();
  }, []);

  return (
    <div className="relative h-fit  ">
      <div className="custom-gradient  absolute inset-0"></div>
      <div className=" relative  text-[--text-color]  pt-20  z- ">
        <div className="text-center ">
          <h1 className="text-5xl font-bold ">Movie Store</h1>
          <p className="py-6">Find your next adventure</p>
        </div>
        <Crousel result={Data} />
      </div>
    </div>
  );
}
