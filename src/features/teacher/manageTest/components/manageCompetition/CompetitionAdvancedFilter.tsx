import React from "react";
import { 
  Stack, 
  Typography, 
  TextField, 
  Box, 
  FormControl, 
  Select, 
  MenuItem,
  Divider,
  Paper,
  alpha,
  SelectChangeEvent
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { WEDialog } from "components/display";
import { convertToDate } from "utils/convert";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TuneIcon from "@mui/icons-material/Tune";
import SortIcon from "@mui/icons-material/Sort";
import { CompetitionTestFilter } from "interfaces";

interface CompetitionAdvancedFilterProps {
  filter: CompetitionTestFilter;
  updateFilter: (updates: Partial<CompetitionTestFilter>) => void;
  open: boolean;
  onClose: () => void;
  onApply: () => void;
}

export default function CompetitionAdvancedFilter({
  filter,
  updateFilter,
  open,
  onClose,
  onApply,
}: CompetitionAdvancedFilterProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const getInputBackground = () => {
    return isDarkMode ? color.gray800 : color.white;
  };

  const getBorderColor = () => {
    return isDarkMode ? color.gray700 : color.gray300;
  };

  // Fixed type for SelectChangeEvent
  const handleSortChange = (event: SelectChangeEvent<string>) => {
    updateFilter({ sortBy: event.target.value as "-createdAt" | "createdAt" | "-updatedAt" | "updatedAt" });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <WEDialog
        title="Advanced Filters"
        open={open}
        onCancel={onClose}
        onOk={() => {
          onClose();
          onApply();
        }}
      >
        <Stack spacing={3}>
          {/* Sort options */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              backgroundColor: isDarkMode ? alpha(color.gray800, 0.6) : alpha(color.gray50, 0.6),
              borderRadius: 2,
              border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <SortIcon color="primary" sx={{ color: isDarkMode ? color.teal400 : color.teal600 }} />
              <Typography variant="subtitle1" fontWeight="bold">
                Sort Options
              </Typography>
            </Box>

            <Box sx={{ mb: 1 }}>
              <Typography 
                variant="body2" 
                color={isDarkMode ? color.gray300 : color.gray600}
                sx={{ mb: 1, ml: 0.5, fontWeight: 500 }}
              >
                Sort By
              </Typography>
              <FormControl fullWidth variant="outlined" size="small">
                <Select
                  value={filter.sortBy || "-createdAt"}
                  onChange={handleSortChange}
                  displayEmpty
                  sx={{
                    backgroundColor: getInputBackground(),
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: getBorderColor(),
                      borderWidth: "1px",
                    },
                    "& .MuiSelect-select": {
                      py: 1.5,
                      fontSize: "1rem",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: isDarkMode ? color.gray600 : color.gray400,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: color.teal500,
                      borderWidth: "1px",
                    },
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: isDarkMode ? color.gray800 : color.white,
                        borderRadius: "8px",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
                        mt: 0.5,
                        "& .MuiMenuItem-root": {
                          py: 1.2,
                          "&:hover": {
                            backgroundColor: isDarkMode 
                              ? alpha(color.gray700, 0.7) 
                              : alpha(color.gray100, 0.7),
                          },
                          "&.Mui-selected": {
                            backgroundColor: isDarkMode 
                              ? alpha(color.teal700, 0.2)
                              : alpha(color.teal100, 0.7),
                            "&:hover": {
                              backgroundColor: isDarkMode 
                                ? alpha(color.teal700, 0.3)
                                : alpha(color.teal100, 0.9),
                            },
                          },
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="-createdAt">Newest First</MenuItem>
                  <MenuItem value="createdAt">Oldest First</MenuItem>
                  <MenuItem value="-updatedAt">Last Updated</MenuItem>
                  <MenuItem value="updatedAt">First Updated</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Paper>

          {/* Competition date filters */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              backgroundColor: isDarkMode ? alpha(color.gray800, 0.6) : alpha(color.gray50, 0.6),
              borderRadius: 2,
              border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <CalendarTodayIcon color="primary" />
              <Typography variant="subtitle1" fontWeight="bold">
                Competition Dates
              </Typography>
            </Box>

            <Stack spacing={2}>
              <DateTimePicker
                label="Start Time (From)"
                value={filter.startStartTime || null}
                onChange={(date) => {
                  updateFilter({
                    startStartTime: date || undefined,
                  });
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: "outlined",
                    size: "small",
                    sx: {
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: getInputBackground(),
                        borderRadius: 1,
                        borderColor: getBorderColor(),
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        },
                        '&.Mui-focused': {
                          transform: 'translateY(-2px)',
                        }
                      },
                      "& .MuiInputLabel-root": {
                        color: isDarkMode ? color.gray400 : color.gray600,
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: getBorderColor(),
                      },
                    },
                  },
                }}
              />

              <DateTimePicker
                label="Start Time (To)"
                value={filter.endStartTime || null}
                onChange={(date) => {
                  updateFilter({
                    endStartTime: date || undefined,
                  });
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: "outlined",
                    size: "small",
                    sx: {
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: getInputBackground(),
                        borderRadius: 1,
                        borderColor: getBorderColor(),
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        },
                        '&.Mui-focused': {
                          transform: 'translateY(-2px)',
                        }
                      },
                      "& .MuiInputLabel-root": {
                        color: isDarkMode ? color.gray400 : color.gray600,
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: getBorderColor(),
                      },
                    },
                  },
                }}
              />

              <DateTimePicker
                label="End Time (From)"
                value={filter.startEndTime || null}
                onChange={(date) => {
                  updateFilter({
                    startEndTime: date || undefined,
                  });
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: "outlined",
                    size: "small",
                    sx: {
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: getInputBackground(),
                        borderRadius: 1,
                        borderColor: getBorderColor(),
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        },
                        '&.Mui-focused': {
                          transform: 'translateY(-2px)',
                        }
                      },
                      "& .MuiInputLabel-root": {
                        color: isDarkMode ? color.gray400 : color.gray600,
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: getBorderColor(),
                      },
                    },
                  },
                }}
              />

              <DateTimePicker
                label="End Time (To)"
                value={filter.endEndTime || null}
                onChange={(date) => {
                  updateFilter({
                    endEndTime: date || undefined,
                  });
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: "outlined",
                    size: "small",
                    sx: {
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: getInputBackground(),
                        borderRadius: 1,
                        borderColor: getBorderColor(),
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        },
                        '&.Mui-focused': {
                          transform: 'translateY(-2px)',
                        }
                      },
                      "& .MuiInputLabel-root": {
                        color: isDarkMode ? color.gray400 : color.gray600,
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: getBorderColor(),
                      },
                    },
                  },
                }}
              />
            </Stack>
          </Paper>

          {/* Created At / Updated At */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              backgroundColor: isDarkMode ? alpha(color.gray800, 0.6) : alpha(color.gray50, 0.6),
              borderRadius: 2,
              border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <TuneIcon color="primary" />
              <Typography variant="subtitle1" fontWeight="bold">
                Additional Filters
              </Typography>
            </Box>

            <Divider sx={{ 
              mb: 2, 
              mt: 1,
              borderColor: isDarkMode ? color.gray700 : color.gray300,
            }} />
            
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
              Created At
            </Typography>
            <Stack spacing={2} sx={{ mb: 3 }}>
              <TextField
                label="Start Date"
                type="date"
                size="small"
                InputLabelProps={{ shrink: true }}
                value={
                  filter.startCreatedAt
                    ? filter.startCreatedAt.toISOString().slice(0, 10)
                    : ""
                }
                onChange={(e) => {
                  const dateString = e.target.value;
                  updateFilter({
                    startCreatedAt: convertToDate(dateString),
                  });
                }}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: getInputBackground(),
                    borderRadius: 1,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    },
                    '&.Mui-focused': {
                      transform: 'translateY(-2px)',
                    }
                  },
                  "& .MuiInputLabel-root": {
                    color: isDarkMode ? color.gray400 : color.gray600,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: getBorderColor(),
                  },
                }}
              />
              <TextField
                label="End Date"
                type="date"
                size="small"
                InputLabelProps={{ shrink: true }}
                value={
                  filter.endCreatedAt
                    ? filter.endCreatedAt.toISOString().slice(0, 10)
                    : ""
                }
                onChange={(e) => {
                  const dateString = e.target.value;
                  updateFilter({
                    endCreatedAt: convertToDate(dateString),
                  });
                }}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: getInputBackground(),
                    borderRadius: 1,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    },
                    '&.Mui-focused': {
                      transform: 'translateY(-2px)',
                    }
                  },
                  "& .MuiInputLabel-root": {
                    color: isDarkMode ? color.gray400 : color.gray600,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: getBorderColor(),
                  },
                }}
              />
            </Stack>

            <Divider sx={{ 
              mb: 2,
              borderColor: isDarkMode ? color.gray700 : color.gray300,
            }} />
            
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
              Updated At
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Start Date"
                type="date"
                size="small"
                InputLabelProps={{ shrink: true }}
                value={
                  filter.startUpdatedAt
                    ? filter.startUpdatedAt.toISOString().slice(0, 10)
                    : ""
                }
                onChange={(e) => {
                  const dateString = e.target.value;
                  updateFilter({
                    startUpdatedAt: convertToDate(dateString),
                  });
                }}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: getInputBackground(),
                    borderRadius: 1,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    },
                    '&.Mui-focused': {
                      transform: 'translateY(-2px)',
                    }
                  },
                  "& .MuiInputLabel-root": {
                    color: isDarkMode ? color.gray400 : color.gray600,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: getBorderColor(),
                  },
                }}
              />
              <TextField
                label="End Date"
                type="date"
                size="small"
                InputLabelProps={{ shrink: true }}
                value={
                  filter.endUpdatedAt
                    ? filter.endUpdatedAt.toISOString().slice(0, 10)
                    : ""
                }
                onChange={(e) => {
                  const dateString = e.target.value;
                  updateFilter({
                    endUpdatedAt: convertToDate(dateString),
                  });
                }}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: getInputBackground(),
                    borderRadius: 1,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    },
                    '&.Mui-focused': {
                      transform: 'translateY(-2px)',
                    }
                  },
                  "& .MuiInputLabel-root": {
                    color: isDarkMode ? color.gray400 : color.gray600,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: getBorderColor(),
                  },
                }}
              />
            </Stack>
          </Paper>
        </Stack>
      </WEDialog>
    </LocalizationProvider>
  );
}