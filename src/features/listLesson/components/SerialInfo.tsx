import { Typography, Box } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface SerialInfoProps {
  serial: string;
  hovered: boolean;
}

export default function SerialInfo({ serial, hovered }: SerialInfoProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: isDarkMode
          ? hovered
            ? color.teal600
            : color.teal800
          : hovered
          ? color.teal400
          : color.teal200,
        color: isDarkMode
          ? hovered
            ? color.white
            : color.teal300
          : hovered
          ? color.white
          : color.teal700,
        padding: "4px 8px",
        borderRadius: 1,
        transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
      }}
    >
      <InfoIcon fontSize="small" sx={{ marginRight: "4px" }} />
      <Typography variant="caption" fontWeight={500}>
        Serial: {serial}
      </Typography>
    </Box>
  );
}
