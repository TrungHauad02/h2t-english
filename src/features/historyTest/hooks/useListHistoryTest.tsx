import React, { useState, useMemo } from "react";
import { SelectChangeEvent } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { mockData } from "../services/mockData";
import { historyTestService } from "../services/historyTestService";
import { HistoryRecord } from "../type";

export default function useListHistoryTest() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filterType, setFilterType] = useState<string>("all");

  // State for pagination
  const [page, setPage] = useState<number>(1);

  // State for loading
  const [loading, setLoading] = useState<boolean>(false);

  // Simulate API call with a delay
  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  // Get test data for user (using mock data for now with fixed user ID 101)
  const userId = 101; // This would normally come from authentication context

  // Get history data and combine all types
  const testHistory = useMemo(() => {
    // Get data from our services
    const regularTests = historyTestService.getSubmitTestByUserId(userId);
    const toeicTests = historyTestService.getSubmitToeicByUserId(userId);
    const competitionTests =
      historyTestService.getSubmitCompetitionByUserId(userId);

    // Get test names from mock data for display purposes
    const testTitles = new Map(
      mockData.test.map((test) => [
        test.id,
        { title: test.title, type: test.type, duration: test.duration },
      ])
    );

    const toeicTitles = new Map([
      [1, { title: "TOEIC Official Test 1" }],
      [2, { title: "TOEIC Mock Exam 2" }],
      [3, { title: "TOEIC Reading & Listening" }],
      [4, { title: "TOEIC Full Practice Test" }],
      [5, { title: "TOEIC Express Assessment" }],
    ]);

    const competitionTitles = new Map(
      mockData.competitionTest.map((comp) => [
        comp.id,
        { title: comp.title, duration: comp.duration },
      ])
    );

    // Map regular tests
    const mappedTests: HistoryRecord[] = regularTests.map((test) => ({
      id: test.id,
      type: "test",
      title: testTitles.get(test.test_id)?.title || `Test ${test.test_id}`,
      score: test.score,
      maxScore: 100, // Assuming regular tests are scored out of 100
      date: test.createdAt || new Date(),
      comment: test.comment,
      testType: testTitles.get(test.test_id)?.type || "UNKNOWN",
      duration: testTitles.get(test.test_id)?.duration || 0,
    }));

    // Map TOEIC tests
    const mappedToeic: HistoryRecord[] = toeicTests.map((test) => ({
      id: test.id,
      type: "toeic",
      title: toeicTitles.get(test.toeic_id)?.title || `TOEIC ${test.toeic_id}`,
      score: test.score,
      maxScore: 990, // TOEIC is scored out of 990
      date: test.createdAt || new Date(),
      comment: test.comment,
      testType: "TOEIC",
      duration: 120, // Standard TOEIC test duration
    }));

    // Map competition tests
    const mappedCompetitions: HistoryRecord[] = competitionTests.map(
      (test) => ({
        id: test.id,
        type: "competition",
        title:
          competitionTitles.get(test.competition_id)?.title ||
          `Competition ${test.competition_id}`,
        score: test.score,
        maxScore: 100, // Assuming competitions are scored out of 100
        date: test.createdAt || new Date(),
        testType: "COMPETITION",
        duration: competitionTitles.get(test.competition_id)?.duration || 0,
      })
    );

    // Combine all test types
    return [...mappedTests, ...mappedToeic, ...mappedCompetitions];
  }, [userId]);

  // Apply filters, search, and sorting to the history data
  const filteredHistory = useMemo(() => {
    simulateLoading();
    let result = [...testHistory];

    // Apply tab filter
    if (activeTab === 1) {
      result = result.filter((item) => item.type === "test");
    } else if (activeTab === 2) {
      result = result.filter((item) => item.type === "toeic");
    } else if (activeTab === 3) {
      result = result.filter((item) => item.type === "competition");
    }

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(term) ||
          (item.comment && item.comment.toLowerCase().includes(term))
      );
    }

    // Apply test type filter
    if (filterType !== "all") {
      result = result.filter((item) => item.testType === filterType);
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;

      if (sortBy === "date") {
        comparison = a.date.getTime() - b.date.getTime();
      } else if (sortBy === "score") {
        // Handle null scores by treating them as 0
        const scoreA = a.score !== null ? a.score : 0;
        const scoreB = b.score !== null ? b.score : 0;
        comparison = scoreA - scoreB;
      } else if (sortBy === "title") {
        comparison = a.title.localeCompare(b.title);
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

    return result;
  }, [testHistory, activeTab, searchTerm, filterType, sortBy, sortDirection]);

  // Get paginated data
  const paginatedHistory = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredHistory.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredHistory, page]);

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setPage(1); // Reset to first page when tab changes
  };

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to first page when search changes
  };

  // Handle filter change
  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilterType(event.target.value);
    setPage(1); // Reset to first page when filter changes
  };

  // Handle sort change
  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value);
  };

  // Handle sort direction toggle
  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Handle page change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  // Get background color based on score percentage
  const getScoreColor = (score: number | null, maxScore: number) => {
    if (score === null) return color.gray300;

    const percentage = (score / maxScore) * 100;

    if (percentage >= 80) return isDarkMode ? color.green700 : color.green500;
    if (percentage >= 60)
      return isDarkMode ? color.emerald700 : color.emerald500;
    if (percentage >= 40) return isDarkMode ? color.teal700 : color.teal500;
    if (percentage < 40) return isDarkMode ? color.red700 : color.red500;

    return color.gray500;
  };

  // Get icon for test type
  const getTestTypeIcon = (type: string) => {
    switch (type) {
      case "test":
        return <AssignmentIcon />;
      case "toeic":
        return <SchoolIcon />;
      case "competition":
        return <EmojiEventsIcon />;
      default:
        return <AssignmentIcon />;
    }
  };

  return {
    filteredHistory,
    paginatedHistory,
    handleTabChange,
    handleSearchChange,
    handleFilterChange,
    handleSortChange,
    toggleSortDirection,
    handlePageChange,
    getScoreColor,
    getTestTypeIcon,
    activeTab,
    searchTerm,
    filterType,
    sortBy,
    sortDirection,
    page,
    rowsPerPage,
    loading,
    setRowsPerPage,
  };
}
