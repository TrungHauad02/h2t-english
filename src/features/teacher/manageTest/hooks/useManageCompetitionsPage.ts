import { CompetitionTest, CompetitionTestFilter } from "interfaces";
import { useEffect, useState } from "react";
import { competitionTestService } from "services";
import { toast } from "react-toastify";

import useAuth from "hooks/useAuth";
import { patch } from "@mui/material";

export default function useManageCompetitionsPage() {
  const [filter, setFilter] = useState<CompetitionTestFilter>({
    status: null,
    title: "",
    sortBy: "-createdAt",
  });
  const userId = Number(useAuth().userId);

  const [competitions, setCompetitions] = useState<CompetitionTest[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Derived state for UI components
  const searchText = filter.title;
  const statusFilter = filter.status;

  // Fetch data with pagination and filters
  const fetchData = async () => {
    try {
      setIsLoading(true);

      
      const responseData = await competitionTestService.getCompetitionTestsByTeacher(
        page,
        itemsPerPage,
        filter,
        userId,

      );
      

      setCompetitions(responseData.data.content || []);
      setTotalPages(responseData.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching competitions:", error);
      toast.error("Failed to load competitions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [itemsPerPage, page]);

  const handleSearch = async () => {
    setPage(1); // Reset to first page on new search
    await fetchData();
  };

  // Update filter values
  const updateFilter = (updates: Partial<CompetitionTestFilter>) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      ...updates,
    }));
  };

  // Set search text
  const setSearchText = (text: string) => {
    updateFilter({ title: text });
  };

  // Handle status filter changes
  const handleStatusFilterChange = (status: string) => {
    if (status === "all") {
      updateFilter({ status: null });
    } else if (status === "published") {
      updateFilter({ status: true });
    } else if (status === "unpublished") {
      updateFilter({ status: false });
    }
  };

  // Handle date range changes
  const handleDateRangeChange = (startStartTime?: Date, endEndTime?: Date) => {
    updateFilter({
      startStartTime: startStartTime,
      endEndTime: endEndTime,
    });
  };

  // Handle page change
  const handleChangePage = (e: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setPage(1); // Reset to first page when changing items per page
  };

  const createCompetition = async (data: Partial<CompetitionTest>) => {
    try {

      data.ownerId = userId;
      data.status = false;

   
      const response = await competitionTestService.create(data as CompetitionTest);
      
 

      await fetchData();
      toast.success("Competition created successfully");

      return response;
    } catch (error) {
      console.error("Error creating competition:", error);
      toast.error("Failed to create competition");
      throw error;
    }
  };

  // Update an existing competition
  const updateCompetition = async (
    id: number,
    data: Partial<CompetitionTest>
  ) => {
    try {
      const updatedCompetition = await competitionTestService.patch(id, data);

      // Update the list of competitions
      setCompetitions((prevCompetitions) =>
        prevCompetitions.map((comp) =>
          comp.id === id ? { ...comp, ...data } : comp
        )
      );

      toast.success("Competition updated successfully");
      return updatedCompetition;
    } catch (error) {
      console.error("Error updating competition:", error);
      toast.error("Failed to update competition");
      throw error;
    }
  };

  // Delete a competition
  const deleteCompetition = async (id: number) => {
    try {
      await competitionTestService.remove(id);

      // If current page is empty after deletion, go to previous page
      if (competitions.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        // Otherwise refresh the current page
        await fetchData();
      }

      toast.success("Competition deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting competition:", error);
      toast.error("Failed to delete competition");
      return false;
    }
  };

  // Publish or unpublish a competition
  const publishCompetition = async (id: number, publish: boolean = true) => {
    return competitionTestService.patch(id, { status: publish });
  };

  // Calculate displayed competitions for current page
  const displayedCompetitions = competitions;

  return {
    // New API
    filter,
    competitions,
    isLoading,
    itemsPerPage,
    totalPages,
    page,
    fetchData,
    updateFilter,
    setCompetitions,

    // For backward compatibility
    searchText,
    setSearchText,
    statusFilter,
    handleSearch,
    handleChangePage,
    handleItemsPerPageChange,
    handleStatusFilterChange,
    handleDateRangeChange,
    createCompetition,
    updateCompetition,
    deleteCompetition,
    publishCompetition,
    displayedCompetitions,

    // Control UI elements
    setPage,
    setItemsPerPage,
  };
}
