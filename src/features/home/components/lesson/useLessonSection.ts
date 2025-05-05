import { Lesson } from "interfaces";
import { useEffect, useState, useMemo, useCallback } from "react";
import { featureLessonService } from "services";

type FilterType = "popular" | "recent";

export default function useLessonsSection() {
  const [selectedLessonId, setSelectedLessonId] = useState<number>(0);
  const [filter, setFilter] = useState<FilterType>("popular");
  const [animate, setAnimate] = useState<boolean>(false);
  const [lessonsData, setLessonsData] = useState<{
    popular: Lesson[];
    recent: Lesson[];
  }>({
    popular: [],
    recent: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Memoize current lessons based on filter
  const lessons = useMemo(() => {
    return lessonsData[filter] || [];
  }, [lessonsData, filter]);

  // Fetch lessons whenever filter changes
  useEffect(() => {
    const fetchLessons = async () => {
      // Skip loading if we already have data for this filter
      if (lessonsData[filter].length > 0) {
        return;
      }

      setIsLoading(true);
      try {
        const resData =
          filter === "popular"
            ? await featureLessonService.getMostViewedLessons()
            : await featureLessonService.getMostRecentLessons();

        // Update only the specific filter data, keeping other data intact
        console.log(resData.data);
        setLessonsData((prev) => ({
          ...prev,
          [filter]: resData.data,
        }));
      } catch (error) {
        console.error("Error fetching lessons:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLessons();
  }, [filter, lessonsData]);

  const handleFilterChange = useCallback(
    (_event: React.SyntheticEvent, newValue: string) => {
      setFilter(newValue === "popular" ? "popular" : "recent");
    },
    []
  );

  return {
    selectedLessonId,
    setSelectedLessonId,
    filter,
    animate,
    lessons,
    isLoading,
    handleFilterChange,
  };
}
