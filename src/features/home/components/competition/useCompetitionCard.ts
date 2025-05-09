import { CompetitionTest } from "interfaces";
import { useMemo } from "react";

export default function useCompetitionCard(competition: CompetitionTest) {
  // Format date to readable string
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format time to readable string
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Kiểm tra trạng thái cuộc thi
  const now = useMemo(() => new Date(), []);
  const isUpcoming = useMemo(
    () => new Date(competition.startTime) > now,
    [competition.startTime, now]
  );
  const isActive = useMemo(
    () =>
      new Date(competition.startTime) <= now &&
      new Date(competition.endTime) >= now,
    [competition.startTime, competition.endTime, now]
  );

  return {
    formatDate,
    formatTime,
    isUpcoming,
    isActive,
  };
}
