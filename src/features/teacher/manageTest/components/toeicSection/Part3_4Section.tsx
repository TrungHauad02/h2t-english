import { Grid, Divider, Chip, Paper, Stack, Container } from "@mui/material";
import { useState } from "react";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import CampaignIcon from "@mui/icons-material/Campaign";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { ToeicPart3_4, ToeicQuestion } from "interfaces";
import {
  PartContainer,
  EmptyState,
  QuestionTabs,
  QuestionSection,
  QuestionExplanation,
} from "./common";

import { AudioSection, ImageSection, TranscriptSection } from "./part3_4Section/components";
import Part3_4EditDialog from "./part3_4Section/Part3_4EditDialog";
import DialogConfirm from "./common/DialogConfirm";
import {
  useDialogManagement,
  useQuestionManagement,
  useSubQuestionManagement,
} from "features/teacher/manageTest/hooks/useToeicDetailsPage";

interface Part3_4SectionProps {
  questions: ToeicPart3_4[];
  partNumber: 3 | 4;
  toeicQuestions: { [partId: number]: ToeicQuestion[] };
  onUpdateQuestion?: (updatedQuestion: ToeicPart3_4) => void;
  onAddQuestion?: (newQuestion: ToeicPart3_4) => Promise<ToeicPart3_4>;
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

export default function Part3_4Section({
  questions,
  partNumber,
  toeicQuestions,
  onUpdateQuestion,
  onAddQuestion,
  onDeleteQuestion,
  onAddSubQuestion,
  onUpdateSubQuestion,
  onDeleteSubQuestion,
}: Part3_4SectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const [showExplanation, setShowExplanation] = useState(false);
  const {
    currentQuestion,
    currentQuestionIndex,
    dialogMode,
    emptyQuestion,
    onSelectQuestion,
    onNavigatePrevious,
    onNavigateNext,
    handleOpenEditDialog,
    handleOpenAddDialog,
    handleDeleteQuestion,
    setEmptyQuestion,
  } = useQuestionManagement<ToeicPart3_4>({
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

  const createEmptyQuestion = (): ToeicPart3_4 => {
    return {
      id: 0,
      audio: "",
      image: "",
      transcript: "",
      questions: [],
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  const openAddNewDialog = () => {
    handleOpenAddDialog(createEmptyQuestion);
    openEditDialog();
  };

  const openExistingEditDialog = () => {
    handleOpenEditDialog();
    openEditDialog();
  };

  const handleSaveQuestion = async (
    updatedQuestion: ToeicPart3_4 & {
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

          const createdQuestions = await Promise.all(
            subQuestions.map((q) => onAddSubQuestion(tempPartId, q))
          );

          subQuestionIds = createdQuestions.map((q) => q.id);
        }

        mainQuestion.questions = subQuestionIds;

        if (onAddQuestion) {
          await onAddQuestion(mainQuestion);
        }
      }

      handleCloseEditDialog();
      setEmptyQuestion(null);
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  // Part type and titles based on part number
  const partType = partNumber === 3 ? "conversation" : "talk";
  const partTitle =
    partNumber === 3 ? "Part 3: Conversations" : "Part 4: Talks";
  const partSubtitle =
    partNumber === 3
      ? "Listen to short conversations and answer questions"
      : "Listen to talks and answer questions";
  const partIcon =
    partNumber === 3 ? (
      <RecordVoiceOverIcon fontSize="small" />
    ) : (
      <CampaignIcon fontSize="small" />
    );
  const partLabel =
    partNumber === 3
      ? `Conversation ${currentQuestionIndex + 1}`
      : `Talk ${currentQuestionIndex + 1}`;

  // Empty state for when no questions exist
  if (questions.length === 0) {
    return (
      <Container maxWidth="lg">
        <PartContainer
          id={`part${partNumber}-section-empty`}
          title={partTitle}
          subtitle={`No ${
            partNumber === 3 ? "conversations" : "talks"
          } available. Please add one to get started.`}
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
            icon={partNumber === 3 ? <RecordVoiceOverIcon /> : <CampaignIcon />}
            title={`No ${
              partNumber === 3 ? "conversations" : "talks"
            } available`}
            message={`Click the "Add ${
              partType.charAt(0).toUpperCase() + partType.slice(1)
            }" button to create your first ${partType}.`}
          />
        </PartContainer>

        <Part3_4EditDialog
          key={
            dialogMode === "edit"
              ? `edit-${currentQuestion?.id ?? "new"}`
              : `add-${Date.now()}`
          }
          open={isEditDialogOpen}
          question={emptyQuestion || createEmptyQuestion()}
          partNumber={partNumber}
          onClose={handleCloseEditDialog}
          onSave={handleSaveQuestion}
          toeicQuestions={{}}
          mode={dialogMode}
        />
      </Container>
    );
  }

  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const borderColor = isDarkMode ? color.gray700 : color.gray300;
  const bgColor = isDarkMode ? color.gray800 : color.white;

  return (
    <>
      <PartContainer
        id={`part${partNumber}-section`}
        title={partTitle}
        subtitle={partSubtitle}
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
              <Paper
                elevation={3}
                sx={{
                  backgroundColor: bgColor,
                  borderRadius: "1rem",
                  p: 3,
                  mb: 2,
                  border: `1px solid ${borderColor}`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Chip
                  icon={partIcon}
                  label={partLabel}
                  color="primary"
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    backgroundColor: accentColor,
                    color: isDarkMode ? color.gray900 : color.white,
                    fontWeight: "bold",
                    "& .MuiChip-icon": {
                      color: isDarkMode ? color.gray900 : color.white,
                    },
                  }}
                />

                <Stack spacing={3}>
                  <AudioSection audioUrl={currentQuestion.audio} />
                  {currentQuestion.image && (
                    <ImageSection imageUrl={currentQuestion.image} />
                  )}
                  <TranscriptSection transcript={currentQuestion.transcript} />
                </Stack>
              </Paper>
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
            </Grid>
          </Grid>
        )}
      </PartContainer>

      {/* Dialogs */}
      <Part3_4EditDialog
        key={
          dialogMode === "edit"
            ? `edit-${currentQuestion?.id ?? "new"}`
            : `add-${Date.now()}`
        }
        open={isEditDialogOpen}
        question={
          dialogMode === "edit"
            ? currentQuestion || createEmptyQuestion()
            : emptyQuestion || createEmptyQuestion()
        }
        partNumber={partNumber}
        onClose={handleCloseEditDialog}
        onSave={handleSaveQuestion}
        toeicQuestions={dialogMode === "edit" ? toeicQuestions : {}}
        mode={dialogMode}
      />

      <DialogConfirm
        open={isDeleteDialogOpen}
        title="Confirm Deletion"
        content={`Are you sure you want to delete this ${partType}? This will also delete all associated questions. This action cannot be undone.`}
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
