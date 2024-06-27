/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
// @ts-ignore
import Close from "../../../assets/cross.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../../config/firebase";

export default function SignUp({
  SignUpModelCloser,
  SignUpModel,
  SignInDirection,
  ModelOpener,
}) {
  const [fristname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [image, setimage] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);

  console.log(image);
  const SignUPref = useRef(null);

  useEffect(() => {
    const HandleModelCloser = (eo) => {
      if (SignUPref.current && !SignUPref.current.contains(eo.target)) {
        SignUpModelCloser();
      }
    };

    document.addEventListener("mousedown", HandleModelCloser);
    return () => {
      document.removeEventListener("mousedown", HandleModelCloser);
    };
  }, [SignUpModel]);

  // {Signup with Nodejs and express auth}

  // const HandleSubmit = async (eo) => {
  //   eo.preventDefault();
  //   setloading(true);
  //   if (!fristname || !lastname || !email || !password) {
  //     setloading(false);
  //     toast.error("Please fill all the fields");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("fristname", fristname);
  //   formData.append("lastname", lastname);
  //   formData.append("email", email);
  //   formData.append("password", password);
  //   if (image) {
  //     formData.append("image", image); // Check if image exists before appending
  //   }

  //   try {
  //     const response = await fetch("http://localhost:6969/api/auth/signup", {
  //       method: "POST",
  //       body: formData,
  //     });
  //     const result = await response.json();
  //     console.log(result);
  //     eo.target.reset();
  //     setloading(false);
  //     toast.success("Signed Up Successfully");
  //     SignUpModelCloser();
  //     ModelOpener();
  //   } catch (error) {
  //     console.error("Error:", error);
  //     toast.error("Error while signing up");
  //     setloading(false);
  //   }
  // };

  const HandleSubmit = (eo) => {
    eo.preventDefault();
    setloading(true);
    if (!email || !password) {
      setloading(false);
      toast.error("Please fill all the fields");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        sendEmailVerification(auth.currentUser).then(() => {
          //
          toast.success("Signed Up Successfully & Email Verification sent");
        });
        updateProfile(auth.currentUser, {
          displayName: fristname,
          photoURL: image,

        });
        ModelOpener();
        SignUpModelCloser();
      })
      .catch((error) => {
        setloading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error code:", errorCode, "Error message:", errorMessage);
        switch (errorCode) {
          case "auth/invalid-email":
            toast.error("Wrong Email");
            break;
            case "auth/weak-password":
              toast.error("Password should be at least 6 characters");
              break;

          case "auth/user-not-found":
            toast.error("Wrong Email");
            break;

          case "auth/wrong-password":
            toast.error("Wrong Password");
            break;

          case "auth/too-many-requests":
            toast.error("Too many requests, please try aganin later");
            break;


        }
        // ..
      });
    setloading(false);
    eo.target.reset();
  };

  return (
    <div>
      {/* Background overlay */}

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 ${
          SignUpModel === "block" ? "block" : "hidden"
        }`}
        onClick={SignUpModelCloser}
      ></div>
      {/* Main modal */}
      <div
        id="authentication-modal"
        className={`${SignUpModel} overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center`}
      >
        <div
          ref={SignUPref}
          className="relative p-4 w-full max-w-md max-h-full"
        >
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Sign Up to our platform
              </h3>
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                onClick={SignUpModelCloser}
              >
                <img src={Close} alt="close" />
              </button>
            </div>
            {/* Modal body */}
            <div className="p-4 md:p-5">
              <form className="space-y-4" onSubmit={HandleSubmit}>
                <div className="w-full  flex justify-center mt-2">
                  <input
                    type="file"
                    name="image"
                    value={""}
                    id="image"
                    onChange={(eo) => setimage(eo.target.files[0])}
                    className="bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-600 dark:border-gray-500  dark:text-white text-sm rounded-full block  p-2.5  "
                  />
                </div>

                <div>
                  <label
                    htmlFor="Frist Name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Frist Name
                  </label>
                  <input
                    type="text"
                    value={fristname}
                    onChange={(eo) => setfirstname(eo.target.value)}
                    name="fristname"
                    id="fristname"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="John"
                  />
                </div>

                <div>
                  <label
                    htmlFor="last Name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    value={lastname}
                    onChange={(eo) => setlastname(eo.target.value)}
                    id="lastname"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Smith"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(eo) => setemail(eo.target.value)}
                    id="SignUpemail"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="SignUppassword"
                    value={password}
                    onChange={(eo) => setpassword(eo.target.value)}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {loading ? (
                    <div className="lds-roller">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  ) : (
                    "Create your account"
                  )}
                </button>
                <div
                  onClick={SignInDirection}
                  className="text-sm font-medium text-gray-500 dark:text-gray-300 flex gap-1"
                >
                  Have an Account?{" "}
                  <div className="text-blue-700 hover:underline dark:text-blue-500">
                    Log In from here account
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
