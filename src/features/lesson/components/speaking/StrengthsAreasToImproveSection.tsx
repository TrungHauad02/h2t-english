import { Box, Typography, Stack } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface StrengthsAreasToImproveSectionProps {
  strengths?: string[];
  areas_to_improve?: string[];
}

export default function StrengthsAreasToImproveSection({
  strengths,
  areas_to_improve,
}: StrengthsAreasToImproveSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 3 }}>
      {/* Strengths Section */}
      <Box
        sx={{
          p: 2,
          bgcolor: isDarkMode
            ? "rgba(52, 211, 153, 0.1)"
            : "rgba(16, 185, 129, 0.05)",
          borderRadius: 2,
          borderLeft: `4px solid ${
            isDarkMode ? color.emerald400 : color.emerald600
          }`,
          flex: 1,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            mb: 1,
            color: isDarkMode ? color.emerald300 : color.emerald700,
            fontWeight: "bold",
          }}
        >
          Strengths
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 2 }}>
          {strengths?.map((strength, index) => (
            <Typography
              component="li"
              key={index}
              variant="body2"
              sx={{
                color: isDarkMode ? color.gray300 : color.gray700,
                mb: 0.5,
              }}
            >
              {strength}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Areas to Improve Section */}
      <Box
        sx={{
          p: 2,
          bgcolor: isDarkMode
            ? "rgba(251, 191, 36, 0.1)"
            : "rgba(251, 191, 36, 0.05)",
          borderRadius: 2,
          borderLeft: `4px solid ${isDarkMode ? color.warning : color.warning}`,
          flex: 1,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            mb: 1,
            color: isDarkMode ? "rgba(251, 191, 36, 0.9)" : color.warning,
            fontWeight: "bold",
          }}
        >
          Areas to Improve
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 2 }}>
          {areas_to_improve?.map((area, index) => (
            <Typography
              component="li"
              key={index}
              variant="body2"
              sx={{
                color: isDarkMode ? color.gray300 : color.gray700,
                mb: 0.5,
              }}
            >
              {area}
            </Typography>
          ))}
        </Box>
      </Box>
    </Stack>
  );
}
