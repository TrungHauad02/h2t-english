import {
  Listening,
  Reading,
  Speaking,
  Topic,
  Writing,
  Grammar,
  Vocabulary,
  WordType,
} from "interfaces";

const topics: Topic[] = [
  {
    id: "1",
    title: "Introduction to Grammar",
    serial: 1,
    image:
      "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "Basics of grammar",
    status: true,
  },
  {
    id: "2",
    title: "Tenses Overview",
    serial: 2,
    image:
      "https://plus.unsplash.com/premium_photo-1683887033937-edf8d23dd67f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHwwfHx8MA%3D%3D",
    description: "Learn about tenses",
    status: true,
  },
  {
    id: "3",
    title: "Parts of Speech",
    serial: 3,
    image:
      "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "Detailed explanation of parts of speech",
    status: true,
  },
  {
    id: "4",
    title: "Sentence Structure",
    serial: 4,
    image:
      "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "Forming sentences correctly",
    status: true,
  },
  {
    id: "5",
    title: "Verb Usage",
    serial: 5,
    image:
      "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "How to use verbs",
    status: true,
  },
  {
    id: "6",
    title: "Noun Types",
    serial: 6,
    image:
      "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "Types of nouns",
    status: true,
  },
  {
    id: "7",
    title: "Adjectives and Adverbs",
    serial: 7,
    image:
      "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "Modifiers in sentences",
    status: true,
  },
  {
    id: "8",
    title: "Punctuation Rules",
    serial: 8,
    image:
      "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "How to punctuate correctly",
    status: true,
  },
  {
    id: "9",
    title: "Common Mistakes",
    serial: 9,
    image:
      "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "Avoid common grammar errors",
    status: true,
  },
  {
    id: "10",
    title: "Advanced Grammar",
    serial: 10,
    image:
      "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "For advanced learners",
    status: true,
  },
];

const grammars: Grammar[] = [
  {
    id: "1",
    title: "Present Simple",
    serial: 1,
    image:
      "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "Explanation of present simple",
    status: true,
    content: "Subject + Verb(s/es)",
    example: "She works every day.",
    file: "./document.docx",
  },
  {
    id: "2",
    title: "Past Simple",
    serial: 2,
    image:
      "https://plus.unsplash.com/premium_photo-1683887033858-be37b32f17a9?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Explanation of past simple",
    status: true,
    content: "Subject + Verb-ed",
    example: "He played yesterday.",
    file: "./document.docx",
  },
  {
    id: "3",
    title: "Future Simple",
    serial: 3,
    image: "future_simple.jpg",
    description: "Explanation of future simple",
    status: true,
    content: "Subject + will + Verb",
    example: "They will travel tomorrow.",
    file: "./document.docx",
  },
  {
    id: "4",
    title: "Present Continuous",
    serial: 4,
    image: "present_continuous.jpg",
    description: "Explanation of present continuous",
    status: true,
    content: "Subject + is/are/am + Verb-ing",
    example: "I am studying now.",
    file: "./document.docx",
  },
  {
    id: "5",
    title: "Past Continuous",
    serial: 5,
    image: "past_continuous.jpg",
    description: "Explanation of past continuous",
    status: true,
    content: "Subject + was/were + Verb-ing",
    example: "She was reading.",
    file: "./document.docx",
  },
  {
    id: "6",
    title: "Future Continuous",
    serial: 6,
    image: "future_continuous.jpg",
    description: "Explanation of future continuous",
    status: true,
    content: "Subject + will be + Verb-ing",
    example: "They will be working.",
    file: "./document.docx",
  },
  {
    id: "7",
    title: "Present Perfect",
    serial: 7,
    image: "present_perfect.jpg",
    description: "Explanation of present perfect",
    status: true,
    content: "Subject + has/have + Verb-ed",
    example: "I have finished.",
    file: "./document.docx",
  },
  {
    id: "8",
    title: "Past Perfect",
    serial: 8,
    image: "past_perfect.jpg",
    description: "Explanation of past perfect",
    status: true,
    content: "Subject + had + Verb-ed",
    example: "He had left.",
    file: "./document.docx",
  },
  {
    id: "9",
    title: "Future Perfect",
    serial: 9,
    image: "future_perfect.jpg",
    description: "Explanation of future perfect",
    status: true,
    content: "Subject + will have + Verb-ed",
    example: "They will have arrived.",
    file: "./document.docx",
  },
  {
    id: "10",
    title: "Conditional Sentences",
    serial: 10,
    image: "conditionals.jpg",
    description: "Explanation of conditionals",
    status: true,
    content: "If + Subject + Verb, Subject + Verb",
    example: "If it rains, I will stay.",
    file: "./document.docx",
  },
];

const readings: Reading[] = [
  {
    id: "1",
    title: "Reading Basics",
    serial: 1,
    image:
      "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "Introduction to reading skills",
    status: true,
    file: "reading_basics.pdf",
  },
  {
    id: "2",
    title: "Comprehension",
    serial: 2,
    image: "comprehension.jpg",
    description: "Improve comprehension skills",
    status: true,
    file: "comprehension.pdf",
  },
  {
    id: "3",
    title: "Analyzing Texts",
    serial: 3,
    image: "analyzing_texts.jpg",
    description: "Learn to analyze texts",
    status: true,
    file: "analyzing_texts.pdf",
  },
  {
    id: "4",
    title: "Fiction Stories",
    serial: 4,
    image: "fiction.jpg",
    description: "Understanding fiction",
    status: true,
    file: "fiction.pdf",
  },
  {
    id: "5",
    title: "Non-Fiction",
    serial: 5,
    image: "non_fiction.jpg",
    description: "Understanding non-fiction",
    status: true,
    file: "non_fiction.pdf",
  },
  {
    id: "6",
    title: "Poetry",
    serial: 6,
    image: "poetry.jpg",
    description: "Learn about poetry",
    status: true,
    file: "poetry.pdf",
  },
  {
    id: "7",
    title: "Critical Reading",
    serial: 7,
    image: "critical_reading.jpg",
    description: "Improve critical reading",
    status: true,
    file: "critical_reading.pdf",
  },
  {
    id: "8",
    title: "Summarizing",
    serial: 8,
    image: "summarizing.jpg",
    description: "Learn summarizing skills",
    status: true,
    file: "summarizing.pdf",
  },
  {
    id: "9",
    title: "Skimming",
    serial: 9,
    image: "skimming.jpg",
    description: "Skimming techniques",
    status: true,
    file: "skimming.pdf",
  },
  {
    id: "10",
    title: "Scanning",
    serial: 10,
    image: "scanning.jpg",
    description: "Scanning techniques",
    status: true,
    file: "scanning.pdf",
  },
];

const speakings: Speaking[] = [
  {
    id: "1",
    title: "Introduction Speech",
    serial: 1,
    image:
      "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "How to introduce yourself",
    status: true,
    topic: "Self-Introduction",
    duration: 3,
  },
  {
    id: "2",
    title: "Describing People",
    serial: 2,
    image: "describing_people.jpg",
    description: "Learn to describe people",
    status: true,
    topic: "People",
    duration: 5,
  },
  {
    id: "3",
    title: "Describing Places",
    serial: 3,
    image: "describing_places.jpg",
    description: "Learn to describe places",
    status: true,
    topic: "Places",
    duration: 4,
  },
  {
    id: "4",
    title: "Storytelling",
    serial: 4,
    image: "storytelling.jpg",
    description: "Tell engaging stories",
    status: true,
    topic: "Stories",
    duration: 6,
  },
  {
    id: "5",
    title: "Giving Opinions",
    serial: 5,
    image: "giving_opinions.jpg",
    description: "How to share opinions",
    status: true,
    topic: "Opinions",
    duration: 5,
  },
  {
    id: "6",
    title: "Formal Speech",
    serial: 6,
    image: "formal_speech.jpg",
    description: "Practice formal speaking",
    status: true,
    topic: "Formality",
    duration: 7,
  },
  {
    id: "7",
    title: "Casual Talk",
    serial: 7,
    image: "casual_talk.jpg",
    description: "Engage in casual talk",
    status: true,
    topic: "Everyday",
    duration: 4,
  },
  {
    id: "8",
    title: "Interview Practice",
    serial: 8,
    image: "interview.jpg",
    description: "Prepare for interviews",
    status: true,
    topic: "Job Interviews",
    duration: 10,
  },
  {
    id: "9",
    title: "Debate Skills",
    serial: 9,
    image: "debate.jpg",
    description: "Improve debating",
    status: true,
    topic: "Debate",
    duration: 8,
  },
  {
    id: "10",
    title: "Presentation",
    serial: 10,
    image: "presentation.jpg",
    description: "How to present ideas",
    status: true,
    topic: "Presentation",
    duration: 15,
  },
];

const listenings: Listening[] = [
  {
    id: "1",
    title: "Basic Listening",
    serial: 1,
    image:
      "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "Improve basic listening",
    status: true,
    audioUrl: "basic_listening.mp3",
  },
  {
    id: "2",
    title: "Listening to News",
    serial: 2,
    image: "news.jpg",
    description: "Understand news content",
    status: true,
    audioUrl: "news.mp3",
  },
  {
    id: "3",
    title: "Listening to Stories",
    serial: 3,
    image: "stories.jpg",
    description: "Improve story listening",
    status: true,
    audioUrl: "stories.mp3",
  },
  {
    id: "4",
    title: "Conversation Listening",
    serial: 4,
    image: "conversation.jpg",
    description: "Learn from conversations",
    status: true,
    audioUrl: "conversation.mp3",
  },
  {
    id: "5",
    title: "Listening to Music",
    serial: 5,
    image: "music.jpg",
    description: "Learn through songs",
    status: true,
    audioUrl: "music.mp3",
  },
  {
    id: "6",
    title: "Listening for Keywords",
    serial: 6,
    image: "keywords.jpg",
    description: "Spot keywords in audio",
    status: true,
    audioUrl: "keywords.mp3",
  },
  {
    id: "7",
    title: "Listening to Speeches",
    serial: 7,
    image: "speeches.jpg",
    description: "Understand speeches",
    status: true,
    audioUrl: "speeches.mp3",
  },
  {
    id: "8",
    title: "Listening Practice",
    serial: 8,
    image: "practice.jpg",
    description: "General practice",
    status: true,
    audioUrl: "practice.mp3",
  },
  {
    id: "9",
    title: "Listening to Interviews",
    serial: 9,
    image: "interviews.jpg",
    description: "Learn from interviews",
    status: true,
    audioUrl: "interviews.mp3",
  },
  {
    id: "10",
    title: "Listening Challenges",
    serial: 10,
    image: "challenges.jpg",
    description: "Advanced listening",
    status: true,
    audioUrl: "challenges.mp3",
  },
];

const writings: Writing[] = [
  {
    id: "1",
    title: "Basic Writing",
    serial: 1,
    image:
      "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "Learn basic writing skills",
    status: true,
    topic: "Basics",
  },
  {
    id: "2",
    title: "Descriptive Writing",
    serial: 2,
    image: "descriptive.jpg",
    description: "Learn to describe",
    status: true,
    topic: "Description",
  },
  {
    id: "3",
    title: "Narrative Writing",
    serial: 3,
    image: "narrative.jpg",
    description: "Tell a story",
    status: true,
    topic: "Narrative",
  },
  {
    id: "4",
    title: "Expository Writing",
    serial: 4,
    image: "expository.jpg",
    description: "Explain concepts",
    status: true,
    topic: "Exposition",
  },
  {
    id: "5",
    title: "Persuasive Writing",
    serial: 5,
    image: "persuasive.jpg",
    description: "Convince readers",
    status: true,
    topic: "Persuasion",
  },
  {
    id: "6",
    title: "Creative Writing",
    serial: 6,
    image: "creative.jpg",
    description: "Unleash creativity",
    status: true,
    topic: "Creativity",
  },
  {
    id: "7",
    title: "Formal Writing",
    serial: 7,
    image: "formal.jpg",
    description: "Write formally",
    status: true,
    topic: "Formality",
  },
  {
    id: "8",
    title: "Technical Writing",
    serial: 8,
    image: "technical.jpg",
    description: "Write technical documents",
    status: true,
    topic: "Technical",
  },
  {
    id: "9",
    title: "Essay Writing",
    serial: 9,
    image: "essay.jpg",
    description: "Master essay writing",
    status: true,
    topic: "Essays",
  },
  {
    id: "10",
    title: "Research Writing",
    serial: 10,
    image: "research.jpg",
    description: "Write research papers",
    status: true,
    topic: "Research",
  },
];

const listVocabulary: Vocabulary[] = [
  {
    id: "1",
    word: "apple",
    image:
      "https://plus.unsplash.com/premium_photo-1724249989963-9286e126af81?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    example: "She eats an apple every morning.",
    phonetic: "/ˈæp.l̩/",
    meaning: "Táo",
    status: true,
    wordType: WordType.NOUN,
    topicId: "1",
  },
  {
    id: "2",
    word: "run",
    image:
      "https://plus.unsplash.com/premium_photo-1683140692372-26163cb10c8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    example: "He runs in the park every weekend.",
    phonetic: "/rʌn/",
    meaning: "Chạy",
    status: true,
    wordType: WordType.VERB,
    topicId: "1",
  },
  {
    id: "3",
    word: "beautiful",
    image:
      "https://plus.unsplash.com/premium_photo-1683140692372-26163cb10c8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    example: "She has a beautiful smile.",
    phonetic: "/ˈbjuː.tɪ.fəl/",
    meaning: "Đẹp",
    status: true,
    wordType: WordType.ADJECTIVE,
    topicId: "1",
  },
  {
    id: "4",
    word: "quickly",
    image:
      "https://plus.unsplash.com/premium_photo-1683140692372-26163cb10c8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    example: "He quickly finished his homework before the party.",
    phonetic: "/ˈkwɪk.li/",
    meaning: "Nhanh",
    status: true,
    wordType: WordType.ADVERB,
    topicId: "1",
  },
  {
    id: "5",
    word: "tree",
    image:
      "https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    example: "The tree provides shade during hot summer days.",
    phonetic: "/triː/",
    meaning: "Cây",
    status: true,
    wordType: WordType.NOUN,
    topicId: "1",
  },
];

export const mockData = {
  topics,
  grammars,
  readings,
  speakings,
  listenings,
  writings,
  listVocabulary,
};
