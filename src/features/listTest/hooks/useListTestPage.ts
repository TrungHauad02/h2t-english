import { SiteInfo } from "components/sections/types";

export default function useListTestPage() {
  const sites: SiteInfo[] = [
    {
      type: "mixings",
      title: "Mixing",
      bgUrl:
        "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_test.png?alt=media",
    },
    {
      type: "readings",
      title: "Reading",
      bgUrl:
        "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_test.png?alt=media",
    },
    {
      type: "listenings",
      title: "Listening",
      bgUrl:
        "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_test.png?alt=media",
    },
    {
      type: "speakings",
      title: "Speaking",
      bgUrl:
        "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_test.png?alt=media",
    },
    {
      type: "writings",
      title: "Writing",
      bgUrl:
        "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_test.png?alt=media",
    },
  ];
  const getSiteInfo = (type: string) => {
    return sites.filter((item) => item.type === type)[0];
  };

  return {
    getSiteInfo,
  };
}
