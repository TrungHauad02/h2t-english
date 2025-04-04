import { Stack, Container } from "@mui/material";
import QuestionsSection from "../components/questionsSection/QuestionsSection";
import SubjectIcon from "@mui/icons-material/Subject";
import QuizIcon from "@mui/icons-material/Quiz";
import useReadingDetailPage from "../hooks/useReadingDetailPage";
import {
  ReadingDetailsView,
  ReadingDocumentSection,
  ReadingEditForm,
} from "../components/reading";
import WEFloatingNavMenu, {
  NavItem,
} from "components/pagination/WEFloatingNavMenu";
import {
  NotFoundLesson,
  LoadingLesson,
  PublishActions,
  LessonHeader,
  PublishDialogs,
  PreparationSection,
} from "../components";

export default function ReadingDetailPage() {
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
    {
      id: "preparation-section",
      label: "Preparation Section",
      icon: <SubjectIcon fontSize="small" />,
    },
  ];

  if (hooks.loading) return <LoadingLesson />;

  if (!hooks.data) return <NotFoundLesson title="Reading not found" />;

  return (
    <Container maxWidth="lg">
      <WEFloatingNavMenu items={navItems} />

      <Stack sx={{ mt: 6, mb: 6, px: { xs: 2, md: 4 } }}>
        <div id="reading-details">
          <LessonHeader
            title="Reading Details"
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
            documentUrl={hooks.editData ? hooks.editData.file : ""}
            onDocumentChange={(base64: string) => {
              hooks.handleInputChange("file", base64);
            }}
          />
        </div>
        <div id="questions-section">
          <QuestionsSection type="readings" questions={hooks.data.questions} />
        </div>

        <div id="preparation-section">
          <PreparationSection
            preparationId={hooks.data.preparationId}
            type="readings"
          />
        </div>
      </Stack>
      <PublishDialogs
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
