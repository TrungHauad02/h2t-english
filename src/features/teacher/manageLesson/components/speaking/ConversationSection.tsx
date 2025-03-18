import { Box, Divider, Paper, Typography, Grid, Button } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import ChatIcon from "@mui/icons-material/Chat";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import AddIcon from "@mui/icons-material/Add";
import SectionHeader from "../SectionHeader";
import {
  ConversationDialog,
  ConversationItem,
  useConversationSection,
} from "./conversation";

export default function ConversationSection() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const hooks = useConversationSection();

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.gray50,
      }}
    >
      <SectionHeader
        icon={<ChatIcon />}
        title="Conversation Section"
        isEditMode={hooks.isEditMode}
        handleSaveChanges={hooks.handleSaveChanges}
        handleEditMode={hooks.handleEditMode}
        handleCancelEdit={hooks.handleCancelEdit}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={hooks.handleAddNewConversation}
          sx={{
            backgroundColor: color.btnSubmitBg,
            "&:hover": {
              backgroundColor: color.btnSubmitHoverBg,
            },
          }}
        >
          Add Conversation
        </Button>
      </Box>

      {hooks.conversations.length > 0 ? (
        hooks.conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            onPlayAudio={hooks.handlePlayAudio}
            isPlaying={hooks.isPlaying}
            currentPlayingId={hooks.currentPlayingId}
            onEdit={hooks.handleEditConversation}
            onDelete={hooks.handleDeleteConversation}
          />
        ))
      ) : (
        <Typography
          align="center"
          sx={{
            py: 4,
            color: isDarkMode ? color.gray400 : color.gray500,
            fontStyle: "italic",
          }}
        >
          No conversations added yet
        </Typography>
      )}

      <Divider sx={{ my: 3 }} />

      <Box>
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            color: isDarkMode ? color.teal300 : color.teal700,
          }}
        >
          <RecordVoiceOverIcon sx={{ mr: 1 }} />
          Available Voices
        </Typography>

        <Grid container spacing={2}>
          {hooks.voices.map((voice, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: "0.5rem",
                  backgroundColor: isDarkMode ? color.gray700 : color.gray100,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: isDarkMode ? color.gray600 : color.gray200,
                  },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: isDarkMode ? color.gray200 : color.gray800 }}
                >
                  {voice.voice}
                </Typography>
                <RecordVoiceOverIcon
                  sx={{
                    color: isDarkMode ? color.teal300 : color.teal600,
                    fontSize: 20,
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Dialog for adding/editing a conversation */}
      <ConversationDialog
        open={hooks.isDialogOpen}
        onClose={hooks.handleCloseDialog}
        onSave={hooks.handleSaveConversation}
        editData={hooks.editData}
        handleInputChange={hooks.handleInputChange}
        voices={hooks.voices}
        onGenerateAudio={hooks.handleGenerateAudio}
        isGenerating={hooks.isGeneratingAudio}
      />
    </Box>
  );
}
