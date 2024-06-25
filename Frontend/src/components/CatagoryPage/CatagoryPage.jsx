import Navbar from "../../components/Navbar";
import { useEffect,  useState } from "react";
import { useParams } from "react-router-dom";
// @ts-ignore
import Marvel from "../../../src/assets/Movies/Marvel.jpeg";
// @ts-ignore
import DC from "../../../src/assets/Movies/DC.jpg";
// @ts-ignore
import Netflix from "../../../src/assets/Movies/Netflix.jpg";
// @ts-ignore
import Arabic from "../../../src/assets/Movies/Arabic.png";
// @ts-ignore
import Drawer from "./Drawer";

export default function CatagoryPage() {
  const [CatagoryData, setCatagoryData] = useState();
  const { movieId } = useParams();
  const [Postetr, setPostetr] = useState(movieId);

  // {Change Between True and False}


  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZmFhZjFiNjhiMTFmNmFjZjUwZmUzYTg3NDJmMGMxNyIsIm5iZiI6MTcxOTE1OTc2Mi4wMjU5MjcsInN1YiI6IjY2Nzg0YTlmMmYzNGVjYmRhNzNiMjI1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HAl0urrcB3rZpMGmK6DOb1HNwVzZJHwx2-q7LU3J6v0",
      },
    };

    const DataFetching = async () => {
      try {
        await fetch(
          `https://api.themoviedb.org/3/search/multi?query=${movieId}`,
          options
        )
          .then((response) => response.json())
          .then((response) => setCatagoryData(response.results))
          .catch((err) => console.error(err));
      } catch (error) {
        console.log(error.message);
      }
    };
    DataFetching();
  }, [movieId]);

  useEffect(() => {
    if (movieId === "Marvel") {
      setPostetr(Marvel);
    } else if (movieId === "DC") {
      setPostetr(DC);
    } else if (movieId === "Netflix") {
      setPostetr(Netflix);
    } else if (movieId === "Ramazan") {
      setPostetr(Arabic);
    }
  }, [movieId]);

  // @ts-ignore
  if (!CatagoryData || CatagoryData.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main className="min-h-screen w-full bg-[--background-color]">
        <div className="w-full h-dvh  ">
          <img
            src={Postetr}
            alt="Marvel-Cinematic-Universe"
            className="w-full h-full object-cover "
          />
        </div>
        <div className="w-full h-full bg-black bg-opacity-80  absolute inset-0  ">
          <Drawer  />
        </div>
      </main>
    </div>
  );
}
