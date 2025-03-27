import { competitionResults, competitions } from "features/home/services/mockData";
import { useMemo } from "react";

export default function useLeaderboard() {
    // Lấy cuộc thi gần nhất (competition mới nhất)
    const mostRecentCompetition = useMemo(() => {
        return [...competitions]
            .sort((a, b) => new Date(b.endTime).getTime() - new Date(a.endTime).getTime())[0];
    }, [competitions]);

    // Lọc kết quả của cuộc thi gần nhất và lấy top 5
    const topResults = useMemo(() => {
        if (!mostRecentCompetition) return [];
        return [...competitionResults]
            .filter((result) => result.competition_id === mostRecentCompetition.id)
            .sort((a, b) => (b.score || 0) - (a.score || 0))
            .slice(0, 5);
    }, [competitionResults, mostRecentCompetition]);

    return {
        mostRecentCompetition,
        topResults,
    };
}
