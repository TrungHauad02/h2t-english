import {
  Box,
  Typography,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  Switch,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { useState } from "react";
import { SpeakingConversation, Voice } from "interfaces";
import { WEDialog } from "components/display";
import { WETextField } from "components/input";

interface ConversationDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  editData: SpeakingConversation;
  handleInputChange: (field: keyof SpeakingConversation, value: any) => void;
  voices: Voice[];
  onGenerateAudio: (text: string, voice: string) => void;
  isGenerating: boolean;
}

export default function ConversationDialog({
  open,
  onClose,
  onSave,
  editData,
  handleInputChange,
  voices,
  onGenerateAudio,
  isGenerating,
}: ConversationDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [selectedVoice, setSelectedVoice] = useState<string>(
    voices.length > 0 ? voices[0].voice : ""
  );

  return (
    <WEDialog
      open={open}
      onCancel={onClose}
      onOk={onSave}
      title={editData.id ? "Edit Conversation" : "Add New Conversation"}
      sx={{
        width: { xs: "95%", sm: "80%" },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <WETextField
            required
            label="Conversation Name"
            type="text"
            value={editData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <WETextField
            required
            label="Serial Number"
            type="number"
            value={editData.serial}
            onChange={(e) =>
              handleInputChange("serial", parseInt(e.target.value))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <WETextField
            required
            label="Conversation Content"
            type="text"
            value={editData.content}
            onChange={(e) => handleInputChange("content", e.target.value)}
            multiline={true}
            rows={4}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: { xs: "0.75rem", sm: "1rem" },
                width: "100%",
                paddingLeft: "1rem",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: `1px solid ${color.gray400}`,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: `2px solid ${
                    isDarkMode ? color.emerald400 : color.emerald500
                  }`,
                },
                fontSize: "1rem",
                marginBottom: "1rem",
              },
            }}
          />
        </Grid>
        <Grid item xs={8}>
          <Box
            sx={{
              p: 2,
              borderRadius: "0.5rem",
              backgroundColor: isDarkMode ? color.gray700 : color.gray100,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                color: isDarkMode ? color.teal300 : color.teal700,
                mb: 1,
              }}
            >
              Select Voice
            </Typography>
            <List dense sx={{ maxHeight: "150px", overflow: "auto" }}>
              {voices.map((voice, index) => (
                <ListItem
                  key={index}
                  sx={{
                    borderRadius: "0.25rem",
                    mb: 0.5,
                    bgcolor:
                      selectedVoice === voice.voice
                        ? isDarkMode
                          ? color.teal900
                          : color.teal100
                        : "transparent",
                    "&:hover": {
                      backgroundColor: isDarkMode
                        ? color.gray800
                        : color.gray200,
                    },
                  }}
                  onClick={() => setSelectedVoice(voice.voice)}
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{
                          color: isDarkMode ? color.gray200 : color.gray800,
                        }}
                      >
                        {voice.voice}
                      </Typography>
                    }
                  />
                  <RecordVoiceOverIcon
                    sx={{
                      fontSize: 16,
                      color: isDarkMode ? color.teal300 : color.teal600,
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            disabled={isGenerating || !editData.content || !selectedVoice}
            onClick={() => onGenerateAudio(editData.content, selectedVoice)}
            startIcon={
              isGenerating ? (
                <CircularProgress size={20} />
              ) : (
                <RecordVoiceOverIcon />
              )
            }
            sx={{
              backgroundColor: isDarkMode
                ? color.btnSubmitBg
                : color.btnSubmitBg,
              "&:hover": {
                backgroundColor: isDarkMode
                  ? color.btnSubmitHoverBg
                  : color.btnSubmitHoverBg,
              },
              "&.Mui-disabled": {
                backgroundColor: isDarkMode ? color.gray700 : color.gray300,
                color: isDarkMode ? color.gray500 : color.gray500,
              },
              mb: 1,
            }}
          >
            {isGenerating ? "Generating..." : "Generate Audio"}
          </Button>

          <FormControlLabel
            control={
              <Switch
                checked={editData.status}
                onChange={(e) => handleInputChange("status", e.target.checked)}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: color.teal500,
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: color.teal300,
                  },
                }}
              />
            }
            label={
              <Typography
                variant="body2"
                sx={{ color: isDarkMode ? color.gray300 : color.gray600 }}
              >
                Active
              </Typography>
            }
          />
        </Grid>
      </Grid>
    </WEDialog>
  );
}
