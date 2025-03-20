export const mockData = {
  // Mock data for initial conversation
  initialData: [
    {
      id: 1,
      status: true,
      name: "Character 1",
      serial: 1,
      content:
        "Hello, how are you today? I hope you're having a great day. Let's practice English conversation together.",
      audioUrl: "/basic_listening.mp3",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      status: true,
      name: "Character 2",
      serial: 2,
      content:
        "I'm doing well, thank you! Yes, I'd love to practice English with you. What topics are you interested in discussing?",
      audioUrl: "/basic_listening.mp3",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      status: false,
      name: "Character 1",
      serial: 3,
      content:
        "I enjoy talking about movies, books, and travel. Have you watched any good movies lately?",
      audioUrl: "/basic_listening.mp3",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],

  // Mock data for evaluation results
  mockEvaluationData: {
    score: 85,
    transcripts: {
      1: "Hello, how are you today? I hope you're having a great day. Let's practice English conversation together.",
      3: "I enjoy talking about movies, books, and travel. Have you watched any good movies lately?",
    },
    feedback:
      "Overall, your pronunciation is clear and your intonation follows natural English speech patterns. Your pace is appropriate, making it easy for listeners to understand your speech. Work on emphasizing important words more distinctly to add better meaning to your sentences.",
    strengths: [
      "Clear pronunciation of most words",
      "Good speech rhythm and pacing",
      "Natural intonation patterns",
      "Proper use of contractions in casual speech",
    ],
    areas_to_improve: [
      "Some difficulty with 'r' and 'l' sounds",
      "Word stress patterns need more emphasis",
      "Rising intonation at the end of statements",
      "Occasional hesitation between phrases",
    ],
  },
};
