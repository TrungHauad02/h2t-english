import { Box, Chip, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { BaseFilter, SeverityEnum } from "interfaces";
import useColor from "theme/useColor";

interface ActiveFilterProps {
    filters: BaseFilter & {
        severity?: SeverityEnum | null;
        errorCode?: string;
    };
    onFilterChange: (filters: any) => void;
}

export default function ActiveFilter({
    filters,
    onFilterChange,
}: ActiveFilterProps) {
    const color = useColor();
    const { isDarkMode } = useDarkMode();
    return (
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
                    label={`Severity: ${filters.severity === SeverityEnum.HIGH
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
    )
}