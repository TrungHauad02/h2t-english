import { useRef } from "react";
import {
  Box,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
  alpha,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import {
  ConfirmDeleteProps,
  DeleteButton,
  DestructionEffects,
  ResourceCard,
  UnlockSlider,
  useConfirmationState,
  useDestructionEffects,
  WarningIcon,
} from "./confirmDelete";

export default function WEConfirmDelete({
  open,
  title = "Delete Confirmation",
  resourceName = "this resource",
  description = "This action cannot be undone. All associated data will be permanently removed from our servers.",
  onCancel,
  onConfirm,
  isDeleting = false,
  sx,
}: ConfirmDeleteProps) {
  const colors = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const containerRef = useRef<HTMLDivElement>(null);

  // Use hooks to manage state and effects
  const { state, handleSliderChange, startCountdown } =
    useConfirmationState(open);
  const { particles, generateParticles } = useDestructionEffects();

  // Destructuring state
  const {
    animateWarning,
    unlocked,
    sliderValue,
    countdown,
    paperShredding,
    showDestructionEffect,
  } = state;

  // Handle slider change with particle effect
  const handleSliderChangeWithEffects = (
    event: Event,
    newValue: number | number[]
  ) => {
    handleSliderChange(event, newValue);

    // Generate particles when slider reaches 100%
    if ((newValue as number) >= 100) {
      generateParticles();
    }
  };

  // Handle confirm action
  const handleConfirmWithEffects = () => {
    if (!unlocked) return;
    startCountdown(onConfirm);
  };

  // Handle dialog close
  const handleClose = () => {
    if (!paperShredding) {
      onCancel();
    }
  };

  // Create destruction effects components
  const destructionEffects = DestructionEffects({
    particles,
    paperShredding,
    showDestructionEffect,
  });

  // Background and text colors based on dark mode
  const textColor = isDarkMode ? colors.gray100 : colors.gray800;
  const dialogBgColor = isDarkMode ? colors.gray900 : colors.white;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          backgroundColor: dialogBgColor,
          maxWidth: "500px",
          width: "100%",
          borderRadius: "12px",
          overflow: "visible",
          m: isMobile ? 2 : 3,
          ...sx,
        },
      }}
      fullWidth
    >
      <DialogTitle
        sx={{
          p: 2,
          color: textColor,
          fontWeight: 600,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${
            isDarkMode ? colors.gray700 : colors.gray300
          }`,
        }}
      >
        {title}
        {!paperShredding && (
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            size="small"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent sx={{ p: 0, overflow: "visible" }}>
        <Box
          sx={{
            pt: 3,
            px: 3,
            pb: 3,
            perspective: "1000px",
          }}
          ref={containerRef}
        >
          <Stack
            spacing={3}
            alignItems="center"
            sx={{
              position: "relative",
              transition: "all 0.5s ease",
              transform: paperShredding ? "rotateX(10deg)" : "rotateX(0)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Warning Icon */}
            <WarningIcon
              animateWarning={animateWarning}
              paperShredding={paperShredding}
              isDeleting={isDeleting}
              unlocked={unlocked}
            />

            {/* Resource Card */}
            <ResourceCard
              animateWarning={animateWarning}
              resourceName={resourceName}
              description={description}
              countdown={countdown}
              renderPaperShreds={destructionEffects.renderPaperShreds}
              renderDestructionParticles={
                destructionEffects.renderDestructionParticles
              }
              paperShredding={paperShredding}
            />

            {/* Unlock Slider */}
            <UnlockSlider
              animateWarning={animateWarning}
              sliderValue={sliderValue}
              onSliderChange={handleSliderChangeWithEffects}
              paperShredding={paperShredding}
              unlocked={unlocked}
            />

            {/* Delete Button */}
            <DeleteButton
              onClick={handleConfirmWithEffects}
              paperShredding={paperShredding}
              unlocked={unlocked}
            />
          </Stack>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          p: 2,
          borderTop: `1px solid ${
            isDarkMode ? colors.gray700 : colors.gray300
          }`,
        }}
      >
        <Button
          onClick={handleClose}
          disabled={paperShredding}
          sx={{
            color: isDarkMode ? colors.gray200 : colors.gray700,
            backgroundColor: isDarkMode
              ? alpha(colors.gray900, 0.4)
              : colors.gray200,
            textTransform: "none",
            px: 3,
            py: 1,
            fontWeight: 500,
            borderRadius: "6px",
            "&:hover": {
              backgroundColor: isDarkMode
                ? alpha(colors.gray200, 0.1)
                : colors.gray300,
            },
            "&.Mui-disabled": {
              opacity: 0.5,
              color: isDarkMode ? colors.gray400 : colors.gray500,
            },
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
