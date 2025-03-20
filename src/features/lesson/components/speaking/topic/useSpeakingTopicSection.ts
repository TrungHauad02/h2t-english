import { useState, useEffect, useRef } from "react";
import { Speaking } from "interfaces";

interface AssessmentResult {
  score: number;
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

  // Refs
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

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
    if (!audioStream) return;

    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(audioStream);
    microphone.connect(analyser);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const checkAudioLevel = () => {
      analyser.getByteFrequencyData(dataArray);
      // Calculate average volume level
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      const average = sum / bufferLength;
      setAudioLevel(average);

      if (isRecording) {
        requestAnimationFrame(checkAudioLevel);
      }
    };

    if (isRecording) {
      checkAudioLevel();
    }

    return () => {
      microphone.disconnect();
      audioContext.close();
    };
  }, [audioStream, isRecording]);

  const requestMicrophoneAccess = async (): Promise<void> => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
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
      const mediaRecorder = new MediaRecorder(audioStream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      mediaRecorder.start();
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

  const submitRecording = (): void => {
    setIsSubmitting(true);

    // Enhanced mock assessment result
    const enhancedMockResult: AssessmentResult = {
      score: 87,
      feedback:
        "Good job! Your pronunciation was clear and you covered the main points of the topic. Try to expand your vocabulary and use more complex sentence structures in future attempts.",
      transcript:
        "Today I will talk about artificial intelligence. AI has become an important part of our daily lives. It helps us with many tasks like searching information, recommending products, and even driving cars. However, there are also concerns about privacy and job displacement. I think AI technology should be developed responsibly with proper regulations. Overall, AI offers great benefits but we need to be careful about potential risks.",
      strengths: [
        "Clear pronunciation and intonation",
        "Good coverage of main topic points",
        "Logical structure with introduction and conclusion",
      ],
      areas_to_improve: [
        "Use more complex vocabulary",
        "Develop more detailed examples",
        "Incorporate more varied sentence structures",
      ],
    };

    // Simulate API call with a timeout
    setTimeout(() => {
      setAssessmentResult(enhancedMockResult);
      setIsSubmitting(false);
    }, 2000);
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
