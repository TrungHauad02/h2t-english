import { Container, Stack } from "@mui/material";
import useListeningDetailPage from "../hooks/useListeningDetailPage";
import {
  ListeningAudioSection,
  ListeningDetailsView,
  ListeningEditForm,
} from "../components/listening";
import QuestionsSection from "../components/questionsSection/QuestionsSection";
import WEFloatingNavMenu, {
  NavItem,
} from "components/pagination/WEFloatingNavMenu";
import SubjectIcon from "@mui/icons-material/Subject";
import QuizIcon from "@mui/icons-material/Quiz";
import ListenAndWriteAWordSection from "../components/listening/ListenAndWriteAWordSection";
import {
  NotFoundLesson,
  LoadingLesson,
  PublishActions,
  LessonHeader,
  PublishDialogs,
  PreparationSection,
} from "../components";

export default function ListeningDetailPage() {
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
    {
      id: "preparation-section",
      label: "Preparation Section",
      icon: <SubjectIcon fontSize="small" />,
    },
  ];

  if (hooks.loading) return <LoadingLesson />;

  if (!hooks.data) return <NotFoundLesson title="Listening not found" />;

  return (
    <Container maxWidth="lg">
      <WEFloatingNavMenu items={navItems} />

      <Stack sx={{ mt: 6, mb: 6, px: { xs: 2, md: 4 } }}>
        <div id="listening-details">
          <LessonHeader
            title="Listening Details"
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
            audio={hooks.editData ? hooks.editData.audio : hooks.data.audio}
            onAudioChange={(base64: string) =>
              hooks.handleInputChange("audio", base64)
            }
            onSave={hooks.handleSaveChanges}
          />
        </div>

        <div id="questions-section">
          <QuestionsSection
            type="listenings"
            questions={hooks.data.questions}
          />
        </div>

        <div id="preparation-section">
          <PreparationSection
            preparationId={hooks.data.preparationId}
            type="listenings"
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
