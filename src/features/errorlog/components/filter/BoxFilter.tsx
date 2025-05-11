import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Grid,
  Collapse,
  Stack,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import { SeverityEnum, BaseFilter } from "interfaces";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { WEDateField } from "components/input";

interface BoxFilterProps {
  filters: BaseFilter & {
    severity?: SeverityEnum | null;
    errorCode?: string;
  };
  showFilters: boolean;
  handleSeverityChange: (event: SelectChangeEvent<string>) => void;
  handleStatusChange: (event: SelectChangeEvent<string>) => void;
  handleResetFilters: () => void;
  handleErrorCodeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterChange: (filters: any) => void;
}

export default function BoxFilter({
  filters,
  showFilters,
  handleSeverityChange,
  handleStatusChange,
  handleResetFilters,
  handleErrorCodeChange,
  onFilterChange,
}: BoxFilterProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const handleDateChange = (
    field: "startCreatedAt" | "endCreatedAt",
    date: Date | null
  ) => {
    onFilterChange({ [field]: date });
  };

  const inputFieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "0.75rem",
      backgroundColor: isDarkMode ? color.gray600 : color.white,
      borderColor: isDarkMode ? color.gray500 : color.gray300,
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
  };

  const dateFieldStyle = {
    width: "100%",
    marginBottom: 0,
    "& .MuiOutlinedInput-root": {
      borderRadius: "0.75rem",
      backgroundColor: isDarkMode ? color.gray600 : color.white,
      borderColor: isDarkMode ? color.gray500 : color.gray300,
      color: isDarkMode ? color.gray200 : color.gray800,
      marginBottom: "0 !important",
      height: "40px",
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: isDarkMode ? color.teal600 : color.teal400,
        borderWidth: "1px",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: isDarkMode ? color.teal500 : color.teal500,
        borderWidth: "2px",
      },
    },
    "& .MuiFormLabel-root": {
      fontSize: "0.875rem",
      color: isDarkMode ? color.gray400 : color.gray600,
      transform: "translate(14px, -9px) scale(0.75)",
      "&.Mui-focused": {
        color: isDarkMode ? color.teal400 : color.teal600,
      },
    },
    "& .MuiStack-root": {
      marginBottom: 0,
    },
    "& .MuiTypography-root": {
      display: "none",
    },
  };

  return (
    <Collapse in={showFilters} timeout="auto">
      <Box
        sx={{
          p: 3,
          mb: 3,
          borderRadius: "1rem",
          backgroundColor: isDarkMode ? color.gray700 : color.gray100,
          boxShadow: isDarkMode
            ? "0 4px 12px rgba(0, 0, 0, 0.2)"
            : "0 4px 12px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              sx={{
                color: isDarkMode ? color.teal300 : color.teal700,
                mb: 2,
                fontWeight: 600,
              }}
            >
              Filter Options
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl
              fullWidth
              variant="outlined"
              size="small"
              sx={inputFieldStyle}
            >
              <InputLabel id="severity-filter-label">Severity</InputLabel>
              <Select
                labelId="severity-filter-label"
                id="severity-filter"
                value={filters.severity || "all"}
                label="Severity"
                onChange={handleSeverityChange}
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
                <MenuItem value="all">All Severities</MenuItem>
                <MenuItem value={SeverityEnum.LOW}>Low</MenuItem>
                <MenuItem value={SeverityEnum.MEDIUM}>Medium</MenuItem>
                <MenuItem value={SeverityEnum.HIGH}>High</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl
              fullWidth
              variant="outlined"
              size="small"
              sx={inputFieldStyle}
            >
              <InputLabel id="status-filter-label">Status</InputLabel>
              <Select
                labelId="status-filter-label"
                id="status-filter"
                value={
                  filters.status === undefined || filters.status === null
                    ? "all"
                    : filters.status
                    ? "true"
                    : "false"
                }
                label="Status"
                onChange={handleStatusChange}
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
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="true">Unresolved</MenuItem>
                <MenuItem value="false">Resolved</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              id="error-code-filter"
              label="Error Code"
              variant="outlined"
              value={filters.errorCode || ""}
              onChange={handleErrorCodeChange}
              sx={inputFieldStyle}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button
                variant="contained"
                onClick={handleResetFilters}
                sx={{
                  borderRadius: "0.75rem",
                  textTransform: "none",
                  backgroundColor: isDarkMode ? color.gray500 : color.gray300,
                  color: isDarkMode ? color.white : color.gray900,
                  height: "40px",
                  "&:hover": {
                    backgroundColor: isDarkMode ? color.gray600 : color.gray400,
                  },
                }}
              >
                Reset Filters
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              variant="outlined"
              size="small"
              sx={{ position: "relative" }}
            >
              <InputLabel
                htmlFor="start-date-filter"
                sx={{
                  position: "absolute",
                  top: "-1px",
                  left: "10px",
                  backgroundColor: color.transparent,
                  padding: "0 4px",
                  fontSize: "0.75rem",
                  color: isDarkMode ? color.gray400 : color.gray600,
                  transform: "none",
                  "&.Mui-focused": {
                    color: isDarkMode ? color.teal400 : color.teal600,
                  },
                }}
              >
                Start Date
              </InputLabel>
              <WEDateField
                label=""
                value={filters.startCreatedAt || null}
                onChange={(date) => handleDateChange("startCreatedAt", date)}
                name="startCreatedAt"
                placeholder="Select start date"
                sx={dateFieldStyle}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              variant="outlined"
              size="small"
              sx={{ position: "relative" }}
            >
              <InputLabel
                htmlFor="end-date-filter"
                sx={{
                  position: "absolute",
                  top: "-1px",
                  left: "10px",
                  backgroundColor: color.transparent,
                  padding: "0 4px",
                  fontSize: "0.75rem",
                  color: isDarkMode ? color.gray400 : color.gray600,
                  transform: "none",
                  "&.Mui-focused": {
                    color: isDarkMode ? color.teal400 : color.teal600,
                  },
                }}
              >
                End Date
              </InputLabel>
              <WEDateField
                label=""
                value={filters.endCreatedAt || null}
                onChange={(date) => handleDateChange("endCreatedAt", date)}
                name="endCreatedAt"
                placeholder="Select end date"
                sx={dateFieldStyle}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Collapse>
  );
}
