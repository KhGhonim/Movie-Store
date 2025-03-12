import { useEffect, useState } from "react";
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
import CatagoryCard from "./CatagoryCard";
import { FaSpinner } from "react-icons/fa";
import { useApi } from "../../Hooks/ApiRequest";

export default function CatagoryPage() {
  const { movieId } = useParams();
  const [Poster, setPoster] = useState(movieId);
  const ApiURL = `${import.meta.env.VITE_APP_SearchQuery_API}${movieId}`;
  const ApiKey = import.meta.env.VITE_APP_API_Authorization;
  const { Data } = useApi(ApiURL, ApiKey);
  useEffect(() => {
    if (movieId === "Marvel") {
      setPoster(Marvel);
    } else if (movieId === "DC") {
      setPoster(DC);
    } else if (movieId === "Netflix") {
      setPoster(Netflix);
    } else if (movieId === "Arabic") {
      setPoster(Arabic);
    }
  }, [movieId]);

  // @ts-ignore
  if (!Data.results || Data.results.length === 0) {
    return (
      <div className="flex w-full h-dvh items-center justify-center">
        <FaSpinner className="animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <main className="min-h-full w-full bg-[--background-color] relative">
        <div className="fixed inset-0 z-0">
          <img
            src={Poster}
            alt="Marvel-Cinematic-Universe"
            className="w-full min-h-full object-cover object-center"
          />
        </div>

        <div className="relative bg-black bg-opacity-80 w-full min-h-full z-20">
          <div className="w-full text-center pt-24 flex justify-center items-center">
            <h1 className="text-2xl md:text-5xl font-bold text-white">
              Welcome To{" "}
              <span className="text-[--text-colorForCatagory]">{movieId}</span>{" "}
              Gate
            </h1>
            <img
              width={50}
              src="https://em-content.zobj.net/source/animated-noto-color-emoji/356/fire_1f525.gif"
              alt=""
              className="block max-sm:hidden animate-bounce"
            />
          </div>

          <CatagoryCard Data={Data.results} />
        </div>
      </main>
    </div>
  );
}
