import Footer from "./components/Footer";
import DisclaimerModal from "./components/DisclaimerModal/DisclaimerModal";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <DisclaimerModal />
      <Navbar />
      <Outlet />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
