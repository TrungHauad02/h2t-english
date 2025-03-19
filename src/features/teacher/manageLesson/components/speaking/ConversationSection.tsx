import { Box, Divider, Paper, Typography, Button } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import ChatIcon from "@mui/icons-material/Chat";
import AddIcon from "@mui/icons-material/Add";
import SectionHeader from "../SectionHeader";
import {
  ConversationDialog,
  ConversationItem,
  useConversationSection,
  AvailableVoices,
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

      {hooks.isEditMode && (
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
      )}

      {hooks.conversations.length > 0 ? (
        hooks.conversations.map((conversation, index) => (
          <ConversationItem
            key={conversation.id}
            isEditMode={hooks.isEditMode}
            conversation={conversation}
            onPlayAudio={hooks.handlePlayAudio}
            isPlaying={hooks.isPlaying}
            currentPlayingId={hooks.currentPlayingId}
            onEdit={hooks.handleEditConversation}
            onDelete={hooks.handleDeleteConversation}
            onMoveUp={index > 0 ? () => hooks.onMoveUp(index) : undefined}
            onMoveDown={
              index < hooks.conversations.length - 1
                ? () => hooks.onMoveDown(index)
                : undefined
            }
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

      <AvailableVoices voices={hooks.voices} />

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
