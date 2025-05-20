import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "routes/AppRoutes";
import { useDarkMode } from "hooks/useDarkMode";
import { ThemeProvider } from "@emotion/react";
import theme from "theme";
import { WEErrorDisplay } from "components/display";

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
        <WEErrorDisplay
          position={{ vertical: "bottom", horizontal: "right" }}
          autoHideTimeout={6000}
          maxErrors={5}
        />
      </ThemeProvider><ThemeProvider theme={theme(isDarkMode)}>
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
        <WEErrorDisplay
          position={{ vertical: "bottom", horizontal: "right" }}
          autoHideTimeout={6000}
          maxErrors={5}
        />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
