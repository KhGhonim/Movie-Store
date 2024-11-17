import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PersonPage() {
  const [PersonData, setPersonData] = useState(null);
  const PersonID = useParams();

  useEffect(() => {
    const fetchPerson = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTM0YjVlYjEyMjMxNDlkYTZjYWQ0ZWVhYjU5ZTQ4MiIsInN1YiI6IjY2M2E5ZGQ1M2Q2YmIzYmRhOTI3NmY0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ABEAo1GkaGt_KMj2AEzEZPB3cTtJrSAzm7Lxh2fHBXc",
        },
      };
      try {
        const url = ` https://api.themoviedb.org/3/person/${PersonID.personId}?language=en-US`;
        const response = await fetch(url, options);
        const result = await response.json();
        setPersonData(result);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPerson();
  }, [PersonID]);

  console.log(PersonID);
  console.log(PersonData);

  if (!PersonData || PersonData.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div
        className="relative h-screen bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original${PersonData?.profile_path}")`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-75"></div>
        <div className="flex items-center justify-center h-full">
          <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-8 text-center transition transform hover:scale-105">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">
              {PersonData.name}
            </h1>
            <h2 className="text-lg text-gray-600 mb-2">
              {PersonData.birthday}
            </h2>
            <h3 className="text-md text-gray-600 mb-2">
              {PersonData.place_of_birth}
            </h3>
            <h3 className="text-md text-gray-600 mb-2">
              {PersonData.biogrphy}
            </h3>
            <h3 className="text-md text-gray-600 mb-4">
              {PersonData.known_for_department}
            </h3>
            <img
              className="mx-auto mt-4 w-48 h-48 rounded-full object-cover shadow-md border-4 border-white transition transform hover:scale-110"
              src={`https://image.tmdb.org/t/p/original${PersonData?.profile_path}`}
              alt={PersonData.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
