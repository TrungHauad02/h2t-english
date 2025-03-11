import {
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import useListeningDetailPage from "../hooks/useListeningDetailPage";
import {
  ListeningAudioSection,
  ListeningDetailsView,
  ListeningEditForm,
  ListeningHeader,
} from "../components/listening";
import PublishActions from "../components/PublishActions";
import LessonPublishDialogs from "../components/PublishDialogs";
import QuestionsSection from "../components/questionsSection/QuestionsSection";
import WEFloatingNavMenu, {
  NavItem,
} from "components/pagination/WEFloatingNavMenu";
import SubjectIcon from "@mui/icons-material/Subject";
import QuizIcon from "@mui/icons-material/Quiz";
import ListenAndWriteAWordSection from "../components/listening/ListenAndWriteAWordSection";

export default function ListeningDetailPage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const hooks = useListeningDetailPage();

  const navItems: NavItem[] = [
    {
      id: "listening-details",
      label: "Listening Details",
      icon: <SubjectIcon fontSize="small" />,
    },
    {
      id: "listen-and-write-a-word",
      label: "Listen And Write A Word",
      icon: <QuizIcon fontSize="small" />,
    },
    {
      id: "listening-audio",
      label: "Listening Audio",
      icon: <SubjectIcon fontSize="small" />,
    },
    {
      id: "questions-section",
      label: "Questions Section",
      icon: <QuizIcon fontSize="small" />,
    },
  ];

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
          Listening not found
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
      <WEFloatingNavMenu items={navItems} />

      <Stack sx={{ mt: 6, mb: 6, px: { xs: 2, md: 4 } }}>
        <div id="listening-details">
          <ListeningHeader
            onGoBack={hooks.handleGoBack}
            onEditMode={hooks.handleEditMode}
          />

          <PublishActions
            status={hooks.data.status}
            onPublish={hooks.handlePublishClick}
            onUnpublish={hooks.handleUnpublishClick}
          />

          {hooks.isEditMode ? (
            <ListeningEditForm
              editData={hooks.editData}
              handleInputChange={hooks.handleInputChange}
              onSave={hooks.handleSaveChanges}
              onCancel={hooks.handleEditMode}
            />
          ) : (
            <ListeningDetailsView data={hooks.data} />
          )}
        </div>

        <div id="listen-and-write-a-word">
          <ListenAndWriteAWordSection />
        </div>

        <div id="listening-audio">
          <ListeningAudioSection
            audio={hooks.data.audio}
            onAudioChange={(base64: string) =>
              hooks.handleInputChange("audio", base64)
            }
            onSave={hooks.handleSaveChanges}
          />
        </div>

        <div id="questions-section">
          <QuestionsSection questions={hooks.data.questions} />
        </div>
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
