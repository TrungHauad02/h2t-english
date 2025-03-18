import { Box, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, Tooltip, IconButton, SelectChangeEvent } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import { useTheme, useMediaQuery } from "@mui/material";

interface HistoryTestFilterProps {
  hooks: {
    searchTerm: string;
    handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    filterType: string;
    handleFilterChange: (event: SelectChangeEvent<string>) => void; 
    sortBy: string;
    handleSortChange: (event: SelectChangeEvent<string>) => void; 
    sortDirection: "asc" | "desc";
    toggleSortDirection: () => void;
  };
  color: any;
  isDarkMode: boolean;
}

export default function HistoryTestFilter({ hooks, color, isDarkMode }: HistoryTestFilterProps) {
    const theme = useTheme();
    const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  
    return (
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: isSmDown ? "column" : "row",
          alignItems: isSmDown ? "stretch" : "center",
          flexWrap: "wrap",
          gap: 1.5,
          backgroundColor: isDarkMode ? color.gray800 : color.gray50,
          borderBottom: `1px solid ${isDarkMode ? color.gray600 : color.gray300}`,
        }}
      >
        <TextField
          label="Search tests"
          variant="outlined"
          size="small"
          value={hooks.searchTerm}
          onChange={hooks.handleSearchChange}
          fullWidth={isSmDown}
          sx={{
            flexGrow: 1,
            minWidth: "100px",
            maxWidth: "100%",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              backgroundColor: isDarkMode ? color.gray700 : color.white,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color={isDarkMode ? "info" : "primary"} />
              </InputAdornment>
            ),
          }}
        />
  
        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", width: isSmDown ? "100%" : "auto" }}>
          <FormControl size="small" sx={{ minWidth: "120px", maxWidth: "100%", flexGrow: 1 }}>
            <InputLabel>Test Type</InputLabel>
            <Select value={hooks.filterType} label="Test Type" onChange={hooks.handleFilterChange}>
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="READING">Reading</MenuItem>
              <MenuItem value="LISTENING">Listening</MenuItem>
              <MenuItem value="WRITING">Writing</MenuItem>
              <MenuItem value="SPEAKING">Speaking</MenuItem>
              <MenuItem value="MIXING">Mixing</MenuItem>
              <MenuItem value="TOEIC">TOEIC</MenuItem>
              <MenuItem value="COMPETITION">Competition</MenuItem>
            </Select>
          </FormControl>
  
          <FormControl size="small" sx={{ minWidth: "120px", maxWidth: "50%", flexGrow: 1 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={hooks.sortBy} label="Sort By" onChange={hooks.handleSortChange}>
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="score">Score</MenuItem>
              <MenuItem value="title">Title</MenuItem>
            </Select>
          </FormControl>
  
          <Tooltip title={hooks.sortDirection === "asc" ? "Ascending" : "Descending"}>
            <IconButton
              onClick={hooks.toggleSortDirection}
              sx={{
                border: 1,
                borderColor: isDarkMode ? color.teal400 : color.teal600,
                borderRadius: "8px",
                color: isDarkMode ? color.teal400 : color.teal600,
                width: "40px",
                height: "40px",
              }}
            >
              <SortIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    );
  }