import {
  Box,
  Typography,
  Button,
  TextField,
  Tooltip,
  IconButton,
  Stack,
  Card,
  Zoom,
  Fade,
  Paper,
  alpha,
} from "@mui/material";
import useColor from "theme/useColor";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Grammar } from "interfaces";
import { useDarkMode } from "hooks/useDarkMode";
import { useState } from "react";

interface TipsEditModeProps {
  editData: Grammar | null;
  handleTipChange: (index: number, value: string) => void;
  handleRemoveTip: (index: number) => void;
  handleAddTip: () => void;
  accentColor: string;
  cardBg: string;
}

export default function TipsEditMode({
  editData,
  handleTipChange,
  handleRemoveTip,
  handleAddTip,
  accentColor,
  cardBg,
}: TipsEditModeProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getGradientBg = () => {
    return isDarkMode
      ? `linear-gradient(145deg, ${color.gray800}, ${alpha(
          color.teal900,
          0.7
        )})`
      : `linear-gradient(145deg, ${color.gray100}, ${alpha(
          color.teal100,
          0.7
        )})`;
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "1rem",
        background: getGradientBg(),
      }}
    >
      <Stack spacing={3} sx={{ mt: 2 }}>
        {editData?.tips.map((tip, index) => (
          <Fade
            key={index}
            in={true}
            timeout={300}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            <Card
              elevation={hoveredIndex === index ? 4 : 2}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              sx={{
                p: 2.5,
                backgroundColor: isDarkMode ? alpha(cardBg, 0.8) : cardBg,
                borderRadius: "1rem",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                transform:
                  hoveredIndex === index ? "translateY(-4px)" : "translateY(0)",
                borderLeft: `4px solid ${
                  isDarkMode ? color.teal600 : color.teal400
                }`,
                position: "relative",
                overflow: "visible",
              }}
            >
              <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                <Box
                  sx={{
                    position: "absolute",
                    top: -14,
                    left: 16,
                    backgroundColor: isDarkMode ? color.teal600 : color.teal500,
                    px: 2,
                    py: 0.7,
                    borderRadius: "1rem",
                    boxShadow: `0 4px 12px ${alpha(
                      isDarkMode ? color.black : color.teal500,
                      0.25
                    )}`,
                    zIndex: 1,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      color: color.white,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      fontSize: "0.7rem",
                    }}
                  >
                    Tip {index + 1}
                  </Typography>
                </Box>
              </Zoom>

              <Box sx={{ pt: 1.5 }}>
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  placeholder="Enter a helpful tip for learners..."
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: isDarkMode
                        ? alpha(color.gray600, 0.7)
                        : alpha(color.white, 0.9),
                      borderRadius: "0.75rem",
                      fontFamily: "'Roboto', sans-serif",
                      boxShadow:
                        hoveredIndex === index
                          ? `0 0 0 2px ${
                              isDarkMode ? color.teal600 : color.teal400
                            }`
                          : "none",
                      "& fieldset": {
                        borderColor: isDarkMode ? color.gray500 : color.gray300,
                        transition: "all 0.2s ease",
                      },
                      "&:hover fieldset": {
                        borderColor: accentColor,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: accentColor,
                        borderWidth: "2px",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: accentColor,
                    },
                    "& .MuiInputBase-input": {
                      color: isDarkMode ? color.gray100 : color.gray800,
                    },
                    transition: "all 0.3s ease",
                  }}
                  value={tip}
                  onChange={(e) => handleTipChange(index, e.target.value)}
                />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Tooltip
                  title="Remove this tip"
                  placement="top"
                  arrow
                  TransitionComponent={Zoom}
                >
                  <IconButton
                    onClick={() => handleRemoveTip(index)}
                    size="small"
                    sx={{
                      backgroundColor: isDarkMode
                        ? alpha(color.red700, 0.9)
                        : alpha(color.red100, 0.9),
                      color: isDarkMode ? color.red100 : color.red700,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: isDarkMode
                          ? color.red700
                          : color.red200,
                        transform: "scale(1.05)",
                      },
                      width: 36,
                      height: 36,
                    }}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Card>
          </Fade>
        ))}
      </Stack>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleAddTip}
          sx={{
            backgroundColor: isDarkMode ? color.teal700 : color.teal500,
            color: color.white,
            fontWeight: 600,
            borderRadius: "2rem",
            px: 4,
            py: 1.2,
            boxShadow: `0 4px 14px ${alpha(
              isDarkMode ? color.black : color.teal500,
              0.3
            )}`,
            "&:hover": {
              backgroundColor: isDarkMode ? color.teal600 : color.teal600,
              boxShadow: `0 6px 20px ${alpha(
                isDarkMode ? color.black : color.teal500,
                0.4
              )}`,
              transform: "translateY(-2px)",
            },
            "&:active": {
              transform: "translateY(0)",
            },
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            textTransform: "none",
            fontSize: "0.95rem",
            letterSpacing: 0.5,
          }}
        >
          Add New Tip
        </Button>
      </Box>
    </Paper>
  );
}
