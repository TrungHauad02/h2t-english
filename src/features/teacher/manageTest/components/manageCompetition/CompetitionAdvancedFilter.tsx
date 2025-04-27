import React from "react";
import { 
  Stack, 
  Typography, 
  TextField, 
  Box, 
  FormControl, 
  InputLabel, 
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

interface CompetitionFilter {
  status: boolean | null;
  title: string;
  sortBy: string;
  startDate?: string;
  endDate?: string;
  startCreatedAt?: Date;
  endCreatedAt?: Date;
  startUpdatedAt?: Date;
  endUpdatedAt?: Date;
}

interface CompetitionAdvancedFilterProps {
  filter: CompetitionFilter;
  updateFilter: (updates: Partial<CompetitionFilter>) => void;
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
    updateFilter({ sortBy: event.target.value });
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
              <SortIcon color="primary" />
              <Typography variant="subtitle1" fontWeight="bold">
                Sort Options
              </Typography>
            </Box>

            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="sort-label">Sort By</InputLabel>
              <Select
                labelId="sort-label"
                value={filter.sortBy}
                onChange={handleSortChange}
                label="Sort By"
                sx={{
                  backgroundColor: getInputBackground(),
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: getBorderColor(),
                  },
                }}
              >
                <MenuItem value="-createdAt">Newest First</MenuItem>
                <MenuItem value="createdAt">Oldest First</MenuItem>
                <MenuItem value="-startTime">Start Date (Latest)</MenuItem>
                <MenuItem value="startTime">Start Date (Earliest)</MenuItem>
                <MenuItem value="-endTime">End Date (Latest)</MenuItem>
                <MenuItem value="endTime">End Date (Earliest)</MenuItem>
                <MenuItem value="title">Title (A-Z)</MenuItem>
                <MenuItem value="-title">Title (Z-A)</MenuItem>
              </Select>
            </FormControl>
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
                value={filter.startDate ? new Date(filter.startDate) : null}
                onChange={(date) => {
                  updateFilter({
                    startDate: date ? date.toISOString() : undefined,
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
                value={filter.endDate ? new Date(filter.endDate) : null}
                onChange={(date) => {
                  updateFilter({
                    endDate: date ? date.toISOString() : undefined,
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