import React, { useEffect, useState, useRef } from 'react';
import { Fade, Box, Grid } from '@mui/material';
import { TestReading, QuestionSupportTestType } from 'interfaces';
import SubjectIcon from '@mui/icons-material/Subject';
import BookIcon from '@mui/icons-material/Book';
import TestSectionContainer from './common/TestSectionContainer';
import { testReadingService, testPartService } from 'services';
import { toast } from 'react-toastify';
import { useErrors } from 'hooks/useErrors';
import { extractErrorMessages } from 'utils/extractErrorMessages';
import { WEConfirmDelete } from 'components/display';
import QuestionsSection from './questionsSection/QuestionsSection';
import { 
  ReadingDocument, 
  ReadingPassagesPanel, 
  SelectReadingPrompt, 
  AddReadingDialog 
} from './readingSection/';

interface ReadingSectionProps {
  partId: number;
  testItemIds: number[];
}

export function ReadingSection({ partId, testItemIds }: ReadingSectionProps) {
  const { showError } = useErrors();
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Ref to store test item ids instead of state
  const listTestIdsRef = useRef<number[]>(testItemIds);

  // State management
  const [readings, setReadings] = useState<TestReading[]>([]);
  const [selectedReadingId, setSelectedReadingId] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditingDocument, setIsEditingDocument] = useState(false);
  const [tempDocument, setTempDocument] = useState<string>("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [questionsRanges, setQuestionsRanges] = useState<Record<number, string>>({});
  const [hasMadeChanges, setHasMadeChanges] = useState(false);

  // Delete state
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const type = "test-readings" as QuestionSupportTestType;

  // Fetch readings
  const fetchReadings = async () => {
    try {
      if (partId) {
        const resData = await testReadingService.getByIds(listTestIdsRef.current);
        setReadings(resData.data);
        
        const newTestReadingIds = resData.data.map((testReading: TestReading) => testReading.id);
        listTestIdsRef.current = newTestReadingIds;
        
        if (resData.data.length > 0 && !selectedReadingId) {
          setSelectedReadingId(resData.data[0].id);
        }
        
        // Calculate question ranges for all readings
        calculateQuestionRanges(resData.data);
      }
    } catch (error) {
      console.error("Error fetching readings:", error);
      showError({
        message: "Error fetching reading items",
        severity: "error",
        details: extractErrorMessages(error),
      });
    }
  };

  // Calculate question ranges
  const calculateQuestionRanges = (readingsData: TestReading[]) => {
    let ranges: Record<number, string> = {};
    let startNumber = 1;
    
    readingsData.forEach(reading => {
      if (reading.questions && reading.questions.length > 0) {
        const endNumber = startNumber + reading.questions.length - 1;
        ranges[reading.id] = `${startNumber} - ${endNumber}`;
        startNumber = endNumber + 1;
      } else {
        ranges[reading.id] = 'No questions';
      }
    });
    
    setQuestionsRanges(ranges);
  };

  useEffect(() => {
    fetchReadings();
  }, [partId, testItemIds]);

  const handleSelectReading = (readingId: number) => {
    setSelectedReadingId(readingId);
  };

  const handleAddReading = () => {
    setIsAddDialogOpen(true);
  };

  // Edit mode handlers
  const handleEnterEditMode = () => {
    setIsEditMode(prevMode => !prevMode);
  };

  const handleSaveChanges = async () => {
    try {
      // Save order changes
      if (hasMadeChanges) {
        const newTestReadingIds = readings.map(reading => reading.id);
        await testPartService.patch(partId, {
          questions: newTestReadingIds,
        });
        listTestIdsRef.current = newTestReadingIds;
      }
      
      // Save status changes if needed
      const updatedReadings = readings.filter(r => r.status !== undefined);
      for (const reading of updatedReadings) {
        await testReadingService.update(reading.id, { ...reading });
      }
      
      // Reset change trackers
      setHasMadeChanges(false);
      
      // Show success message
      toast.success("Changes saved successfully");
      
      // Exit edit mode
      setIsEditMode(false);
      
      // Refresh data
      fetchReadings();
    } catch (error) {
      console.error("Error saving changes:", error);
      showError({
        message: "Error saving changes",
        severity: "error",
        details: extractErrorMessages(error),
      });
    }
  };

  const handleCancelEdit = () => {
    if (hasMadeChanges) {
      // Revert changes by fetching original data
      fetchReadings();
    }
    setIsEditMode(false);
    setHasMadeChanges(false);
  };

  // Toggle reading status
  const handleToggleStatus = (readingId: number) => {
    const updatedReadings = readings.map(reading => 
      reading.id === readingId 
        ? { ...reading, status: !reading.status } 
        : reading
    );
    
    setReadings(updatedReadings);
    setHasMadeChanges(true);
  };

  // Move items handlers
  const onMoveLeft = (index: number) => {
    if (index <= 0) return;
    const updatedReadings = [...readings];
    [updatedReadings[index], updatedReadings[index - 1]] = [
      updatedReadings[index - 1],
      updatedReadings[index],
    ];
    setReadings(updatedReadings);
    calculateQuestionRanges(updatedReadings);
    setHasMadeChanges(true);
  };

  const onMoveRight = (index: number) => {
    if (index >= readings.length - 1) return;
    const updatedReadings = [...readings];
    [updatedReadings[index], updatedReadings[index + 1]] = [
      updatedReadings[index + 1],
      updatedReadings[index],
    ];
    setReadings(updatedReadings);
    calculateQuestionRanges(updatedReadings);
    setHasMadeChanges(true);
  };

  // Delete handlers
  const handleOpenDeleteDialog = (id: number) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeleteId(null);
  };

  const handleDeleteReading = async () => {
    if (!deleteId) return;
    
    try {
      setIsDeleting(true);
      
      await testReadingService.remove(deleteId);
      
      const updatedReadingIds = listTestIdsRef.current.filter(id => id !== deleteId);
      await testPartService.patch(partId, {
        questions: updatedReadingIds,
      });
      
      listTestIdsRef.current = updatedReadingIds;
      
      // If the deleted reading was selected, select another one
      if (selectedReadingId === deleteId) {
        const remainingReadings = readings.filter(r => r.id !== deleteId);
        if (remainingReadings.length > 0) {
          setSelectedReadingId(remainingReadings[0].id);
        } else {
          setSelectedReadingId(null);
        }
      }
      
      toast.success("Reading topic deleted successfully");
      fetchReadings();
    } catch (error) {
      console.error("Error deleting reading:", error);
      showError({
        message: "Error deleting reading topic",
        severity: "error",
        details: extractErrorMessages(error),
      });
    } finally {
      setIsDeleting(false);
      handleCloseDeleteDialog();
    }
  };

  const selectedReading = readings.find(reading => reading.id === selectedReadingId);
  const isEmpty = readings.length === 0;
  
  // Get questions for the selected reading
  const selectedQuestions = selectedReading?.questions || [];

  return (
    <>
    <TestSectionContainer
      id="reading-section"
      data-reading-section-container="true"
      title="Reading Section"
      icon={<SubjectIcon />}
      isEmpty={isEmpty}
      isEditMode={isEditMode}
      onAdd={handleAddReading}
      onEdit={handleEnterEditMode}
      onSave={handleSaveChanges}
      onCancel={handleCancelEdit}
      onDelete={selectedReadingId ? () => handleOpenDeleteDialog(selectedReadingId) : undefined}
      emptyState={{
        icon: <BookIcon />,
        title: "No Reading Content Yet",
        description: "Reading passages and questions would appear here."
      }}
    >
      <Fade in={true} timeout={500}>
        <Grid container spacing={3} ref={containerRef}>
          {/* Left sidebar for reading tabs */}
          <Grid item xs={12} md={3} ref={leftColumnRef}>
            <ReadingPassagesPanel
              readings={readings}
              selectedReadingId={selectedReadingId}
              handleSelectReading={handleSelectReading}
              isEditMode={isEditMode}
              onMoveLeft={onMoveLeft}
              onMoveRight={onMoveRight}
              handleAddReading={handleAddReading}
              questionsRanges={questionsRanges}
              onToggleStatus={handleToggleStatus}
              hasChanges={hasMadeChanges}
            />
          </Grid>
          
          {/* Right content area */}
          <Grid item xs={12} md={9} ref={rightColumnRef}>
            {selectedReading ? (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 3,
                minHeight: 'calc(100vh - 150px)'
              }}>
                {/* Document Viewer/Editor Section */}
                <ReadingDocument
                  file={selectedReading.file}
                  isEditingDocument={isEditingDocument}
                  tempDocument={tempDocument}
                  handleEditDocument={() => setIsEditingDocument(true)}
                  handleDocumentChange={(base64: string) => setTempDocument(base64)}
                  handleSaveDocument={() => setIsEditingDocument(false)}
                  handleCancelEdit={() => {
                    setIsEditingDocument(false);
                    setTempDocument("");
                  }}
                />
                
                {/* Questions Section */}
                {selectedReadingId && (
                  <QuestionsSection 
                    questions={selectedQuestions}
                    type={type}
                    parentId={selectedReadingId}
                  />
                )}
              </Box>
            ) : (
              <SelectReadingPrompt
                isEditMode={isEditMode}
                handleAddReading={handleAddReading}
              />
            )}
          </Grid>
        </Grid>
      </Fade>
    </TestSectionContainer>
    
    <AddReadingDialog
      open={isAddDialogOpen}
      onClose={() => setIsAddDialogOpen(false)}
      partId={partId}
      fetchReadings={fetchReadings}
      testItemIds={listTestIdsRef.current}
      setListTestIds={(newTestIds: number[]) => {
        listTestIdsRef.current = newTestIds;
      }}
    />

    {/* Delete Confirmation Dialog */}
    <WEConfirmDelete
      open={openDeleteDialog}
      onCancel={handleCloseDeleteDialog}
      onConfirm={handleDeleteReading}
      isDeleting={isDeleting}
      resourceName={"this reading topic"}
    />
    </>
  );
}

export default ReadingSection;