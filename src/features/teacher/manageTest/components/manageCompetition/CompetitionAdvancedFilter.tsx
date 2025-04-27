import React from "react";
import { 
  Stack, 
  Typography, 
  TextField, 
  Box, 
  Divider,
  Paper,
  alpha,
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
          {/* Competition date filters */}
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              backgroundColor: isDarkMode ? alpha(color.gray800, 0.6) : alpha(color.gray50, 0.6),
              borderRadius: 2,
              border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
              boxShadow: isDarkMode 
                ? '0 4px 12px rgba(0, 0, 0, 0.2)' 
                : '0 4px 12px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                boxShadow: isDarkMode 
                  ? '0 6px 16px rgba(0, 0, 0, 0.25)' 
                  : '0 6px 16px rgba(0, 0, 0, 0.08)',
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
              <CalendarTodayIcon 
                sx={{ 
                  color: isDarkMode ? color.teal400 : color.teal600,
                  fontSize: 24
                }} 
              />
              <Typography variant="subtitle1" fontWeight="bold" fontSize="1.1rem">
                Competition Dates
              </Typography>
            </Box>

            <Stack spacing={2.5}>
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
                        borderRadius: 1.5,
                        borderColor: getBorderColor(),
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        },
                        '&.Mui-focused': {
                          transform: 'translateY(-2px)',
                          borderColor: isDarkMode ? color.teal400 : color.teal600,
                          borderWidth: 2,
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
                        borderRadius: 1.5,
                        borderColor: getBorderColor(),
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        },
                        '&.Mui-focused': {
                          transform: 'translateY(-2px)',
                          borderColor: isDarkMode ? color.teal400 : color.teal600,
                          borderWidth: 2,
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
                        borderRadius: 1.5,
                        borderColor: getBorderColor(),
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        },
                        '&.Mui-focused': {
                          transform: 'translateY(-2px)',
                          borderColor: isDarkMode ? color.teal400 : color.teal600,
                          borderWidth: 2,
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
                        borderRadius: 1.5,
                        borderColor: getBorderColor(),
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        },
                        '&.Mui-focused': {
                          transform: 'translateY(-2px)',
                          borderColor: isDarkMode ? color.teal400 : color.teal600,
                          borderWidth: 2,
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
              p: 2.5,
              backgroundColor: isDarkMode ? alpha(color.gray800, 0.6) : alpha(color.gray50, 0.6),
              borderRadius: 2,
              border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
              boxShadow: isDarkMode 
                ? '0 4px 12px rgba(0, 0, 0, 0.2)' 
                : '0 4px 12px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                boxShadow: isDarkMode 
                  ? '0 6px 16px rgba(0, 0, 0, 0.25)' 
                  : '0 6px 16px rgba(0, 0, 0, 0.08)',
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
              <TuneIcon 
                sx={{ 
                  color: isDarkMode ? color.teal400 : color.teal600,
                  fontSize: 24
                }} 
              />
              <Typography variant="subtitle1" fontWeight="bold" fontSize="1.1rem">
                Additional Filters
              </Typography>
            </Box>

            <Divider sx={{ 
              mb: 2.5, 
              mt: 1,
              borderColor: isDarkMode ? color.gray700 : color.gray300,
            }} />
            
            <Typography 
              variant="subtitle2" 
              sx={{ 
                mb: 1.5, 
                color: isDarkMode ? color.teal200 : color.teal700,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}
            >
              Created At
            </Typography>
            <Stack spacing={2.5} sx={{ mb: 3 }}>
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
                    borderRadius: 1.5,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    },
                    '&.Mui-focused': {
                      transform: 'translateY(-2px)',
                      borderColor: isDarkMode ? color.teal400 : color.teal600,
                      borderWidth: 2,
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
                    borderRadius: 1.5,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    },
                    '&.Mui-focused': {
                      transform: 'translateY(-2px)',
                      borderColor: isDarkMode ? color.teal400 : color.teal600,
                      borderWidth: 2,
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
              mb: 2.5,
              borderColor: isDarkMode ? color.gray700 : color.gray300,
            }} />
            
            <Typography 
              variant="subtitle2" 
              sx={{ 
                mb: 1.5, 
                color: isDarkMode ? color.teal200 : color.teal700,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}
            >
              Updated At
            </Typography>
            <Stack spacing={2.5}>
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
                    borderRadius: 1.5,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    },
                    '&.Mui-focused': {
                      transform: 'translateY(-2px)',
                      borderColor: isDarkMode ? color.teal400 : color.teal600,
                      borderWidth: 2,
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
                    borderRadius: 1.5,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    },
                    '&.Mui-focused': {
                      transform: 'translateY(-2px)',
                      borderColor: isDarkMode ? color.teal400 : color.teal600,
                      borderWidth: 2,
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