import {
  competitionResults,
  competitions,
} from "features/home/services/mockData";

export default function useLeaderboard() {
  // Lấy cuộc thi gần nhất (competition mới nhất)
  const mostRecentCompetition = () => {
    if (competitions.length === 0) return null;

    // Sắp xếp competitions theo startTime giảm dần
    const sortedCompetitions = [...competitions].sort(
      (a, b) => b.startTime.getTime() - a.startTime.getTime()
    );

    return sortedCompetitions[0]; // Trả về cuộc thi gần nhất
  };

  // Lọc kết quả của cuộc thi gần nhất và lấy top 5
  const topResults = () => {
    const latestCompetition = mostRecentCompetition();
    if (!latestCompetition) return [];

    const results = competitionResults
      .filter((result) => result.competition_id === latestCompetition.id)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    return results;
  };

  return {
    mostRecentCompetition,
    topResults,
  };
}
