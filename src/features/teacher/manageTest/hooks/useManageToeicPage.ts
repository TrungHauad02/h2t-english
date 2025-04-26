import { Toeic, ToeicFilter } from "interfaces";
import { useEffect, useState } from "react";
import { toeicService } from "services/test/toeicService";
import { toast } from "react-toastify";

export default function useManageToeicPage() {
  const [filter, setFilter] = useState<ToeicFilter>({
    status: null,
    title: "",
    sortBy: "-createdAt",
  });

  const [toeicTests, setToeicTests] = useState<Toeic[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const response = await toeicService.searchWithFilters(
        page - 1, // API expects 0-based indexing
        itemsPerPage,
        '',
        '',
      );
      
      setToeicTests(response.data.content || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching TOEIC tests:", error);
      toast.error("Failed to load TOEIC tests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [itemsPerPage, page]);

  const handleSearch = async () => {
    setPage(1);
    await fetchData();
  };

  const updateFilter = (updates: Partial<ToeicFilter>) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      ...updates,
    }));
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
      updateFilter({ status: null });
    } else if (status === "published") {
      updateFilter({ status: true });
    } else if (status === "unpublished") {
      updateFilter({ status: false });
    }
  };

  const createToeicTest = async (toeicData: Partial<Toeic>) => {
    try {
      const newToeic = await toeicService.create(toeicData as Toeic);
      
      await fetchData(); // Refresh data instead of manually updating state
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
      
      // Update in the current list
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
      
      // If current page is empty after deletion, go to previous page
      if (toeicTests.length === 1 && page > 1) {
        setPage(prev => prev - 1);
      } else {
        // Otherwise refresh the current page
        await fetchData();
      }
      
      toast.success("TOEIC test deleted successfully");
      return true;
    } catch (error) {
      toast.error("Failed to delete TOEIC test");
      return false;
    }
  };

  const publishToeicTest = (id: number, publish: boolean = true) => {
    return updateToeicTest(id, { status: publish });
  };

  // Derive properties for backward compatibility with components
  const searchText = filter.title || "";
  const statusFilter = filter.status;
  const setSearchText = (text: string) => updateFilter({ title: text });
  const displayedToeicTests = toeicTests;

  return {
    // New API (similar to useManageRoutePage)
    filter,
    toeicTests,
    loading,
    itemsPerPage,
    totalPages,
    page,
    setPage,
    setItemsPerPage,
    fetchData,
    updateFilter,
    setToeicTests,
    
    // For backward compatibility
    searchText,
    setSearchText,
    statusFilter,
    displayedToeicTests,
    handleSearch,
    handleChangePage,
    handleItemsPerPageChange,
    handleStatusFilterChange,
    createToeicTest,
    updateToeicTest,
    deleteToeicTest,
    publishToeicTest
  };
}