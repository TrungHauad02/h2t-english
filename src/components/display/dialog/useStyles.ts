import { keyframes } from "@emotion/react";

const zoomIn = keyframes`
  from {
    transform: scale(0.1);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

export const useStyles = (isDarkMode: boolean, colors: any) => {
  return {
    dialogStyle: {
      backgroundColor: isDarkMode ? colors.gray800 : colors.white,
      color: isDarkMode ? colors.white : colors.black,
      padding: "20px",
      borderRadius: "8px",
      animation: `${zoomIn} 0.5s ease-out`,
      minWidth: "400px",
      maxWidth: "600px",
      margin: "auto",
    },
    titleStyle: {
      fontSize: "20px",
      fontWeight: "600",
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
      borderBottom: `1px solid ${isDarkMode ? colors.gray700 : colors.gray300}`,
      paddingBottom: "10px",
      marginBottom: "20px",
    },
    contentStyle: {
      marginBottom: "20px",
      fontSize: "14px",
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
    },
    buttonStyle: {
      margin: "0 8px",
      fontSize: "14px",
      fontWeight: "500",
      transition: "background-color 0.3s",
      padding: "8px 16px",
    },
  };
};
