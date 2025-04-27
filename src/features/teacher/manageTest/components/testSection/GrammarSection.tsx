import React, { useEffect, useState } from 'react';
import { Fade, Box, Paper } from '@mui/material';
import { Question, QuestionSupportTestType } from 'interfaces';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import QuizIcon from "@mui/icons-material/Quiz";
import TestSectionContainer from './common/TestSectionContainer';
import SectionHeader from './common/SectionHeader';
import NoQuestionSection from './questionsSection/NoQuestionSection';
import ListQuestion from './questionsSection/ListQuestion';
import AddQuestionDialog from './questionsSection/AddQuestionDialog';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { questionService, testPartQuestionServiceFactory } from 'services';
import { toast } from "react-toastify";
import { useErrors } from "hooks/useErrors";
import { extractErrorMessages } from "utils/extractErrorMessages";

interface GrammarSectionProps {
  partId: number;
  questionIds: number[];
}

export function GrammarSection({ partId, questionIds }: GrammarSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const secondaryTextColor = isDarkMode ? color.gray300 : color.gray600;
  const { showError } = useErrors();

  const [data, setData] = useState<Question[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [listQuestionId, setListQuestionId] = useState(questionIds);

  const type = "test-parts" as QuestionSupportTestType;
  const questionServiceUpdate = testPartQuestionServiceFactory(type);

  const fetchData = async () => {
    try {
      if (partId) {
        
        
        const resData = await questionService.findByTestId(partId, type);
        console.log(resData);
        setData(resData.data);
        const newQuestionIds = resData.data.map((question: Question) => question.id);
        setListQuestionId(newQuestionIds);
    
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [type,partId]);

  const handleAddQuestion = () => {
    console.log("Opening dialog");
    setIsAddDialogOpen(true);
  };

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSaveChanges = async () => {
    // Save serial change
    try {
      const newQuestions = data.map((question) => question.id);
      await questionServiceUpdate.updateQuestions(partId, newQuestions);
      toast.success("Questions updated successfully");
    } catch (error) {
      // Display error
      showError({
        message: "Error updating questions",
        severity: "error",
        details: extractErrorMessages(error),
      });
    }
    setIsEditMode(false);
    fetchData();
  };

  const onMoveUp = (index: number) => {
    if (index <= 0) return;
    const updatedData = [...data];
    [updatedData[index], updatedData[index - 1]] = [
      updatedData[index - 1],
      updatedData[index],
    ];
    setData(updatedData);
  };

  const onMoveDown = (index: number) => {
    if (index >= data.length - 1) return;
    const updatedData = [...data];
    [updatedData[index], updatedData[index + 1]] = [
      updatedData[index + 1],
      updatedData[index],
    ];
    setData(updatedData);
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
  };

  return (

<>
    <TestSectionContainer
      id="grammar-section"
      title="Grammar Section"
      icon={<SpellcheckIcon />}
      isEmpty={questionIds.length === 0}
      isEditMode={isEditMode}
      onAdd={handleAddQuestion}
      emptyState={{
        icon: <SpellcheckIcon />,
        title: "No Grammar Content Yet",
        description: "Grammar questions would appear here."
      }}
    >
      <Fade in={true} timeout={500}>
        <Box>
          <Box
            component={Paper}
            elevation={3}
            sx={{
              p: 3,
              borderRadius: "1rem",
              backgroundColor: isDarkMode ? color.gray800 : color.gray50,
            }}
          >
            <SectionHeader
              title={`Questions (${data.length})`}
              editText="Edit"
              icon={<QuizIcon />}
              isEditMode={isEditMode}
              handleEditMode={handleEditMode}
              handleCancelEdit={handleEditMode}
              handleSaveChanges={handleSaveChanges}
            />
            {data.length > 0 ? (
              <ListQuestion
                data={data}
                isEditMode={isEditMode}
                fetchData={fetchData}
                onMoveUp={onMoveUp}
                onMoveDown={onMoveDown}
                type={type}
                questions={questionIds}
              />
            ) : (
              <NoQuestionSection secondaryTextColor={secondaryTextColor} />
            )}
          </Box>
        </Box>
      </Fade>

     
    </TestSectionContainer>
     <AddQuestionDialog
        type={type}
        questions={listQuestionId}
        open={isAddDialogOpen}
        onClose={handleCloseDialog}
        partId={partId}
        fetchData={fetchData}
      />
    </>
  );
}

export default GrammarSection;