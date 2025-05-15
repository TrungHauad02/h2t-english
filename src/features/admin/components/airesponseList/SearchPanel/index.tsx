import React, { useEffect, useRef } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
  IconButton,
  Collapse,
} from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TuneIcon from "@mui/icons-material/Tune";
import { AIResponseFilter } from "interfaces";
import FilterField from "./FilterField";
import { useSearchFilters } from "./useSearchFilters";

interface SearchPanelProps {
  filters: AIResponseFilter;
  onFilterChange: (filters: AIResponseFilter) => void;
  onFilterReset: () => void;
}

export default function SearchPanel({
  filters,
  onFilterChange,
  onFilterReset,
}: SearchPanelProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  // State for collapsible filter panel
  const [expandFilters, setExpandFilters] = React.useState<boolean>(!isMobile);
  
  // Form và input references
  const formRef = useRef<HTMLFormElement>(null);
  const userIdRef = useRef<HTMLInputElement>(null);
  
  // Custom hook for filter handling
  const { 
    localFilters, 
    setLocalFilters,
    handleFilterChange, 
    handleResetFilters 
  } = useSearchFilters({
    initialFilters: filters,
    onFilterChange,
    onFilterReset
  });

  // Theo dõi khi filters từ props thay đổi (đặc biệt khi reset)
  useEffect(() => {
    // Kiểm tra xem filters có phải là object rỗng không
    const isEmptyObject = Object.keys(filters).length === 0;
    
    // Nếu filters là rỗng, reset form
    if (isEmptyObject) {
      if (formRef.current) {
        formRef.current.reset();
      }
      
      // Reset trực tiếp giá trị của input userId
      if (userIdRef.current) {
        userIdRef.current.value = "";
      }
      
      // Reset tất cả các trường trong state
      setLocalFilters({
        status: null,
        userId: undefined,
        sortBy: undefined,
        startCreatedAt: undefined,
        endCreatedAt: undefined,
        startUpdatedAt: undefined,
        endUpdatedAt: undefined
      });
    }
  }, [filters, setLocalFilters]);

  // Custom reset handler
  const handleReset = () => {
    // Reset DOM form (nếu có)
    if (formRef.current) {
      formRef.current.reset();
    }
    
    // Reset userId input value trực tiếp
    if (userIdRef.current) {
      userIdRef.current.value = "";
    }
    
    // Gọi hàm reset trong hook
    handleResetFilters();
  };

  // Common styles for input fields
  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: isDarkMode ? color.gray600 : color.gray300,
      },
      "&:hover fieldset": {
        borderColor: isDarkMode ? color.teal500 : color.teal400,
      },
      "&.Mui-focused fieldset": {
        borderColor: isDarkMode ? color.teal400 : color.teal600,
      },
    },
    "& .MuiInputLabel-root": {
      color: isDarkMode ? color.gray400 : color.gray600,
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: isDarkMode ? color.teal400 : color.teal600,
    },
    "& .MuiInputBase-input": {
      color: isDarkMode ? color.gray200 : color.gray800,
    },
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        overflow: "hidden",
      }}
    >
      {/* Header with collapse functionality on mobile */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: isDarkMode ? color.gray100 : color.gray900,
            fontWeight: 600,
          }}
        >
          <TuneIcon
            sx={{ color: isDarkMode ? color.teal400 : color.teal600 }}
          />
          Search Filters
        </Typography>

        {isMobile && (
          <IconButton
            onClick={() => setExpandFilters(!expandFilters)}
            sx={{
              color: isDarkMode ? color.teal400 : color.teal600,
              backgroundColor: isDarkMode ? color.gray700 : color.gray100,
              "&:hover": {
                backgroundColor: isDarkMode ? color.gray600 : color.gray200,
              },
            }}
          >
            {expandFilters ? <CloseIcon /> : <FilterListIcon />}
          </IconButton>
        )}
      </Box>

      {/* Collapsible filter form */}
      <Collapse in={expandFilters} timeout="auto">
        <form ref={formRef}>
          <Grid container spacing={2}>
            {/* User ID */}
            <FilterField>
              <TextField
                fullWidth
                label="User ID"
                variant="outlined"
                value={localFilters.userId || ""}
                onChange={(e) =>
                  handleFilterChange(
                    "userId",
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                type="number"
                inputRef={userIdRef}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon
                        sx={{
                          color: isDarkMode ? color.gray400 : color.gray500,
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={inputStyles}
              />
            </FilterField>

            {/* Status */}
            <FilterField>
              <FormControl fullWidth sx={inputStyles}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={
                    localFilters.status === null || localFilters.status === undefined
                      ? ""
                      : localFilters.status ? "true" : "false"
                  }
                  onChange={(e) => {
                    const value = e.target.value;
                    handleFilterChange(
                      "status",
                      value === "" ? null : value === "true"
                    );
                  }}
                  label="Status"
                  sx={{
                    color: isDarkMode ? color.gray200 : color.gray800,
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="true">Evaluated</MenuItem>
                  <MenuItem value="false">Not Evaluated</MenuItem>
                </Select>
              </FormControl>
            </FilterField>

            {/* Start Date */}
            <FilterField>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Start Date"
                  value={localFilters.startCreatedAt || null}
                  onChange={(newValue) =>
                    handleFilterChange("startCreatedAt", newValue)
                  }
                  sx={{
                    width: "100%",
                    ...inputStyles,
                  }}
                />
              </LocalizationProvider>
            </FilterField>

            {/* End Date */}
            <FilterField>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="End Date"
                  value={localFilters.endCreatedAt || null}
                  onChange={(newValue) =>
                    handleFilterChange("endCreatedAt", newValue)
                  }
                  sx={{
                    width: "100%",
                    ...inputStyles,
                  }}
                />
              </LocalizationProvider>
            </FilterField>

            {/* Action Buttons */}
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  mt: 1,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={handleReset}
                  startIcon={<RestartAltIcon />}
                  type="reset"
                  sx={{
                    borderColor: isDarkMode ? color.gray600 : color.gray300,
                    color: isDarkMode ? color.gray300 : color.gray700,
                    "&:hover": {
                      borderColor: isDarkMode ? color.gray500 : color.gray400,
                      backgroundColor: isDarkMode ? color.gray700 : color.gray100,
                    },
                  }}
                >
                  Reset
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Collapse>
    </Box>
  );
}