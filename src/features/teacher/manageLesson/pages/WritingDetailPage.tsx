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
import LessonPublishDialogs from "../components/PublishDialogs";
import SubjectIcon from "@mui/icons-material/Subject";
import WEFloatingNavMenu, {
  NavItem,
} from "components/pagination/WEFloatingNavMenu";
import PublishActions from "../components/PublishActions";
import useWritingDetailPage from "../hooks/useWritingDetailPage";
import {
  WritingDetailsView,
  WritingEditForm,
  WritingHeader,
  WritingParagraphSection,
  WritingTipsSection,
} from "../components/writing";

export default function WritingDetailPage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const hooks = useWritingDetailPage();

  const navItems: NavItem[] = [
    {
      id: "writing-details",
      label: "Writing Details",
      icon: <SubjectIcon fontSize="small" />,
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
          Writing not found
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
        <div id="writing-details">
          <WritingHeader
            onGoBack={hooks.handleGoBack}
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
