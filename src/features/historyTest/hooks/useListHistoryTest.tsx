import { useState, useEffect } from "react";
import { SelectChangeEvent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { 
  submitTestService,
  submitCompetitionService,
  submitToeicService,
  testHistoryStatsService,
} from "services";
import { HistoryRecord } from "../type";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AssignmentIcon from "@mui/icons-material/Assignment";
import useAuth from "hooks/useAuth";

export default function useListHistoryTest() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filterType, setFilterType] = useState<string>("all");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const [filteredHistory, setFilteredHistory] = useState<HistoryRecord[]>([]);
  const [paginatedHistory, setPaginatedHistory] = useState<HistoryRecord[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [testStats, setTestStats] = useState<any>(null);
  
  const userId = Number(useAuth().userId);

  const fetchTestData = async () => {
    setLoading(true);
    try {
      let activeTabData: HistoryRecord[] = [];
  
      if (activeTab === 0) {
 
        const regularTests = (await submitTestService.getSubmitTestsForStudent(1, 10, userId, {
          sortBy: "-createdAt"
        })).data;
 
        const toeicTests = (await submitToeicService.getSubmitToeicsForStudent(1, 10, userId, {
          sortBy: "-createdAt"
        })).data;

        const competitionTests = (await submitCompetitionService.getSubmitCompetitionsForStudent(1, 10, userId, {
          sortBy: "-createdAt"
        })).data;
  
        const regularRecords = mapRegularTests(regularTests.content);
        const toeicRecords = mapToeicTests(toeicTests.content);
        const competitionRecords = mapCompetitionTests(competitionTests.content);
  
        activeTabData = [...regularRecords, ...toeicRecords, ...competitionRecords]
          .sort((a, b) => b.date.getTime() - a.date.getTime());
          setPaginatedHistory(activeTabData);
        setFilteredHistory(activeTabData);
        setTotalPages(1);
        
      } else {
        // Tạo filter
        const filter: any = {
          sortBy: mapSortByToApiParam(sortBy, sortDirection),
          title: searchTerm || undefined,
        };
  
        if (filterType !== "all") {
          filter.type = filterType;
        }
  
        let response;
        if (activeTab === 1) {
          response = (await submitTestService.getSubmitTestsForStudent(page, rowsPerPage, userId, filter)).data;
          activeTabData = mapRegularTests(response.content);
        } else if (activeTab === 2) {
          response = (await submitToeicService.getSubmitToeicsForStudent(page, rowsPerPage, userId, filter)).data;
          activeTabData = mapToeicTests(response.content);
        } else if (activeTab === 3) {
          response = (await submitCompetitionService.getSubmitCompetitionsForStudent(page, rowsPerPage, userId, filter)).data;
          activeTabData = mapCompetitionTests(response.content);
        }
  
        setFilteredHistory(activeTabData);
        setPaginatedHistory(activeTabData);
        setTotalPages(response.totalPages || 1);
      }
  
    
      const statsResponse = (await testHistoryStatsService.getTestHistoryStats(userId, true)).data;
      console.log(statsResponse);
      
      setTestStats(statsResponse);
    } catch (error) {
      console.error("Error fetching test history:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // Helper functions to map API data to HistoryRecord
  const mapRegularTests = (tests: any[]): HistoryRecord[] => {
    return tests.map(test => ({
      id: test.id,
      type: "test",
      title: test.test_title || `Test ${test.test?.id}`,
      score: test.score,
      maxScore: 100,
      date: new Date(test.createdAt),
      comment: test.comment,
      testType: test.test_type || "UNKNOWN",
      duration: test.test_duration || 0,
    }));
  };

  const mapToeicTests = (tests: any[]): HistoryRecord[] => {
    return tests.map(test => ({
      id: test.id,
      type: "toeic",
      title: test.toeic_title || `TOEIC ${test.toeic?.id}`,
      score: test.score,
      maxScore: 990,
      date: new Date(test.createdAt),
      comment: test.comment,
      testType: "TOEIC",
      duration: test.toeic_duration,
    }));
  };

  const mapCompetitionTests = (tests: any[]): HistoryRecord[] => {
    return tests.map(test => ({
      id: test.id,
      type: "competition",
      title: test.competition_title || `Competition ${test.competition?.id}`,
      score: test.score,
      maxScore: 100,
      date: new Date(test.createdAt),
      testType: "COMPETITION",
      duration: test.competition_duration|| 0,
    }));
  };

  // Convert UI sort param to API param
  const mapSortByToApiParam = (sortField: string, direction: "asc" | "desc"): string => {
    let apiField = "";
    
    switch (sortField) {
      case "date":
        apiField = "createdAt";
        break;
      case "score":
        apiField = "score";
        break;
      case "title":
        apiField = "title";
        break;
      default:
        apiField = "createdAt";
    }
    
    return direction === "asc" ? apiField : `-${apiField}`;
  };

  // Fetch data when dependencies change
  useEffect(() => {
    fetchTestData();
  }, [activeTab, page, rowsPerPage, sortBy, sortDirection, searchTerm, filterType, userId]);

  // Handler functions
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilterType(event.target.value);
    setPage(1);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value);
  };

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleItemsPerPageChange = (value: number) => {
    setRowsPerPage(value);
    setPage(1);
  };   

  const handleClickRow = (testId: number, type: string) => {
    const lowerType = type.toLowerCase();
    navigate(`${lowerType}/${testId}`);
  };

  // UI helper functions
  const getScoreColor = (score: number | null, maxScore: number) => {
    if (score === null) return color.gray300;

    const percentage = (score / maxScore) * 100;

    if (percentage >= 80) return isDarkMode ? color.green700 : color.green500;
    if (percentage >= 60) return isDarkMode ? color.emerald700 : color.emerald500;
    if (percentage >= 40) return isDarkMode ? color.teal700 : color.teal500;
    if (percentage < 40) return isDarkMode ? color.red700 : color.red500;

    return color.gray500;
  };

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
  
  // UI flags
  const showFilters = activeTab !== 0;
  const showFiltersTest = activeTab !== 1

  return {
    filteredHistory,
    paginatedHistory,
    totalPages,
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
    handleItemsPerPageChange,
    handleClickRow,
    showFilters,
    testStats,
    showFiltersTest,
  };
}