import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppRoutes from "routes/AppRoutes";
import { RootState } from "./redux/type";

function App() {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        aria-label="Toast container"
        theme={isDarkMode ? "dark" : "light"}
      />
    </BrowserRouter>
  );
}

export default App;
