import React, { useEffect, useState, useRef } from 'react';
import { Fade, Box, Grid, Paper, Typography, } from '@mui/material';
import { TestListening, QuestionSupportTestType } from 'interfaces';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import DescriptionIcon from '@mui/icons-material/Description';
import TestSectionContainer from './common/TestSectionContainer';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { testListeningService, testPartService } from 'services';
import { toast } from 'react-toastify';
import { useErrors } from 'hooks/useErrors';
import { extractErrorMessages } from 'utils/extractErrorMessages';
import { WEConfirmDelete } from 'components/display';
import QuestionsSection from './questionsSection/QuestionsSection';
import { 
  ListeningAudioSection, 
  ListeningTabsPanel, 
  SelectListeningPrompt, 
  AddListeningDialog,
  TranscriptDisplaySection
} from './listeningSection/';

interface ListeningSectionProps {
  partId: number;
  testItemIds: number[];
}

export function ListeningSection({ partId, testItemIds }: ListeningSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const { showError } = useErrors();
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Ref to store test item ids instead of state
  const listTestIdsRef = useRef<number[]>(testItemIds);

  // State management
  const [listenings, setListenings] = useState<TestListening[]>([]);
  const [selectedListeningId, setSelectedListeningId] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditingAudio, setIsEditingAudio] = useState(false);
  const [tempAudio, setTempAudio] = useState<string>("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [questionsRanges, setQuestionsRanges] = useState<Record<number, string>>({});
  const [hasMadeChanges, setHasMadeChanges] = useState(false);

  // Transcript editing state
  const [isEditingTranscript, setIsEditingTranscript] = useState(false);
  const [tempTranscript, setTempTranscript] = useState<string>("");

  // Delete state
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const type = "test-listenings" as QuestionSupportTestType;

  // Fetch listenings
  const fetchListenings = async () => {
    try {
      if (partId) {
        const resData = await testListeningService.getByIdsAndStatus(listTestIdsRef.current);
        setListenings(resData.data);
        
        const newTestListeningIds = resData.data.map((testListening: TestListening) => testListening.id);
        listTestIdsRef.current = newTestListeningIds;
        
        if (resData.data.length > 0 && !selectedListeningId) {
          setSelectedListeningId(resData.data[0].id);
        }
        
        calculateQuestionRanges(resData.data);
      }
    } catch (error) {
      console.error("Error fetching listenings:", error);
      showError({
        message: "Error fetching listening items",
        severity: "error",
        details: extractErrorMessages(error),
      });
    }
  };

  // Calculate question ranges
  const calculateQuestionRanges = (listeningsData: TestListening[]) => {
    let ranges: Record<number, string> = {};
    let startNumber = 1;
    
    listeningsData.forEach(listening => {
      if (listening.questions && listening.questions.length > 0) {
        const endNumber = startNumber + listening.questions.length - 1;
        ranges[listening.id] = `${startNumber} - ${endNumber}`;
        startNumber = endNumber + 1;
      } else {
        ranges[listening.id] = 'No questions';
      }
    });
    
    setQuestionsRanges(ranges);
  };

  useEffect(() => {
    fetchListenings();
  }, [partId, testItemIds]);

  const handleSelectListening = (listeningId: number) => {
    setSelectedListeningId(listeningId);
    // Reset transcript editing state when selecting new listening
    setIsEditingTranscript(false);
    setTempTranscript("");
    // Reset audio editing state when selecting new listening
    setIsEditingAudio(false);
    setTempAudio("");
  };

  const handleAddListening = () => {
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
        const newTestListeningIds = listenings.map(listening => listening.id);
        await testPartService.patch(partId, {
          questions: newTestListeningIds,
        });
        listTestIdsRef.current = newTestListeningIds;
        const updatedListenings = listenings.filter(l => l.status !== undefined);
        for (const listening of updatedListenings) {
          await testListeningService.patch(listening.id, { status: listening.status });
        }
      }
      
      // Reset change trackers
      setHasMadeChanges(false);
      
      // Show success message
      toast.success("Changes saved successfully");
      
      // Exit edit mode
      setIsEditMode(false);
      
      // Refresh data
      fetchListenings();
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
      fetchListenings();
    }
    setIsEditMode(false);
    setHasMadeChanges(false);
  };

  const handleToggleStatus = async (listeningId: number) => {
    const listeningToUpdate = listenings.find(l => l.id === listeningId);
    if (!listeningToUpdate) return;
  
    const newStatus = !listeningToUpdate.status;
  
    if (newStatus === true) {
      const verifyResult = await testListeningService.verify(listeningId);
      if (verifyResult.status !== "SUCCESS") {
        toast.error("Listening test not valid");
        return;
      }
    }
    const updatedListenings = listenings.map(listening => 
      listening.id === listeningId 
        ? { ...listening, status: newStatus } 
        : listening
    );
  
    setListenings(updatedListenings);
    setHasMadeChanges(true);
  };

  // Move items handlers
  const onMoveLeft = (index: number) => {
    if (index <= 0) return;
    const updatedListenings = [...listenings];
    [updatedListenings[index], updatedListenings[index - 1]] = [
      updatedListenings[index - 1],
      updatedListenings[index],
    ];
    setListenings(updatedListenings);
    calculateQuestionRanges(updatedListenings);
    setHasMadeChanges(true);
  };

  const onMoveRight = (index: number) => {
    if (index >= listenings.length - 1) return;
    const updatedListenings = [...listenings];
    [updatedListenings[index], updatedListenings[index + 1]] = [
      updatedListenings[index + 1],
      updatedListenings[index],
    ];
    setListenings(updatedListenings);
    calculateQuestionRanges(updatedListenings);
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

  const handleDeleteListening = async () => {
    if (!deleteId) return;
    
    try {
      setIsDeleting(true);
      
      await testListeningService.remove(deleteId);
      
      const updatedListeningIds = listTestIdsRef.current.filter(id => id !== deleteId);
      await testPartService.patch(partId, {
        questions: updatedListeningIds,
      });
      
      listTestIdsRef.current = updatedListeningIds;
      
      if (selectedListeningId === deleteId) {
        const remainingListenings = listenings.filter(l => l.id !== deleteId);
        if (remainingListenings.length > 0) {
          setSelectedListeningId(remainingListenings[0].id);
        } else {
          setSelectedListeningId(null);
        }
      }
      
      toast.success("Listening topic deleted successfully");
      fetchListenings();
    } catch (error) {
      console.error("Error deleting listening:", error);
      showError({
        message: "Error deleting listening topic",
        severity: "error",
        details: extractErrorMessages(error),
      });
    } finally {
      setIsDeleting(false);
      handleCloseDeleteDialog();
    }
  };

  // Transcript handlers
  const handleEditTranscript = () => {
    const selectedListening = listenings.find(l => l.id === selectedListeningId);
    setTempTranscript(selectedListening?.transcript || "");
    setIsEditingTranscript(true);
  };

  const handleTranscriptChange = (transcript: string) => {
    setTempTranscript(transcript);
  };

  const handleSaveTranscript = async () => {
    if (!selectedListeningId) return;
    
    try {
      await testListeningService.patch(selectedListeningId, { transcript: tempTranscript });
      
      // Update local state
      setListenings(prev => prev.map(listening => 
        listening.id === selectedListeningId 
          ? { ...listening, transcript: tempTranscript }
          : listening
      ));
      
      setIsEditingTranscript(false);
      toast.success("Transcript saved successfully");
    } catch (error) {
      console.error("Error saving transcript:", error);
      showError({
        message: "Error saving transcript",
        severity: "error",
        details: extractErrorMessages(error),
      });
    }
  };

  const handleCancelTranscriptEdit = () => {
    setIsEditingTranscript(false);
    setTempTranscript("");
  };

  // Audio handlers
  const handleEditAudio = () => {
    const selectedListening = listenings.find(l => l.id === selectedListeningId);
    setTempAudio(selectedListening?.audio || "");
    setIsEditingAudio(true);
  };

  const handleAudioChange = (base64: string) => {
    setTempAudio(base64);
  };

  const handleSaveAudio = async () => {
    if (!selectedListeningId) return;
    
    try {
      await testListeningService.patch(selectedListeningId, { audio: tempAudio });
      
      // Update local state
      setListenings(prev => prev.map(listening => 
        listening.id === selectedListeningId 
          ? { ...listening, audio: tempAudio }
          : listening
      ));
      
      setIsEditingAudio(false);
      toast.success("Audio saved successfully");
    } catch (error) {
      console.error("Error saving audio:", error);
      showError({
        message: "Error saving audio",
        severity: "error",
        details: extractErrorMessages(error),
      });
    }
  };

  const handleCancelAudioEdit = () => {
    setIsEditingAudio(false);
    setTempAudio("");
  };

  const selectedListening = listenings.find(listening => listening.id === selectedListeningId);
  const isEmpty = listenings.length === 0;
  
  // Get questions for the selected listening
  const selectedQuestions = selectedListening?.questions || [];

  return (
    <>
    <TestSectionContainer
      id="listening-section"
      data-listening-section-container="true"
      title="Listening Section"
      icon={<HeadphonesIcon />}
      isEmpty={isEmpty}
      isEditMode={isEditMode}
      onAdd={handleAddListening}
      onEdit={handleEnterEditMode}
      onSave={handleSaveChanges}
      onCancel={handleCancelEdit}
      onDelete={selectedListeningId ? () => handleOpenDeleteDialog(selectedListeningId) : undefined}
      emptyState={{
        icon: <AudiotrackIcon fontSize="large" sx={{ color: isDarkMode ? color.teal300 : color.teal600 }} />,
        title: "No Listening Content Yet",
        description: "Listening audio and questions would appear here."
      }}
    >
      <Fade in={true} timeout={500}>
        <Grid container spacing={3} ref={containerRef}>
          {/* Left sidebar for listening tabs */}
          <Grid item xs={12} md={3} ref={leftColumnRef}>
            <ListeningTabsPanel
              listenings={listenings}
              selectedListeningId={selectedListeningId}
              handleSelectListening={handleSelectListening}
              isEditMode={isEditMode}
              onMoveLeft={onMoveLeft}
              onMoveRight={onMoveRight}
              questionsRanges={questionsRanges}
              onToggleStatus={handleToggleStatus}
              hasChanges={hasMadeChanges}
            />
          </Grid>
          
          {/* Right content area */}
          <Grid item xs={12} md={9} ref={rightColumnRef}>
            {selectedListening ? (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 3,
                minHeight: 'calc(100vh - 150px)'
              }}>
                {/* Audio Player/Editor Section */}
                <Paper
                  elevation={3}
                  sx={{
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    backgroundColor: isDarkMode ? color.gray800 : color.white,
                    border: isDarkMode ? `1px solid ${color.gray700}` : 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: isDarkMode 
                        ? '0 8px 24px rgba(0, 0, 0, 0.25)' 
                        : '0 8px 24px rgba(0, 0, 0, 0.1)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      height: 6,
                      background: `linear-gradient(90deg, ${isDarkMode ? color.teal700 : color.teal400} 0%, ${isDarkMode ? color.emerald700 : color.emerald400} 100%)`
                    }}
                  />
                  <Box sx={{ p: 3 }}>
                    <ListeningAudioSection
                      audio={selectedListening.audio}
                      isEditingAudio={isEditingAudio}
                      tempAudio={tempAudio}
                      handleEditAudio={handleEditAudio}
                      handleAudioChange={handleAudioChange}
                      handleSaveAudio={handleSaveAudio}
                      handleCancelEdit={handleCancelAudioEdit}
                    />
                  </Box>
                </Paper>

                {/* Transcript Section */}
                <Paper
                  elevation={3}
                  sx={{
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    backgroundColor: isDarkMode ? color.gray800 : color.white,
                    border: isDarkMode ? `1px solid ${color.gray700}` : 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: isDarkMode 
                        ? '0 8px 24px rgba(0, 0, 0, 0.25)' 
                        : '0 8px 24px rgba(0, 0, 0, 0.1)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      height: 6,
                      background: `linear-gradient(90deg, ${isDarkMode ? color.emerald700 : color.emerald400} 0%, ${isDarkMode ? color.teal700 : color.teal400} 100%)`
                    }}
                  />
                  <Box sx={{ p: 3 }}>
                    <TranscriptDisplaySection
                      transcript={selectedListening.transcript}
                      isEditingTranscript={isEditingTranscript}
                      tempTranscript={tempTranscript}
                      handleEditTranscript={handleEditTranscript}
                      handleTranscriptChange={handleTranscriptChange}
                      handleSaveTranscript={handleSaveTranscript}
                      handleCancelEdit={handleCancelTranscriptEdit}
                    />
                  </Box>
                </Paper>
                
                {/* Questions Section */}
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    mb: 2
                  }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: isDarkMode ? color.teal300 : color.teal600,
                        fontWeight: 'bold',
                        position: 'relative',
                        pl: 1,
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          left: 0,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: 4,
                          height: 24,
                          borderRadius: '4px',
                          backgroundColor: isDarkMode ? color.teal400 : color.teal500
                        }
                      }}
                    >
                      <DescriptionIcon /> Listening Questions
                    </Typography>
                  </Box>
                  
                  {selectedListeningId && (
                    <QuestionsSection 
                      questions={selectedQuestions}
                      type={type}
                      parentId={selectedListeningId}
                    />
                  )}
                </Box>
              </Box>
            ) : (
              <SelectListeningPrompt
                isEditMode={isEditMode}
                handleAddListening={handleAddListening}
              />
            )}
          </Grid>
        </Grid>
      </Fade>
    </TestSectionContainer>
    
    <AddListeningDialog
      open={isAddDialogOpen}
      onClose={() => setIsAddDialogOpen(false)}
      partId={partId}
      fetchListenings={fetchListenings}
      testItemIds={listTestIdsRef.current}
      setListTestIds={(newTestIds: number[]) => {
        listTestIdsRef.current = newTestIds;
      }}
    />

    {/* Delete Confirmation Dialog */}
    <WEConfirmDelete
      open={openDeleteDialog}
      onCancel={handleCloseDeleteDialog}
      onConfirm={handleDeleteListening}
      isDeleting={isDeleting}
      resourceName={"this listening topic"}
    />
    </>
  );
}

export default ListeningSection;