import { useApi } from "../Hooks/ApiRequest";
import Crousel from "./SharedCrousel";
import PropTypes from "prop-types";

CrouselTemplate.propTypes = {
  Title: PropTypes.string.isRequired,
};
CrouselTemplate.propTypes = {
  ApiURL: PropTypes.string.isRequired,
};
CrouselTemplate.propTypes = {
  ApiKey: PropTypes.string.isRequired,
};
CrouselTemplate.propTypes = {
  type: PropTypes.string.isRequired,
};

function CrouselTemplate({ Title, ApiURL, ApiKey, type }) {
  const { Data, isLoading } = useApi(ApiURL, ApiKey);
  return (
    <div className="relative h-full">
      {Title === "Popular Movies" ? (
        <div className="absolute top-15 left-0 right-0 h-96 bg-gradient-to-t from-transparent to-black z-10" />
      ) : null}

      <div className=" relative  text-[--text-color]  z-40 ">
        <div className="text-center ">
          <h1 className="text-2xl md:text-4xl lg:text-6xl pb-5 font-bold ">
            {Title}
          </h1>
        </div>
        <Crousel result={Data} isLoading={isLoading} Page={type} />
      </div>
    </div>
  );
}

export default CrouselTemplate;
