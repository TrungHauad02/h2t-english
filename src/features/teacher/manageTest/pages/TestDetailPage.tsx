import { useMemo, useEffect } from "react";
import { Stack, Container } from "@mui/material";

import SubjectIcon from "@mui/icons-material/Subject";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import MicIcon from "@mui/icons-material/Mic";
import CreateIcon from "@mui/icons-material/Create";
import WEFloatingNavMenu from "components/pagination/WEFloatingNavMenu";
import { testService } from "../services/testServices";
import { NotFoundTest, LoadingTest, PublishDialogs } from "../components";
import { TestTypeEnum, TestPartTypeEnum, Test } from "interfaces";

import {
  ReadingSection,
  ListeningSection,
  SpeakingSection,
  WritingSection,
  TestDetailsSection
} from "../components/testSection";
import useTestDetailPage from "../hooks/useTestDetailPage";

export default function TestDetailPage() {
  const hooks = useTestDetailPage();

  const navItems = useMemo(() => {
    const items = [
      {
        id: "test-details",
        label: "Test Details",
        icon: <SubjectIcon fontSize="small" />,
      }
    ];

    if (hooks.data && hooks.data.type) {
      // For specific test types or mixing test
      if (hooks.data.type === TestTypeEnum.MIXING) {
        // For mixing tests, show all sections that have parts
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
  }, [hooks.data, hooks.testParts]);

  useEffect(() => {
    if (hooks.data) {
      initializeSelectedFiles();
    }
  }, [hooks.data, hooks.testParts, hooks.readingFiles, hooks.listeningFiles, hooks.speakingTitles, hooks.writingTopics]);

  if (hooks.loading) return <LoadingTest />;
  if (!hooks.data) return <NotFoundTest title="Test not found" />;
  if (hooks.testParts.length === 0) return <NotFoundTest title="Test parts not found" />;

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

  // Get parts for the test based on type
  const isMixingTest = hooks.data.type === TestTypeEnum.MIXING;
  const readingParts = hooks.testParts.filter(part => part.type === TestPartTypeEnum.READING);
  const listeningParts = hooks.testParts.filter(part => part.type === TestPartTypeEnum.LISTENING);
  const speakingParts = hooks.testParts.filter(part => part.type === TestPartTypeEnum.SPEAKING);
  const writingParts = hooks.testParts.filter(part => part.type === TestPartTypeEnum.WRITING);

  const speakingQuestions = hooks.currentSpeakingTitle 
    ? testService.getQuestionsByIds(hooks.currentSpeakingTitle.questions)
    : [];

  // Helper function to determine if a section should be displayed
  const shouldDisplaySection = (sectionType: TestTypeEnum): boolean => {
    return isMixingTest || hooks.data?.type === sectionType;
  };

  return (
    <Container maxWidth="lg">
      <WEFloatingNavMenu items={navItems} />

      <Stack spacing={5} sx={{ mt: 6, mb: 6, px: { xs: 2, md: 0 } }}>
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
        
        {/* Display reading section if appropriate */}
        {shouldDisplaySection(TestTypeEnum.READING) && readingParts.length > 0 && hooks.currentReadingFile && (
          <ReadingSection
            readingFiles={hooks.readingFiles}
            selectedFile={hooks.currentReadingFile}
            onSelectFile={hooks.selectReadingFile}
            onFileChange={hooks.handleReadingFileChange}
          />
        )}
        
        {/* Display listening section if appropriate */}
        {shouldDisplaySection(TestTypeEnum.LISTENING) && listeningParts.length > 0 && hooks.currentListeningFile && (
          <ListeningSection
            listeningFiles={hooks.listeningFiles}
            selectedFile={hooks.currentListeningFile}
            onSelectFile={hooks.selectListeningFile}
            onFileChange={hooks.handleListeningFileChange}
          />
        )}
        
        {/* Display speaking section if appropriate */}
        {shouldDisplaySection(TestTypeEnum.SPEAKING) && speakingParts.length > 0 && hooks.currentSpeakingTitle && (
          <SpeakingSection
            speakingTitles={hooks.speakingTitles}
            selectedTitle={hooks.currentSpeakingTitle}
            onSelectTitle={hooks.selectSpeakingTitle}
            questions={speakingQuestions}
            isEditMode={hooks.isEditMode}
          />
        )}
        
        {/* Display writing section if appropriate */}
        {shouldDisplaySection(TestTypeEnum.WRITING) && writingParts.length > 0 && hooks.currentWritingTopic && (
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