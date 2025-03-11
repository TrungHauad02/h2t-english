import {
  Listening,
  Reading,
  Speaking,
  Topic,
  Writing,
  Grammar,
  Vocabulary,
  WordType,
  WritingAnswer,
} from "interfaces";

const topics: Topic[] = [
  {
    id: 1,
    title: "Introduction to Grammar",
    image:
      "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "Basics of grammar",
    status: true,
    questions: [1, 2, 3, 4],
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: "Tenses Overview",
    image:
      "https://plus.unsplash.com/premium_photo-1683887033937-edf8d23dd67f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHwwfHx8MA%3D%3D",
    description: "Learn about tenses",
    status: true,
    questions: [1, 2, 3, 4],
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: "Parts of Speech",
    image:
      "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "Detailed explanation of parts of speech",
    status: true,
    questions: [1, 2, 3, 4],
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    title: "Sentence Structure",
    image:
      "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "Forming sentences correctly",
    status: true,
    questions: [1, 2, 3, 4],
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    title: "Verb Usage",
    image:
      "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "How to use verbs",
    status: true,
    questions: [1, 2, 3, 4],
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    title: "Noun Types",
    image:
      "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "Types of nouns",
    status: true,
    questions: [1, 2, 3, 4],
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 7,
    title: "Adjectives and Adverbs",
    image:
      "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "Modifiers in sentences",
    status: true,
    questions: [1, 2, 3, 4],
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 8,
    title: "Punctuation Rules",
    image:
      "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "How to punctuate correctly",
    status: true,
    questions: [1, 2, 3, 4],
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 9,
    title: "Common Mistakes",
    image:
      "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "Avoid common grammar errors",
    status: true,
    questions: [1, 2, 3, 4],
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 10,
    title: "Advanced Grammar",
    image:
      "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "For advanced learners",
    status: true,
    questions: [1, 2, 3, 4],
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const grammars: Grammar[] = [
  {
    id: 1,
    title: "Present Simple",
    image:
      "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",

    description: "This is description",
    status: true,
    file: "/document.docx",
    questions: [1, 2, 3, 4],
    definition: "This is definition",
    example: "This is example",
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: "Past Simple",
    image:
      "https://plus.unsplash.com/premium_photo-1683887033858-be37b32f17a9?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "This is description",
    definition: "This is definition",
    example: "This is example",
    status: true,
    file: "/document.docx",
    questions: [1, 2, 3, 4],
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: "Future Simple",
    image: "future_simple.jpg",
    description: "This is description",
    definition: "This is definition",
    example: "This is example",
    status: true,
    file: "/document.docx",
    questions: [],
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    title: "Present Continuous",
    image: "present_continuous.jpg",
    description: "This is description",
    definition: "This is definition",
    example: "This is example",
    status: true,
    file: "/document.docx",
    questions: [],
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    title: "Past Continuous",
    image: "past_continuous.jpg",
    description: "This is description",
    definition: "This is definition",
    example: "This is example",
    status: true,
    file: "/document.docx",
    questions: [],
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    title: "Future Continuous",
    image: "future_continuous.jpg",
    description: "",
    definition: "",
    example: "",
    status: true,
    file: "./document.docx",
    questions: [],
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 7,
    title: "Present Perfect",
    image: "present_perfect.jpg",
    description: "",
    definition: "",
    example: "",
    status: true,
    file: "./document.docx",
    questions: [],
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 8,
    title: "Past Perfect",
    image: "past_perfect.jpg",
    description: "",
    definition: "",
    example: "",
    status: true,
    file: "./document.docx",
    questions: [],
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 9,
    title: "Future Perfect",
    image: "future_perfect.jpg",
    description: "",
    definition: "",
    example: "",
    status: true,
    file: "./document.docx",
    questions: [],
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 10,
    title: "Conditional Sentences",
    image: "conditionals.jpg",
    description: "",
    definition: "",
    example: "",
    status: true,
    file: "./document.docx",
    questions: [],
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const readings: Reading[] = [
  {
    id: 1,
    title: "Reading Basics",
    image:
      "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "Introduction to reading skills",
    status: true,
    file: "/document.docx",
    questions: [],
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: "Comprehension",
    image: "comprehension.jpg",
    description: "Improve comprehension skills",
    status: true,
    file: "comprehension.pdf",
    questions: [],
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: "Analyzing Texts",
    image:
      "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "Learn to analyze texts",
    status: true,
    file: "/document.docx",
    questions: [],
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    title: "Fiction Stories",
    image: "fiction.jpg",
    description: "Understanding fiction",
    status: true,
    file: "fiction.pdf",
    questions: [],
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    title: "Non-Fiction",
    image: "non_fiction.jpg",
    description: "Understanding non-fiction",
    status: true,
    file: "non_fiction.pdf",
    questions: [],
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    title: "Poetry",
    image: "poetry.jpg",
    description: "Learn about poetry",
    status: true,
    file: "poetry.pdf",
    questions: [],
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 7,
    title: "Critical Reading",
    image: "critical_reading.jpg",
    description: "Improve critical reading",
    status: true,
    file: "critical_reading.pdf",
    questions: [],
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 8,
    title: "Summarizing",
    image: "summarizing.jpg",
    description: "Learn summarizing skills",
    status: true,
    file: "summarizing.pdf",
    questions: [],
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 9,
    title: "Skimming",
    image: "skimming.jpg",
    description: "Skimming techniques",
    status: true,
    file: "skimming.pdf",
    questions: [],
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 10,
    title: "Scanning",
    image: "scanning.jpg",
    description: "Scanning techniques",
    status: true,
    file: "scanning.pdf",
    questions: [],
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const speakings: Speaking[] = [
  {
    id: 1,
    title: "Introduction Speech",
    image:
      "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "How to introduce yourself",
    status: true,
    topic: "Self-Introduction",
    duration: 3,
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: "Describing People",
    image: "describing_people.jpg",
    description: "Learn to describe people",
    status: true,
    topic: "People",
    duration: 5,
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: "Describing Places",
    image: "describing_places.jpg",
    description: "Learn to describe places",
    status: true,
    topic: "Places",
    duration: 4,
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    title: "Storytelling",
    image: "storytelling.jpg",
    description: "Tell engaging stories",
    status: true,
    topic: "Stories",
    duration: 6,
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    title: "Giving Opinions",
    image: "giving_opinions.jpg",
    description: "How to share opinions",
    status: true,
    topic: "Opinions",
    duration: 5,
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    title: "Formal Speech",
    image: "formal_speech.jpg",
    description: "Practice formal speaking",
    status: true,
    topic: "Formality",
    duration: 7,
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 7,
    title: "Casual Talk",
    image: "casual_talk.jpg",
    description: "Engage in casual talk",
    status: true,
    topic: "Everyday",
    duration: 4,
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 8,
    title: "Interview Practice",
    image: "interview.jpg",
    description: "Prepare for interviews",
    status: true,
    topic: "Job Interviews",
    duration: 10,
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 9,
    title: "Debate Skills",
    image: "debate.jpg",
    description: "Improve debating",
    status: true,
    topic: "Debate",
    duration: 8,
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 10,
    title: "Presentation",
    image: "presentation.jpg",
    description: "How to present ideas",
    status: true,
    topic: "Presentation",
    duration: 15,
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const listenings: Listening[] = [
  {
    id: 1,
    title: "Basic Listening",
    image:
      "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "Improve basic listening",
    status: true,
    audio: "/basic_listening.mp3",
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    questions: [1, 2, 3, 4],
  },
  {
    id: 2,
    title: "Listening to News",
    image: "news.jpg",
    description: "Understand news content",
    status: true,
    audio: "/basic_listening.mp3",
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    questions: [1, 2, 3, 4],
  },
  {
    id: 3,
    title: "Listening to Stories",
    image: "stories.jpg",
    description: "Improve story listening",
    status: true,
    audio: "/basic_listening.mp3",
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    questions: [1, 2, 3, 4],
  },
  {
    id: 4,
    title: "Conversation Listening",
    image: "conversation.jpg",
    description: "Learn from conversations",
    status: true,
    audio: "basic_listening.mp3",
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    questions: [1, 2, 3, 4],
  },
  {
    id: 5,
    title: "Listening to Music",
    image: "music.jpg",
    description: "Learn through songs",
    status: true,
    audio: "basic_listening.mp3",
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    questions: [1, 2, 3, 4],
  },
  {
    id: 6,
    title: "Listening for Keywords",
    image: "keywords.jpg",
    description: "Spot keywords in audio",
    status: true,
    audio: "basic_listening.mp3",
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    questions: [1, 2, 3, 4],
  },
  {
    id: 7,
    title: "Listening to Speeches",
    image: "speeches.jpg",
    description: "Understand speeches",
    status: true,
    audio: "basic_listening.mp3",
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    questions: [1, 2, 3, 4],
  },
  {
    id: 8,
    title: "Listening Practice",
    image: "practice.jpg",
    description: "General practice",
    status: true,
    audio: "basic_listening.mp3",
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    questions: [1, 2, 3, 4],
  },
  {
    id: 9,
    title: "Listening to Interviews",
    image: "interviews.jpg",
    description: "Learn from interviews",
    status: true,
    audio: "basic_listening.mp3",
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    questions: [1, 2, 3, 4],
  },
  {
    id: 10,
    title: "Listening Challenges",
    image: "challenges.jpg",
    description: "Advanced listening",
    status: true,
    audio: "basic_listening.mp3",
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    questions: [1, 2, 3, 4],
  },
];

const writings: Writing[] = [
  {
    id: 1,
    title: "Basic Writing",
    image:
      "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "Learn basic writing skills",
    status: true,
    topic: "Basics",
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    file: "/document.docx",
    paragraphs:
      "The quick brown jumps over the lazy dog. This sentence contains all the letters of the English . It is often used for typing practice.",
    questions: [1, 2],
    tips: [
      "Tip 1: Always start with a clear topic sentence.",
      "Tip 2: Use transition words to connect ideas.",
    ],
  },
  {
    id: 2,
    title: "Descriptive Writing",
    image: "descriptive.jpg",
    description: "Learn to describe",
    status: true,
    topic: "Description",
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    file: "/document.docx",
    paragraphs:
      "In the realm of advanced writing, one must consider the nuances of language and the subtleties of tone. It is not merely about conveying information but also about evoking emotion and provoking thought.",
    questions: [3, 4],
    tips: [
      "Tip 1: Vary your sentence structure to maintain reader interest.",
      "Tip 2: Use metaphors and similes to enhance your descriptions.",
    ],
  },
  {
    id: 3,
    title: "Narrative Writing",
    image: "narrative.jpg",
    description: "Tell a story",
    status: true,
    topic: "Narrative",
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    file: "/document.docx",
    paragraphs:
      "In the realm of advanced writing, one must consider the nuances of language and the subtleties of tone. It is not merely about conveying information but also about evoking emotion and provoking thought.",
    questions: [3, 4],
    tips: [
      "Tip 1: Vary your sentence structure to maintain reader interest.",
      "Tip 2: Use metaphors and similes to enhance your descriptions.",
    ],
  },
  {
    id: 4,
    title: "Expository Writing",
    image: "expository.jpg",
    description: "Explain concepts",
    status: true,
    topic: "Exposition",
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    file: "/document.docx",
    paragraphs:
      "In the realm of advanced writing, one must consider the nuances of language and the subtleties of tone. It is not merely about conveying information but also about evoking emotion and provoking thought.",
    questions: [3, 4],
    tips: [
      "Tip 1: Vary your sentence structure to maintain reader interest.",
      "Tip 2: Use metaphors and similes to enhance your descriptions.",
    ],
  },
  {
    id: 5,
    title: "Persuasive Writing",
    image: "persuasive.jpg",
    description: "Convince readers",
    status: true,
    topic: "Persuasion",
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    file: "/document.docx",
    paragraphs:
      "In the realm of advanced writing, one must consider the nuances of language and the subtleties of tone. It is not merely about conveying information but also about evoking emotion and provoking thought.",
    questions: [3, 4],
    tips: [
      "Tip 1: Vary your sentence structure to maintain reader interest.",
      "Tip 2: Use metaphors and similes to enhance your descriptions.",
    ],
  },
  {
    id: 6,
    title: "Creative Writing",
    image: "creative.jpg",
    description: "Unleash creativity",
    status: true,
    topic: "Creativity",
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    file: "/document.docx",
    paragraphs:
      "In the realm of advanced writing, one must consider the nuances of language and the subtleties of tone. It is not merely about conveying information but also about evoking emotion and provoking thought.",
    questions: [3, 4],
    tips: [
      "Tip 1: Vary your sentence structure to maintain reader interest.",
      "Tip 2: Use metaphors and similes to enhance your descriptions.",
    ],
  },
  {
    id: 7,
    title: "Formal Writing",
    image: "formal.jpg",
    description: "Write formally",
    status: true,
    topic: "Formality",
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    file: "/document.docx",
    paragraphs:
      "In the realm of advanced writing, one must consider the nuances of language and the subtleties of tone. It is not merely about conveying information but also about evoking emotion and provoking thought.",
    questions: [3, 4],
    tips: [
      "Tip 1: Vary your sentence structure to maintain reader interest.",
      "Tip 2: Use metaphors and similes to enhance your descriptions.",
    ],
  },
  {
    id: 8,
    title: "Technical Writing",
    image: "technical.jpg",
    description: "Write technical documents",
    status: true,
    topic: "Technical",
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    file: "/document.docx",
    paragraphs:
      "In the realm of advanced writing, one must consider the nuances of language and the subtleties of tone. It is not merely about conveying information but also about evoking emotion and provoking thought.",
    questions: [3, 4],
    tips: [
      "Tip 1: Vary your sentence structure to maintain reader interest.",
      "Tip 2: Use metaphors and similes to enhance your descriptions.",
    ],
  },
  {
    id: 9,
    title: "Essay Writing",
    image: "essay.jpg",
    description: "Master essay writing",
    status: true,
    topic: "Essays",
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    file: "/document.docx",
    paragraphs:
      "In the realm of advanced writing, one must consider the nuances of language and the subtleties of tone. It is not merely about conveying information but also about evoking emotion and provoking thought.",
    questions: [3, 4],
    tips: [
      "Tip 1: Vary your sentence structure to maintain reader interest.",
      "Tip 2: Use metaphors and similes to enhance your descriptions.",
    ],
  },
  {
    id: 10,
    title: "Research Writing",
    image: "research.jpg",
    description: "Write research papers",
    status: true,
    topic: "Research",
    views: 0,
    routeNodeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    file: "/document.docx",
    paragraphs:
      "In the realm of advanced writing, one must consider the nuances of language and the subtleties of tone. It is not merely about conveying information but also about evoking emotion and provoking thought.",
    questions: [3, 4],
    tips: [
      "Tip 1: Vary your sentence structure to maintain reader interest.",
      "Tip 2: Use metaphors and similes to enhance your descriptions.",
    ],
  },
];

const listVocabulary: Vocabulary[] = [
  {
    id: 1,
    word: "apple",
    image:
      "https://plus.unsplash.com/premium_photo-1724249989963-9286e126af81?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    phonetic: "/ˈæp.l̩/",
    meaning: "Táo",
    status: true,
    wordType: WordType.NOUN,
    example: "An apple a day keeps the doctor away",
    topicId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    word: "run",
    image:
      "https://plus.unsplash.com/premium_photo-1683140692372-26163cb10c8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    phonetic: "/rʌn/",
    meaning: "Chạy",
    status: true,
    wordType: WordType.VERB,
    topicId: 1,
    example: "An apple a day keeps the doctor away",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    word: "beautiful",
    image:
      "https://plus.unsplash.com/premium_photo-1683140692372-26163cb10c8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    phonetic: "/ˈbjuː.tɪ.fəl/",
    meaning: "Đẹp",
    status: true,
    wordType: WordType.ADJECTIVE,
    topicId: 1,
    example: "An apple a day keeps the doctor away",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    word: "quickly",
    image:
      "https://plus.unsplash.com/premium_photo-1683140692372-26163cb10c8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    phonetic: "/ˈkwɪk.li/",
    meaning: "Nhanh",
    status: true,
    wordType: WordType.ADVERB,
    topicId: 1,
    example: "An apple a day keeps the doctor away",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    word: "tree",
    image:
      "https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    phonetic: "/triː/",
    meaning: "Cây",
    status: true,
    wordType: WordType.NOUN,
    topicId: 1,
    example: "An apple a day keeps the doctor away",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const writingAnswers: WritingAnswer[] = [
  {
    id: 1,
    status: true,
    missingIndex: 3,
    correctAnswer: "fox",
    writingId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    status: true,
    missingIndex: 17,
    correctAnswer: "alphabet",
    writingId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    status: true,
    missingIndex: 10,
    correctAnswer: "nuances",
    writingId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    status: true,
    missingIndex: 25,
    correctAnswer: "emotion",
    writingId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
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
  writingAnswers,
};
