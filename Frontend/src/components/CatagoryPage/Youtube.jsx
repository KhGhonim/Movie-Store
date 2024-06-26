import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";

export default function Youtube({ result }) {
  const [YoutubeData, setYoutubeData] = useState(null);
  const Data = result;
  console.log(Data);
  const YoutubeBaseURL = "https://www.youtube.com/watch?v=";

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
          `https://api.themoviedb.org/3/${Data.media_type || "movie"}/${
            Data.id
          }/videos`,
          options
        )
          .then((response) => response.json())
          .then((response) => setYoutubeData(response.results[0].key))
          .catch((err) => console.error(err));
      } catch (error) {
        console.log(error.message);
      }
    };
    DataFetching();
  }, [Data]);

  return (
    <div>
      {YoutubeData ? (
        <div className="flex justify-center w-[300px] h-[200px] md:w-[700px] md:h-[400px]  flex-col items-center space-y-6">
          {" "}
          <ReactPlayer
            style={{}}
            width="100%"
            height="100%"
            controls={true}
            url={YoutubeBaseURL + YoutubeData}
          />{" "}
        </div>
      ) : (
        <div className="text-white text-2xl text-center">
          <span>There is no trailer!</span>
        </div>
      )}
    </div>
  );
}
Youtube.propTypes = {
  result: PropTypes.string.isRequired,
};
