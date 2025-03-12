import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useApi } from "../../Hooks/ApiRequest";

export default function Youtube() {
  const { movieId } = useParams();
  const ApiURL = `${
    import.meta.env.VITE_APP_SearchTrending_API
  }${movieId}/videos?language=en-US`;
  const ApiKey = import.meta.env.VITE_APP_API_Authorization;
  const { Data } = useApi(ApiURL, ApiKey);

  return (
    <>
      {Data.results && Data.results.length > 0 ? (
        <div className="flex justify-center max-w-7xl h-96 flex-col  items-center space-y-6">
          {" "}
          <ReactPlayer
            style={{}}
            width="100%"
            height="100%"
            controls={true}
            url={`https://www.youtube.com/watch?v=${Data.results[0].key}`}
          />{" "}
        </div>
      ) : (
        <div className="text-white text-2xl text-center">
          <span>There is no trailer!</span>
        </div>
      )}
    </>
  );
}
Youtube.propTypes = {
  result: PropTypes.string.isRequired,
};
