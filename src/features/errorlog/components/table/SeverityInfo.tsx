import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { alpha } from "@mui/material/styles";
import { Box } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { SeverityEnum } from "interfaces";

export const useSeverityInfo = (severity?: SeverityEnum) => {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const baseStyle = {
    width: 36,
    height: 36,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const getStyle = (mainColor: string, lightColor: string, borderColor: string, textColor: string, label: string) => ({
    bg: isDarkMode ? alpha(mainColor, 0.4) : alpha(lightColor, 0.7),
    text: isDarkMode ? lightColor : textColor,
    borderColor: isDarkMode ? borderColor : lightColor,
    label,
    color: isDarkMode ? borderColor : mainColor,
    icon: (
      <Box
        sx={{
          ...baseStyle,
          backgroundColor: isDarkMode
            ? alpha(mainColor, 0.5)
            : alpha(lightColor, 0.9),
          border: `1px solid ${isDarkMode ? borderColor : lightColor}`,
        }}
      >
        <ErrorOutlineIcon
          sx={{
            color: isDarkMode ? lightColor : textColor,
            fontSize: 20,
          }}
        />
      </Box>
    ),
    progressColor: isDarkMode ? borderColor : mainColor,
  });

  switch (severity) {
    case SeverityEnum.HIGH:
      return getStyle(color.red700, color.red100, color.red500, color.red800, "High");
    case SeverityEnum.MEDIUM:
      return getStyle(color.warningDarkMode, color.warning, color.warning, color.black, "Medium");
    case SeverityEnum.LOW:
      return getStyle(color.teal700, color.teal100, color.teal600, color.teal900, "Low");
    default:
      return getStyle(color.gray700, color.gray200, color.gray600, color.gray800, "Unknown");
  }
};
