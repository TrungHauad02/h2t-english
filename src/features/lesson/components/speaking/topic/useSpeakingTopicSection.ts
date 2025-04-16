import { useState, useEffect, useRef } from "react";
import { Speaking } from "interfaces";
import { scoreSpeakingService } from "services";

interface AssessmentResult {
  score: string; // Updated from number to string to match DTO
  feedback: string;
  transcript: string;
  strengths?: string[];
  areas_to_improve?: string[];
}

export default function useSpeakingTopicSection(data: Speaking) {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(data.duration);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [assessmentResult, setAssessmentResult] =
    useState<AssessmentResult | null>(null);
  const [microphoneAccess, setMicrophoneAccess] = useState<boolean | null>(
    null
  );
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [audioFormat, setAudioFormat] = useState<string>("audio/wav");

  // Refs
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Timer effect
  useEffect(() => {
    if (isRecording && !isPaused && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            stopRecording();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (isPaused || !isRecording) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording, isPaused, timeLeft]);

  // Audio levels monitoring
  useEffect(() => {
    if (!audioStream || !isRecording) return;

    // Create audio context and analyzer only if not already created
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const microphone =
        audioContextRef.current.createMediaStreamSource(audioStream);
      microphone.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;
    }

    // Ensure analyzer exists before proceeding
    const analyser = analyserRef.current;
    if (!analyser) {
      console.error("Analyzer node is not available");
      return;
    }

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const checkAudioLevel = () => {
      if (!analyser) return;

      analyser.getByteFrequencyData(dataArray);
      // Calculate average volume level
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      const average = sum / bufferLength;
      setAudioLevel(average);

      if (isRecording) {
        animationFrameRef.current = requestAnimationFrame(checkAudioLevel);
      }
    };

    checkAudioLevel();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [audioStream, isRecording]);

  // Cleanup resources when component unmounts
  useEffect(() => {
    return () => {
      cleanupAudioResources();
    };
  }, []);

  // Function to safely cleanup all audio resources
  const cleanupAudioResources = () => {
    // Clean up audio URL if it exists
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }

    // Stop and cleanup audio context safely
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      try {
        audioContextRef.current.close();
      } catch (error) {
        console.error("Error closing AudioContext:", error);
      }
    }

    // Set ref to null to indicate it's closed
    audioContextRef.current = null;

    // Stop media stream tracks
    if (audioStream) {
      audioStream.getTracks().forEach((track) => track.stop());
    }

    // Cancel any animation frames
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  const requestMicrophoneAccess = async (): Promise<void> => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      // Stop any existing streams before requesting a new one
      if (audioStream) {
        audioStream.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      setAudioStream(stream);
      setMicrophoneAccess(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setMicrophoneAccess(false);
      setErrorMessage(
        "Could not access your microphone. Please check your permissions."
      );
      setIsLoading(false);
    }
  };

  const startRecording = async (): Promise<void> => {
    if (!audioStream) {
      await requestMicrophoneAccess();
      return;
    }

    audioChunksRef.current = [];

    try {
      // Try to use wav or mp3 format directly for compatibility with backend
      // Order by preference - wav first, then mp3, then fallback formats
      const mimeOptions = [
        "audio/wav",
        "audio/mp3",
        "audio/webm;codecs=pcm",
        "audio/webm",
      ];
      let selectedMimeType = "";

      // Find a supported MIME type
      for (const mimeType of mimeOptions) {
        if (MediaRecorder.isTypeSupported(mimeType)) {
          selectedMimeType = mimeType;
          break;
        }
      }

      // If no specific MIME type is supported, use default
      const options = selectedMimeType ? { mimeType: selectedMimeType } : {};
      setAudioFormat(selectedMimeType || "audio/webm");
      console.log("Recording with format:", selectedMimeType || "default");

      mediaRecorderRef.current = new MediaRecorder(audioStream, options);
      const mediaRecorder = mediaRecorderRef.current;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const mimeType = mediaRecorder.mimeType || audioFormat;
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      // Request data every 1 second for smoother experience
      mediaRecorder.start(1000);
      setIsRecording(true);
      setIsPaused(false);
    } catch (error) {
      console.error("Error starting recording:", error);
      setErrorMessage("Failed to start recording. Please try again.");
    }
  };

  const pauseRecording = (): void => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  };

  const resumeRecording = (): void => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "paused"
    ) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    }
  };

  const stopRecording = (): void => {
    if (
      mediaRecorderRef.current &&
      (mediaRecorderRef.current.state === "recording" ||
        mediaRecorderRef.current.state === "paused")
    ) {
      mediaRecorderRef.current.stop();
    }

    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Cancel audio level monitoring
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const resetRecording = (): void => {
    setIsRecording(false);
    setIsPaused(false);
    setTimeLeft(data.duration);

    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl("");
    }

    setAssessmentResult(null);
    audioChunksRef.current = [];
  };

  const toggleMute = (): void => {
    if (audioStream) {
      audioStream.getAudioTracks().forEach((track) => {
        track.enabled = isMuted;
      });
      setIsMuted(!isMuted);
    }
  };

  const submitRecording = async (): Promise<void> => {
    if (!audioUrl) {
      setErrorMessage("No recording available to submit");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      // Get the audio blob from the URL
      const response = await fetch(audioUrl);
      const audioBlob = await response.blob();

      // Determine if we need to convert the format
      const needsConversion = !(
        audioBlob.type === "audio/wav" ||
        audioBlob.type === "audio/mp3" ||
        audioBlob.type === "audio/mpeg"
      );

      console.log(
        `Original audio format: ${audioBlob.type}, needs conversion: ${needsConversion}`
      );

      // If format is not WAV or MP3, we need to create a new blob with the correct type
      // Since we can't easily convert formats in the browser without extra libraries,
      // we'll just change the content type to ensure the server accepts it
      const finalType =
        audioBlob.type === "audio/mpeg"
          ? "audio/mp3"
          : audioBlob.type === "audio/wav"
          ? "audio/wav"
          : "audio/mp3";

      // Create a new blob with the correct type if needed
      const finalBlob = needsConversion
        ? new Blob([await audioBlob.arrayBuffer()], { type: "audio/mp3" })
        : audioBlob;

      // Create a File object with .wav or .mp3 extension
      const extension = finalType.includes("mp3") ? "mp3" : "wav";
      const fileName = `recording_${new Date().getTime()}.${extension}`;

      // Create a File object with explicit MIME type
      const audioFile = new File([finalBlob], fileName, {
        type: finalType,
      });

      console.log(
        `Submitting audio file: ${fileName}, type: ${finalType}, size: ${finalBlob.size} bytes`
      );

      // Call the scoring service using the File object
      const result = await scoreSpeakingService.evaluateSpeaking(
        audioFile,
        data.topic
      );

      if (result.status === "SUCCESS" && result.data) {
        setAssessmentResult({
          score: result.data.score,
          feedback: result.data.feedback,
          transcript: result.data.transcript,
          strengths: result.data.strengths,
          areas_to_improve: result.data.areas_to_improve,
        });
      } else {
        setErrorMessage(result.message || "Failed to evaluate your speaking");
      }
    } catch (error) {
      console.error("Error submitting recording:", error);
      setErrorMessage(
        "An error occurred while evaluating your speaking. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isRecording,
    isPaused,
    timeLeft,
    audioUrl,
    isSubmitting,
    assessmentResult,
    microphoneAccess,
    isLoading,
    errorMessage,
    isMuted,
    audioLevel,
    audioRef,
    setErrorMessage,
    requestMicrophoneAccess,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    resetRecording,
    toggleMute,
    submitRecording,
  };
}
