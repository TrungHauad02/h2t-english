import React, { useEffect, useState, useRef } from 'react';
import { Fade, Box, Grid } from '@mui/material';
import { TestWriting } from 'interfaces';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SubjectIcon from '@mui/icons-material/Subject';
import TestSectionContainer from './common/TestSectionContainer';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { testWritingService, testPartService } from 'services';
import { toast } from 'react-toastify';
import { useErrors } from 'hooks/useErrors';
import { extractErrorMessages } from 'utils/extractErrorMessages';
import { WEConfirmDelete } from 'components/display';
import { 
  WritingTaskDetails, 
  WritingTabsPanel, 
  SelectWritingPrompt, 
  AddWritingDialog 
} from './writingSection/';

interface WritingSectionProps {
  partId: number;
  testItemIds: number[];
}

export function WritingSection({ partId, testItemIds }: WritingSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const { showError } = useErrors();
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Ref to store test item ids instead of state
  const listTestIdsRef = useRef<number[]>(testItemIds);

  // Ref to track pending status changes
  const pendingStatusChangesRef = useRef<Record<number, boolean>>({});

  // State management
  const [writings, setWritings] = useState<TestWriting[]>([]);
  const [selectedWritingId, setSelectedWritingId] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasMadeChanges, setHasMadeChanges] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Delete state
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const fetchWritings = async () => {
    try {
      if (partId) {
        const resData = await testWritingService.getByIdsAndStatus(listTestIdsRef.current);
        setWritings(resData.data);
        
        const newTestWritingIds = resData.data.map((testWriting: TestWriting) => testWriting.id);
        listTestIdsRef.current = newTestWritingIds;
        
        if (resData.data.length > 0 && !selectedWritingId) {
          setSelectedWritingId(resData.data[0].id);
        }

        // Reset pending status changes
        pendingStatusChangesRef.current = {};
      }
    } catch (error) {
      console.error("Error fetching writings:", error);
      showError({
        message: "Error fetching writing items",
        severity: "error",
        details: extractErrorMessages(error),
      });
    }
  };

  useEffect(() => {
    fetchWritings();
  }, [partId, testItemIds]);

  const handleSelectWriting = (writingId: number) => {
    setSelectedWritingId(writingId);
  };

  const handleAddWriting = () => {
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
        const newTestWritingIds = writings.map(writing => writing.id);
        await testPartService.patch(partId, {
          questions: newTestWritingIds,
        });
        listTestIdsRef.current = newTestWritingIds;
        const updatedWritings = writings.filter(w => w.status !== undefined);
        for (const writing of updatedWritings) {
          await testWritingService.patch(writing.id, { status: writing.status });
        }
      }
      
      
      // Reset change trackers
      setHasMadeChanges(false);
      pendingStatusChangesRef.current = {};
      
      // Show success message
      toast.success("Changes saved successfully");
      
      // Exit edit mode
      setIsEditMode(false);
      
      // Refresh data
      fetchWritings();
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
    if (hasMadeChanges || Object.keys(pendingStatusChangesRef.current).length > 0) {
      // Revert changes by fetching original data
      fetchWritings();
    }
    setIsEditMode(false);
    setHasMadeChanges(false);
    pendingStatusChangesRef.current = {};
  };

  const handleToggleStatus = async (writingId: number) => {
    const writingToUpdate = writings.find(w => w.id === writingId);
    if (!writingToUpdate) return;
  
    const newStatus = !writingToUpdate.status;
  
    if (newStatus === true) {
      const verifyResult = await testWritingService.verify(writingId);
      if (verifyResult.status !== "SUCCESS") {
        toast.error("Writing test not valid");
        return;
      }
    }
  
    pendingStatusChangesRef.current[writingId] = newStatus;
    setHasMadeChanges(true);
  
    const updatedWritings = writings.map(w =>
      w.id === writingId ? { ...w, status: newStatus } : w
    );
  
    setWritings(updatedWritings);
  };
  
  const onMoveLeft = (index: number) => {
    if (index <= 0) return;
    const updatedWritings = [...writings];
    [updatedWritings[index], updatedWritings[index - 1]] = [
      updatedWritings[index - 1],
      updatedWritings[index],
    ];
    setWritings(updatedWritings);
    setHasMadeChanges(true);
  };

  const onMoveRight = (index: number) => {
    if (index >= writings.length - 1) return;
    const updatedWritings = [...writings];
    [updatedWritings[index], updatedWritings[index + 1]] = [
      updatedWritings[index + 1],
      updatedWritings[index],
    ];
    setWritings(updatedWritings);
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

  const handleDeleteWriting = async () => {
    if (!deleteId) return;
    
    try {
      setIsDeleting(true);
      
      await testWritingService.remove(deleteId);
      
      const updatedWritingIds = listTestIdsRef.current.filter(id => id !== deleteId);
      await testPartService.patch(partId, {
        questions: updatedWritingIds,
      });
      
      listTestIdsRef.current = updatedWritingIds;
      
      // If the deleted writing was selected, select another one
      if (selectedWritingId === deleteId) {
        const remainingWritings = writings.filter(w => w.id !== deleteId);
        if (remainingWritings.length > 0) {
          setSelectedWritingId(remainingWritings[0].id);
        } else {
          setSelectedWritingId(null);
        }
      }
      
      toast.success("Writing task deleted successfully");
      fetchWritings();
    } catch (error) {
      console.error("Error deleting writing:", error);
      showError({
        message: "Error deleting writing task",
        severity: "error",
        details: extractErrorMessages(error),
      });
    } finally {
      setIsDeleting(false);
      handleCloseDeleteDialog();
    }
  };

  // Task details save handler
  const handleSaveTaskDetails = async (topic: string, minWords: number, maxWords: number) => {
    if (!selectedWritingId) return;

    try {
      await testWritingService.update(selectedWritingId, {
        id: selectedWritingId,
        topic,
        minWords,
        maxWords,
        status: selectedWriting?.status || false, 
      });

      // Refresh writings to reflect changes
      fetchWritings();
      
      toast.success("Writing task updated successfully");
    } catch (error) {
      console.error("Error saving writing task:", error);
      showError({
        message: "Error saving writing task",
        severity: "error",
        details: extractErrorMessages(error),
      });
    }
  };

  const selectedWriting = writings.find(writing => writing.id === selectedWritingId);
  const isEmpty = writings.length === 0;

  return (
    <>
      <TestSectionContainer
        id="writing-section"
        data-writing-section-container="true"
        title="Writing Section"
        icon={<SubjectIcon />}
        isEmpty={isEmpty}
        isEditMode={isEditMode}
        onAdd={handleAddWriting}
        onEdit={handleEnterEditMode}
        onSave={handleSaveChanges}
        onCancel={handleCancelEdit}
        onDelete={selectedWritingId ? () => handleOpenDeleteDialog(selectedWritingId) : undefined}
        emptyState={{
          icon: <EditNoteIcon fontSize="large" sx={{ color: isDarkMode ? color.teal300 : color.teal600 }} />,
          title: "No Writing Tasks Yet",
          description: "Writing tasks and questions would appear here."
        }}
      >
        <Fade in={true} timeout={500}>
          <Grid container spacing={3} ref={containerRef}>
            {/* Left sidebar for writing tabs */}
            <Grid item xs={12} md={3} ref={leftColumnRef}>
              <WritingTabsPanel
                writings={writings}
                selectedWritingId={selectedWritingId}
                handleSelectWriting={handleSelectWriting}
                isEditMode={isEditMode}
                onMoveLeft={onMoveLeft}
                onMoveRight={onMoveRight}
                onToggleStatus={handleToggleStatus}
                hasChanges={hasMadeChanges || Object.keys(pendingStatusChangesRef.current).length > 0}
              />
            </Grid>
            
            {/* Right content area */}
            <Grid item xs={12} md={9} ref={rightColumnRef}>
              {selectedWriting ? (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 3,
                  minHeight: 'calc(100vh - 150px)'
                }}>
                  {/* Writing Task Details Section */}
                  <WritingTaskDetails
                    topic={selectedWriting.topic}
                    minWords={selectedWriting.minWords}
                    maxWords={selectedWriting.maxWords}
                    isEditMode={isEditMode}
                    onSave={handleSaveTaskDetails}
                  />
                </Box>
              ) : (
                <SelectWritingPrompt
                  isEditMode={isEditMode}
                  handleAddWriting={handleAddWriting}
                />
              )}
            </Grid>
          </Grid>
        </Fade>
      </TestSectionContainer>
      
      <AddWritingDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        partId={partId}
        fetchWritings={fetchWritings}
        testItemIds={listTestIdsRef.current}
        setListTestIds={(newTestIds: number[]) => {
          listTestIdsRef.current = newTestIds;
        }}
      />
  
      {/* Delete Confirmation Dialog */}
      <WEConfirmDelete
        open={openDeleteDialog}
        onCancel={handleCloseDeleteDialog}
        onConfirm={handleDeleteWriting}
        isDeleting={isDeleting}
        resourceName={"this writing task"}
      />
    </>
  );
}

export default WritingSection;