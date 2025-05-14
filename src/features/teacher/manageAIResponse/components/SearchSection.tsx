import { useState, useEffect } from "react";
import { 
  Box, 
  Paper, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button,
  Typography,
  SelectChangeEvent
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AIResponseFilter } from "interfaces";

interface SearchSectionProps {
  onFilterChange: (filter: AIResponseFilter) => void;
}

export default function SearchSection({ onFilterChange }: SearchSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const [status, setStatus] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hasFilters, setHasFilters] = useState<boolean>(false);

  // Apply filter whenever any filter field changes
  useEffect(() => {
    const newFilter: AIResponseFilter = {};
    
    // Add status to filter if selected
    if (status !== "") {
      newFilter.status = status === "true";
    }
    
    // Add dates to filter if selected
    if (startDate) {
      newFilter.startCreatedAt = startDate;
    }
    
    if (endDate) {
      newFilter.endCreatedAt = endDate;
    }
    
    // Check if any filters are applied
    const filterApplied = status !== "" || startDate !== null || endDate !== null;
    setHasFilters(filterApplied);
    
    // Apply filter
    onFilterChange(newFilter);
  }, [status, startDate, endDate, onFilterChange]);

  // Handle status change
  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  // Handle reset button click
  const handleReset = () => {
    setStatus("");
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
      }}
    >
      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FilterAltIcon 
            sx={{ 
              color: isDarkMode ? color.teal300 : color.teal600,
              mr: 1
            }} 
          />
          <Typography 
            variant="h6" 
            sx={{ 
              color: isDarkMode ? color.gray200 : color.gray800,
              fontWeight: 600
            }}
          >
            Filter Responses
          </Typography>
        </Box>
        
        {hasFilters && (
          <Button
            size="small"
            variant="outlined"
            startIcon={<RestartAltIcon />}
            onClick={handleReset}
            sx={{
              borderColor: isDarkMode ? color.gray500 : color.gray400,
              color: isDarkMode ? color.gray300 : color.gray700,
              '&:hover': {
                borderColor: isDarkMode ? color.gray400 : color.gray600,
                backgroundColor: isDarkMode ? `${color.gray700}40` : `${color.gray100}`,
              },
            }}
          >
            Clear Filters
          </Button>
        )}
      </Box>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel 
                id="status-select-label"
                sx={{
                  color: isDarkMode ? color.gray300 : color.gray600,
                }}
              >
                Evaluation Status
              </InputLabel>
              <Select
                labelId="status-select-label"
                id="status-select"
                value={status}
                label="Evaluation Status"
                onChange={handleStatusChange}
                sx={{
                  backgroundColor: isDarkMode ? color.gray700 : color.gray50,
                  color: isDarkMode ? color.gray200 : color.gray800,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDarkMode ? color.gray600 : color.gray300,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDarkMode ? color.teal700 : color.teal500,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDarkMode ? color.teal600 : color.teal500,
                  },
                }}
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                <MenuItem value="true">Evaluated</MenuItem>
                <MenuItem value="false">Not Evaluated</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <DatePicker 
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              slotProps={{ 
                textField: { 
                  fullWidth: true,
                  sx: {
                    backgroundColor: isDarkMode ? color.gray700 : color.gray50,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: isDarkMode ? color.gray600 : color.gray300,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: isDarkMode ? color.teal700 : color.teal500,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: isDarkMode ? color.teal600 : color.teal500,
                    },
                    '& .MuiInputLabel-root': {
                      color: isDarkMode ? color.gray300 : color.gray600,
                    },
                    '& .MuiInputBase-input': {
                      color: isDarkMode ? color.gray200 : color.gray800,
                    },
                  }
                }
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <DatePicker 
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              slotProps={{ 
                textField: { 
                  fullWidth: true,
                  sx: {
                    backgroundColor: isDarkMode ? color.gray700 : color.gray50,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: isDarkMode ? color.gray600 : color.gray300,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: isDarkMode ? color.teal700 : color.teal500,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: isDarkMode ? color.teal600 : color.teal500,
                    },
                    '& .MuiInputLabel-root': {
                      color: isDarkMode ? color.gray300 : color.gray600,
                    },
                    '& .MuiInputBase-input': {
                      color: isDarkMode ? color.gray200 : color.gray800,
                    },
                  }
                }
              }}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>

      {hasFilters && (
        <Box 
          sx={{ 
            mt: 3, 
            pt: 2, 
            borderTop: `1px dashed ${isDarkMode ? color.gray700 : color.gray300}`,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? color.teal300 : color.teal700,
              fontWeight: 500,
            }}
          >
            Active filters:
          </Typography>
          <Box sx={{ ml: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {status && (
              <Box
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  backgroundColor: isDarkMode ? color.teal900 : color.teal100,
                  color: isDarkMode ? color.teal300 : color.teal800,
                }}
              >
                {status === "true" ? "Evaluated" : "Not Evaluated"}
              </Box>
            )}
            {startDate && (
              <Box
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  backgroundColor: isDarkMode ? color.gray800 : color.gray100,
                  color: isDarkMode ? color.gray300 : color.gray800,
                }}
              >
                From: {startDate.toLocaleDateString()}
              </Box>
            )}
            {endDate && (
              <Box
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  backgroundColor: isDarkMode ? color.gray800 : color.gray100,
                  color: isDarkMode ? color.gray300 : color.gray800,
                }}
              >
                To: {endDate.toLocaleDateString()}
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Paper>
  );
}