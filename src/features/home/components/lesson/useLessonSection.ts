// hooks/useLessonsSection.ts
import { useState, useEffect, useMemo } from "react";
import { featuredLessons } from "../../services/mockData";
import { Lesson } from "interfaces";

export default function useLessonsSection() {
  const [selectedLessonId, setSelectedLessonId] = useState<number>(0);
  const [filter, setFilter] = useState<string>("popular");
  const [animate, setAnimate] = useState(false);

  const lessons = featuredLessons as unknown as Lesson[];

  useEffect(() => {
    setAnimate(true);
    if (lessons.length > 0) {
      setSelectedLessonId(featuredLessons[0].id);
    }
  }, [lessons]);

  const handleFilterChange = (event: React.SyntheticEvent, newValue: string) => {
    setFilter(newValue);
  };

  const sortedLessons = useMemo(() => {
    let sorted = [...lessons];
    switch (filter) {
      case "popular":
        sorted.sort((a, b) => b.views - a.views);
        break;
      case "newest":
        sorted.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        break;
    }
    return sorted.slice(0, 4); // Chỉ lấy top 4 bài học
  }, [filter, lessons]);

  return {
    selectedLessonId,
    setSelectedLessonId,
    filter,
    setFilter,
    animate,
    sortedLessons,
    handleFilterChange,
  };
}
