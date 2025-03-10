import { AnimatePresence, motion } from "framer-motion";
import Youtube from "./CatagoryPage/Youtube";

function TrailerPlayer({ isOpen, setIsOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          <motion.div
            className="relative w-full max-w-4xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.3 } }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-8 right-0 text-white text-2xl  rounded-full px-3 py-1 shadow-lg hover:bg-red-700 transition"
            >
              ✖
            </button>

            {/* YouTube Trailer */}
            <Youtube />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TrailerPlayer;
