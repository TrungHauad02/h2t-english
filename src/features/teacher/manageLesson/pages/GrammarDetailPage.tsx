import {
  Stack,
  Typography,
  Container,
  Button,
  CircularProgress,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import useGrammarDetailPage from "../hooks/useGrammarDetailPage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LessonPublishDialogs from "../components/PublishDialogs";
import QuestionsSection from "../components/questionsSection/QuestionsSection";
import SubjectIcon from "@mui/icons-material/Subject";
import QuizIcon from "@mui/icons-material/Quiz";
import WEFloatingNavMenu, {
  NavItem,
} from "components/pagination/WEFloatingNavMenu";
import {
  GrammarDetailsView,
  GrammarDocumentSection,
  GrammarHeader,
} from "../components/grammar";
import PublishActions from "../components/PublishActions";
import GrammarEditForm from "../components/grammar/GrammarEditForm";

export default function GrammarDetailPage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

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
        <div id="grammar-details">
          <GrammarHeader
            onGoBack={hooks.handleGoBack}
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
