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

interface SearchTestsProps {
  onSearch: (query: string) => void;
}

export default function SearchTests({ onSearch }: SearchTestsProps) {
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

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const searchButtonSx = {
    height: isMobile ? 48 : 56,
    minWidth: isMobile ? 80 : 120,
    px: 3,
    bgcolor: isDarkMode ? color.emerald600 : color.emerald500,
    color: color.white,
    "&:hover": {
      bgcolor: isDarkMode ? color.emerald500 : color.emerald600,
    },
    boxShadow: `0 4px 12px ${
      isDarkMode ? color.emerald900 + "50" : color.emerald500 + "40"
    }`,
    transition: "all 0.3s ease",
    borderRadius: 2,
    flexShrink: 0,
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: isMobile ? "column" : "row",
        gap: 2,
        width: "100%",
        px: 2,
        mt: 2,
      }}
    >
      <TextField
        placeholder="Search competition by title..."
        value={localSearchQuery}
        onChange={handleSearchChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyPress={handleKeyPress}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                sx={{
                  color: isDarkMode
                    ? isFocused
                      ? color.emerald300
                      : color.gray400
                    : isFocused
                    ? color.emerald600
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
          flex: 1,
          maxWidth: 800,
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
                  ? color.emerald700
                  : color.gray700
                : isFocused
                ? color.emerald400
                : color.gray300,
              transition: "border-color 0.3s ease",
            },
            "&:hover fieldset": {
              borderColor: isDarkMode ? color.emerald500 : color.emerald400,
            },
            "&.Mui-focused fieldset": {
              borderColor: isDarkMode ? color.emerald400 : color.emerald500,
              borderWidth: 2,
            },
          },
          "& .MuiInputBase-input": {
            py: 2,
            fontSize: "1rem",
          },
        }}
      />
      <Button
        variant="contained"
        onClick={handleSearch}
        sx={searchButtonSx}
        startIcon={<SearchIcon />}
      >
        {isMobile ? "Search" : "Search Tests"}
      </Button>
    </Box>
  );
}
