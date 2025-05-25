import { useState } from "react";
import { Grid, Divider, Chip, Container } from "@mui/material";
import { ToeicPart6, ToeicQuestion } from "interfaces";
import Part6EditDialog from "./part6Section/Part6EditDialog";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import DialogConfirm from "./common/DialogConfirm";
import {
  PartContainer,
  EmptyState,
  QuestionTabs,
  QuestionSection,
  PassageDisplay,
  QuestionExplanation,
} from "./common";
import {
  useDialogManagement,
  useQuestionManagement,
  useSubQuestionManagement,
} from "features/teacher/manageTest/hooks/useToeicDetailsPage";

interface Part6SectionProps {
  questions: ToeicPart6[];
  toeicQuestions: { [partId: number]: ToeicQuestion[] };
  onUpdateQuestion?: (updatedQuestion: ToeicPart6) => void;
  onAddQuestion?: (newQuestion: ToeicPart6) => Promise<ToeicPart6>;
  onDeleteQuestion?: (questionId: number) => void;
  onAddSubQuestion?: (
    parentId: number,
    question: ToeicQuestion
  ) => Promise<ToeicQuestion>;
  onUpdateSubQuestion?: (
    question: ToeicQuestion,
    parentId: number
  ) => Promise<ToeicQuestion>;
  onDeleteSubQuestion?: (questionId: number, parentId: number) => Promise<void>;
}

export default function Part6Section({
  questions,
  toeicQuestions,
  onUpdateQuestion,
  onAddQuestion,
  onDeleteQuestion,
  onAddSubQuestion,
  onUpdateSubQuestion,
  onDeleteSubQuestion,
}: Part6SectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const [showExplanation, setShowExplanation] = useState(false);

  const {
    currentQuestion,
    currentQuestionIndex,
    dialogMode,
    onSelectQuestion,
    onNavigatePrevious,
    onNavigateNext,
    handleOpenEditDialog,
    handleOpenAddDialog,
    handleDeleteQuestion,
    setEmptyQuestion,
  } = useQuestionManagement<ToeicPart6>({
    questions,
    toeicQuestions,
    onUpdateQuestion,
    onAddQuestion,
    onDeleteQuestion,
  });

  const {
    activeSubQuestion,
    currentSubQuestions,
    tabsRef,
    tabContainerRef,
    handleChangeSubQuestion,
    handleDeleteSubQuestion,
    handleSaveSubQuestions,
  } = useSubQuestionManagement({
    currentQuestionId: currentQuestion?.id || null,
    toeicQuestions,
    onAddSubQuestion,
    onUpdateSubQuestion,
    onDeleteSubQuestion,
  });

  // Hooks for managing dialogs
  const {
    isEditDialogOpen,
    isDeleteDialogOpen,
    isDeleteSubQuestionDialogOpen,
    handleOpenEditDialog: openEditDialog,
    handleCloseEditDialog,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    handleCloseDeleteSubQuestionDialog,
  } = useDialogManagement();

  const createEmptyQuestion = (): ToeicPart6 => {
    return {
      id: 0,
      file: "",
      questions: [],
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };

  const openAddNewDialog = () => {
    handleOpenAddDialog(createEmptyQuestion);
    openEditDialog();
  };

  const openExistingEditDialog = () => {
    handleOpenEditDialog();
    openEditDialog();
  };

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };
const handleSaveQuestion = async (
 updatedQuestion: ToeicPart6 & {
   _changes?: {
     toAdd: ToeicQuestion[];
     toUpdate: ToeicQuestion[];
     toDelete: number[];
   };
   subQuestions?: ToeicQuestion[];
 }
) => {
 try {
   const { _changes, subQuestions, ...mainQuestion } = updatedQuestion;
   handleCloseEditDialog();
   if (dialogMode === "edit") {
     if (_changes && mainQuestion.id > 0) {
       const newQuestionIds = await handleSaveSubQuestions(
         mainQuestion.id,
         _changes
       );

       const existingQuestionIds = (mainQuestion.questions || []).filter(
         (id) => id > 0 && !_changes.toDelete.includes(id)
       );

       mainQuestion.questions = [...existingQuestionIds, ...newQuestionIds];
     }

     if (onUpdateQuestion) {
       await onUpdateQuestion(mainQuestion);
     }
   } else if (dialogMode === "add") {
     let subQuestionIds: number[] = [];

     if (subQuestions && subQuestions.length > 0 && onAddSubQuestion) {
       const tempPartId = -1;

       const createdQuestions: ToeicQuestion[] = [];
       for (const question of subQuestions) {
         const createdQuestion = await onAddSubQuestion(tempPartId, question);
         createdQuestions.push(createdQuestion);
       }

       subQuestionIds = createdQuestions.map((q) => q.id);
     }

     mainQuestion.questions = subQuestionIds;

     if (onAddQuestion) {
       await onAddQuestion(mainQuestion);
     }
   }


   setEmptyQuestion(null);
 } catch (error) {
   console.error("Error saving question:", error);
 }
};

  if (questions.length === 0) {
    return (
      <Container maxWidth="lg">
        <PartContainer
          id="part6-section-empty"
          title="Part 6: Text Completion"
          subtitle="No passages available. Please add a passage to get started."
          currentIndex={0}
          totalItems={0}
          onSelectQuestion={() => {}}
          onPrevious={() => {}}
          onNext={() => {}}
          onEditQuestion={undefined}
          onAddQuestion={openAddNewDialog}
          onDeleteQuestion={undefined}
          showNavigation={false}
        >
          <EmptyState
            icon={<MenuBookIcon />}
            title="No passages available"
            message="Click the 'Add Question' button to create your first passage."
          />
        </PartContainer>

        <Part6EditDialog
          key={`add-${Date.now()}`}
          open={isEditDialogOpen}
          question={createEmptyQuestion()}
          onClose={handleCloseEditDialog}
          onSave={handleSaveQuestion}
          mode="add"
        />
      </Container>
    );
  }

  const accentColor = isDarkMode ? color.teal300 : color.teal600;

  return (
    <>
      <PartContainer
        id="part6-section"
        title="Part 6: Text Completion"
        subtitle="Read the text and choose the best word or phrase for each blank"
        currentIndex={currentQuestionIndex}
        totalItems={questions.length}
        onSelectQuestion={onSelectQuestion}
        onPrevious={onNavigatePrevious}
        onNext={onNavigateNext}
        onEditQuestion={openExistingEditDialog}
        onAddQuestion={openAddNewDialog}
        onDeleteQuestion={onDeleteQuestion ? handleOpenDeleteDialog : undefined}
      >
        {currentQuestion && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <PassageDisplay
                currentIndex={currentQuestionIndex}
                fileUrl={currentQuestion.file}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider
                sx={{
                  my: 2,
                  borderColor: isDarkMode ? color.gray700 : color.gray300,
                  "&::before, &::after": {
                    borderColor: isDarkMode ? color.gray700 : color.gray300,
                  },
                }}
              >
                <Chip
                  icon={<QuestionAnswerIcon />}
                  label="Questions"
                  sx={{
                    backgroundColor: accentColor,
                    color: isDarkMode ? color.gray900 : color.white,
                    fontWeight: "bold",
                    px: 1,
                    "& .MuiChip-icon": {
                      color: isDarkMode ? color.gray900 : color.white,
                    },
                  }}
                />
              </Divider>

              {currentSubQuestions.length > 0 ? (
                <QuestionTabs
                  tabsRef={tabsRef}
                  containerRef={tabContainerRef}
                  questions={currentSubQuestions}
                  activeQuestion={activeSubQuestion}
                  onChangeQuestion={handleChangeSubQuestion}
                >
                  <QuestionSection
                    question={currentSubQuestions[activeSubQuestion] || null}
                    questionNumber={activeSubQuestion + 1}
                  />
                  <QuestionExplanation
                    explanation={
                      currentSubQuestions[activeSubQuestion]?.explanation || ""
                    }
                    showExplanation={showExplanation}
                    onToggleExplanation={toggleExplanation}
                  />
                </QuestionTabs>
              ) : (
                <EmptyState
                  icon={<QuestionAnswerIcon />}
                  title="No questions available"
                  message="Edit this passage to add questions."
                />
              )}
            </Grid>
          </Grid>
        )}
      </PartContainer>

      {/* Dialogs */}
      <Part6EditDialog
        key={
          dialogMode === "edit"
            ? `edit-${currentQuestion?.id ?? "new"}`
            : `add-${Date.now()}`
        }
        open={isEditDialogOpen}
        question={{
          ...(dialogMode === "edit"
            ? currentQuestion || createEmptyQuestion()
            : createEmptyQuestion()),
        }}
        onClose={handleCloseEditDialog}
        onSave={handleSaveQuestion}
        toeicQuestions={dialogMode === "edit" ? toeicQuestions : {}}
        mode={dialogMode}
      />

      <DialogConfirm
        open={isDeleteDialogOpen}
        title="Confirm Deletion"
        content="Are you sure you want to delete this passage? This will also delete all associated questions. This action cannot be undone."
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteQuestion}
      />

      <DialogConfirm
        open={isDeleteSubQuestionDialogOpen}
        title="Confirm Sub-question Deletion"
        content="Are you sure you want to delete this sub-question? This action cannot be undone."
        onClose={handleCloseDeleteSubQuestionDialog}
        onConfirm={handleDeleteSubQuestion}
      />
    </>
  );
}
