import {
  Box,
  Typography,
  Container,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import ListRoute from "../components/ListRoute";
import SearchIcon from "@mui/icons-material/Search";
import SchoolIcon from "@mui/icons-material/School";
import { useState } from "react";

export default function ListRoutePage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [searchQuery, setSearchQuery] = useState("");

  const backgroundColor = isDarkMode ? color.gray900 : color.gray50;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: backgroundColor,
        backgroundSize: "20px 20px",
        pt: 10,
        pb: 8,
      }}
    >
      <Container maxWidth="xl">
        {/* Header section with title and description */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2, sm: 4 }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          sx={{ mb: 5 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: 60, sm: 80 },
              height: { xs: 60, sm: 80 },
              borderRadius: "20%",
              background: `linear-gradient(135deg, ${
                isDarkMode ? color.teal700 : color.teal400
              }, ${isDarkMode ? color.teal900 : color.teal600})`,
              boxShadow: `0 8px 20px ${
                isDarkMode ? color.teal900 + "80" : color.teal500 + "40"
              }`,
              flexShrink: 0,
            }}
          >
            <SchoolIcon sx={{ fontSize: { xs: 36, sm: 48 }, color: "white" }} />
          </Box>

          <Box>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                color: isDarkMode ? color.teal300 : color.teal700,
                fontWeight: 800,
                mb: 1.5,
                position: "relative",
                display: "inline-block",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: 0,
                  width: "60%",
                  height: 4,
                  borderRadius: 2,
                  bgcolor: isDarkMode ? color.teal500 : color.teal400,
                },
              }}
            >
              Learning Routes
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: isDarkMode ? color.gray300 : color.gray700,
                fontWeight: 400,
                maxWidth: "800px",
              }}
            >
              Explore our structured learning paths designed to help you build
              skills step by step. Each route contains a curated collection of
              lessons to guide your learning journey.
            </Typography>
          </Box>
        </Stack>

        {/* Search box with improved styling */}
        <Box
          sx={{
            mb: 5,
            maxWidth: 500,
            mx: "auto",
          }}
        >
          <TextField
            placeholder="Search learning routes..."
            value={searchQuery}
            onChange={handleSearchChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{ color: isDarkMode ? color.gray400 : color.gray500 }}
                  />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            sx={{
              bgcolor: isDarkMode ? color.gray800 : color.white,
              borderRadius: 2,
              boxShadow: `0 4px 12px ${
                isDarkMode ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.08)"
              }`,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "& fieldset": {
                  borderColor: isDarkMode ? color.gray700 : color.gray300,
                },
                "&:hover fieldset": {
                  borderColor: isDarkMode ? color.teal500 : color.teal400,
                },
                "&.Mui-focused fieldset": {
                  borderColor: isDarkMode ? color.teal400 : color.teal500,
                  borderWidth: 2,
                },
              },
              "& .MuiInputBase-input": {
                py: 1.5,
              },
            }}
          />
        </Box>

        {/* Routes list component */}
        <ListRoute searchQuery={searchQuery} />
      </Container>
    </Box>
  );
}
