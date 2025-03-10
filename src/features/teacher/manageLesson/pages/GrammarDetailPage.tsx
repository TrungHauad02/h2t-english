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
import { GrammarDetailsView, GrammarHeader } from "../components/grammar";
import PublishActions from "../components/PublishActions";

export default function GrammarDetailPage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const hooks = useGrammarDetailPage();

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
      <Stack sx={{ mt: 6, mb: 6, px: { xs: 2, md: 4 } }}>
        <GrammarHeader
          onGoBack={hooks.handleGoBack}
          onEditMode={hooks.handleEditMode}
        />

        <PublishActions
          status={hooks.data.status}
          onPublish={hooks.handlePublishClick}
          onUnpublish={hooks.handleUnpublishClick}
        />

        <GrammarDetailsView data={hooks.data} />
      </Stack>
    </Container>
  );
}
