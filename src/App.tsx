import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppRoutes from "routes/AppRoutes";
import { useDarkMode } from "hooks/useDarkMode";
import { ThemeProvider } from "@emotion/react";
import theme from "theme";

function App() {
  const { isDarkMode } = useDarkMode();

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme(isDarkMode)}>
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
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
