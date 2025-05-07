import {
  Paper,
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Box,
  Fade,
} from "@mui/material";
import { Search, Clear, Refresh } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { LevelsEnum } from "interfaces";

interface FilterSectionProps {
  showFilters: boolean;
  nameFilter: string;
  setNameFilter: (value: string) => void;
  emailFilter: string;
  setEmailFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  roleFilter: string;
  setRoleFilter: (value: string) => void;
  levelFilter: string;
  setLevelFilter: (value: string) => void;
  startCreatedAt: Date | null;
  setStartCreatedAt: (value: Date | null) => void;
  endCreatedAt: Date | null;
  setEndCreatedAt: (value: Date | null) => void;
  filter: {
    sortBy?: string;
    [key: string]: any;
  };
  handleSortChange: (e: any) => void;
  handleResetFilters: () => void;
  handleApplyFilters: () => void;
}

export default function FilterSection({
  showFilters,
  nameFilter,
  setNameFilter,
  emailFilter,
  setEmailFilter,
  statusFilter,
  setStatusFilter,
  roleFilter,
  setRoleFilter,
  levelFilter,
  setLevelFilter,
  startCreatedAt,
  setStartCreatedAt,
  endCreatedAt,
  setEndCreatedAt,
  filter,
  handleSortChange,
  handleResetFilters,
  handleApplyFilters,
}: FilterSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Fade in={showFilters}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: "1rem",
          bgcolor: isDarkMode ? color.gray800 : color.white,
          display: showFilters ? "block" : "none",
          mb: 2,
          boxShadow: isDarkMode
            ? "0 8px 32px rgba(0,0,0,0.4)"
            : "0 8px 24px rgba(0,0,0,0.1)",
          border: `1px solid ${isDarkMode ? color.teal900 : color.teal50}`,
        }}
      >
        <Grid container spacing={2.5}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Teacher Name"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
                endAdornment: nameFilter ? (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setNameFilter("")} size="small">
                      <Clear fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: isDarkMode ? color.teal600 : color.teal400,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: isDarkMode ? color.teal500 : color.teal600,
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: isDarkMode ? color.teal400 : color.teal700,
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Email"
              value={emailFilter}
              onChange={(e) => setEmailFilter(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
                endAdornment: emailFilter ? (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setEmailFilter("")} size="small">
                      <Clear fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: isDarkMode ? color.teal600 : color.teal400,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: isDarkMode ? color.teal500 : color.teal600,
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: isDarkMode ? color.teal400 : color.teal700,
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    "&:hover": {
                      borderColor: isDarkMode ? color.teal600 : color.teal400,
                    },
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: isDarkMode ? color.teal500 : color.teal600,
                  },
                }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="role-select-label">Teacher Type</InputLabel>
              <Select
                labelId="role-select-label"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                label="Teacher Type"
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    "&:hover": {
                      borderColor: isDarkMode ? color.teal600 : color.teal400,
                    },
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: isDarkMode ? color.teal500 : color.teal600,
                  },
                }}
              >
                <MenuItem value="all">All Teachers</MenuItem>
                <MenuItem value="teacher">Regular Teachers</MenuItem>
                <MenuItem value="teacher_advance">Advanced Teachers</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="level-select-label">Academic Level</InputLabel>
              <Select
                labelId="level-select-label"
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                label="Academic Level"
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    "&:hover": {
                      borderColor: isDarkMode ? color.teal600 : color.teal400,
                    },
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: isDarkMode ? color.teal500 : color.teal600,
                  },
                }}
              >
                <MenuItem value="">All Levels</MenuItem>
                <MenuItem value={LevelsEnum.BACHELOR}>Bachelor</MenuItem>
                <MenuItem value={LevelsEnum.MASTER}>Master</MenuItem>
                <MenuItem value={LevelsEnum.DOCTOR}>Doctor</MenuItem>
                <MenuItem value={LevelsEnum.PROFESSOR}>Professor</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="sort-select-label">Sort By</InputLabel>
              <Select
                labelId="sort-select-label"
                value={filter.sortBy}
                onChange={handleSortChange}
                label="Sort By"
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    "&:hover": {
                      borderColor: isDarkMode ? color.teal600 : color.teal400,
                    },
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: isDarkMode ? color.teal500 : color.teal600,
                  },
                }}
              >
                <MenuItem value="-createdAt">Newest First</MenuItem>
                <MenuItem value="createdAt">Oldest First</MenuItem>
                <MenuItem value="-updatedAt">Last Updated</MenuItem>
                <MenuItem value="updatedAt">First Updated</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <DatePicker
              label="Created From"
              value={startCreatedAt}
              onChange={(newValue) => setStartCreatedAt(newValue)}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: isDarkMode ? color.teal600 : color.teal400,
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: isDarkMode ? color.teal500 : color.teal600,
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: isDarkMode ? color.teal400 : color.teal700,
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <DatePicker
              label="Created To"
              value={endCreatedAt}
              onChange={(newValue) => setEndCreatedAt(newValue)}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: isDarkMode ? color.teal600 : color.teal400,
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: isDarkMode ? color.teal500 : color.teal600,
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: isDarkMode ? color.teal400 : color.teal700,
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "flex-end",
                mt: 1,
              }}
            >
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={handleResetFilters}
                sx={{
                  borderColor: isDarkMode ? color.gray500 : color.gray400,
                  color: isDarkMode ? color.gray300 : color.gray600,
                  "&:hover": {
                    borderColor: isDarkMode ? color.gray400 : color.gray500,
                    bgcolor: isDarkMode
                      ? "rgba(107, 114, 128, 0.1)"
                      : "rgba(107, 114, 128, 0.1)",
                  },
                  transition: "all 0.2s ease",
                  borderRadius: "8px",
                  padding: "8px 16px",
                }}
              >
                Reset Filters
              </Button>

              <Button
                variant="contained"
                startIcon={<Search />}
                onClick={handleApplyFilters}
                sx={{
                  bgcolor: isDarkMode ? color.teal700 : color.teal600,
                  transition: "all 0.2s ease",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  boxShadow: isDarkMode
                    ? "0 4px 12px rgba(20, 184, 166, 0.3)"
                    : "0 4px 12px rgba(20, 184, 166, 0.2)",
                  "&:hover": {
                    boxShadow: isDarkMode
                      ? "0 6px 16px rgba(20, 184, 166, 0.4)"
                      : "0 6px 16px rgba(20, 184, 166, 0.3)",
                    bgcolor: isDarkMode ? color.teal600 : color.teal500,
                  },
                }}
              >
                Apply Filters
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Fade>
  );
}
