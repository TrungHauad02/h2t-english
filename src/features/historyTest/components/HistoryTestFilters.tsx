import { Box, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import useListHistoryTest from "../hooks/useListHistoryTest";

export default function HistoryTestFilter() {
    const color = useColor();
    const { isDarkMode } = useDarkMode();
    const hooks = useListHistoryTest();

    const borderColor = isDarkMode ? color.gray600 : color.gray300;
    
    return (
        <Box
            sx={{
                p: 2.5,
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
                backgroundColor: isDarkMode ? color.gray800 : color.gray50,
                borderBottom: `1px solid ${borderColor}`,
            }}
        >
            <TextField
                label="Search tests"
                variant="outlined"
                size="small"
                value={hooks.searchTerm}
                onChange={hooks.handleSearchChange}
                sx={{
                    flexGrow: 1,
                    minWidth: "200px",
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        backgroundColor: isDarkMode ? color.gray700 : color.white,
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: isDarkMode ? color.teal400 : color.teal600,
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: isDarkMode ? color.teal400 : color.teal600,
                        },
                    },
                    "& .MuiFormLabel-root.Mui-focused": {
                        color: isDarkMode ? color.teal400 : color.teal600,
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

            <FormControl
                size="small"
                sx={{
                    minWidth: "150px",
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        backgroundColor: isDarkMode ? color.gray700 : color.white,
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: isDarkMode ? color.teal400 : color.teal600,
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: isDarkMode ? color.teal400 : color.teal600,
                        },
                    },
                    "& .MuiFormLabel-root.Mui-focused": {
                        color: isDarkMode ? color.teal400 : color.teal600,
                    },
                }}
            >
                <InputLabel>Test Type</InputLabel>
                <Select
                    value={hooks.filterType}
                    label="Test Type"
                    onChange={hooks.handleFilterChange}
                >
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

            <FormControl
                size="small"
                sx={{
                    minWidth: "120px",
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        backgroundColor: isDarkMode ? color.gray700 : color.white,
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: isDarkMode ? color.teal400 : color.teal600,
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: isDarkMode ? color.teal400 : color.teal600,
                        },
                    },
                    "& .MuiFormLabel-root.Mui-focused": {
                        color: isDarkMode ? color.teal400 : color.teal600,
                    },
                }}
            >
                <InputLabel>Sort By</InputLabel>
                <Select
                    value={hooks.sortBy}
                    label="Sort By"
                    onChange={hooks.handleSortChange}
                >
                    <MenuItem value="date">Date</MenuItem>
                    <MenuItem value="score">Score</MenuItem>
                    <MenuItem value="title">Title</MenuItem>
                </Select>
            </FormControl>

            <Tooltip
                title={hooks.sortDirection === "asc" ? "Ascending" : "Descending"}
            >
                <IconButton
                    onClick={hooks.toggleSortDirection}
                    sx={{
                        border: 1,
                        borderColor: isDarkMode ? color.teal400 : color.teal600,
                        borderRadius: "8px",
                        color: isDarkMode ? color.teal400 : color.teal600,
                        backgroundColor: isDarkMode
                            ? "rgba(94, 234, 212, 0.08)"
                            : "rgba(20, 184, 166, 0.08)",
                        "&:hover": {
                            backgroundColor: isDarkMode
                                ? "rgba(94, 234, 212, 0.15)"
                                : "rgba(20, 184, 166, 0.15)",
                        },
                        "& svg": {
                            transform:
                                hooks.sortDirection === "asc"
                                    ? "rotate(0deg)"
                                    : "rotate(180deg)",
                            transition: "transform 0.3s",
                        },
                    }}
                >
                    <SortIcon />
                </IconButton>
            </Tooltip>
        </Box>
    );
}