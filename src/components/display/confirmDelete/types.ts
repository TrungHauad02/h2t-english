import { SxProps, Theme } from "@mui/material";
export interface ConfirmDeleteProps {
  open: boolean;
  title?: string;
  resourceName?: string;
  description?: string;
  onCancel: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
  sx?: SxProps<Theme>;
}
export interface ParticleType {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
}
export interface StyleProps {
  paperShredding?: boolean;
  unlocked?: boolean;
  isDeleting?: boolean;
}
export interface ConfirmationStateType {
  animateWarning: boolean;
  unlocked: boolean;
  sliderValue: number;
  countdown: number;
  paperShredding: boolean;
  showDestructionEffect: boolean;
  hasConfirmed: boolean;
}
