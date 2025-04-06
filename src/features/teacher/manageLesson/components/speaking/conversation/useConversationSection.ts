import { useEffect, useState, useRef } from "react";
import { SpeakingConversation, Voice } from "interfaces";
import { useErrors } from "hooks/useErrors";
import { ttsService } from "services/lesson/ttsService";
import { extractErrorMessages } from "utils/extractErrorMessages";

export default function useConversationSection() {
  const [conversations, setConversations] = useState<SpeakingConversation[]>(
    []
  );
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editData, setEditData] = useState<SpeakingConversation>({
    id: 0,
    status: true,
    name: "",
    serial: 1,
    content: "",
  });
  const [voices, setVoices] = useState<Voice[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentPlayingId, setCurrentPlayingId] = useState<number | null>(null);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState<boolean>(false);
  const { showError } = useErrors();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const resData = await ttsService.getAvailableVoices();
        setVoices(resData.data);
      } catch (error) {
        showError({
          message: "Error fetching available voices",
          severity: "error",
          details: extractErrorMessages(error),
        });
      }
    };
    fetchVoices();
    // Initialize audio element
    audioRef.current = new Audio();
    audioRef.current.onended = () => {
      setIsPlaying(false);
      setCurrentPlayingId(null);
    };

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleInputChange = (field: keyof SpeakingConversation, value: any) => {
    setEditData({
      ...editData,
      [field]: value,
    });
  };

  const handleAddNewConversation = () => {
    setEditData({
      id: 0,
      status: true,
      name: "",
      serial:
        conversations.length > 0
          ? Math.max(...conversations.map((c) => c.serial)) + 1
          : 1,
      content: "",
    });
    setIsDialogOpen(true);
  };

  const handleEditConversation = (conversation: SpeakingConversation) => {
    setEditData({ ...conversation });
    setIsDialogOpen(true);
  };

  const handleSaveConversation = () => {
    if (editData.id) {
      // Update existing conversation
      const updatedConversations = conversations.map((c) =>
        c.id === editData.id ? editData : c
      );
      setConversations(updatedConversations);
    } else {
      // Add new conversation
      const newConversation = {
        ...editData,
        id: Math.max(...conversations.map((c) => c.id), 0) + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setConversations([...conversations, newConversation]);
    }
    setIsDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleDeleteConversation = (id: number) => {
    const updatedConversations = conversations.filter((c) => c.id !== id);
    setConversations(updatedConversations);
  };

  const handleEditMode = () => {
    setIsEditMode(true);
  };

  const handleSaveChanges = () => {
    // TODO: Save all changes to backend
    setIsEditMode(false);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  const handlePlayAudio = (audioUrl: string, id: number) => {
    if (!audioRef.current) return;

    if (isPlaying && currentPlayingId === id) {
      // Pause current audio
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentPlayingId(null);
    } else {
      // Play new audio
      if (isPlaying) {
        audioRef.current.pause();
      }

      audioRef.current.src = audioUrl;
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });

      setIsPlaying(true);
      setCurrentPlayingId(id);
    }
  };

  const handleGenerateAudio = (text: string, voice: string) => {
    setIsGeneratingAudio(true);

    // Mock API call to generate audio
    setTimeout(() => {
      // In a real app, we would make an API call to /convert endpoint
      setEditData({
        ...editData,
        audioUrl: "/basic_listening.mp3", // Mock response
      });
      setIsGeneratingAudio(false);
    }, 2000);
  };

  // Add new move up/down functionality
  const onMoveUp = (index: number) => {
    if (index > 0) {
      const updatedConversations = [...conversations];
      const temp = updatedConversations[index];
      updatedConversations[index] = updatedConversations[index - 1];
      updatedConversations[index - 1] = temp;

      // Update serial numbers
      updatedConversations[index].serial = index + 1;
      updatedConversations[index - 1].serial = index;

      setConversations(updatedConversations);
    }
  };

  const onMoveDown = (index: number) => {
    if (index < conversations.length - 1) {
      const updatedConversations = [...conversations];
      const temp = updatedConversations[index];
      updatedConversations[index] = updatedConversations[index + 1];
      updatedConversations[index + 1] = temp;

      // Update serial numbers
      updatedConversations[index].serial = index + 1;
      updatedConversations[index + 1].serial = index + 2;

      setConversations(updatedConversations);
    }
  };

  return {
    conversations,
    isEditMode,
    isDialogOpen,
    editData,
    voices,
    isPlaying,
    currentPlayingId,
    isGeneratingAudio,
    audioRef,
    handleInputChange,
    handleAddNewConversation,
    handleEditConversation,
    handleSaveConversation,
    handleCloseDialog,
    handleDeleteConversation,
    handleEditMode,
    handleSaveChanges,
    handleCancelEdit,
    handlePlayAudio,
    handleGenerateAudio,
    onMoveUp,
    onMoveDown,
  };
}
