import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Stack,
  Paper,
  Chip,
  Collapse,
  Zoom,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  ArrowDownward,
  ArrowUpward,
  PersonOutline,
  VolumeUp,
} from "@mui/icons-material";
import { SpeakingConversation } from "interfaces";
import { useState } from "react";
import AudioControls from "./item/AudioControls";

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
  const [expanded, setExpanded] = useState(true);

  const isCurrentlyPlaying = isPlaying && currentPlayingId === conversation.id;

  return (
    <Zoom in={true} style={{ transitionDelay: "50ms" }}>
      <Paper
        elevation={3}
        sx={{
          mb: 2,
          borderRadius: "1rem",
          overflow: "hidden",
          transition: "all 0.3s ease",
          border: `1px solid ${isDarkMode ? color.gray600 : color.gray300}`,
          backgroundColor: "transparent",
          "&:hover": {
            boxShadow: 6,
            transform: "translateY(-2px)",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            backgroundColor: isDarkMode
              ? `linear-gradient(135deg, ${color.gray800}, ${color.gray700})`
              : `linear-gradient(135deg, ${color.white}, ${color.gray50})`,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: `1px solid ${
                isDarkMode ? color.gray600 : color.gray200
              }`,
              backgroundColor: isDarkMode ? color.gray800 : color.gray50,
              cursor: "pointer",
            }}
            onClick={() => setExpanded(!expanded)}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Chip
                icon={<PersonOutline />}
                label={`#${conversation.serial}`}
                size="small"
                sx={{
                  mr: 2,
                  backgroundColor: isDarkMode ? color.teal800 : color.teal100,
                  color: isDarkMode ? color.teal200 : color.teal800,
                  fontWeight: "bold",
                  border: `1px solid ${
                    isDarkMode ? color.teal700 : color.teal300
                  }`,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: isDarkMode ? color.teal200 : color.teal800,
                  fontWeight: "bold",
                  textShadow: isDarkMode
                    ? "0px 1px 2px rgba(0,0,0,0.3)"
                    : "none",
                }}
              >
                {conversation.name}
              </Typography>

              {conversation.audioUrl && (
                <Chip
                  icon={<VolumeUp fontSize="small" />}
                  label="Audio"
                  size="small"
                  color={isCurrentlyPlaying ? "success" : "default"}
                  variant="outlined"
                  sx={{
                    ml: 2,
                    backgroundColor: isCurrentlyPlaying
                      ? isDarkMode
                        ? color.green800
                        : color.green100
                      : "transparent",
                    color: isCurrentlyPlaying
                      ? isDarkMode
                        ? color.green200
                        : color.green800
                      : isDarkMode
                      ? color.gray300
                      : color.gray600,
                  }}
                />
              )}
            </Box>

            {/* Control Actions */}
            <Stack direction="row" spacing={1}>
              {isEditMode && (
                <Stack direction="row" spacing={1}>
                  <Stack direction="column" spacing={0.5}>
                    <Tooltip title="Move up" arrow placement="top">
                      <span>
                        {" "}
                        {/* Wrapper to handle disabled state */}
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onMoveUp) onMoveUp();
                          }}
                          disabled={!onMoveUp}
                          sx={{
                            color: isDarkMode ? color.teal300 : color.teal600,
                            backgroundColor: isDarkMode
                              ? `${color.gray900}80`
                              : `${color.white}80`,
                            "&:hover": {
                              backgroundColor: isDarkMode
                                ? color.teal900
                                : color.teal50,
                            },
                            "&.Mui-disabled": {
                              color: isDarkMode ? color.gray500 : color.gray400,
                            },
                            width: 28,
                            height: 28,
                          }}
                        >
                          <ArrowUpward fontSize="small" />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Move down" arrow placement="bottom">
                      <span>
                        {" "}
                        {/* Wrapper to handle disabled state */}
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onMoveDown) onMoveDown();
                          }}
                          disabled={!onMoveDown}
                          sx={{
                            color: isDarkMode ? color.teal300 : color.teal600,
                            backgroundColor: isDarkMode
                              ? `${color.gray900}80`
                              : `${color.white}80`,
                            "&:hover": {
                              backgroundColor: isDarkMode
                                ? color.teal900
                                : color.teal50,
                            },
                            "&.Mui-disabled": {
                              color: isDarkMode ? color.gray500 : color.gray400,
                            },
                            width: 28,
                            height: 28,
                          }}
                        >
                          <ArrowDownward fontSize="small" />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Stack>
                  <Tooltip title="Edit conversation" arrow>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(conversation);
                      }}
                      sx={{
                        color: isDarkMode ? color.teal300 : color.teal600,
                        backgroundColor: isDarkMode
                          ? `${color.gray900}80`
                          : `${color.white}80`,
                        "&:hover": {
                          backgroundColor: isDarkMode
                            ? color.teal900
                            : color.teal50,
                        },
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete conversation" arrow>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(conversation.id);
                      }}
                      sx={{
                        color: isDarkMode ? color.red400 : color.red500,
                        backgroundColor: isDarkMode
                          ? `${color.gray900}80`
                          : `${color.white}80`,
                        "&:hover": {
                          backgroundColor: isDarkMode
                            ? color.red900
                            : color.red100,
                          color: isDarkMode ? color.red300 : color.red600,
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              )}
            </Stack>
          </Box>

          {/* Content */}
          <Collapse in={expanded} timeout="auto">
            <Box sx={{ p: 0 }}>
              {/* Content area */}
              <Box
                sx={{
                  p: 3,
                  backgroundColor: isDarkMode ? color.gray900 : color.white,
                  position: "relative",
                  borderRadius: "0.5rem",
                  m: 2,
                  boxShadow: isDarkMode
                    ? "inset 0 2px 8px rgba(0,0,0,0.2)"
                    : "inset 0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: isDarkMode ? color.gray200 : color.gray800,
                    lineHeight: 1.6,
                    fontFamily: "'Roboto', sans-serif",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {conversation.content}
                </Typography>
              </Box>

              {/* Audio player */}
              {conversation.audioUrl && (
                <Box sx={{ p: 2, pt: 0 }}>
                  <AudioControls
                    audioUrl={conversation.audioUrl}
                    isPlaying={isCurrentlyPlaying}
                    onPlayPause={() =>
                      onPlayAudio(conversation.audioUrl, conversation.id)
                    }
                  />
                </Box>
              )}
            </Box>
          </Collapse>
        </Box>
      </Paper>
    </Zoom>
  );
}
