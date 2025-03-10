import { useEffect, useState } from "react";

export const useApi = (ApiURL, ApiKey) => {
  const [Data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const url = ApiURL;
    setisLoading(true);
    const fetchTrending = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: ApiKey,
        },
      };

      try {
        const response = await fetch(url, options);

        const data = await response.json();
        setData(data);
        setisLoading(false);
      } catch (err) {
        console.error(err.message);
        setisLoading(false);
      }
    };

    fetchTrending();
  }, [ApiURL]);

  return { Data, isLoading };
};
