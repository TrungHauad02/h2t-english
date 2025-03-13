import { Stack, Container } from "@mui/material";
import SubjectIcon from "@mui/icons-material/Subject";
import WEFloatingNavMenu, {
  NavItem,
} from "components/pagination/WEFloatingNavMenu";
import useWritingDetailPage from "../hooks/useWritingDetailPage";
import {
  WritingDetailsView,
  WritingEditForm,
  WritingParagraphSection,
  WritingTipsSection,
} from "../components/writing";
import {
  NotFoundLesson,
  LoadingLesson,
  PublishActions,
  LessonHeader,
  PublishDialogs,
} from "../components";

export default function WritingDetailPage() {
  const hooks = useWritingDetailPage();

  const navItems: NavItem[] = [
    {
      id: "writing-details",
      label: "Writing Details",
      icon: <SubjectIcon fontSize="small" />,
    },
  ];

  if (hooks.loading) return <LoadingLesson />;

  if (!hooks.data) return <NotFoundLesson title="Writing not found" />;

  return (
    <Container maxWidth="lg">
      <WEFloatingNavMenu items={navItems} />
      <Stack sx={{ mt: 6, mb: 6, px: { xs: 2, md: 4 } }}>
        <div id="writing-details">
          <LessonHeader
            title="Writing Details"
            onEditMode={hooks.handleEditMode}
          />

          <PublishActions
            status={hooks.data.status}
            onPublish={hooks.handlePublishClick}
            onUnpublish={hooks.handleUnpublishClick}
          />

          {hooks.isEditMode ? (
            <WritingEditForm
              editData={hooks.editData}
              handleInputChange={hooks.handleInputChange}
              onSave={hooks.handleSaveChanges}
              onCancel={hooks.handleEditMode}
            />
          ) : (
            <WritingDetailsView data={hooks.data} />
          )}

          <WritingTipsSection
            editData={hooks.editData}
            handleInputChange={hooks.handleInputChange}
            onSave={hooks.handleSaveChanges}
          />

          <WritingParagraphSection
            editData={hooks.editData}
            handleInputChange={hooks.handleInputChange}
            onSave={hooks.handleSaveChanges}
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
