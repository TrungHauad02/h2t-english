import { Box, Typography, Chip } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface ActiveFiltersDisplayProps {
  nameFilter: string;
  setNameFilter: (value: string) => void;
  emailFilter: string;
  setEmailFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  startCreatedAt: Date | null;
  setStartCreatedAt: (value: Date | null) => void;
  endCreatedAt: Date | null;
  setEndCreatedAt: (value: Date | null) => void;
}

export default function ActiveFiltersDisplay({
  nameFilter,
  setNameFilter,
  emailFilter,
  setEmailFilter,
  statusFilter,
  setStatusFilter,
  startCreatedAt,
  setStartCreatedAt,
  endCreatedAt,
  setEndCreatedAt,
}: ActiveFiltersDisplayProps) {
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
      <Typography variant="body2" sx={{ fontWeight: "medium", mt: 0.5 }}>
        Active filters:
      </Typography>

      {nameFilter && (
        <Chip
          label={`Name: ${nameFilter}`}
          size="small"
          onDelete={() => setNameFilter("")}
          sx={{
            bgcolor: isDarkMode ? color.teal900 : color.teal50,
            color: isDarkMode ? color.teal200 : color.teal800,
            borderColor: isDarkMode ? color.teal700 : color.teal200,
            "& .MuiChip-deleteIcon": {
              color: isDarkMode ? color.teal400 : color.teal600,
              "&:hover": {
                color: isDarkMode ? color.teal300 : color.teal700,
              },
            },
          }}
        />
      )}

      {emailFilter && (
        <Chip
          label={`Email: ${emailFilter}`}
          size="small"
          onDelete={() => setEmailFilter("")}
          sx={{
            bgcolor: isDarkMode ? color.teal900 : color.teal50,
            color: isDarkMode ? color.teal200 : color.teal800,
            borderColor: isDarkMode ? color.teal700 : color.teal200,
            "& .MuiChip-deleteIcon": {
              color: isDarkMode ? color.teal400 : color.teal600,
              "&:hover": {
                color: isDarkMode ? color.teal300 : color.teal700,
              },
            },
          }}
        />
      )}

      {statusFilter && (
        <Chip
          label={`Status: ${statusFilter === "active" ? "Active" : "Inactive"}`}
          size="small"
          onDelete={() => setStatusFilter("")}
          sx={{
            bgcolor: isDarkMode ? color.teal900 : color.teal50,
            color: isDarkMode ? color.teal200 : color.teal800,
            borderColor: isDarkMode ? color.teal700 : color.teal200,
            "& .MuiChip-deleteIcon": {
              color: isDarkMode ? color.teal400 : color.teal600,
              "&:hover": {
                color: isDarkMode ? color.teal300 : color.teal700,
              },
            },
          }}
        />
      )}

      {startCreatedAt && (
        <Chip
          label={`From: ${startCreatedAt.toLocaleDateString()}`}
          size="small"
          onDelete={() => setStartCreatedAt(null)}
          sx={{
            bgcolor: isDarkMode ? color.teal900 : color.teal50,
            color: isDarkMode ? color.teal200 : color.teal800,
            borderColor: isDarkMode ? color.teal700 : color.teal200,
            "& .MuiChip-deleteIcon": {
              color: isDarkMode ? color.teal400 : color.teal600,
              "&:hover": {
                color: isDarkMode ? color.teal300 : color.teal700,
              },
            },
          }}
        />
      )}

      {endCreatedAt && (
        <Chip
          label={`To: ${endCreatedAt.toLocaleDateString()}`}
          size="small"
          onDelete={() => setEndCreatedAt(null)}
          sx={{
            bgcolor: isDarkMode ? color.teal900 : color.teal50,
            color: isDarkMode ? color.teal200 : color.teal800,
            borderColor: isDarkMode ? color.teal700 : color.teal200,
            "& .MuiChip-deleteIcon": {
              color: isDarkMode ? color.teal400 : color.teal600,
              "&:hover": {
                color: isDarkMode ? color.teal300 : color.teal700,
              },
            },
          }}
        />
      )}
    </Box>
  );
}
