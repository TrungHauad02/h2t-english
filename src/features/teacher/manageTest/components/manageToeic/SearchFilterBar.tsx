import React from "react";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Box,
  Paper,
  Zoom,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface SearchFilterBarProps {
  searchText: string;
  setSearchText: (text: string) => void;
  statusFilter: boolean | undefined;
  handleStatusFilterChange: (value: string) => void;
  handleSearch: () => void;
}

export default function SearchFilterBar({
  searchText,
  setSearchText,
  statusFilter,
  handleStatusFilterChange,
  handleSearch,
}: SearchFilterBarProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Zoom in={true} style={{ transitionDelay: "150ms" }}>
      <Paper
        elevation={isDarkMode ? 3 : 1}
        sx={{
          p: { xs: 2, md: 3 },
          mb: 4,
          borderRadius: "12px",
          backgroundColor: isDarkMode ? color.gray700 : color.gray50,
          border: `1px solid ${isDarkMode ? color.gray600 : color.gray200}`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            gap: 1,
            color: isDarkMode ? color.teal300 : color.teal600,
          }}
        >
          <FilterListIcon />
          <Box component="span" fontWeight="medium">
            Search & Filter
          </Box>
        </Box>

        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} sm={6} md={5}>
            <TextField
              fullWidth
              label="Search by title"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={handleKeyPress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{
                        color: isDarkMode ? color.gray400 : color.gray500,
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: isDarkMode ? color.gray800 : color.white,
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: isDarkMode ? color.teal700 : color.teal500,
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: color.teal600,
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: isDarkMode ? color.teal300 : color.teal600,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: isDarkMode ? color.gray800 : color.white,
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: isDarkMode ? color.teal700 : color.teal500,
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: color.teal600,
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: isDarkMode ? color.teal300 : color.teal600,
                },
              }}
            >
              <InputLabel>Status</InputLabel>
              <Select
                value={
                  statusFilter === undefined
                    ? "all"
                    : statusFilter
                    ? "published"
                    : "draft"
                }
                label="Status"
                onChange={(e) => handleStatusFilterChange(e.target.value as string)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="published">Published</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Button
              variant="contained"
              onClick={handleSearch}
              fullWidth
              sx={{
                backgroundColor: color.teal600,
                "&:hover": {
                  backgroundColor: color.teal700,
                },
                py: 1.5,
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: "600",
              }}
            >
              Search Tests
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Zoom>
  );
}