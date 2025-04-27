import { useState } from "react";
import { Question, QuestionSupportTestType } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { WEDialog } from "components/display";
import { questionService, testSpeakingService, testPartService } from "services";
import { useErrors } from "hooks/useErrors";
import { extractErrorMessages } from "utils/extractErrorMessages";
import { toast } from "react-toastify";
import { 
  Box, 
  TextField, 
  Typography, 
  Switch, 
  FormControlLabel, 
  Stack, 
  Button, 
  IconButton 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import StyledCard from "../common/StyledCard";
import FormGroup from "@mui/material/FormGroup";

interface AddSpeakingDialogProps {
  type: QuestionSupportTestType;
  testItems: number[];
  open: boolean;
  onClose: () => void;
  partId: number;
  fetchSpeakings: () => void;
  setListTestIds: React.Dispatch<React.SetStateAction<number[]>>;

}

export default function AddSpeakingDialog({
  type,
  testItems,
  open,
  onClose,
  partId,
  fetchSpeakings,
  setListTestIds,
}: AddSpeakingDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const { showError } = useErrors();
  const accentColor = isDarkMode ? color.teal300 : color.teal600;

  const [title, setTitle] = useState("");
  const [speakingQuestions, setSpeakingQuestions] = useState<Question[]>([]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const addNewQuestion = () => {
    const newQuestion: Question = {
      id: Date.now(),
      content: "",
      explanation: "",
      status: true,
      answers: []
    };
    setSpeakingQuestions([...speakingQuestions, newQuestion]);
  };

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const updatedQuestions = [...speakingQuestions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value
    };
    setSpeakingQuestions(updatedQuestions);
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = [...speakingQuestions];
    updatedQuestions.splice(index, 1);
    setSpeakingQuestions(updatedQuestions);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error('Please enter a speaking title');
      return;
    }

    if (speakingQuestions.length === 0) {
      toast.error('Please add at least one question');
      return;
    }

    // Validate questions
    const invalidQuestions = speakingQuestions.filter(q => !q.content.trim());
    if (invalidQuestions.length > 0) {
      toast.error('All questions must have content');
      return;
    }


    try {
      // 1. First create all questions and collect their IDs
      const createdQuestionIds: number[] = [];
      
      for (const question of speakingQuestions) {
        const questionResponse = await questionService.create({
            id: Date.now(),
          content: question.content,
          explanation: question.explanation || "",
          status: question.status,
          answers: []
        });
        
        createdQuestionIds.push(questionResponse.data.id);
      }
      

 
      const speakingResponse = await testSpeakingService.create({
        id: Date.now(),
        title: title,
        questions: createdQuestionIds,
        status: false,
      });
      
 
      const newTestItemIds = [...testItems, speakingResponse.data.id];
      await testPartService.patch(partId, {
        questions: newTestItemIds,
      });
      setListTestIds(newTestItemIds)
      
      
      toast.success("Speaking added successfully");
      resetForm();
      onClose();
    } catch (error) {
      showError({
        message: "Error creating speaking",
        severity: "error",
        details: extractErrorMessages(error),
      });
      console.error("Error creating speaking:", error);
    } finally {
    }
  };

  const resetForm = () => {
    setTitle("");
    setSpeakingQuestions([]);
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  // Add a first question if there are none
  if (speakingQuestions.length === 0) {
    addNewQuestion();
  }

  return (
    <WEDialog
      open={open}
      title="Add New Speaking"
      onCancel={handleCancel}
      onOk={handleSave}
      sx={{ maxWidth: "md", width: "100%" }}
    >
      {/* Speaking Title Section */}
      <StyledCard>
        <Typography
          variant="subtitle1"
          fontWeight="medium"
          color={accentColor}
          sx={{ mb: 2 }}
        >
          Speaking Details
        </Typography>
        
        <TextField
          fullWidth
          label="Speaking Title"
          value={title}
          onChange={handleTitleChange}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
        />
      </StyledCard>

      {/* Questions Section */}
      <StyledCard>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, alignItems: "center" }}>
          <Typography
            variant="subtitle1"
            fontWeight="medium"
            color={accentColor}
          >
            Questions
          </Typography>
          
          <Button
            startIcon={<AddIcon />}
            onClick={addNewQuestion}
            sx={{
              color: isDarkMode ? color.teal300 : color.teal600,
              "&:hover": {
                backgroundColor: isDarkMode ? `rgba(20, 184, 166, 0.1)` : `rgba(20, 184, 166, 0.05)`,
              },
              textTransform: "none",
            }}
          >
            Add Question
          </Button>
        </Box>
        
        <Stack spacing={3}>
          {speakingQuestions.map((question, index) => (
            <Box
              key={question.id}
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: isDarkMode ? color.gray700 : color.gray100,
                border: `1px solid ${isDarkMode ? color.gray600 : color.gray200}`,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, alignItems: "center" }}>
                <Typography
                  variant="subtitle2"
                  fontWeight="medium"
                  color={isDarkMode ? color.teal200 : color.teal700}
                >
                  Question {index + 1}
                </Typography>
                
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={question.status}
                          onChange={(e) => updateQuestion(index, "status", e.target.checked)}
                          sx={{
                            "& .MuiSwitch-switchBase.Mui-checked": {
                              color: accentColor,
                            },
                            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                              backgroundColor: accentColor,
                            },
                          }}
                        />
                      }
                      label="Active"
                    />
                  </FormGroup>
                  
                  <IconButton
                    onClick={() => removeQuestion(index)}
                    disabled={speakingQuestions.length <= 1}
                    sx={{
                      color: isDarkMode ? color.red400 : color.red600,
                      "&:hover": {
                        backgroundColor: isDarkMode ? `rgba(239, 68, 68, 0.2)` : `rgba(239, 68, 68, 0.1)`,
                      },
                      "&.Mui-disabled": {
                        color: isDarkMode ? color.gray500 : color.gray400,
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
              
              <TextField
                fullWidth
                label="Question Content"
                value={question.content}
                onChange={(e) => updateQuestion(index, "content", e.target.value)}
                multiline
                rows={3}
                sx={{ mb: 2, "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
              
              <TextField
                fullWidth
                label="Explanation"
                value={question.explanation}
                onChange={(e) => updateQuestion(index, "explanation", e.target.value)}
                multiline
                rows={2}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Box>
          ))}
        </Stack>
      </StyledCard>
    </WEDialog>
  );
}