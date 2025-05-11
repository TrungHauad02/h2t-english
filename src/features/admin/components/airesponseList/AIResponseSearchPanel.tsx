import { useState, useEffect } from "react";
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

interface AIResponseSearchPanelProps {
  filters: AIResponseFilter;
  onFilterChange: (filters: AIResponseFilter) => void;
  onFilterReset: () => void;
}

export default function AIResponseSearchPanel({
  filters,
  onFilterChange,
  onFilterReset,
}: AIResponseSearchPanelProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  
  const [expandFilters, setExpandFilters] = useState<boolean>(!isMobile);
  const [localFilters, setLocalFilters] = useState<AIResponseFilter>(filters);

  // Đồng bộ local filters khi filters từ prop thay đổi
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Hàm debounce để trì hoãn việc áp dụng filter
  const useDebounce = (value: AIResponseFilter, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
  
    return debouncedValue;
  };

  // Áp dụng debounce để tránh gọi API quá nhiều khi người dùng đang nhập
  const debouncedFilters = useDebounce(localFilters, 500);

  // Tự động áp dụng filter khi giá trị debounced thay đổi
  useEffect(() => {
    // Chỉ áp dụng nếu có sự thay đổi thực sự
    if (JSON.stringify(debouncedFilters) !== JSON.stringify(filters)) {
      onFilterChange(debouncedFilters);
    }
  }, [debouncedFilters]);

  const handleFilterChange = (
    field: keyof AIResponseFilter,
    value: any
  ) => {
    // Chỉ cập nhật local state, useEffect sẽ tự động áp dụng filter
    setLocalFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleResetFilters = () => {
    setLocalFilters({});
    onFilterReset();
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
      {/* Search header with collapse functionality on mobile */}
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

      <Collapse in={expandFilters} timeout="auto">
        <Grid container spacing={2}>
          {/* User ID */}
          <Grid item xs={12} sm={6} md={3}>
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
              sx={{
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
              }}
            />
          </Grid>

          {/* Status */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl
              fullWidth
              sx={{
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
              }}
            >
              <InputLabel>Status</InputLabel>
              <Select
                value={
                  localFilters.status !== undefined && localFilters.status !== null
                    ? localFilters.status.toString()
                    : ""
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
          </Grid>

          {/* Start Date */}
          <Grid item xs={12} sm={6} md={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={localFilters.startCreatedAt || null}
                onChange={(newValue) =>
                  handleFilterChange("startCreatedAt", newValue)
                }
                sx={{
                  width: "100%",
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
                }}
              />
            </LocalizationProvider>
          </Grid>

          {/* End Date */}
          <Grid item xs={12} sm={6} md={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="End Date"
                value={localFilters.endCreatedAt || null}
                onChange={(newValue) =>
                  handleFilterChange("endCreatedAt", newValue)
                }
                sx={{
                  width: "100%",
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
                }}
              />
            </LocalizationProvider>
          </Grid>

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
                onClick={handleResetFilters}
                startIcon={<RestartAltIcon />}
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
      </Collapse>
    </Box>
  );
}