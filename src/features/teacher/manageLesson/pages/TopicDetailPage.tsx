import { Stack, Container } from "@mui/material";
import {
  TopicDetailsView,
  TopicEditForm,
  VocabularySection,
} from "../components/topic";
import useTopicDetailPage from "../hooks/useTopicDetailPage";
import QuestionsSection from "../components/questionsSection/QuestionsSection";
import SubjectIcon from "@mui/icons-material/Subject";
import QuizIcon from "@mui/icons-material/Quiz";
import WEFloatingNavMenu, {
  NavItem,
} from "components/pagination/WEFloatingNavMenu";
import {
  NotFoundLesson,
  LoadingLesson,
  PublishActions,
  LessonHeader,
  PublishDialogs,
} from "../components";

export default function TopicDetailPage() {
  const hooks = useTopicDetailPage();

  const navItems: NavItem[] = [
    {
      id: "topic-details",
      label: "Topic Details",
      icon: <SubjectIcon fontSize="small" />,
    },
    {
      id: "vocabulary-section",
      label: "Vocabulary Section",
      icon: <SubjectIcon fontSize="small" />,
    },
    {
      id: "questions-section",
      label: "Questions Section",
      icon: <QuizIcon fontSize="small" />,
    },
  ];

  if (hooks.loading) return <LoadingLesson />;

  if (!hooks.data) return <NotFoundLesson title="Topic not found" />;

  return (
    <Container maxWidth="lg">
      <WEFloatingNavMenu items={navItems} />

      <Stack sx={{ mt: 6, mb: 6, px: { xs: 2, md: 4 } }}>
        <div id="topic-details">
          <LessonHeader
            title="Topic Details"
            onEditMode={hooks.handleEditMode}
          />

          <PublishActions
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
        </div>
        <div id="vocabulary-section">
          <VocabularySection />
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
