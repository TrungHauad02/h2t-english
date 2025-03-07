import {
  Stack,
  Typography,
  Container,
  Button,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import {
  QuestionsSection,
  TopicActions,
  TopicDetailsView,
  TopicEditForm,
  TopicHeader,
} from "../components/topic";
import useTopicDetailPage from "../hooks/useTopicDetailPage";
import LessonPublishDialogs from "../components/PublishDialogs";

export default function TopicDetailPage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const hooks = useTopicDetailPage();

  if (hooks.loading) {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 6, minHeight: "60vh" }}
      >
        <CircularProgress
          size={40}
          sx={{ color: isDarkMode ? color.emerald400 : color.emerald600 }}
        />
      </Stack>
    );
  }

  if (!hooks.data) {
    return (
      <Stack sx={{ mt: 6, p: 3 }}>
        <Typography
          variant="h5"
          color={isDarkMode ? color.gray100 : color.gray900}
        >
          Topic not found
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={hooks.handleGoBack}
          sx={{
            mt: 2,
            color: isDarkMode ? color.emerald400 : color.emerald600,
          }}
        >
          Go Back
        </Button>
      </Stack>
    );
  }

  return (
    <Container maxWidth="lg">
      <Stack sx={{ mt: 6, mb: 6, px: { xs: 2, md: 4 } }}>
        <TopicHeader
          onGoBack={hooks.handleGoBack}
          onEditMode={hooks.handleEditMode}
        />

        <TopicActions
          status={hooks.data.status}
          onPublish={hooks.handlePublishClick}
          onUnpublish={hooks.handleUnpublishClick}
        />

        {hooks.isEditMode ? (
          <TopicEditForm
            editData={hooks.editData}
            handleInputChange={hooks.handleInputChange}
            onSave={hooks.handleSaveChanges}
            onCancel={hooks.handleEditMode}
          />
        ) : (
          <TopicDetailsView data={hooks.data} />
        )}

        <QuestionsSection questions={hooks.data.questions} />
      </Stack>
      <LessonPublishDialogs
        openPublish={hooks.openPublishDialog}
        openUnpublish={hooks.openUnpublishDialog}
        onCancelPublish={() => hooks.setOpenPublishDialog(false)}
        onCancelUnpublish={() => hooks.setOpenUnpublishDialog(false)}
        onConfirmPublish={hooks.handlePublish}
        onConfirmUnpublish={hooks.handleUnpublish}
      />
    </Container>
  );
}
