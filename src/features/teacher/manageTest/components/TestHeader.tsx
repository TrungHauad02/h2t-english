import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { useNavigate } from "react-router-dom";

interface TestHeaderProps {
  title: string;
  onEditMode: () => void;
}

export default function TestHeader({ title, onEditMode }: TestHeaderProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

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
        onClick={handleGoBack}
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
        {title}
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
