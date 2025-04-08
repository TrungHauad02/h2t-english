import { Toeic } from "interfaces";
import { useEffect, useState } from "react";
import { toeicService } from "../services/toeicServices";

export default function useManageToeicPage() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<boolean | undefined>(undefined);
  const [scoreRange, setScoreRange] = useState<{
    minScore?: number;
    maxScore?: number;
  }>({});
  const [toeicTests, setToeicTests] = useState<Toeic[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [loading, setLoading] = useState(false);

  // Load all TOEIC tests on initial load
  useEffect(() => {
    setLoading(true);
    const allToeicTests = toeicService.getToeicTests();
    setToeicTests(allToeicTests);
    setLoading(false);
  }, []);

  const handleSearch = () => {
    setLoading(true);
    const filter = {
      status: statusFilter,
      title: searchText,
      minScore: scoreRange.minScore,
      maxScore: scoreRange.maxScore
    };

    const filteredToeicTests = toeicService.getToeicTests(filter);
    setToeicTests(filteredToeicTests);
    setPage(1); // Reset to first page on new search
    setLoading(false);
  };

  const handleChangePage = (e: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setPage(1); // Reset to first page when changing items per page
  };

  const handleStatusFilterChange = (status: string) => {
    if (status === "all") {
      setStatusFilter(undefined);
    } else if (status === "published") {
      setStatusFilter(true);
    } else if (status === "draft") {
      setStatusFilter(false);
    }
  };

  const handleScoreRangeChange = (newScoreRange: {
    minScore?: number;
    maxScore?: number;
  }) => {
    setScoreRange(newScoreRange);
  };

  const createToeicTest = (toeicData: Omit<Toeic, "id" | "status" | "createdAt" | "updatedAt" | "totalQuestions" | "scoreLastOfTest">) => {
    const newToeic = toeicService.createToeicTest(toeicData);
    
    // Refresh the list of TOEIC tests
    setToeicTests(prev => [...prev, newToeic]);
    
    return newToeic;
  };

  const updateToeicTest = (id: number, data: Partial<Toeic>) => {
    const updatedToeic = toeicService.updateToeicTest(id, data);
    
    if (updatedToeic) {
      // Update the list of TOEIC tests
      setToeicTests(prev => 
        prev.map(toeic => toeic.id === id ? updatedToeic : toeic)
      );
    }
    
    return updatedToeic;
  };

  const deleteToeicTest = (id: number) => {
    const success = toeicService.deleteToeicTest(id);
    
    if (success) {
      // Remove the deleted TOEIC test from the list
      setToeicTests(prev => prev.filter(toeic => toeic.id !== id));
    }
    
    return success;
  };

  const updateToeicScore = (id: number, score: number) => {
    const updatedToeic = toeicService.updateToeicScore(id, score);
    
    if (updatedToeic) {
      // Update the list of TOEIC tests
      setToeicTests(prev => 
        prev.map(toeic => toeic.id === id ? updatedToeic : toeic)
      );
    }
    
    return updatedToeic;
  };

  const publishToeicTest = (id: number, publish: boolean = true) => {
    return updateToeicTest(id, { status: publish });
  };

  const totalPages = Math.ceil(toeicTests.length / itemsPerPage);

  const displayedToeicTests = toeicTests.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Get statistics for TOEIC tests
  const testsWithScores = toeicTests.filter(test => test.scoreLastOfTest !== null);
  const averageScore = testsWithScores.length > 0 
    ? testsWithScores.reduce((sum, test) => sum + (test.scoreLastOfTest || 0), 0) / testsWithScores.length 
    : 0;
  const highestScore = testsWithScores.length > 0
    ? Math.max(...testsWithScores.map(test => test.scoreLastOfTest || 0))
    : 0;
  const lowestScore = testsWithScores.length > 0
    ? Math.min(...testsWithScores.map(test => test.scoreLastOfTest || 0))
    : 0;

  return {
    searchText,
    setSearchText,
    statusFilter,
    scoreRange,
    toeicTests,
    loading,
    page,
    itemsPerPage,
    handleSearch,
    handleChangePage,
    handleItemsPerPageChange,
    handleStatusFilterChange,
    handleScoreRangeChange,
    createToeicTest,
    updateToeicTest,
    deleteToeicTest,
    updateToeicScore,
    publishToeicTest,
    totalPages,
    displayedToeicTests,
    statistics: {
      total: toeicTests.length,
      withScores: testsWithScores.length,
      averageScore,
      highestScore,
      lowestScore
    }
  };
}