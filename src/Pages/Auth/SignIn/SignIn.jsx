// @ts-nocheck

import { useEffect, useRef, useState } from "react";

import Close from "../../../assets/cross.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase";

// eslint-disable-next-line react/prop-types
export default function SignIn({ Model, ModelCloser, SignUpDirection }) {
  const ref = useRef(null);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const HandleModelCloser = (eo) => {
      if (ref.current && !ref.current.contains(eo.target)) {
        ModelCloser();
      }
    };

    document.addEventListener("mousedown", HandleModelCloser);
    return () => {
      document.removeEventListener("mousedown", HandleModelCloser);
    };
  }, [Model]);


  // {Signin with Nodejs and express auth}

  // const HandleSubmit = async (eo) => {
  //   eo.preventDefault();
  //   setloading(true);
  //   if (!email || !password) {
  //     setloading(false);
  //     toast.error("Please fill all the fields");
  //     return;
  //   }

  //   const formData = { email, password };

  //   try {
  //     const response = await fetch("http://localhost:6969/api/auth/signin", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",

  //       },
  //       body: JSON.stringify(formData),
  //     });
  //     const result = await response.json();
  //     console.log(result);

  //     if (result.error) {
  //       setloading(false);
  //       return;
  //     }

  //     eo.target.reset();
  //     setloading(false);
  //     toast.success("Logged In Successfully");
  //     ModelCloser();
  //   } catch (error) {
  //     console.log("Error while signing in:", error.message);
  //     setloading(false);
  //     toast.error("Error while signing in");
  //   }

  //   eo.target.reset();
  //   setloading(false);
  // };

  const HandleSubmit = (eo) => {
    eo.preventDefault();
    setloading(true);
    if (!email || !password) {
      setloading(false);
      toast.error("Please fill all the fields");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setloading(false);
        toast.success("Logged In Successfully");
        ModelCloser();
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        setloading(false);
        const errorCode = error.code;
        switch (errorCode) {
          case "auth/invalid-email":
            toast.error("Wrong Email");
            break;

          case "auth/user-not-found":
            toast.error("Wrong Email");
            break;

          case "auth/wrong-password":
            toast.error("Wrong Password");
            break;

          case "auth/invalid-credential":
            toast.error("Invalid Credential!");
            break;

          case "auth/too-many-requests":
            toast.error("Too many requests, please try aganin later");
            break;
        }
      });

    eo.target.reset();
    setloading(false);
  };

  return (
    <div>
      {/* Background overlay */}

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 ${
          Model === "block" ? "block" : "hidden"
        }`}
        onClick={ModelCloser}
      ></div>
      {/* Main modal */}
      <div
        id="authentication-modal"
        className={`${Model} overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full" ref={ref}>
          {/* Modal content */}
          <div className="relative bg-white rounded-xl shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Welcome Again!
              </h3>
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                onClick={ModelCloser}
              >
                <img src={Close} alt="close" />

                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-4 md:p-5">
              <form className="space-y-4" onSubmit={HandleSubmit}>
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
                    id="email"
                    value={email}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    required
                    onChange={(eo) => setemail(eo.target.value)}
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
                    value={password}
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                    onChange={(eo) => setpassword(eo.target.value)}
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
                    "Login to your account"
                  )}
                </button>
                <div
                  onClick={SignUpDirection}
                  className="text-sm font-medium text-gray-500 dark:text-gray-300 flex gap-1"
                >
                  Not registered?{" "}
                  <div className="text-blue-700 hover:underline dark:text-blue-500">
                    Create account
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
