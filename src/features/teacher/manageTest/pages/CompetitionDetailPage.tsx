import { useMemo } from "react";
import { Stack, Container, Box, Fade } from "@mui/material";

import SubjectIcon from "@mui/icons-material/Subject";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import MicIcon from "@mui/icons-material/Mic";
import CreateIcon from "@mui/icons-material/Create";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WEFloatingNavMenu from "components/pagination/WEFloatingNavMenu";
import { NotFoundTest, LoadingTest, PublishDialogs } from "../components";
import { TestPartTypeEnum, CompetitionTest } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

import {
  ReadingSection,
  ListeningSection,
  SpeakingSection,
  WritingSection,
  CompetitionDetailsSection,
  VocabularySection,
  GrammarSection
} from "../components/testSection";
import useCompetitionDetailPage from "../hooks/useCompetitionDetailPage";

export default function CompetitionDetailPage() {
  const hooks = useCompetitionDetailPage();
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const navItems = useMemo(() => {
    const items = [
      {
        id: "competition-details",
        label: "Competition Details",
        icon: <EmojiEventsIcon fontSize="small" />,
      }
    ];

    // Always show all sections for competition test
    items.push(
      { id: "vocabulary-section", label: "Vocabulary", icon: <SpellcheckIcon fontSize="small" /> },
      { id: "grammar-section", label: "Grammar", icon: <GTranslateIcon fontSize="small" /> },
      { id: "reading-section", label: "Reading", icon: <SubjectIcon fontSize="small" /> },
      { id: "listening-section", label: "Listening", icon: <HeadphonesIcon fontSize="small" /> },
      { id: "speaking-section", label: "Speaking", icon: <MicIcon fontSize="small" /> },
      { id: "writing-section", label: "Writing", icon: <CreateIcon fontSize="small" /> }
    );

    return items;
  }, [hooks.data]);

  if (hooks.loading) return <LoadingTest />;
  if (!hooks.data) return <NotFoundTest title="Competition not found" />;

  // Find specific part based on test part type
  const vocabularyPart = hooks.testParts.find(part => part.type === TestPartTypeEnum.VOCABULARY);
  const grammarPart = hooks.testParts.find(part => part.type === TestPartTypeEnum.GRAMMAR);
  const readingPart = hooks.testParts.find(part => part.type === TestPartTypeEnum.READING);
  const listeningPart = hooks.testParts.find(part => part.type === TestPartTypeEnum.LISTENING);
  const speakingPart = hooks.testParts.find(part => part.type === TestPartTypeEnum.SPEAKING);
  const writingPart = hooks.testParts.find(part => part.type === TestPartTypeEnum.WRITING);

  // Calculate background color based on dark mode
  const bgColor = isDarkMode ? color.gray900 : color.gray50;

  return (
    <Box 
      sx={{ 
        backgroundColor: bgColor,
        minHeight: '100vh',
        pb: 10,
        transition: 'background-color 0.3s ease'
      }}
    >
      <Container maxWidth="lg">
        <WEFloatingNavMenu items={navItems} />

        <Fade in={true} timeout={800}>
          <Stack spacing={4} sx={{ mt: 6, mb: 6, px: { xs: 2, md: 0 } }}>
            <CompetitionDetailsSection 
              testData={hooks.data}
              isEditMode={hooks.isEditMode}
              editData={hooks.editData as CompetitionTest}
              handleEditMode={hooks.handleEditMode}
              handleInputChange={hooks.handleInputChange}
              handleSaveChanges={hooks.handleSaveChanges}
              handlePublishClick={hooks.handlePublishClick}
              handleUnpublishClick={hooks.handleUnpublishClick}
            />
            
            {/* Display sections for all test parts */}
            {vocabularyPart && (
              <VocabularySection 
                partId={vocabularyPart.id}
                questionIds={vocabularyPart.questions || []}
              />
            )}
            
            {grammarPart && (
              <GrammarSection 
                partId={grammarPart.id}
                questionIds={grammarPart.questions || []}
              />
            )}
            
            {readingPart && (
              <ReadingSection 
                partId={readingPart.id}
                testItemIds={readingPart.questions || []}
              />
            )}
            
            {listeningPart && (
              <ListeningSection 
                partId={listeningPart.id}
                testItemIds={listeningPart.questions || []}
              />
            )}

            {speakingPart && (
              <SpeakingSection 
                partId={speakingPart.id}
                testItemIds={speakingPart.questions || []}
              />
            )}
            
            {writingPart && (
              <WritingSection 
                partId={writingPart.id}
                testItemIds={writingPart.questions || []}
              />
            )}
          </Stack>
        </Fade>
        
        <PublishDialogs
          openPublish={hooks.openPublishDialog}
          openUnpublish={hooks.openUnpublishDialog}
          onCancelPublish={() => hooks.setOpenPublishDialog(false)}
          onCancelUnpublish={() => hooks.setOpenUnpublishDialog(false)}
          onConfirmPublish={hooks.handlePublish}
          onConfirmUnpublish={hooks.handleUnpublish}
          title="Competition Test"
        />
      </Container>
    </Box>
  );
}