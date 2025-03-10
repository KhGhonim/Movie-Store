import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import ThemePage from "./ThemePage";
import { useApi } from "../../Hooks/ApiRequest";

export default function TVDescriptionPage() {
  const { tvId } = useParams();
  const ApiURL = `${import.meta.env.VITE_APP_TVSearch_API}${tvId}`;
  const ApiKey = import.meta.env.VITE_APP_API_Authorization;
  const { Data } = useApi(ApiURL, ApiKey);

  if (!Data || Data.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
      </div>
    );
  }

  return (
    <div>
      <ThemePage result={Data} />
    </div>
  );
}
