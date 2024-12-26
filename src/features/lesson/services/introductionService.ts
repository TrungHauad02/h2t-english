export const introductionText = [
  {
    type: "topics",
    title: "Welcome to the Vocabulary Adventure!",
    subtitle:
      "Dive into new words and expressions that will help you explore and understand English in depth.",
    bodyText:
      "Each word is a step closer to mastering this topic. Take your time, review the flashcards, and see how your understanding grows!",
  },
  {
    type: "grammars",
    title: "Master the Grammar Rules!",
    subtitle:
      "Learn how grammar structures form the foundation of English and improve your language skills.",
    bodyText:
      "Understanding grammar will help you construct clear and correct sentences. Practice through exercises, review key points, and enhance your language fluency!",
  },
  {
    type: "listenings",
    title: "Sharpen Your Listening Skills!",
    subtitle: "Tune in to understand English in real-life contexts.",
    bodyText:
      "Listening is the key to mastering a language. In this section, you'll practice understanding different accents, tones, and conversational contexts. Focus on each exercise to improve your comprehension and connect more naturally with spoken English!",
  },
  {
    type: "readings",
    title: "Enhance Your Reading Skills!",
    subtitle:
      "Explore interesting texts and improve your ability to understand and analyze English readings.",
    bodyText:
      "Reading is the key to expanding your vocabulary, enhancing comprehension, and improving overall language proficiency. Engage with the text, reflect on key ideas, and check your understanding through questions!",
  },
  {
    type: "speakings",
    title: "Master Your Speaking Skills!",
    subtitle:
      "Enhance your ability to communicate in English with engaging speaking exercises.",
    bodyText:
      "Speaking fluently is one of the most important skills to master. Practice speaking with confidence, improve your pronunciation, and boost your ability to express yourself clearly in conversations.",
  },
  {
    type: "writings",
    title: "Unlock Your Writing Potential!",
    subtitle:
      "Master the art of expressing ideas clearly and effectively in English.",
    bodyText:
      "Writing is a powerful tool for communication. In this section, you'll learn to organize your thoughts, use correct grammar, and express your ideas in a way that resonates. Take each step to develop a structured and impactful writing style!",
  },
];

export const getIntroductionTextByType = (type: string) => {
  const introInfo = introductionText.find((item) => item.type === type) || {
    title: "",
    subtitle: "",
    bodyText: "",
  };
  return introInfo;
};
