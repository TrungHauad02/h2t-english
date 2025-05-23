import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface PageHeaderProps {
  onGoBack: () => void;
  onEditMode: () => void;
}

export default function PageHeader({ onGoBack, onEditMode }: PageHeaderProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
      }}
    >
      <IconButton
        onClick={onGoBack}
        sx={{
          color: isDarkMode ? color.gray100 : color.gray900,
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          color: isDarkMode ? color.gray100 : color.gray900,
          flex: 1,
          textAlign: "center",
        }}
      >
        Route Details
      </Typography>
      <IconButton
        onClick={onEditMode}
        sx={{
          color: isDarkMode ? color.emerald400 : color.emerald600,
        }}
      >
        <EditIcon />
      </IconButton>
    </Box>
  );
}
