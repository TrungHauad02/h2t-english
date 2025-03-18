import { Container, Stack } from "@mui/material";
import useSpeakingDetailPage from "../hooks/useSpeakingDetailPage";
import {
  LessonHeader,
  LoadingLesson,
  NotFoundLesson,
  PreparationSection,
  PublishActions,
  PublishDialogs,
} from "../components";
import WEFloatingNavMenu, {
  NavItem,
} from "components/pagination/WEFloatingNavMenu";
import SubjectIcon from "@mui/icons-material/Subject";
import {
  ConversationSection,
  SpeakingDetailsView,
  SpeakingEditForm,
} from "../components/speaking";

export default function SpeakingDetailPage() {
  const hooks = useSpeakingDetailPage();

  const navItems: NavItem[] = [
    {
      id: "speaking-details",
      label: "Speaking Details",
      icon: <SubjectIcon fontSize="small" />,
    },
    {
      id: "conversation-section",
      label: "Conversation Section",
      icon: <SubjectIcon fontSize="small" />,
    },
    {
      id: "preparation-section",
      label: "Preparation Section",
      icon: <SubjectIcon fontSize="small" />,
    },
  ];

  if (hooks.loading) return <LoadingLesson />;

  if (!hooks.data) return <NotFoundLesson title="Speaking not found" />;

  return (
    <Container maxWidth="lg">
      <WEFloatingNavMenu items={navItems} />

      <Stack sx={{ mt: 6, mb: 6, px: { xs: 2, md: 4 } }}>
        <div id="speaking-details">
          <LessonHeader
            title="Speaking Details"
            onEditMode={hooks.handleEditMode}
          />
          <PublishActions
            status={hooks.data.status}
            onPublish={hooks.handlePublishClick}
            onUnpublish={hooks.handleUnpublishClick}
          />

          {hooks.isEditMode ? (
            <SpeakingEditForm
              editData={hooks.editData}
              handleInputChange={hooks.handleInputChange}
              onSave={hooks.handleSaveChanges}
              onCancel={hooks.handleEditMode}
            />
          ) : (
            <SpeakingDetailsView data={hooks.data} />
          )}
        </div>

        <div id="conversation-section">
          <ConversationSection />
        </div>

        <div id="preparation-section">
          <PreparationSection />
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
