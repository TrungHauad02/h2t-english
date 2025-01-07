import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

export const useTestItemStyles = (hovered: boolean) => {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  const cardStyles = {
    maxWidth: 400,
    margin: "16px auto",
    boxShadow: hovered ? 6 : 3,
    borderRadius: 2,
    overflow: "hidden",
    transition: "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
    transform: hovered ? "scale(1.05)" : "scale(1)",
    cursor: "pointer",
    backgroundColor: isDarkMode
      ? hovered
        ? color.gray800
        : color.gray900
      : hovered
      ? color.teal50
      : color.gray50,
  };

  const cardContentStyles = {
    backgroundColor: isDarkMode
      ? hovered
        ? color.gray700
        : color.gray800
      : hovered
      ? color.teal100 + "40"
      : color.gray100,
    transition: "background-color 0.3s ease-in-out",
  };

  const typographyStyles = {
    title: {
      color: isDarkMode
        ? hovered
          ? color.teal400
          : color.teal200
        : hovered
        ? color.teal700
        : color.gray800,
      transition: "color 0.3s ease-in-out",
    },
    body: {
      color: isDarkMode ? color.gray400 : color.gray600,
    },
  };

  const buttonStyles = {
    seeHistory: {
      padding: 0,
      color: isDarkMode ? color.teal300 : color.teal700,
      borderColor: isDarkMode ? color.teal300 : color.teal700,
      textDecoration: "underline",
      borderRadius: "99rem",
      marginRight: "auto",
      ":hover": {
        bgcolor: isDarkMode
          ? hovered
            ? color.gray700
            : color.gray800
          : hovered
          ? color.teal100
          : color.gray100,
      },
    },
    doTest: {
      padding: "0.5rem 1rem",
      backgroundColor: isDarkMode ? color.teal700 : color.teal600,
      color: color.white,
      borderRadius: "0.5rem",
      transition: "0.3s ease-in-out",
      marginLeft: "auto",
      ":hover": {
        backgroundColor: isDarkMode ? color.teal600 : color.teal500,
      },
    },
  };

  return { cardStyles, cardContentStyles, typographyStyles, buttonStyles };
};
