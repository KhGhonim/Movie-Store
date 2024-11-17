import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import ErrorPage from "./Error/ErrorPage";
import { sendEmailVerification } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [user, error, loading] = useAuthState(auth);
  const navigate = useNavigate();
  console.log(user);
  const handleEmailVerification = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        navigate("/");
      })
      .then(() => {
        toast.success("Email Verification sent");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  if (!loading && !user) {
    navigate("/");
    return null;
  }

  if (loading) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <FaSpinner className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[--background-color] py-24 px-4 md:px-8">
        {/* If email is not verified */}
        {!user.emailVerified && (
          <div className="bg-red-500 text-white text-center py-4 rounded-lg shadow-md mb-6">
            <span>Please verify your email!</span>
            <button
              className="ml-4 bg-white text-red-500 rounded px-4 py-2"
              onClick={handleEmailVerification}
            >
              Send Verification Email
            </button>
          </div>
        )}

        {/* Profile Section */}
        <div className="max-w-5xl h-full mx-auto  bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-center flex-col md:flex-row">
            {/* Profile Picture */}
            <div className="relative w-32 h-32 md:w-48 md:h-48 overflow-hidden rounded-full mb-6 md:mb-0">
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Profile Info */}
            <div className="text-center md:text-left md:ml-8">
              <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                {user.displayName}
              </h2>
              <p className="text-md text-gray-600 mb-4">Software Engineer</p>
              <p className="text-sm text-gray-500 mb-4">
                Created at:{" "}
                {new Date(user.metadata.creationTime).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="text-center mt-10 text-[--text-color]">
          <p>© 2023 Khaled Ghonim. All rights reserved.</p>
        </div>
      </div>
    </>
  );
}
