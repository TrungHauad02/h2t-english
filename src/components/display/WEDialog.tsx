import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  SxProps,
  Theme,
  Slide,
  SlideProps,
} from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { keyframes } from "@emotion/react";

interface WEDialogProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onCancel: () => void;
  onOk: () => void;
  sx?: SxProps<Theme>;
}

const Transition = React.forwardRef(function Transition(
  props: SlideProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  const { in: open } = props;
  return <Slide direction={open ? "down" : "up"} ref={ref} {...props} />;
});

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

export default function WEDialog({
  open,
  title,
  children,
  onCancel,
  onOk,
  sx,
}: WEDialogProps) {
  const colors = useColor();
  const { isDarkMode } = useDarkMode();

  const dialogStyle = {
    backgroundColor: isDarkMode ? colors.gray800 : colors.white,
    color: isDarkMode ? colors.white : colors.black,
    padding: "20px",
    borderRadius: "8px",
    animation: `${zoomIn} 0.5s ease-out`,
    ...sx,
  };

  const buttonStyle = {
    margin: "0 8px",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  };

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      PaperProps={{ sx: dialogStyle }}
      TransitionComponent={Transition}
    >
      <DialogTitle
        style={{
          fontSize: "22px",
          fontWeight: "bold",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent
        style={{
          marginBottom: "20px",
          fontSize: "16px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {children}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onCancel}
          style={{
            ...buttonStyle,
            color: isDarkMode ? colors.gray200 : colors.gray700,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = isDarkMode
              ? colors.gray200 + "40"
              : colors.gray200)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          Cancel
        </Button>
        <Button
          onClick={onOk}
          style={{ ...buttonStyle, color: colors.green }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = isDarkMode
              ? colors.green300 + "40"
              : colors.green200 + "60")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
