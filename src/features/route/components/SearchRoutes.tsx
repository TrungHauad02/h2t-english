import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

interface SearchRoutesProps {
  onSearch: (query: string) => void;
}

export default function SearchRoutes({ onSearch }: SearchRoutesProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(localSearchQuery.trim());
  };

  const handleClear = () => {
    setLocalSearchQuery("");
    onSearch("");
  };

  const searchButtonSx = {
    ml: 2,
    height: isMobile ? 48 : 56,
    minWidth: isMobile ? 80 : 100,
    bgcolor: isDarkMode ? color.teal600 : color.teal500,
    color: color.white,
    "&:hover": {
      bgcolor: isDarkMode ? color.teal500 : color.teal600,
    },
    boxShadow: `0 4px 12px ${
      isDarkMode ? color.teal900 + "50" : color.teal500 + "40"
    }`,
    transition: "all 0.3s ease",
    borderRadius: 2,
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        maxWidth: 700,
        mx: "auto",
        position: "relative",
      }}
    >
      <TextField
        placeholder="Search learning routes..."
        value={localSearchQuery}
        onChange={handleSearchChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                sx={{
                  color: isDarkMode
                    ? isFocused
                      ? color.teal300
                      : color.gray400
                    : isFocused
                    ? color.teal600
                    : color.gray500,
                  transition: "color 0.3s ease",
                }}
              />
            </InputAdornment>
          ),
          endAdornment: localSearchQuery && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={handleClear}
                sx={{
                  color: isDarkMode ? color.gray300 : color.gray600,
                  mr: 1,
                }}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
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
              borderColor: isDarkMode
                ? isFocused
                  ? color.teal700
                  : color.gray700
                : isFocused
                ? color.teal400
                : color.gray300,
              transition: "border-color 0.3s ease",
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
      <Button
        variant="contained"
        onClick={handleSearch}
        sx={searchButtonSx}
        startIcon={<SearchIcon />}
      >
        {isMobile ? "Search" : "Search Routes"}
      </Button>
    </Box>
  );
}
