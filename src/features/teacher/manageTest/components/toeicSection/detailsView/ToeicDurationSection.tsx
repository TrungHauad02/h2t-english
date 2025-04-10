import React from 'react';
import { 
  Box, 
  Typography 
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Toeic } from "interfaces";

interface ToeicDurationSectionProps {
  data: Toeic;
}

export default function ToeicDurationSection({
  data,
}: ToeicDurationSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const textColor = isDarkMode ? color.gray100 : color.gray900;
  const labelColor = isDarkMode ? color.gray300 : color.gray600;

  return (
    <Box
      sx={{
        bgcolor: isDarkMode ? color.gray700 : color.white,
        p: 3,
        borderRadius: 3,
        boxShadow: isDarkMode
          ? "0 4px 8px rgba(0,0,0,0.2)"
          : "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >


      {/* Duration Details */}
      <Box sx={{ px: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <AccessTimeIcon sx={{ mr: 2, color: accentColor }} />
          <Typography 
            variant="body1"
            sx={{
              color: textColor,
              fontWeight: 'medium'
            }}
          >
           Duration: <strong>{data.duration} minutes</strong>
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: labelColor,
            fontStyle: 'italic',
            lineHeight: 1.6
          }}
        >
          This TOEIC test is designed to assess your English language proficiency 
          within a structured {data.duration}-minute timeframe.
        </Typography>
      </Box>
    </Box>
  );
}