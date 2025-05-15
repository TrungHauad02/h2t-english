import React, { useMemo } from 'react';
import { 
  Container, 
  Stack
} from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ImageIcon from '@mui/icons-material/Image';
import QuizIcon from '@mui/icons-material/Quiz';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SubjectIcon from '@mui/icons-material/Subject';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import ArticleIcon from '@mui/icons-material/Article';

import WEFloatingNavMenu from "components/pagination/WEFloatingNavMenu";
import { NotFoundTest, LoadingTest, PublishDialogs } from "../components";
import useToeicDetailPage from "../hooks/useToeicDetailPage";
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

import { 
  ToeicDetailsSection,
  Part1Section,
  Part2Section,
  Part3Section,
  Part4Section,
  Part5Section,
  Part6Section,
  Part7Section
} from '../components/toeicSection/index';

export default function ToeicDetailPage() {
  const hooks = useToeicDetailPage();
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  // Navigation items
  const navItems = useMemo(() => {
    const items = [
      {
        id: "toeic-details",
        label: "Test Details",
        icon: <EventNoteIcon fontSize="small" />,
      }
    ];

    // Helper function to add part section
    const addPartSection = (
      questions: any[], 
      partNumber: number, 
      icon: React.ReactElement
    ) => {
      if (questions.length > 0) {
        items.push({
          id: `part${partNumber}-section`,
          label: `Part ${partNumber}`,
          icon: icon
        });
      }
    };

    // Add part sections dynamically
    addPartSection(hooks.part1Questions, 1, <ImageIcon fontSize="small" />);
    addPartSection(hooks.part2Questions, 2, <QuizIcon fontSize="small" />);
    addPartSection(hooks.part3Questions, 3, <RecordVoiceOverIcon fontSize="small" />);
    addPartSection(hooks.part4Questions, 4, <HeadphonesIcon fontSize="small" />);
    addPartSection(hooks.part5Questions, 5, <SubjectIcon fontSize="small" />);
    addPartSection(hooks.part6Questions, 6, <ChromeReaderModeIcon fontSize="small" />);
    addPartSection(hooks.part7Questions, 7, <ArticleIcon fontSize="small" />);

    return items;
  }, [
    hooks.part1Questions.length,
    hooks.part2Questions.length,
    hooks.part3Questions.length,
    hooks.part4Questions.length,
    hooks.part5Questions.length,
    hooks.part6Questions.length,
    hooks.part7Questions.length
  ]);

  // Loading and not found states
  if (hooks.loading) return <LoadingTest />;
  if (!hooks.data) return <NotFoundTest title="TOEIC test not found" />;

  return (
    <Container 
      maxWidth="lg"
      sx={{ 
        backgroundColor: isDarkMode ? color.gray900 : color.white,
        minHeight: '100vh',
        py: 4
      }}
    >
      <WEFloatingNavMenu items={navItems} />

      <Stack 
        spacing={5} 
        sx={{ 
          mt: 6, 
          mb: 6, 
          px: { xs: 2, md: 0 } 
        }}
      >
        {/* Test Details Section */}
        <ToeicDetailsSection 
          testData={hooks.data}
          isEditMode={hooks.isEditMode}
          editData={hooks.editData!}
          handleEditMode={hooks.handleEditMode}
          handleInputChange={hooks.handleInputChange}
          handleSaveChanges={hooks.handleSaveChanges}
          handlePublishClick={hooks.handlePublishClick}
          handleUnpublishClick={hooks.handleUnpublishClick}
        />
      <Part1Section
        questions={hooks.part1Questions}
        onAddQuestion={hooks.addPart1Question}
        onUpdateQuestion={hooks.updatePart1Question}
        onDeleteQuestion={hooks.deletePart1Question}
      />

      <Part2Section
        questions={hooks.part2Questions}
        onAddQuestion={hooks.addPart2Question}
        onUpdateQuestion={hooks.updatePart2Question}
        onDeleteQuestion={hooks.deletePart2Question}
      />

      <Part3Section
        questions={hooks.part3Questions}
        toeicQuestions={hooks.part3ToeicQuestions}
        onAddQuestion={(question) => hooks.addPart3_4(question, false)}
        onUpdateQuestion={(question) => hooks.updatePart3_4(question, false)}
        onDeleteQuestion={(id) => hooks.deletePart3_4(id, false)}
        onAddSubQuestion={(parentId, question) => hooks.addSubQuestion(parentId, question, "part3")}
        onUpdateSubQuestion={(question, parentId) => hooks.updateSubQuestion(question, "part3", parentId)}
        onDeleteSubQuestion={(questionId, parentId) => hooks.deleteSubQuestion(questionId, "part3", parentId)}
       
        
      />

      <Part4Section
        questions={hooks.part4Questions}
        toeicQuestions={hooks.part4ToeicQuestions}
        onAddQuestion={(question) => hooks.addPart3_4(question, true)}
        onUpdateQuestion={(question) => hooks.updatePart3_4(question, true)}
        onDeleteQuestion={(id) => hooks.deletePart3_4(id, true)}
        onAddSubQuestion={(parentId, question) => hooks.addSubQuestion(parentId, question, "part4")}
        onUpdateSubQuestion={(question, parentId) => hooks.updateSubQuestion(question, "part4", parentId)}
        onDeleteSubQuestion={(questionId, parentId) => hooks.deleteSubQuestion(questionId, "part4", parentId)}
   
      />

      <Part5Section
        questions={hooks.part5Questions}
        onAddQuestion={hooks.addToeicQuestion}
        onUpdateQuestion={hooks.updateToeicQuestion}
        onDeleteQuestion={hooks.deleteToeicQuestion}
      />

      <Part6Section
        questions={hooks.part6Questions}
        onAddQuestion={hooks.addPart6}
        onUpdateQuestion={hooks.updatePart6}
        onDeleteQuestion={hooks.deletePart6}
        toeicQuestions={hooks.part6ToeicQuestions}
        onAddSubQuestion={(parentId, question) => hooks.addSubQuestion(parentId, question, "part6")}
        onUpdateSubQuestion={(question, parentId) => hooks.updateSubQuestion(question, "part6", parentId)}
        onDeleteSubQuestion={(questionId, parentId) => hooks.deleteSubQuestion(questionId, "part6", parentId)}
      />

      <Part7Section
        questions={hooks.part7Questions}
        onAddQuestion={hooks.addPart7}
        onUpdateQuestion={hooks.updatePart7}
        onDeleteQuestion={hooks.deletePart7}
        toeicQuestions={hooks.part7ToeicQuestions}
        onAddSubQuestion={(parentId, question) => hooks.addSubQuestion(parentId, question, "part7")}
        onUpdateSubQuestion={(question, parentId) => hooks.updateSubQuestion(question, "part7", parentId)}
        onDeleteSubQuestion={(questionId, parentId) => hooks.deleteSubQuestion(questionId, "part7", parentId)}
      />
      </Stack>
      
      {/* Publish Dialogs */}
      <PublishDialogs
        openPublish={hooks.openPublishDialog}
        openUnpublish={hooks.openUnpublishDialog}
        onCancelPublish={() => hooks.setOpenPublishDialog(false)}
        onCancelUnpublish={() => hooks.setOpenUnpublishDialog(false)}
        onConfirmPublish={hooks.handlePublish}
        onConfirmUnpublish={hooks.handleUnpublish}
        title='toeic'
      />
    </Container>
  );
}