import {
  Paper,
  Box,
  Typography,
  IconButton,
  Chip,
  Tooltip,
  Grid,
  Stack,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import SentenceDisplay from "./SentenceDisplay";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { ListenAndWriteAWord } from "interfaces";

interface ExerciseItemProps {
  item: ListenAndWriteAWord;
  isEditMode: boolean;
  onEdit: (item: ListenAndWriteAWord) => void;
  onDelete: (id: number) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export default function ExerciseItem({
  item,
  isEditMode,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
}: ExerciseItemProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();

  const textColor = isDarkMode ? color.gray100 : color.gray900;
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const cardBgColor = isDarkMode ? color.gray800 : color.white;
  const borderColor = isDarkMode ? color.gray700 : color.gray200;

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        borderRadius: 3,
        backgroundColor: cardBgColor,
        borderColor: borderColor,
        position: "relative",
        boxShadow: isDarkMode
          ? "0px 4px 12px rgba(0, 0, 0, 0.4)"
          : "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Stack spacing={2}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack spacing={2}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 1,
              }}
            >
              <Chip
                label={`Question ${item.serial}`}
                sx={{
                  bgcolor: isDarkMode ? color.teal700 : color.teal100,
                  color: isDarkMode ? color.white : color.teal800,
                  fontWeight: "bold",
                  borderRadius: 1.5,
                }}
              />
              <Chip
                icon={item.status ? <CheckCircleIcon /> : <CancelIcon />}
                label={item.status ? "Active" : "Inactive"}
                color={item.status ? "success" : "error"}
                size="small"
                sx={{
                  bgcolor: item.status
                    ? isDarkMode
                      ? color.emerald700
                      : color.emerald600
                    : isDarkMode
                    ? color.red700
                    : color.red600,
                  color: color.white,
                  "& .MuiChip-icon": {
                    color: color.white,
                  },
                }}
              />
            </Box>

            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                Original Sentence
              </Typography>
              <SentenceDisplay
                sentence={item.sentence}
                missingIndex={item.missingIndex}
                correctAnswer={item.correctAnswer}
                showBlank={true}
                highlightBgColor={
                  theme.palette.mode === "dark" ? color.gray700 : color.gray100
                }
              />
            </Box>

            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                Complete Sentence
              </Typography>
              <SentenceDisplay
                sentence={item.sentence}
                missingIndex={item.missingIndex}
                correctAnswer={item.correctAnswer}
                highlightBgColor={
                  theme.palette.mode === "dark" ? color.gray700 : color.gray100
                }
              />
            </Box>
          </Stack>
          {isEditMode && (
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={1}
              alignItems={"flex-start"}
            >
              <Tooltip title="Move Up">
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveUp();
                  }}
                >
                  <ArrowUpward
                    fontSize="small"
                    sx={{
                      color: accentColor,
                      transition: "color 0.2s ease",
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Move Down">
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveDown();
                  }}
                >
                  <ArrowDownward
                    fontSize="small"
                    sx={{
                      color: accentColor,
                      transition: "color 0.2s ease",
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton
                  onClick={() => onEdit(item)}
                  sx={{
                    color: accentColor,
                    "&:hover": { color: theme.palette.primary.main },
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  onClick={() => onDelete(item.id)}
                  sx={{
                    color: isDarkMode ? color.red400 : color.red600,
                    "&:hover": { color: theme.palette.error.main },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          )}
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" color={textColor} gutterBottom>
              Missing Word:
            </Typography>
            <Chip
              label={item.correctAnswer}
              sx={{
                bgcolor: color.emerald100,
                color: theme.palette.getContrastText(color.emerald100),
                fontWeight: 500,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color={textColor} gutterBottom>
              Audio:
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <audio controls src={item.audio} style={{ width: "100%" }} />
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
}
