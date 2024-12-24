import { SiteInfo } from "../types";

export default function useListLessonPage() {
  const sites: SiteInfo[] = [
    {
      type: "topics",
      title: "Vocabulary",
      bgUrl:
        "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_vocabulary.png?alt=media",
    },
    {
      type: "grammars",
      title: "Grammar",
      bgUrl:
        "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_grammar.png?alt=media",
    },
    {
      type: "readings",
      title: "Reading",
      bgUrl:
        "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_reading.jpg?alt=media",
    },
    {
      type: "listenings",
      title: "Listening",
      bgUrl:
        "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_listening.jpg?alt=media",
    },
    {
      type: "speakings",
      title: "Speaking",
      bgUrl:
        "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_speaking.jpg?alt=media",
    },
    {
      type: "writings",
      title: "Writing",
      bgUrl:
        "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_writing.png?alt=media",
    },
  ];

  const getSiteInfo = (type: string) => {
    return sites.filter((item) => item.type === type)[0];
  };

  return {
    getSiteInfo,
  };
}
