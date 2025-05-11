import React, { useEffect, useState, useRef } from 'react';
import { Fade, Grid } from '@mui/material';
import { TestSpeaking } from 'interfaces';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import MicIcon from '@mui/icons-material/Mic';
import TestSectionContainer from './common/TestSectionContainer';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { testSpeakingService, testPartService } from 'services';
import { toast } from 'react-toastify';
import { useErrors } from 'hooks/useErrors';
import { extractErrorMessages } from 'utils/extractErrorMessages';
import { WEConfirmDelete } from 'components/display';
import { 
  SpeakingTabsPanel, 
  SelectSpeakingPrompt, 
  AddSpeakingDialog,
  SpeakingContent,
} from './speakingSection/';

interface SpeakingSectionProps {
  partId: number;
  testItemIds: number[];
}

export function SpeakingSection({ partId, testItemIds }: SpeakingSectionProps) {
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
  const [speakings, setSpeakings] = useState<TestSpeaking[]>([]);
  const [selectedSpeakingId, setSelectedSpeakingId] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [questionsRanges, setQuestionsRanges] = useState<Record<number, string>>({});
  const [hasMadeChanges, setHasMadeChanges] = useState(false);
  
  // Delete state
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch speakings
  const fetchSpeakings = async () => {
    try {
      if (partId) {
        const resData = await testSpeakingService.getByIdsAndStatus(listTestIdsRef.current);
        setSpeakings(resData.data);
        
        const newTestSpeakingIds = resData.data.map((testSpeaking: TestSpeaking) => testSpeaking.id);
        listTestIdsRef.current = newTestSpeakingIds;
        
        if (resData.data.length > 0 && !selectedSpeakingId) {
          setSelectedSpeakingId(resData.data[0].id);
        }
        
        // Reset pending status changes
        pendingStatusChangesRef.current = {};
        
        // Calculate question ranges for all speakings
        calculateQuestionRanges(resData.data);
      }
    } catch (error) {
      console.error("Error fetching speakings:", error);
      showError({
        message: "Error fetching speaking items",
        severity: "error",
        details: extractErrorMessages(error),
      });
    }
  };

  const handleToggleStatus = async (speakingId: number) => {
    const speakingToUpdate = speakings.find(s => s.id === speakingId);
    if (!speakingToUpdate) return;
  
    const newStatus = !speakingToUpdate.status;
  
    if (newStatus === true) {
      const verifyResult = await testSpeakingService.verify(speakingId);
      if (verifyResult.status !== "SUCCESS") {
        toast.error("Speaking test not valid");
        return;
      }
    }
  
    pendingStatusChangesRef.current[speakingId] = newStatus;
    setHasMadeChanges(true);
  
    const updatedSpeakings = speakings.map(s =>
      s.id === speakingId ? { ...s, status: newStatus } : s
    );
  
    setSpeakings(updatedSpeakings);
  };
  

  // Calculate question ranges
  const calculateQuestionRanges = (speakingsData: TestSpeaking[]) => {
    let ranges: Record<number, string> = {};
    let startNumber = 1;
    
    speakingsData.forEach(speaking => {
      if (speaking.questions && speaking.questions.length > 0) {
        const endNumber = startNumber + speaking.questions.length - 1;
        ranges[speaking.id] = `${startNumber} - ${endNumber}`;
        startNumber = endNumber + 1;
      } else {
        ranges[speaking.id] = 'No questions';
      }
    });
    
    setQuestionsRanges(ranges);
  };

  useEffect(() => {
    fetchSpeakings();
  }, [partId, testItemIds]);

  const handleSelectSpeaking = (speakingId: number) => {
    setSelectedSpeakingId(speakingId);
  };

  const handleAddSpeaking = () => {
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
        const newTestSpeakingIds = speakings.map(speaking => speaking.id);
        await testPartService.patch(partId, {
          questions: newTestSpeakingIds,
        });
        listTestIdsRef.current = newTestSpeakingIds;
        const updatedSpeakings = speakings.filter(s => s.status !== undefined);
        for (const speaking of updatedSpeakings) {
          await testSpeakingService.patch(speaking.id, { status: speaking.status });
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
      fetchSpeakings();
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
      fetchSpeakings();
    }
    setIsEditMode(false);
    setHasMadeChanges(false);
    pendingStatusChangesRef.current = {};
  };
  const onMoveLeft = (index: number) => {
    if (index <= 0) return;
    const updatedSpeakings = [...speakings];
    [updatedSpeakings[index], updatedSpeakings[index - 1]] = [
      updatedSpeakings[index - 1],
      updatedSpeakings[index],
    ];
    setSpeakings(updatedSpeakings);
    calculateQuestionRanges(updatedSpeakings);
    setHasMadeChanges(true);
  };

  const onMoveRight = (index: number) => {
    if (index >= speakings.length - 1) return;
    const updatedSpeakings = [...speakings];
    [updatedSpeakings[index], updatedSpeakings[index + 1]] = [
      updatedSpeakings[index + 1],
      updatedSpeakings[index],
    ];
    setSpeakings(updatedSpeakings);
    calculateQuestionRanges(updatedSpeakings);
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

  const handleDeleteSpeaking = async () => {
    if (!deleteId) return;
    
    try {
      setIsDeleting(true);
      
      await testSpeakingService.remove(deleteId);
      
      const updatedSpeakingIds = listTestIdsRef.current.filter(id => id !== deleteId);
      await testPartService.patch(partId, {
        questions: updatedSpeakingIds,
      });
      
      listTestIdsRef.current = updatedSpeakingIds;
      
      // If the deleted speaking was selected, select another one
      if (selectedSpeakingId === deleteId) {
        const remainingSpeakings = speakings.filter(s => s.id !== deleteId);
        if (remainingSpeakings.length > 0) {
          setSelectedSpeakingId(remainingSpeakings[0].id);
        } else {
          setSelectedSpeakingId(null);
        }
      }
      
      toast.success("Speaking topic deleted successfully");
      fetchSpeakings();
    } catch (error) {
      console.error("Error deleting speaking:", error);
      showError({
        message: "Error deleting speaking topic",
        severity: "error",
        details: extractErrorMessages(error),
      });
    } finally {
      setIsDeleting(false);
      handleCloseDeleteDialog();
    }
  };

  const selectedSpeaking = speakings.find(speaking => speaking.id === selectedSpeakingId);
  const isEmpty = speakings.length === 0;

  return (
    <>
      <TestSectionContainer
        id="speaking-section"
        data-speaking-section-container="true"
        title="Speaking Section"
        icon={<RecordVoiceOverIcon />}
        isEmpty={isEmpty}
        isEditMode={isEditMode}
        onAdd={handleAddSpeaking}
        onEdit={handleEnterEditMode}
        onSave={handleSaveChanges}
        onCancel={handleCancelEdit}
        onDelete={selectedSpeakingId ? () => handleOpenDeleteDialog(selectedSpeakingId) : undefined}
        emptyState={{
          icon: <MicIcon fontSize="large" sx={{ color: isDarkMode ? color.teal300 : color.teal600 }} />,
          title: "No Speaking Content Yet",
          description: "Speaking topics and questions would appear here."
        }}
      >
        <Fade in={true} timeout={500}>
          <Grid container spacing={3} ref={containerRef}>
            {/* Left sidebar for speaking tabs */}
            <Grid item xs={12} md={3} ref={leftColumnRef}>
              <SpeakingTabsPanel
                speakings={speakings}
                selectedSpeakingId={selectedSpeakingId}
                handleSelectSpeaking={handleSelectSpeaking}
                isEditMode={isEditMode}
                onMoveLeft={onMoveLeft}
                onMoveRight={onMoveRight}
                questionsRanges={questionsRanges}
                onToggleStatus={handleToggleStatus}
                hasChanges={hasMadeChanges || Object.keys(pendingStatusChangesRef.current).length > 0}
              />
            </Grid>
            
            {/* Right content area */}
            <Grid item xs={12} md={9} ref={rightColumnRef}>
              {selectedSpeaking ? (
                <SpeakingContent 
                  selectedSpeaking={selectedSpeaking}
                  isEditMode={isEditMode}
                  fetchSpeakings={fetchSpeakings}
                />
              ) : (
                <SelectSpeakingPrompt
                  isEditMode={isEditMode}
                  handleAddSpeaking={handleAddSpeaking}
                />
              )}
            </Grid>
          </Grid>
        </Fade>
      </TestSectionContainer>
      
      {/* Add Dialog */}
      <AddSpeakingDialog
        type={"test-speakings"}
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        partId={partId}
        testItems={listTestIdsRef.current}
        fetchSpeakings={fetchSpeakings}
        setListTestIds={(newTestIds: number[]) => {
          listTestIdsRef.current = newTestIds;
        }}
      />
      
      {/* Delete Confirmation Dialog */}
      <WEConfirmDelete
        open={openDeleteDialog}
        onCancel={handleCloseDeleteDialog}
        onConfirm={handleDeleteSpeaking}
        isDeleting={isDeleting}
        resourceName={speakings.find(s => s.id === deleteId)?.title || "this speaking topic"}
      />
    </>
  );
}

export default SpeakingSection;