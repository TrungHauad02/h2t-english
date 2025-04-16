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

        {/* Part Sections - with appropriate question data */}
        {hooks.part1Questions.length > 0 && (
          <Part1Section 
            questions={hooks.part1Questions}
          />
        )}

        {hooks.part2Questions.length > 0 && (
          <Part2Section 
            questions={hooks.part2Questions}
          />
        )}

        {hooks.part3Questions.length > 0 && (
          <Part3Section 
            questions={hooks.part3Questions}
            toeicQuestions={hooks.part3ToeicQuestions}
          />
        )}

        {hooks.part4Questions.length > 0 && (
          <Part4Section 
            questions={hooks.part4Questions}
            toeicQuestions={hooks.part4ToeicQuestions}
          />
        )}

        {hooks.part5Questions.length > 0 && (
          <Part5Section 
            questions={hooks.part5Questions}
          />
        )}

        {hooks.part6Questions.length > 0 && (
          <Part6Section 
            questions={hooks.part6Questions}
            toeicQuestions={hooks.part6ToeicQuestions}
          />
        )}

        {hooks.part7Questions.length > 0 && (
          <Part7Section 
            questions={hooks.part7Questions}
            toeicQuestions={hooks.part7ToeicQuestions}
          />
        )}
      </Stack>
      
      {/* Publish Dialogs */}
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