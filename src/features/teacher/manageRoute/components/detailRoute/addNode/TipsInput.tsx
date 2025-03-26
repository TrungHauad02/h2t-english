import {
  Box,
  TextField,
  Paper,
  Typography,
  Stack,
  Tooltip,
  IconButton,
  Chip,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

interface TipsInputProps {
  tips: string[];
  handleTipChange: (index: number, value: string) => void;
  addTip: () => void;
  removeTip: (index: number) => void;
}

export default function TipsInput({
  tips,
  handleTipChange,
  addTip,
  removeTip,
}: TipsInputProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const getTipBackgroundColor = (index: number) => {
    const colors = isDarkMode
      ? [color.gray900, color.gray800, color.gray700]
      : [color.gray100, color.gray200, color.gray300];
    return colors[index % colors.length];
  };

  return (
    <Box
      sx={{
        mt: 2,
      }}
    >
      <Typography
        sx={{
          color: isDarkMode ? color.gray100 : color.gray900,
          fontSize: { xs: "1rem", sm: "1rem" },
          textAlign: "left",
          mb: 1.5,
        }}
      >
        Tips <span style={{ color: "red" }}>*</span>
      </Typography>

      {tips.map((tip, index) => (
        <Box
          key={index}
          sx={{
            mb: 1.5,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.02)",
            },
          }}
        >
          <Paper
            elevation={2}
            sx={{
              backgroundColor: getTipBackgroundColor(index),
              borderRadius: 2,
              overflow: "hidden",
              pr: 1,
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{
                p: 1,
                pr: 0,
              }}
            >
              <TextField
                fullWidth
                variant="standard"
                label={`Tip ${index + 1}`}
                value={tip}
                onChange={(e) => handleTipChange(index, e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    fontSize: "0.9rem",
                    color: isDarkMode ? color.gray100 : color.gray900,
                  },
                }}
              />
              <Tooltip title="Remove Tip">
                <IconButton
                  onClick={() => removeTip(index)}
                  size="small"
                  sx={{
                    color: isDarkMode ? color.errorDarkMode : color.error,
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Paper>
        </Box>
      ))}

      <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
        <Tooltip title="Add New Tip">
          <Chip
            icon={<AddIcon />}
            label="Add Tip"
            onClick={addTip}
            sx={{
              backgroundColor: color.transparent,
              border: `1px solid ${isDarkMode ? color.teal400 : color.teal600}`,
              color: isDarkMode ? color.teal400 : color.teal600,
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: isDarkMode
                  ? `${color.teal400}30`
                  : `${color.teal600}30`,
              },
            }}
          />
        </Tooltip>
      </Stack>
    </Box>
  );
}
