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
import { useStyles } from "../hooks/useStyles";

interface WEDialogProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onCancel: () => void;
  onOk: () => void;
  sx?: SxProps<Theme>;
  disableButtons?: boolean;
}

const Transition = React.forwardRef<
  unknown,
  SlideProps & { children: React.ReactElement }
>(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function WEDialog({
  open,
  title,
  children,
  onCancel,
  onOk,
  sx,
  disableButtons = false,
}: WEDialogProps) {
  const colors = useColor();
  const { isDarkMode } = useDarkMode();
  const styles = useStyles(isDarkMode, colors);

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      PaperProps={{ sx: { ...styles.dialogStyle, ...sx } }}
      TransitionComponent={Transition}
    >
      <DialogTitle sx={styles.titleStyle}>{title}</DialogTitle>
      <DialogContent sx={styles.contentStyle}>{children}</DialogContent>
      <DialogActions sx={{ justifyContent: "flex-end" }}>
        <Button
          onClick={onCancel}
          sx={{
            ...styles.buttonStyle,
            color: isDarkMode ? colors.gray200 : colors.gray700,
            backgroundColor: isDarkMode
              ? `${colors.gray900}40`
              : colors.gray200,
            "&:hover": {
              backgroundColor: isDarkMode
                ? `${colors.gray200}40`
                : colors.gray400,
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onOk}
          sx={{
            ...styles.buttonStyle,
            color: colors.black,
            backgroundColor: colors.teal400,
            "&:hover": {
              backgroundColor: isDarkMode ? colors.teal200 : colors.teal600,
            },
          }}
          disabled={disableButtons}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
