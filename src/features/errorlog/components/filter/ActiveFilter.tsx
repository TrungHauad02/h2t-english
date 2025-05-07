import { Box, Chip, Stack, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { SeverityEnum, BaseFilter } from "interfaces";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { formatDateShort } from "utils/format";

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

  const handleDeleteFilter = (filterName: string) => {
    if (filterName === "status") {
      onFilterChange({ status: null });
    } else if (filterName === "severity") {
      onFilterChange({ severity: null });
    } else if (filterName === "errorCode") {
      onFilterChange({ errorCode: "" });
    } else if (filterName === "startCreatedAt") {
      onFilterChange({ startCreatedAt: null });
    } else if (filterName === "endCreatedAt") {
      onFilterChange({ endCreatedAt: null });
    }
  };

  const getStatusLabel = (status: boolean | null) => {
    if (status === null) return "";
    return status ? "Unresolved" : "Resolved";
  };

  const getSeverityLabel = (severity: SeverityEnum | null) => {
    if (severity === null) return "";
    return severity.toString();
  };

  const getChipColor = (filterName: string, value: any) => {
    if (filterName === "severity") {
      if (value === SeverityEnum.HIGH) {
        return {
          bg: isDarkMode ? color.red700 : color.red100,
          text: isDarkMode ? color.white : color.red900,
        };
      } else if (value === SeverityEnum.MEDIUM) {
        return {
          bg: isDarkMode ? color.warning : color.warning,
          text: color.black,
          opacity: isDarkMode ? 0.9 : 0.7,
        };
      } else if (value === SeverityEnum.LOW) {
        return {
          bg: isDarkMode ? color.teal700 : color.teal100,
          text: isDarkMode ? color.white : color.teal900,
        };
      }
    } else if (filterName === "status") {
      return {
        bg: isDarkMode
          ? value
            ? color.teal700
            : color.gray600
          : value
          ? color.teal100
          : color.gray300,
        text: isDarkMode ? color.white : value ? color.teal900 : color.gray800,
      };
    }

    return {
      bg: isDarkMode ? color.gray700 : color.gray200,
      text: isDarkMode ? color.gray300 : color.gray700,
    };
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="body2"
        sx={{
          mb: 1,
          fontWeight: 500,
          color: isDarkMode ? color.gray300 : color.gray600,
        }}
      >
        Active Filters:
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
        {filters.status !== null && filters.status !== undefined && (
          <Chip
            label={`Status: ${getStatusLabel(filters.status)}`}
            sx={{
              borderRadius: "1rem",
              backgroundColor: getChipColor("status", filters.status).bg,
              color: getChipColor("status", filters.status).text,
              opacity: getChipColor("status", filters.status).opacity,
              fontWeight: 500,
              "& .MuiChip-deleteIcon": {
                color: isDarkMode ? color.gray300 : color.gray600,
                "&:hover": {
                  color: isDarkMode ? color.gray100 : color.gray800,
                },
              },
            }}
            onDelete={() => handleDeleteFilter("status")}
            deleteIcon={<CancelIcon />}
          />
        )}

        {filters.severity !== null && filters.severity !== undefined && (
          <Chip
            label={`Severity: ${getSeverityLabel(filters.severity)}`}
            sx={{
              borderRadius: "1rem",
              backgroundColor: getChipColor("severity", filters.severity).bg,
              color: getChipColor("severity", filters.severity).text,
              opacity: getChipColor("severity", filters.severity).opacity,
              fontWeight: 500,
              "& .MuiChip-deleteIcon": {
                color: isDarkMode ? color.gray300 : color.gray600,
                "&:hover": {
                  color: isDarkMode ? color.gray100 : color.gray800,
                },
              },
            }}
            onDelete={() => handleDeleteFilter("severity")}
            deleteIcon={<CancelIcon />}
          />
        )}

        {filters.errorCode && (
          <Chip
            label={`Error Code: ${filters.errorCode}`}
            sx={{
              borderRadius: "1rem",
              backgroundColor: isDarkMode ? color.gray700 : color.gray200,
              color: isDarkMode ? color.gray300 : color.gray700,
              fontWeight: 500,
              "& .MuiChip-deleteIcon": {
                color: isDarkMode ? color.gray300 : color.gray600,
                "&:hover": {
                  color: isDarkMode ? color.gray100 : color.gray800,
                },
              },
            }}
            onDelete={() => handleDeleteFilter("errorCode")}
            deleteIcon={<CancelIcon />}
          />
        )}

        {filters.startCreatedAt && (
          <Chip
            label={`From: ${formatDateShort(filters.startCreatedAt)}`}
            sx={{
              borderRadius: "1rem",
              backgroundColor: isDarkMode ? color.gray700 : color.gray200,
              color: isDarkMode ? color.gray300 : color.gray700,
              fontWeight: 500,
              "& .MuiChip-deleteIcon": {
                color: isDarkMode ? color.gray300 : color.gray600,
                "&:hover": {
                  color: isDarkMode ? color.gray100 : color.gray800,
                },
              },
            }}
            onDelete={() => handleDeleteFilter("startCreatedAt")}
            deleteIcon={<CancelIcon />}
          />
        )}

        {filters.endCreatedAt && (
          <Chip
            label={`To: ${formatDateShort(filters.endCreatedAt)}`}
            sx={{
              borderRadius: "1rem",
              backgroundColor: isDarkMode ? color.gray700 : color.gray200,
              color: isDarkMode ? color.gray300 : color.gray700,
              fontWeight: 500,
              "& .MuiChip-deleteIcon": {
                color: isDarkMode ? color.gray300 : color.gray600,
                "&:hover": {
                  color: isDarkMode ? color.gray100 : color.gray800,
                },
              },
            }}
            onDelete={() => handleDeleteFilter("endCreatedAt")}
            deleteIcon={<CancelIcon />}
          />
        )}
      </Stack>
    </Box>
  );
}
