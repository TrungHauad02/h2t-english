import { Typography, Box, Avatar, Tooltip } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface OwnerInfoProps {
  ownerName: string;
  hovered: boolean;
}

export default function OwnerInfo({ ownerName, hovered }: OwnerInfoProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: isDarkMode
          ? hovered
            ? color.emerald700
            : color.emerald800
          : hovered
          ? color.emerald500
          : color.emerald300,
        color: isDarkMode
          ? hovered
            ? color.white
            : color.emerald100
          : hovered
          ? color.white
          : color.emerald800,
        padding: "8px 12px",
        borderRadius: 2,
        transition:
          "background-color 0.3s ease-in-out, color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        boxShadow: hovered ? `0 4px 8px ${color.emerald500}` : "none",
      }}
    >
      <Avatar
        sx={{
          width: 32,
          height: 32,
          bgcolor: isDarkMode ? color.emerald500 : color.emerald700,
          marginRight: "10px",
        }}
      >
        <PersonIcon fontSize="medium" />
      </Avatar>
      <Tooltip title={`Owner: ${ownerName}`} arrow>
        <Typography
          variant="body2"
          fontWeight={600}
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {ownerName}
        </Typography>
      </Tooltip>
    </Box>
  );
}
