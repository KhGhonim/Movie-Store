import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import ErrorPage from "./Error/ErrorPage";
import Navbar from "../components/Navbar";
import { sendEmailVerification } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

export default function Profile() {
  const [user, error, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const handleEmailVerification = () => {
    if (auth.currentUser) {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          navigate("/");
          toast.success("Email verification sent");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [loading, user, navigate]);



  if (error) {
    return <ErrorPage />;
  }

  if (user && !user.emailVerified) {
    return (
      <>
        <div className="max-w-md w-full h-96 mx-auto px-6  bg-white rounded-lg shadow-xl flex justify-center items-center ">
          <div
            onClick={handleEmailVerification}
            className="absolute top-0 left-0 w-full py-5 text-center animate-bounce  bg-[black] text-red-500 cursor-pointer"
          >
            Please verify your email!
          </div>
          <div className="flex flex-col items-center ">
            <div className="relative flex-shrink-0 overflow-hidden rounded-full w-32 h-32 my-4">
              <img
                className="w-full h-full object-cover"
                src={user.photoURL}
                alt={user.displayName}
              />
            </div>
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold">{user.displayName}</h1>
              <p className="text-gray-600">
                Created At {user.metadata.creationTime}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (user && user.emailVerified) {
    return (
      <>
        <Navbar />
        <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col items-center">
            <div className="relative flex-shrink-0 overflow-hidden rounded-full w-32 h-32 mb-4">
              <img
                className="w-full h-full object-cover"
                src={user.photoURL}
                alt={user.displayName}
              />
            </div>
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold">{user.displayName}</h1>
              <p className="text-gray-600">Software Engineer</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
