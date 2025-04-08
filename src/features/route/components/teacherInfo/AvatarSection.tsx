import React from "react";
import { Avatar, Box } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { User } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface AvatarSectionProps {
  teacher: User;
  levelColors: {
    primary: string;
    secondary: string;
    text: string;
  };
}

export default function AvatarSection({
  teacher,
  levelColors,
}: AvatarSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      sx={{
        position: "relative",
        height: 220,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${levelColors.primary} 0%, ${
            isDarkMode ? color.gray900 : levelColors.secondary
          } 100%)`,
          zIndex: 1,
        }}
      />

      {/* Decorative pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `radial-gradient(circle, ${color.white} 1px, transparent 1px)`,
          backgroundSize: "15px 15px",
          zIndex: 2,
        }}
      />

      {/* Avatar position - more centered and prominent */}
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          bottom: -50,
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          src={teacher.avatar}
          alt={teacher.name}
          sx={{
            width: 140,
            height: 140,
            border: `8px solid ${isDarkMode ? color.gray800 : color.white}`,
            boxShadow: `0 12px 24px rgba(0,0,0,0.3)`,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05) rotate(3deg)",
              boxShadow: `0 16px 32px rgba(0,0,0,0.4)`,
            },
          }}
        />
        {/* Added a subtle shadow effect beneath the avatar */}
        <Box
          sx={{
            width: 100,
            height: 10,
            borderRadius: "50%",
            backgroundColor: isDarkMode ? color.gray700 : color.gray300,
            opacity: 0.4,
            mt: 1,
            filter: "blur(6px)",
          }}
        />
      </Box>

      {/* Level badge in top right */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 5,
        }}
      >
        <Box
          component="div"
          sx={{
            bgcolor: levelColors.primary,
            color: levelColors.text,
            fontWeight: "bold",
            px: 1,
            py: 0.5,
            borderRadius: 1,
            border: `2px solid ${isDarkMode ? color.gray800 : color.white}`,
            boxShadow: 2,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <SchoolIcon
            style={{
              color: levelColors.text,
              fontSize: 18,
            }}
          />
          {teacher.levelEnum}
        </Box>
      </Box>
    </Box>
  );
}
