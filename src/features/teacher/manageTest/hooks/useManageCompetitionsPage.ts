import { CompetitionTest } from "interfaces";
import { CompetitionTestFilter } from "interfaces";
import { useEffect, useState } from "react";
import { competitionTestService } from "services";

export default function useManageCompetitionsPage() {
  const [filter, setFilter] = useState<CompetitionTestFilter>({
    status: null,
    title: "",
    sortBy: "-createdAt",
  });

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
        filter
      );
      
      setCompetitions(responseData.data.content);
      setTotalPages(responseData.data.totalPages);
    } catch (error) {
      console.error("Error fetching competitions:", error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, [page, itemsPerPage]);

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
    } else if (status === "unPublish") {
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

  // Create a new competition
  const createCompetition = async (data: Partial<CompetitionTest>) => {
    try {
      setIsLoading(true);
      const response = await competitionTestService.create(data as CompetitionTest);
      
      // Refresh the data to include the new competition
      await fetchData();
      
      return response;
    } catch (error) {
      console.error("Error creating competition:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing competition
  const updateCompetition = async (id: number, data: Partial<CompetitionTest>) => {
    try {
      setIsLoading(true);
      const response = await competitionTestService.patch(id, data);
      
      // Update the list of competitions
      setCompetitions(prevCompetitions => 
        prevCompetitions.map(comp => comp.id === id ? { ...comp, ...data } : comp)
      );
      
      return response;
    } catch (error) {
      console.error("Error updating competition:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a competition
  const deleteCompetition = async (id: number) => {
    try {
      setIsLoading(true);
      await competitionTestService.remove(id);
      
      // Remove the deleted competition from the list
      setCompetitions(prevCompetitions => 
        prevCompetitions.filter(comp => comp.id !== id)
      );
      
      // If current page is empty after deletion, go to previous page
      if (displayedCompetitions.length === 1 && page > 1) {
        setPage(prev => prev - 1);
      } else {
        // Otherwise refresh the current page
        await fetchData();
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting competition:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Load competitions by status (for tab filtering)
  const loadCompetitionsByStatus = async (status: 'upcoming' | 'active' | 'past' | 'all') => {
    try {
      setIsLoading(true);
      
      // Map the status to filter parameters
      const filterParams: CompetitionTestFilter = {};
      
      const now = new Date();
      
      if (status === 'upcoming') {
        filterParams.startStartTime = now; // Competitions that haven't started
      } else if (status === 'active') {
        filterParams.startStartTime = new Date(new Date().setMonth(now.getMonth() - 1));
        filterParams.endEndTime = new Date(new Date().setMonth(now.getMonth() + 1));
      } else if (status === 'past') {
        filterParams.endEndTime = now; // Competitions that have ended
      }
      
      const responseData = await competitionTestService.getCompetitionTestsByTeacher(
        1,
        100,
        filterParams
      );
      
      return responseData.content;
    } catch (error) {
      console.error(`Error loading ${status} competitions:`, error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Publish or unpublish a competition
  const publishCompetition = async (id: number, publish: boolean = true) => {
    return updateCompetition(id, { status: publish });
  };

  // Calculate displayed competitions for current page
  const displayedCompetitions = competitions;

  // Load categorized competitions for tabs
  const [upcomingCompetitions, setUpcomingCompetitions] = useState<CompetitionTest[]>([]);
  const [activeCompetitions, setActiveCompetitions] = useState<CompetitionTest[]>([]);
  const [pastCompetitions, setPastCompetitions] = useState<CompetitionTest[]>([]);

  // Load tab data on initial mount
  useEffect(() => {
    const loadTabData = async () => {
      const upcoming = await loadCompetitionsByStatus('upcoming');
      const active = await loadCompetitionsByStatus('active');
      const past = await loadCompetitionsByStatus('past');
      
      setUpcomingCompetitions(upcoming);
      setActiveCompetitions(active);
      setPastCompetitions(past);
    };
    
    loadTabData();
  }, []);

  return {
    searchText,
    setSearchText,
    statusFilter,
    competitions,
    isLoading,
    page,
    itemsPerPage,
    totalPages,
    handleSearch,
    handleChangePage,
    handleItemsPerPageChange,
    handleStatusFilterChange,
    handleDateRangeChange,
    createCompetition,
    updateCompetition,
    deleteCompetition,
    publishCompetition,
    loadCompetitionsByStatus,
    fetchData,
    updateFilter,
    displayedCompetitions,
    upcomingCompetitions,
    activeCompetitions,
    pastCompetitions
  };
}