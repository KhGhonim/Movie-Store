import DisclaimerModal from "./components/DisclaimerModal/DisclaimerModal";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <DisclaimerModal />
      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default App;
