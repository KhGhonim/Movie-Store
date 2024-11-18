import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';

export default function NoMovieFound() {
  const nevigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center px-4">
    <div className="max-w-md w-full text-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold text-red-500 mb-4">Oops!</h1>
        <h2 className="text-3xl font-semibold text-white mb-6">404 - Movie Not Found</h2>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <p className="text-xl text-gray-300 mb-8">
          Looks like this movie pulled a disappearing act worthy of a magician!
        </p>
        <p className="text-lg text-gray-400 mb-8">
          The resource you requested could not be found. It's probably off shooting its next blockbuster.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <button 
          onClick={() => nevigate('/')}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          Back to Home
        </button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <p className="mt-8 text-sm text-gray-500">
          If you believe this is an error, please contact our support team. 
          They're probably binge-watching something, but they'll get back to you... eventually.
        </p>
      </motion.div>
    </div>
  </div>
  )
}
