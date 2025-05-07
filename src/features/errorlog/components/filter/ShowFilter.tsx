import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  IconButton,
  SelectChangeEvent,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import { SeverityEnum, BaseFilter } from "interfaces";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface ShowFilterProps {
  activeFilterCount: number;
  showFilters: boolean;
  toggleFilters: () => void;
  handleSortChange: (event: SelectChangeEvent<string>) => void;
  filters: BaseFilter & {
    severity?: SeverityEnum | null;
    errorCode?: string;
  };
}

export default function ShowFilter({
  activeFilterCount,
  showFilters,
  toggleFilters,
  handleSortChange,
  filters,
}: ShowFilterProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton
          onClick={toggleFilters}
          sx={{
            bgcolor: isDarkMode ? color.gray700 : color.gray100,
            color: isDarkMode ? color.teal300 : color.teal600,
            "&:hover": {
              bgcolor: isDarkMode ? color.gray600 : color.gray200,
            },
            transition: "all 0.2s ease",
          }}
        >
          {showFilters ? <FilterListOffIcon /> : <FilterListIcon />}
        </IconButton>
        <Typography
          variant="body2"
          sx={{
            color: isDarkMode ? color.gray300 : color.gray600,
          }}
        >
          {showFilters
            ? "Hide Filters"
            : `Filters ${
                activeFilterCount > 0 ? `(${activeFilterCount} active)` : ""
              }`}
        </Typography>
      </Stack>

      <FormControl
        variant="outlined"
        size="small"
        sx={{
          minWidth: 180,
          "& .MuiOutlinedInput-root": {
            borderRadius: "0.75rem",
            backgroundColor: isDarkMode ? color.gray700 : color.white,
            borderColor: isDarkMode ? color.gray600 : color.gray300,
            color: isDarkMode ? color.gray200 : color.gray800,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: isDarkMode ? color.teal600 : color.teal400,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: isDarkMode ? color.teal500 : color.teal500,
            },
          },
          "& .MuiInputLabel-root": {
            color: isDarkMode ? color.gray400 : color.gray600,
          },
          "& .MuiMenuItem-root": {
            color: isDarkMode ? color.gray200 : color.gray800,
          },
        }}
      >
        <InputLabel id="sort-by-label">Sort By</InputLabel>
        <Select
          labelId="sort-by-label"
          id="sort-by-select"
          value={filters.sortBy || "-createdAt"}
          label="Sort By"
          onChange={handleSortChange}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: isDarkMode ? color.gray800 : color.white,
                boxShadow: isDarkMode
                  ? "0 8px 16px rgba(0, 0, 0, 0.3)"
                  : "0 8px 16px rgba(0, 0, 0, 0.1)",
                borderRadius: "0.75rem",
              },
            },
          }}
        >
          <MenuItem value="-createdAt">Newest First</MenuItem>
          <MenuItem value="createdAt">Oldest First</MenuItem>
          <MenuItem value="-updatedAt">Recently Updated</MenuItem>
          <MenuItem value="updatedAt">Oldest Updated</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
