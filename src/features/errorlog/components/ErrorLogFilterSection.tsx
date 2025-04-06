import React from "react";
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Collapse,
  Button,
  IconButton,
  Typography,
  Chip,
  Stack,
  SelectChangeEvent,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { SeverityEnum, BaseFilter } from "interfaces";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

interface ErrorLogFilterSectionProps {
  filters: BaseFilter & {
    severity?: SeverityEnum | null;
    errorCode?: string;
  };
  onFilterChange: (filters: any) => void;
}

export default function ErrorLogFilterSection({
  filters,
  onFilterChange,
}: ErrorLogFilterSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [showFilters, setShowFilters] = React.useState(false);

  const handleSeverityChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    onFilterChange({
      severity: value === "all" ? null : Number(value),
    });
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    onFilterChange({
      status: value === "all" ? null : value === "true",
    });
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    onFilterChange({ sortBy: event.target.value });
  };

  const handleErrorCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onFilterChange({ errorCode: event.target.value });
  };

  const handleResetFilters = () => {
    onFilterChange({
      status: null,
      sortBy: "-createdAt",
      severity: null,
      errorCode: "",
      startCreatedAt: null,
      endCreatedAt: null,
    });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Count active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.status !== null) count++;
    if (filters.severity !== null) count++;
    if (filters.errorCode) count++;
    if (filters.startCreatedAt) count++;
    if (filters.endCreatedAt) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <Box sx={{ mb: 4 }}>
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

      <Collapse in={showFilters}>
        <Box
          sx={{
            p: 3,
            borderRadius: "0.75rem",
            backgroundColor: isDarkMode ? color.gray800 : color.gray50,
            border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
            mb: 3,
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl
                fullWidth
                variant="outlined"
                size="small"
                sx={{
                  backgroundColor: isDarkMode ? color.gray900 : color.white,
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: isDarkMode ? color.gray700 : color.gray300,
                  },
                }}
              >
                <InputLabel
                  id="severity-label"
                  sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
                >
                  Severity Level
                </InputLabel>
                <Select
                  labelId="severity-label"
                  value={
                    filters.severity !== null &&  filters.severity !== undefined
                      ? filters.severity.toString()
                      : "all"
                  }
                  onChange={handleSeverityChange}
                  label="Severity Level"
                  sx={{
                    color: isDarkMode ? color.gray200 : color.gray800,
                  }}
                >
                  <MenuItem value="all">All Levels</MenuItem>
                  <MenuItem
                    value={SeverityEnum.HIGH.toString()}
                    sx={{
                      color: isDarkMode ? color.red400 : color.red700,
                      fontWeight: 500,
                    }}
                  >
                    High
                  </MenuItem>
                  <MenuItem
                    value={SeverityEnum.MEDIUM.toString()}
                    sx={{
                      color: isDarkMode ? color.warningDarkMode : color.warning,
                      fontWeight: 500,
                    }}
                  >
                    Medium
                  </MenuItem>
                  <MenuItem
                    value={SeverityEnum.LOW.toString()}
                    sx={{
                      color: isDarkMode ? color.teal400 : color.teal700,
                      fontWeight: 500,
                    }}
                  >
                    Low
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FormControl
                fullWidth
                variant="outlined"
                size="small"
                sx={{
                  backgroundColor: isDarkMode ? color.gray900 : color.white,
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: isDarkMode ? color.gray700 : color.gray300,
                  },
                }}
              >
                <InputLabel
                  id="status-label"
                  sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
                >
                  Status
                </InputLabel>
                <Select
                  labelId="status-label"
                  value={
                    filters.status !== null && filters.status !== undefined
                      ? filters.status.toString()
                      : "all"
                  }
                  onChange={handleStatusChange}
                  label="Status"
                  sx={{
                    color: isDarkMode ? color.gray200 : color.gray800,
                  }}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem
                    value="true"
                    sx={{
                      color: isDarkMode
                        ? color.successDarkMode
                        : color.success,
                      fontWeight: 500,
                    }}
                  >
                    Active
                  </MenuItem>
                  <MenuItem
                    value="false"
                    sx={{
                      color: isDarkMode ? color.gray400 : color.gray600,
                      fontWeight: 500,
                    }}
                  >
                    Resolved
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                label="Error Code"
                variant="outlined"
                value={filters.errorCode || ""}
                onChange={handleErrorCodeChange}
                InputProps={{
                  sx: {
                    color: isDarkMode ? color.gray200 : color.gray800,
                    backgroundColor: isDarkMode ? color.gray900 : color.white,
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: isDarkMode ? color.gray700 : color.gray300,
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: isDarkMode ? color.gray400 : color.gray600,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <DatePicker
                    label="From Date"
                    value={filters.startCreatedAt || null}
                    onChange={(date) => {
                      onFilterChange({ startCreatedAt: date });
                    }}
                    slotProps={{ 
                      textField: { 
                        size: 'small',
                        fullWidth: true,
                        sx: {
                          '& .MuiOutlinedInput-root': {
                            color: isDarkMode ? color.gray200 : color.gray800,
                            backgroundColor: isDarkMode ? color.gray900 : color.white,
                            borderRadius: "8px",
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: isDarkMode ? color.gray700 : color.gray300,
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: isDarkMode ? color.gray400 : color.gray600,
                          },
                        }
                      } 
                    }}
                  />
                  <Box 
                    sx={{ 
                      display: "flex", 
                      alignItems: "center", 
                      color: isDarkMode ? color.gray500 : color.gray400 
                    }}
                  >
                    <DateRangeIcon fontSize="small" />
                  </Box>
                  <DatePicker
                    label="To Date"
                    value={filters.endCreatedAt || null}
                    onChange={(date) => {
                      onFilterChange({ endCreatedAt: date });
                    }}
                    slotProps={{ 
                      textField: { 
                        size: 'small',
                        fullWidth: true,
                        sx: {
                          '& .MuiOutlinedInput-root': {
                            color: isDarkMode ? color.gray200 : color.gray800,
                            backgroundColor: isDarkMode ? color.gray900 : color.white,
                            borderRadius: "8px",
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: isDarkMode ? color.gray700 : color.gray300,
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: isDarkMode ? color.gray400 : color.gray600,
                          },
                        }
                      } 
                    }}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 3,
            }}
          >
            <Button
              variant="outlined"
              startIcon={<RestartAltIcon />}
              onClick={handleResetFilters}
              sx={{
                color: isDarkMode ? color.teal300 : color.teal700,
                borderColor: isDarkMode ? color.teal700 : color.teal300,
                "&:hover": {
                  backgroundColor: isDarkMode
                    ? `${color.teal900}50`
                    : `${color.teal50}`,
                  borderColor: isDarkMode ? color.teal600 : color.teal400,
                },
              }}
            >
              Reset Filters
            </Button>
          </Box>
        </Box>
      </Collapse>

      {activeFilterCount > 0 && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            mb: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? color.gray400 : color.gray600,
              alignSelf: "center",
              mr: 1,
            }}
          >
            Active Filters:
          </Typography>
          {filters.severity !== null && (
            <Chip
              label={`Severity: ${
                filters.severity === SeverityEnum.HIGH
                  ? "High"
                  : filters.severity === SeverityEnum.MEDIUM
                  ? "Medium"
                  : "Low"
              }`}
              onDelete={() => onFilterChange({ severity: null })}
              size="small"
              sx={{
                backgroundColor: isDarkMode ? color.gray700 : color.gray200,
                color: isDarkMode
                  ? filters.severity === SeverityEnum.HIGH
                    ? color.red300
                    : filters.severity === SeverityEnum.MEDIUM
                    ? color.warning
                    : color.teal300
                  : filters.severity === SeverityEnum.HIGH
                  ? color.red700
                  : filters.severity === SeverityEnum.MEDIUM
                  ? color.warning
                  : color.teal700,
                "& .MuiChip-deleteIcon": {
                  color: isDarkMode ? color.gray400 : color.gray600,
                  "&:hover": {
                    color: isDarkMode ? color.gray200 : color.gray800,
                  },
                },
              }}
            />
          )}
          {filters.status !== null && (
            <Chip
              label={`Status: ${filters.status ? "Active" : "Resolved"}`}
              onDelete={() => onFilterChange({ status: null })}
              size="small"
              sx={{
                backgroundColor: isDarkMode ? color.gray700 : color.gray200,
                color: isDarkMode
                  ? filters.status
                    ? color.successDarkMode
                    : color.gray300
                  : filters.status
                  ? color.success
                  : color.gray700,
                "& .MuiChip-deleteIcon": {
                  color: isDarkMode ? color.gray400 : color.gray600,
                  "&:hover": {
                    color: isDarkMode ? color.gray200 : color.gray800,
                  },
                },
              }}
            />
          )}
          {filters.errorCode && (
            <Chip
              label={`Error Code: ${filters.errorCode}`}
              onDelete={() => onFilterChange({ errorCode: "" })}
              size="small"
              sx={{
                backgroundColor: isDarkMode ? color.gray700 : color.gray200,
                color: isDarkMode ? color.teal300 : color.teal700,
                "& .MuiChip-deleteIcon": {
                  color: isDarkMode ? color.gray400 : color.gray600,
                  "&:hover": {
                    color: isDarkMode ? color.gray200 : color.gray800,
                  },
                },
              }}
            />
          )}
          {filters.startCreatedAt && (
            <Chip
              label={`From: ${new Date(filters.startCreatedAt).toLocaleDateString()}`}
              onDelete={() => onFilterChange({ startCreatedAt: null })}
              size="small"
              sx={{
                backgroundColor: isDarkMode ? color.gray700 : color.gray200,
                color: isDarkMode ? color.gray200 : color.gray800,
                "& .MuiChip-deleteIcon": {
                  color: isDarkMode ? color.gray400 : color.gray600,
                  "&:hover": {
                    color: isDarkMode ? color.gray200 : color.gray800,
                  },
                },
              }}
            />
          )}
          {filters.endCreatedAt && (
            <Chip
              label={`To: ${new Date(filters.endCreatedAt).toLocaleDateString()}`}
              onDelete={() => onFilterChange({ endCreatedAt: null })}
              size="small"
              sx={{
                backgroundColor: isDarkMode ? color.gray700 : color.gray200,
                color: isDarkMode ? color.gray200 : color.gray800,
                "& .MuiChip-deleteIcon": {
                  color: isDarkMode ? color.gray400 : color.gray600,
                  "&:hover": {
                    color: isDarkMode ? color.gray200 : color.gray800,
                  },
                },
              }}
            />
          )}
        </Box>
      )}
    </Box>
  );
}