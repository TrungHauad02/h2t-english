import { createTheme } from "@mui/material";

const theme = (isDarkMode: boolean) =>
  createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
      h1: {
        fontFamily: "'Roboto', sans-serif",
      },
      h2: {
        fontFamily: "'Roboto', sans-serif",
      },
      h3: {
        fontFamily: "'Roboto', sans-serif",
      },
      h4: {
        fontFamily: "'Roboto', sans-serif",
      },
      h5: {
        fontFamily: "'Roboto', sans-serif",
      },
      h6: {
        fontFamily: "'Roboto', sans-serif",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontFamily: "'Roboto', sans-serif",
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: "'Roboto', sans-serif",
          },
        },
      },
    },
  });

export default theme;
