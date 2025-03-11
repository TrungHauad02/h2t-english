import {
  Stack,
  Typography,
  Container,
  Button,
  CircularProgress,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LessonPublishDialogs from "../components/PublishDialogs";
import QuestionsSection from "../components/questionsSection/QuestionsSection";
import SubjectIcon from "@mui/icons-material/Subject";
import QuizIcon from "@mui/icons-material/Quiz";
import useReadingDetailPage from "../hooks/useReadingDetailPage";
import PublishActions from "../components/PublishActions";
import {
  ReadingDetailsView,
  ReadingDocumentSection,
  ReadingEditForm,
  ReadingHeader,
} from "../components/reading";
import WEFloatingNavMenu, {
  NavItem,
} from "components/pagination/WEFloatingNavMenu";

export default function ReadingDetailPage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const hooks = useReadingDetailPage();

  const navItems: NavItem[] = [
    {
      id: "reading-details",
      label: "Reading Details",
      icon: <SubjectIcon fontSize="small" />,
    },
    {
      id: "reading-document",
      label: "Reading Document",
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
          Grammar not found
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
        <div id="reading-details">
          <ReadingHeader
            onGoBack={hooks.handleGoBack}
            onEditMode={hooks.handleEditMode}
          />
          <PublishActions
            status={hooks.data.status}
            onPublish={hooks.handlePublishClick}
            onUnpublish={hooks.handleUnpublishClick}
          />
          {hooks.isEditMode ? (
            <ReadingEditForm
              editData={hooks.editData}
              handleInputChange={hooks.handleInputChange}
              onSave={hooks.handleSaveChanges}
              onCancel={hooks.handleEditMode}
            />
          ) : (
            <ReadingDetailsView data={hooks.data} />
          )}
        </div>
        <div id="reading-document">
          <ReadingDocumentSection
            documentUrl={hooks.data.file}
            onDocumentChange={(base64: string) => {
              hooks.handleInputChange("file", base64);
            }}
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
