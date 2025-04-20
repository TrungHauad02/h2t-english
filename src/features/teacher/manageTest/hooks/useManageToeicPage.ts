import { Toeic } from "interfaces";
import { useEffect, useState } from "react";
import { toeicService } from "services/test/toeicService";
import { toast } from "react-toastify";
import { ToeicFilter } from "interfaces/FilterInterfaces";

export default function useManageToeicPage() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<boolean | null>(null);
  const [scoreRange, setScoreRange] = useState<{
    minScore?: number;
    maxScore?: number;
  }>({});
  const [toeicTests, setToeicTests] = useState<Toeic[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchToeicTests = async () => {
      try {
        setLoading(true);
        const filter: ToeicFilter = {
          title: searchText, 
          ...(statusFilter !== null ? { status: statusFilter } : {})

        };
  
        const response = await toeicService.searchWithFilters(
          page - 1,
          itemsPerPage,
          '',
          '',
          filter
        );
  
        setToeicTests(response.data.content || []);
      } catch (error) {
        toast.error("Failed to load TOEIC tests");
      } finally {
        setLoading(false);
      }
    };
  
    fetchToeicTests();
  }, [page, itemsPerPage, statusFilter, searchText,]);
  
  const handleSearch = async () => {
    setPage(1);
  };

  const handleChangePage = (e: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setPage(1);
  };

  const handleStatusFilterChange = (status: string) => {
    if (status === "all") {
      setStatusFilter(null);
    } else if (status === "published") {
      setStatusFilter(true);
    } else if (status === "unpublished") {
      setStatusFilter(false);
    }
  };

  const handleScoreRangeChange = (newScoreRange: {
    minScore?: number;
    maxScore?: number;
  }) => {
    setScoreRange(newScoreRange);
  };

  const createToeicTest = async (toeicData: Toeic) => {
    try {
      const newToeic = await toeicService.create(toeicData);
      
      setToeicTests(prev => [...prev, newToeic.data]);
      toast.success("TOEIC test created successfully");
      return newToeic;
    } catch (error) {
      toast.error("Failed to create TOEIC test");
      throw error;
    }
  };

  const updateToeicTest = async (id: number, data: Partial<Toeic>) => {
    try {
      const updatedToeic = await toeicService.patch(id, data);
      setToeicTests(prev => 
        prev.map(toeic => toeic.id === id ? updatedToeic : toeic)
      );
      toast.success("TOEIC test updated successfully");
      return updatedToeic;
    } catch (error) {
      toast.error("Failed to update TOEIC test");
      throw error;
    }
  };

  const deleteToeicTest = async (id: number) => {
    try {
      await toeicService.remove(id);
      setToeicTests(prev => prev.filter(toeic => toeic.id !== id));
      toast.success("TOEIC test deleted successfully");
      return true;
    } catch (error) {
      toast.error("Failed to delete TOEIC test");
      return false;
    }
  };

  const updateToeicScore = async (id: number, score: number) => {
    try {
      const updatedToeic = await toeicService.patch(id, { scoreLastOfTest: score });
      setToeicTests(prev => 
        prev.map(toeic => toeic.id === id ? updatedToeic : toeic)
      );
      toast.success("TOEIC test score updated successfully");
      return updatedToeic;
    } catch (error) {
      toast.error("Failed to update TOEIC test score");
      throw error;
    }
  };

  const publishToeicTest = (id: number, publish: boolean = true) => {
    return updateToeicTest(id, { status: publish });
  };


  const totalPages = Math.ceil(
    toeicTests.length / itemsPerPage
  );


  const displayedToeicTests = toeicTests;

  // Calculate statistics
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