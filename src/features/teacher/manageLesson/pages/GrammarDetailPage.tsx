import { Stack, Container } from "@mui/material";
import useGrammarDetailPage from "../hooks/useGrammarDetailPage";
import QuestionsSection from "../components/questionsSection/QuestionsSection";
import SubjectIcon from "@mui/icons-material/Subject";
import QuizIcon from "@mui/icons-material/Quiz";
import WEFloatingNavMenu, {
  NavItem,
} from "components/pagination/WEFloatingNavMenu";
import {
  GrammarDetailsView,
  GrammarDocumentSection,
  GrammarEditForm,
} from "../components/grammar";
import {
  NotFoundLesson,
  LoadingLesson,
  PublishActions,
  LessonHeader,
  PublishDialogs,
} from "../components";

export default function GrammarDetailPage() {
  const hooks = useGrammarDetailPage();

  const navItems: NavItem[] = [
    {
      id: "grammar-details",
      label: "Grammar Details",
      icon: <SubjectIcon fontSize="small" />,
    },
    {
      id: "grammar-document",
      label: "Grammar Document",
      icon: <SubjectIcon fontSize="small" />,
    },
    {
      id: "questions-section",
      label: "Questions Section",
      icon: <QuizIcon fontSize="small" />,
    },
  ];

  if (hooks.loading) return <LoadingLesson />;

  if (!hooks.data) return <NotFoundLesson title="Grammar not found" />;

  return (
    <Container maxWidth="lg">
      <WEFloatingNavMenu items={navItems} />

      <Stack sx={{ mt: 6, mb: 6, px: { xs: 2, md: 4 } }}>
        <div id="grammar-details">
          <LessonHeader
            title="Grammar Details"
            onEditMode={hooks.handleEditMode}
          />

          <PublishActions
            status={hooks.data.status}
            onPublish={hooks.handlePublishClick}
            onUnpublish={hooks.handleUnpublishClick}
          />
          {hooks.isEditMode ? (
            <GrammarEditForm
              editData={hooks.editData}
              handleInputChange={hooks.handleInputChange}
              onSave={hooks.handleSaveChanges}
              onCancel={hooks.handleEditMode}
            />
          ) : (
            <GrammarDetailsView data={hooks.data} />
          )}
        </div>
        <div id="grammar-document">
          <GrammarDocumentSection
            documentUrl={hooks.editData ? hooks.editData.file : ""}
            onDocumentChange={(base64) =>
              hooks.handleInputChange("file", base64)
            }
          />
        </div>
        <div id="questions-section">
          <QuestionsSection questions={hooks.data.questions} />
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
