import { Stack, Container } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import SubjectIcon from "@mui/icons-material/Subject";
import WEFloatingNavMenu, {
  NavItem,
} from "components/pagination/WEFloatingNavMenu";
import useWritingDetailPage from "../hooks/useWritingDetailPage";
import {
  WritingDetailsView,
  WritingDocumentSection,
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
  PreparationSection,
} from "../components";

export default function WritingDetailPage() {
  const hooks = useWritingDetailPage();

  const navItems: NavItem[] = [
    {
      id: "writing-details",
      label: "Writing Details",
      icon: <SubjectIcon fontSize="small" />,
    },
    {
      id: "writing-tips",
      label: "Writing Tips",
      icon: <LightbulbIcon fontSize="small" />,
    },
    {
      id: "writing-document",
      label: "Writing Document",
      icon: <DescriptionIcon fontSize="small" />,
    },
    {
      id: "writing-paragraph",
      label: "Writing Paragraph",
      icon: <DescriptionIcon fontSize="small" />,
    },
    {
      id: "preparation-section",
      label: "Preparation Section",
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
        </div>

        <div id="writing-tips">
          <WritingTipsSection
            editData={hooks.editData}
            handleInputChange={hooks.handleInputChange}
            onSave={hooks.handleSaveChanges}
          />
        </div>

        <div id="writing-document">
          <WritingDocumentSection
            documentUrl={hooks.editData ? hooks.editData.file : hooks.data.file}
            handleSaveFile={hooks.handleSaveFile}
          />
        </div>
        <div id="writing-paragraph">
          <WritingParagraphSection editData={hooks.editData} />
        </div>

        <div id="preparation-section">
          <PreparationSection
            preparationId={hooks.data.preparationId}
            type="writings"
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
