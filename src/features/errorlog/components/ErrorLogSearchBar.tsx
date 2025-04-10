import { Paper,  InputBase,  IconButton,  Box, Zoom } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import useErrorLogSearchBar from "./useErrorLogSearchBar";

interface ErrorLogSearchBarProps {
  onSearch: (query: string) => void;
}

export default function ErrorLogSearchBar({ onSearch }: ErrorLogSearchBarProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const hooks = useErrorLogSearchBar(onSearch);

  return (
    <Box sx={{ mb: 3, width: "100%" }}>
      <Paper
        component="form"
        onSubmit={hooks.handleSubmit}
        sx={{
          p: "2px 8px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          borderRadius: "0.75rem",
          border: `1px solid ${isDarkMode ? color.gray700 : color.gray300}`,
          backgroundColor: isDarkMode ? color.gray800 : color.white,
          boxShadow: isDarkMode 
            ? `0 4px 12px rgba(0, 0, 0, 0.1)` 
            : `0 4px 12px rgba(0, 0, 0, 0.05)`,
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: isDarkMode ? color.teal500 : color.teal400,
            boxShadow: isDarkMode 
              ? `0 6px 16px rgba(0, 0, 0, 0.15), 0 0 0 1px ${color.teal700}40` 
              : `0 6px 16px rgba(0, 0, 0, 0.08), 0 0 0 1px ${color.teal400}40`,
          },
          "&:focus-within": {
            borderColor: isDarkMode ? color.teal400 : color.teal500,
            boxShadow: isDarkMode 
              ? `0 0 0 2px ${color.teal700}60` 
              : `0 0 0 2px ${color.teal400}60`,
          },
        }}
      >
        <IconButton 
          type="submit"
          sx={{ 
            p: "10px",
            color: isDarkMode ? color.teal300 : color.teal600 
          }}
        >
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            color: isDarkMode ? color.gray200 : color.gray800,
            "& ::placeholder": {
              color: isDarkMode ? color.gray500 : color.gray400,
              opacity: 1,
            },
          }}
          placeholder="Search by error code or message..."
          value={hooks.searchValue}
          onChange={hooks.handleSearchChange}
          inputProps={{ "aria-label": "search error logs" }}
        />
        <Zoom in={hooks.searchValue.length > 0}>
          <IconButton 
            onClick={hooks.handleClear}
            sx={{ 
              visibility: hooks.searchValue ? "visible" : "hidden",
              color: isDarkMode ? color.gray400 : color.gray600,
              "&:hover": {
                color: isDarkMode ? color.gray200 : color.gray800,
              }
            }}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        </Zoom>
      </Paper>
    </Box>
  );
}