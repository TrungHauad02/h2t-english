import {
  Box,
  Typography,
  Grid,
  IconButton,
  Tooltip,
  Stack,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { SpeakingConversation } from "interfaces";

interface ConversationItemProps {
  isEditMode: boolean;
  conversation: SpeakingConversation;
  onPlayAudio: (audioUrl: string, id: number) => void;
  isPlaying: boolean;
  currentPlayingId: number | null;
  onEdit: (conversation: SpeakingConversation) => void;
  onDelete: (id: number) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

export default function ConversationItem({
  isEditMode,
  conversation,
  onPlayAudio,
  isPlaying,
  currentPlayingId,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
}: ConversationItemProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      sx={{
        mb: 2,
        p: 2,
        borderRadius: "0.5rem",
        backgroundColor: isDarkMode ? color.gray700 : color.gray100,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={10} sx={{ height: "100%" }}>
          <Typography
            variant="h6"
            sx={{ color: isDarkMode ? color.teal300 : color.teal700, mb: 1 }}
          >
            {conversation.name} #{conversation.serial}
          </Typography>
        </Grid>
        {isEditMode && (
          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Stack direction="column" spacing={0.5}>
                <Tooltip title="Move up" arrow placement="top">
                  <IconButton
                    size="small"
                    onClick={onMoveUp}
                    disabled={!onMoveUp}
                    sx={{
                      color: isDarkMode ? color.teal300 : color.teal600,
                      backgroundColor: isDarkMode ? color.gray800 : color.white,
                      "&:hover": {
                        backgroundColor: isDarkMode
                          ? color.teal800
                          : color.teal100,
                      },
                      "&.Mui-disabled": {
                        color: isDarkMode ? color.gray500 : color.gray400,
                      },
                    }}
                  >
                    <ArrowUpward fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Move down" arrow placement="bottom">
                  <IconButton
                    size="small"
                    onClick={onMoveDown}
                    disabled={!onMoveDown}
                    sx={{
                      color: isDarkMode ? color.teal300 : color.teal600,
                      backgroundColor: isDarkMode ? color.gray800 : color.white,
                      "&:hover": {
                        backgroundColor: isDarkMode
                          ? color.teal800
                          : color.teal100,
                      },
                      "&.Mui-disabled": {
                        color: isDarkMode ? color.gray500 : color.gray400,
                      },
                    }}
                  >
                    <ArrowDownward fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
              <IconButton
                size="small"
                onClick={() => onEdit(conversation)}
                sx={{ color: isDarkMode ? color.teal300 : color.teal600 }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => onDelete(conversation.id)}
                sx={{ color: isDarkMode ? color.red400 : color.red500 }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography
            variant="body1"
            sx={{
              p: 2,
              borderRadius: "0.5rem",
              backgroundColor: isDarkMode ? color.gray800 : color.white,
              color: isDarkMode ? color.gray200 : color.gray800,
            }}
          >
            {conversation.content}
          </Typography>
        </Grid>
        {conversation.audioUrl && (
          <Grid item xs={12} sx={{ mt: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1,
                borderRadius: "0.5rem",
                backgroundColor: isDarkMode ? color.gray800 : color.white,
              }}
            >
              <IconButton
                onClick={() =>
                  onPlayAudio(conversation.audioUrl as string, conversation.id)
                }
                sx={{
                  color: isDarkMode ? color.teal300 : color.teal600,
                  backgroundColor: isDarkMode ? color.gray700 : color.gray200,
                  "&:hover": {
                    backgroundColor: isDarkMode ? color.gray900 : color.gray300,
                  },
                  mr: 2,
                }}
              >
                {isPlaying && currentPlayingId === conversation.id ? (
                  <PauseIcon />
                ) : (
                  <PlayArrowIcon />
                )}
              </IconButton>
              <Typography
                variant="body2"
                sx={{ color: isDarkMode ? color.gray300 : color.gray600 }}
              >
                Audio available
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
