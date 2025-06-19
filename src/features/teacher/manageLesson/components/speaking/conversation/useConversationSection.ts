import { useEffect, useState, useRef } from "react";
import { SpeakingConversation, Voice } from "interfaces";
import { useErrors } from "hooks/useErrors";
import { ttsService } from "services/lesson/ttsService";
import { extractErrorMessages } from "utils/extractErrorMessages";
import { conversationService } from "services/lesson/conversationService";
import { useParams } from "react-router-dom";

export default function useConversationSection() {
  const { id } = useParams();
  const speakingId: number = Number(id);
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
    audioUrl: "",
  });
  const [voices, setVoices] = useState<Voice[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentPlayingId, setCurrentPlayingId] = useState<number | null>(null);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

    const fetchConversations = async () => {
      if (!speakingId) return;

      setIsLoading(true);
      try {
        const response = await conversationService.findBySpeakingId(speakingId);
        if (response.status === "SUCCESS") {
          const sortedConversations = (response.data as SpeakingConversation[]).sort(
            (a: SpeakingConversation, b: SpeakingConversation) => a.serial - b.serial
          );
          setConversations(sortedConversations);
        } else {
          showError({
            message: "Failed to fetch conversations",
            severity: "error",
            details: response.message,
          });
        }
      } catch (error) {
        showError({
          message: "Error fetching conversations",
          severity: "error",
          details: extractErrorMessages(error),
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchVoices();
    fetchConversations();

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
  }, [speakingId]);

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
      audioUrl: "",
    });
    setIsDialogOpen(true);
  };

  const handleEditConversation = (conversation: SpeakingConversation) => {
    setEditData({ ...conversation });
    setIsDialogOpen(true);
  };

  const handleSaveConversation = async () => {
    try {
      if (editData.id) {
        // Update existing conversation
        const response = await conversationService.update(
          editData.id,
          editData
        );
        if (response.status === "SUCCESS") {
          const updatedConversations = conversations.map((c) =>
            c.id === editData.id ? response.data : c
          );
          setConversations(updatedConversations);
        }
      } else {
        // Add new conversation with speakingId if provided
        if (speakingId) {
          const newConversationData = {
            ...editData,
            speakingId,
          };
          const response = await conversationService.create(
            newConversationData as SpeakingConversation
          );
          if (response.status === "SUCCESS") {
            setConversations([...conversations, response.data]);
          }
        }
      }
      setIsDialogOpen(false);
    } catch (error) {
      showError({
        message: "Error saving conversation",
        severity: "error",
        details: extractErrorMessages(error),
      });
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleDeleteConversation = async (id: number) => {
    try {
      const response = await conversationService.remove(id);
      if (response.status === "SUCCESS") {
        // Filter out the deleted conversation
        const updatedConversations = conversations.filter((c) => c.id !== id);

        // Sort conversations by their current serial numbers
        const sortedConversations = [...updatedConversations].sort(
          (a, b) => a.serial - b.serial
        );

        // Update serials to be sequential starting from 1
        const updatePromises = sortedConversations.map(
          async (conversation, index) => {
            const newSerial = index + 1;

            // Only update if serial number changed
            if (conversation.serial !== newSerial) {
              await conversationService.patch(conversation.id, {
                serial: newSerial,
              });
              // Update the serial in our local state
              conversation.serial = newSerial;
            }

            return conversation;
          }
        );

        // Wait for all updates to complete
        await Promise.all(updatePromises);

        // Update state with renumbered conversations
        setConversations(sortedConversations);
      }
    } catch (error) {
      showError({
        message: "Error deleting conversation",
        severity: "error",
        details: extractErrorMessages(error),
      });
    }
  };

  const handleEditMode = () => {
    setIsEditMode(true);
  };

  const handleSaveChanges = async () => {
    try {
      // Save all changes to backend by updating each conversation
      for (const conversation of conversations) {
        await conversationService.update(conversation.id, conversation);
      }
      setIsEditMode(false);
    } catch (error) {
      showError({
        message: "Error saving changes",
        severity: "error",
        details: extractErrorMessages(error),
      });
    }
  };

  const handleCancelEdit = () => {
    // Reload conversations from server to discard changes
    if (speakingId) {
      conversationService
        .findBySpeakingId(speakingId)
        .then((response) => {
          if (response.status === "SUCCESS") {
            setConversations(response.data);
          }
        })
        .catch((error) => {
          showError({
            message: "Error refreshing data",
            severity: "error",
            details: extractErrorMessages(error),
          });
        });
    }
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

  const handleGenerateAudio = async (text: string, voice: string) => {
    setIsGeneratingAudio(true);

    try {
      const resData = await ttsService.textToSpeech(text, voice);
      const reader = new FileReader();
      const audioBlob = new Blob([resData], { type: "audio/mpeg" });

      const base64Audio = await new Promise<string>((resolve) => {
        reader.onloadend = () => {
          // reader.result có dạng "data:audio/mpeg;base64,BASE64_STRING"
          resolve(reader.result as string);
        };
        reader.readAsDataURL(audioBlob);
      });

      setEditData({
        ...editData,
        audioUrl: base64Audio,
      });
    } catch (error) {
      showError({
        message: "Error generating audio",
        severity: "error",
        details: extractErrorMessages(error),
      });
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  // Add new move up/down functionality
  const onMoveUp = async (index: number) => {
    if (index > 0) {
      try {
        const updatedConversations = [...conversations];
        const currentConversation = updatedConversations[index];
        const upperConversation = updatedConversations[index - 1];

        // Swap serial numbers
        const tempSerial = currentConversation.serial;
        currentConversation.serial = upperConversation.serial;
        upperConversation.serial = tempSerial;

        // Update in backend
        await conversationService.patch(currentConversation.id, {
          serial: currentConversation.serial,
        });
        await conversationService.patch(upperConversation.id, {
          serial: upperConversation.serial,
        });

        // Swap positions in array
        updatedConversations[index] = upperConversation;
        updatedConversations[index - 1] = currentConversation;

        setConversations(updatedConversations);
      } catch (error) {
        showError({
          message: "Error moving conversation",
          severity: "error",
          details: extractErrorMessages(error),
        });
      }
    }
  };

  const onMoveDown = async (index: number) => {
    if (index < conversations.length - 1) {
      try {
        const updatedConversations = [...conversations];
        const currentConversation = updatedConversations[index];
        const lowerConversation = updatedConversations[index + 1];

        // Swap serial numbers
        const tempSerial = currentConversation.serial;
        currentConversation.serial = lowerConversation.serial;
        lowerConversation.serial = tempSerial;

        // Update in backend
        await conversationService.patch(currentConversation.id, {
          serial: currentConversation.serial,
        });
        await conversationService.patch(lowerConversation.id, {
          serial: lowerConversation.serial,
        });

        // Swap positions in array
        updatedConversations[index] = lowerConversation;
        updatedConversations[index + 1] = currentConversation;

        setConversations(updatedConversations);
      } catch (error) {
        showError({
          message: "Error moving conversation",
          severity: "error",
          details: extractErrorMessages(error),
        });
      }
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
    isLoading,
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
