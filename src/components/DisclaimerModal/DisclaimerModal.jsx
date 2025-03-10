import { useEffect, useState } from "react";

export default function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenDisclaimer = localStorage.getItem("hasSeenDisclaimer");
    if (!hasSeenDisclaimer) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenDisclaimer", "true");
  };
  const handleX = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          {/* Dialog Content */}
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-4 md:p-8 lg:-p-12 rounded-2xl shadow-2xl max-w-md w-full relative">
            {/* Close Button */}
            <button
              onClick={handleX}
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              aria-label="Close"
            >
              ✖
            </button>

            {/* Dialog Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Disclaimer
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Please read this important information about our web app.
              </p>
            </div>

            {/* Dialog Body */}
            <div className="space-y-6">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Welcome to our KGMovie App! Please note the following:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-3">
                <li>This web app is for informational purposes only.</li>
                <li>We provide movie and series information and trailers.</li>
                <li>
                  This is not a streaming service or movie download platform.
                </li>
                <li>All data is sourced from the IMDB API.</li>
                <li>
                  Any errors in the information provided may be due to the IMDB
                  API itself.
                </li>
              </ul>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                By continuing to use this app, you acknowledge and accept these
                terms.
              </p>
            </div>

            {/* Dialog Footer */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleClose}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-800"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
