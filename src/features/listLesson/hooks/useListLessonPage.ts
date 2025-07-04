import { SiteInfo } from "components/sections/types";
import { Quote } from "../types";

export default function useListLessonPage() {
  const sites: SiteInfo[] = [
    {
      type: "topics",
      title: "Vocabulary",
      bgUrl:
        "https://d1dwx6vsztg5ne.cloudfront.net/h2t-english/static%2Fh2t-english-vocabulary-banner.svg",
    },
    {
      type: "grammars",
      title: "Grammar",
      bgUrl:
        "https://d1dwx6vsztg5ne.cloudfront.net/h2t-english/static%2Fh2t-english-grammar-banner.svg",
    },
    {
      type: "readings",
      title: "Reading",
      bgUrl:
        "https://d1dwx6vsztg5ne.cloudfront.net/h2t-english/static%2Fh2t-english-reading-banner.svg",
    },
    {
      type: "listenings",
      title: "Listening",
      bgUrl:
        "https://d1dwx6vsztg5ne.cloudfront.net/h2t-english/static%2Fh2t-english-listening-banner.svg",
    },
    {
      type: "speakings",
      title: "Speaking",
      bgUrl:
        "https://d1dwx6vsztg5ne.cloudfront.net/h2t-english/static%2Fh2t-english-speaking-banner.svg",
    },
    {
      type: "writings",
      title: "Writing",
      bgUrl:
        "https://d1dwx6vsztg5ne.cloudfront.net/h2t-english/static%2Fh2t-english-writing-banner.svg",
    },
  ];

  const quote: Quote = {
    speech: "This is speech",
    author: "Author",
  };

  const getSiteInfo = (type: string) => {
    return (
      sites.find((item) => item.type === type) || {
        type: "",
        title: "",
        bgUrl: "",
      }
    );
  };

  return {
    getSiteInfo,
    quote,
  };
}
