import { Box, Button, Collapse, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import { BaseFilter, SeverityEnum } from "interfaces";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DateRangeIcon from "@mui/icons-material/DateRange";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface BoxFilterProps {
    filters: BaseFilter & {
        severity?: SeverityEnum | null;
        errorCode?: string;
      };
    showFilters: boolean;
    handleSeverityChange: (event: SelectChangeEvent<string>) => void;
    handleStatusChange: (event: SelectChangeEvent<string>) => void;
    handleErrorCodeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleResetFilters: () => void;
    onFilterChange: (filters: any) => void; 
}

export default function BoxFilter({
    filters,
    showFilters,
    handleSeverityChange,
    handleStatusChange,
    handleResetFilters,
    onFilterChange,
    handleErrorCodeChange
}: BoxFilterProps) {
    const color = useColor();
    const { isDarkMode } = useDarkMode();
    return (
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
                                    filters.severity !== null && filters.severity !== undefined
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
    )
}