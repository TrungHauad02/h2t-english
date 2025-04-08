import { useMemo, useEffect } from "react";
import { Stack, Container } from "@mui/material";

import SubjectIcon from "@mui/icons-material/Subject";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import MicIcon from "@mui/icons-material/Mic";
import CreateIcon from "@mui/icons-material/Create";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WEFloatingNavMenu from "components/pagination/WEFloatingNavMenu";
import { testService } from "../services/testServices";
import { NotFoundTest, LoadingTest, PublishDialogs } from "../components";
import { TestPartTypeEnum, CompetitionTest } from "interfaces";

import {
  VocabularySection,
  GrammarSection,
  ReadingSection,
  ListeningSection,
  SpeakingSection,
  WritingSection,
  CompetitionDetailsSection
} from "../components/testSection";
import useCompetitionDetailPage from "../hooks/useCompetitionDetailPage";

export default function CompetitionDetailPage() {
  const hooks = useCompetitionDetailPage();

  const navItems = useMemo(() => {
    const items = [
      {
        id: "competition-details",
        label: "Competition Details",
        icon: <EmojiEventsIcon fontSize="small" />,
      }
    ];

    if (hooks.data) {
      // For competition tests, show all sections that have parts
      if (hooks.testParts.some(part => part.type === TestPartTypeEnum.VOCABULARY)) {
        items.push({
          id: "vocabulary-section",
          label: "Vocabulary",
          icon: <SpellcheckIcon fontSize="small" />,
        });
      }
      
      if (hooks.testParts.some(part => part.type === TestPartTypeEnum.GRAMMAR)) {
        items.push({
          id: "grammar-section",
          label: "Grammar",
          icon: <MenuBookIcon fontSize="small" />,
        });
      }
      
      if (hooks.testParts.some(part => part.type === TestPartTypeEnum.READING)) {
        items.push({
          id: "reading-section",
          label: "Reading",
          icon: <SubjectIcon fontSize="small" />,
        });
      }
      
      if (hooks.testParts.some(part => part.type === TestPartTypeEnum.LISTENING)) {
        items.push({
          id: "listening-section",
          label: "Listening",
          icon: <HeadphonesIcon fontSize="small" />,
        });
      }
      
      if (hooks.testParts.some(part => part.type === TestPartTypeEnum.SPEAKING)) {
        items.push({
          id: "speaking-section",
          label: "Speaking",
          icon: <MicIcon fontSize="small" />,
        });
      }
      
      if (hooks.testParts.some(part => part.type === TestPartTypeEnum.WRITING)) {
        items.push({
          id: "writing-section",
          label: "Writing",
          icon: <CreateIcon fontSize="small" />,
        });
      }
    }

    return items;
  }, [hooks.data, hooks.testParts]);

  useEffect(() => {
    if (hooks.data) {
      initializeSelectedFiles();
    }
  }, [hooks.data, hooks.testParts, hooks.readingFiles, hooks.listeningFiles, hooks.speakingTitles, hooks.writingTopics]);

  if (hooks.loading) return <LoadingTest />;
  if (!hooks.data) return <NotFoundTest title="Competition not found" />;
  if (hooks.testParts.length === 0) return <NotFoundTest title="Competition parts not found" />;

  function initializeSelectedFiles() {
    const readingParts = hooks.testParts.filter(part => part.type === TestPartTypeEnum.READING);
    if (readingParts.length > 0 && readingParts[0].questions.length > 0) {
      const readingFile = hooks.readingFiles.find(r => r.id === readingParts[0].questions[0]);
      if (readingFile) {
        hooks.selectReadingFile(readingFile.id);
      }
    }
    
    const listeningParts = hooks.testParts.filter(part => part.type === TestPartTypeEnum.LISTENING);
    if (listeningParts.length > 0 && listeningParts[0].questions.length > 0) {
      const listeningFile = hooks.listeningFiles.find(l => l.id === listeningParts[0].questions[0]);
      if (listeningFile) {
        hooks.selectListeningFile(listeningFile.id);
      }
    }
    
    const speakingParts = hooks.testParts.filter(part => part.type === TestPartTypeEnum.SPEAKING);
    if (speakingParts.length > 0 && speakingParts[0].questions.length > 0) {
      const speakingTitle = hooks.speakingTitles.find(s => s.id === speakingParts[0].questions[0]);
      if (speakingTitle) {
        hooks.selectSpeakingTitle(speakingTitle.id);
      }
    }
    
    const writingParts = hooks.testParts.filter(part => part.type === TestPartTypeEnum.WRITING);
    if (writingParts.length > 0 && writingParts[0].questions.length > 0) {
      const writingTopic = hooks.writingTopics.find(w => w.id === writingParts[0].questions[0]);
      if (writingTopic) {
        hooks.selectWritingTopic(writingTopic.id);
      }
    }
  }

  // Get parts for all section types
  const vocabularyParts = hooks.testParts.filter(part => part.type === TestPartTypeEnum.VOCABULARY);
  const grammarParts = hooks.testParts.filter(part => part.type === TestPartTypeEnum.GRAMMAR);
  const readingParts = hooks.testParts.filter(part => part.type === TestPartTypeEnum.READING);
  const listeningParts = hooks.testParts.filter(part => part.type === TestPartTypeEnum.LISTENING);
  const speakingParts = hooks.testParts.filter(part => part.type === TestPartTypeEnum.SPEAKING);
  const writingParts = hooks.testParts.filter(part => part.type === TestPartTypeEnum.WRITING);

  const speakingQuestions = hooks.currentSpeakingTitle 
    ? testService.getQuestionsByIds(hooks.currentSpeakingTitle.questions)
    : [];

  return (
    <Container maxWidth="lg">
      <WEFloatingNavMenu items={navItems} />

      <Stack spacing={5} sx={{ mt: 6, mb: 6, px: { xs: 2, md: 0 } }}>
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
        
        {/* Display vocabulary section if it has vocabulary parts */}
        {vocabularyParts.length > 0 && (
          <VocabularySection 
            parts={vocabularyParts}
            isEditMode={hooks.isEditMode}
          />
        )}
        
        {/* Display grammar section if it has grammar parts */}
        {grammarParts.length > 0 && (
          <GrammarSection 
            parts={grammarParts}
            isEditMode={hooks.isEditMode}
          />
        )}
        
        {/* Display reading section if it has reading parts */}
        {readingParts.length > 0 && hooks.currentReadingFile && (
          <ReadingSection
            readingFiles={hooks.readingFiles}
            selectedFile={hooks.currentReadingFile}
            onSelectFile={hooks.selectReadingFile}
            onFileChange={hooks.handleReadingFileChange}
          />
        )}
        
        {/* Display listening section if it has listening parts */}
        {listeningParts.length > 0 && hooks.currentListeningFile && (
          <ListeningSection
            listeningFiles={hooks.listeningFiles}
            selectedFile={hooks.currentListeningFile}
            onSelectFile={hooks.selectListeningFile}
            onFileChange={hooks.handleListeningFileChange}
          />
        )}
        
        {/* Display speaking section if it has speaking parts */}
        {speakingParts.length > 0 && hooks.currentSpeakingTitle && (
          <SpeakingSection
            speakingTitles={hooks.speakingTitles}
            selectedTitle={hooks.currentSpeakingTitle}
            onSelectTitle={hooks.selectSpeakingTitle}
            questions={speakingQuestions}
            isEditMode={hooks.isEditMode}
          />
        )}
        
        {/* Display writing section if it has writing parts */}
        {writingParts.length > 0 && hooks.currentWritingTopic && (
          <WritingSection
            writingTopics={hooks.writingTopics}
            selectedTopic={hooks.currentWritingTopic}
            onSelectTopic={hooks.selectWritingTopic}
            onTopicChange={hooks.handleWritingTopicChange}
          />
        )}
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