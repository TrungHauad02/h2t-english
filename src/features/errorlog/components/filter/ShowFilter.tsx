import { Box, Button, Chip, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { BaseFilter } from "interfaces";

interface ShowFilterProps {
    activeFilterCount: number;
    showFilters: boolean;
    toggleFilters: () => void;
    handleSortChange: (event: SelectChangeEvent<string>) => void;
    filters: BaseFilter
  }  

  export default function ShowFilter({
    activeFilterCount,
    showFilters,
    toggleFilters,
    handleSortChange,
    filters
  }: ShowFilterProps) {    const color = useColor();
    const { isDarkMode } = useDarkMode();
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
            }}
        >
            <Button
                startIcon={<FilterListIcon />}
                endIcon={
                    activeFilterCount > 0 ? (
                        <Chip
                            label={activeFilterCount}
                            size="small"
                            sx={{
                                height: 20,
                                minWidth: 20,
                                backgroundColor: isDarkMode
                                    ? color.teal700
                                    : color.teal500,
                                color: "white",
                            }}
                        />
                    ) : null
                }
                onClick={toggleFilters}
                sx={{
                    color: isDarkMode ? color.teal300 : color.teal700,
                    backgroundColor: isDarkMode ? color.gray700 : color.gray100,
                    "&:hover": {
                        backgroundColor: isDarkMode ? color.gray600 : color.gray200,
                    },
                    borderRadius: "8px",
                }}
            >
                {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>

            <FormControl
                variant="outlined"
                size="small"
                sx={{
                    minWidth: 200,
                    backgroundColor: isDarkMode ? color.gray800 : color.white,
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: isDarkMode ? color.gray700 : color.gray300,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: isDarkMode ? color.teal600 : color.teal400,
                    },
                }}
            >
                <InputLabel
                    id="sort-by-label"
                    sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
                >
                    Sort By
                </InputLabel>
                <Select
                    labelId="sort-by-label"
                    value={filters.sortBy || "-createdAt"}
                    onChange={handleSortChange}
                    label="Sort By"
                    sx={{
                        color: isDarkMode ? color.gray200 : color.gray800,
                        "& .MuiSelect-icon": {
                            color: isDarkMode ? color.gray400 : color.gray600,
                        },
                    }}
                >
                    <MenuItem value="-createdAt">Newest First</MenuItem>
                    <MenuItem value="createdAt">Oldest First</MenuItem>
                    <MenuItem value="-updatedAt">Recently Updated</MenuItem>
                    <MenuItem value="updatedAt">Last Updated</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}