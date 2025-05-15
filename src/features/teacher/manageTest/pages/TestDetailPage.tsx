import { useMemo } from "react";
import { Stack, Container, Box, Fade } from "@mui/material";

import SubjectIcon from "@mui/icons-material/Subject";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import MicIcon from "@mui/icons-material/Mic";
import CreateIcon from "@mui/icons-material/Create";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import WEFloatingNavMenu from "components/pagination/WEFloatingNavMenu";
import { NotFoundTest, LoadingTest, PublishDialogs } from "../components";
import { TestTypeEnum, TestPartTypeEnum, Test } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

import {
  ReadingSection,
  ListeningSection,
  SpeakingSection,
  WritingSection,
  TestDetailsSection,
  VocabularySection,
  GrammarSection
} from "../components/testSection";
import useTestDetailPage from "../hooks/useTestDetailPage";

export default function TestDetailPage() {
  const hooks = useTestDetailPage();
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const navItems = useMemo(() => {
    const items = [
      {
        id: "test-details",
        label: "Test Details",
        icon: <SubjectIcon fontSize="small" />,
      }
    ];

    if (hooks.data && hooks.data.type) {
      // For mixing tests, always show all sections
      if (hooks.data.type === TestTypeEnum.MIXING) {
        items.push(
          { id: "vocabulary-section", label: "Vocabulary", icon: <SpellcheckIcon fontSize="small" /> },
          { id: "grammar-section", label: "Grammar", icon: <GTranslateIcon fontSize="small" /> },
          { id: "reading-section", label: "Reading", icon: <SubjectIcon fontSize="small" /> },
          { id: "listening-section", label: "Listening", icon: <HeadphonesIcon fontSize="small" /> },
          { id: "speaking-section", label: "Speaking", icon: <MicIcon fontSize="small" /> },
          { id: "writing-section", label: "Writing", icon: <CreateIcon fontSize="small" /> }
        );
      } else {
        // For specific test types, only show the corresponding section
        const sectionIcon = getTestTypeIcon(hooks.data.type);
        items.push({
          id: `${hooks.data.type.toLowerCase()}-section`,
          label: `${hooks.data.type} Section`, 
          icon: sectionIcon,
        });
      }
    }

    return items;
  }, [hooks.data]);

  if (hooks.loading) return <LoadingTest />;
  if (!hooks.data) return <NotFoundTest title="Test not found" />;

  // Make sure this function always returns a React Element, never undefined
  function getTestTypeIcon(typeStr: TestTypeEnum) {
    switch (typeStr) {
      case TestTypeEnum.READING:
        return <SubjectIcon fontSize="small" />;
      case TestTypeEnum.LISTENING:
        return <HeadphonesIcon fontSize="small" />;
      case TestTypeEnum.SPEAKING:
        return <MicIcon fontSize="small" />;
      case TestTypeEnum.WRITING:
        return <CreateIcon fontSize="small" />;
      default:
        return <SubjectIcon fontSize="small" />;
    }
  }

  // Find specific part based on test type
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
            <TestDetailsSection 
              testData={hooks.data}
              isEditMode={hooks.isEditMode}
              editData={hooks.editData as Test}
              handleEditMode={hooks.handleEditMode}
              handleInputChange={hooks.handleInputChange}
              handleSaveChanges={hooks.handleSaveChanges}
              handlePublishClick={hooks.handlePublishClick}
              handleUnpublishClick={hooks.handleUnpublishClick}
            />
            
            {/* Display sections based on test type */}
            {(hooks.data.type === TestTypeEnum.MIXING ) && vocabularyPart && (
              <VocabularySection 
                partId={vocabularyPart.id}
                questionIds={vocabularyPart.questions || []}
              />
            )}
            
            {(hooks.data.type === TestTypeEnum.MIXING ) && grammarPart && (
              <GrammarSection 
                partId={grammarPart.id}
                questionIds={grammarPart.questions || []}
              />
            )}
            
            {(hooks.data.type === TestTypeEnum.MIXING || hooks.data.type === TestTypeEnum.READING) && readingPart && (
              <ReadingSection 
                partId={readingPart.id}
                testItemIds={readingPart.questions || []}
              />
            )}
            
            {(hooks.data.type === TestTypeEnum.MIXING || hooks.data.type === TestTypeEnum.LISTENING) && listeningPart && (
              <ListeningSection 
                partId={listeningPart.id}
                testItemIds={listeningPart.questions || []}
              />
            )}

            {(hooks.data.type === TestTypeEnum.MIXING || hooks.data.type === TestTypeEnum.SPEAKING) && speakingPart && (
              <SpeakingSection 
                partId={speakingPart.id}
                testItemIds={speakingPart.questions || []}
              />
            )}
            
            {(hooks.data.type === TestTypeEnum.MIXING || hooks.data.type === TestTypeEnum.WRITING) && writingPart && (
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
          title="test"
        />
      </Container>
    </Box>
  );
}