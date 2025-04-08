import { CompetitionTest } from "interfaces";
import { useEffect, useState } from "react";
import { testService } from "../services/testServices";

export default function useManageCompetitionsPage() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<boolean | undefined>(undefined);
  const [dateRange, setDateRange] = useState<{
    startDate?: Date;
    endDate?: Date;
  }>({});
  const [competitions, setCompetitions] = useState<CompetitionTest[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [loading, setLoading] = useState(false);

  // Load all competitions on initial load
  useEffect(() => {
    setLoading(true);
    const allCompetitions = testService.getCompetitionTests();
    setCompetitions(allCompetitions);
    setLoading(false);
  }, []);

  const handleSearch = () => {
    setLoading(true);
    const filter = {
      status: statusFilter,
      title: searchText,
      dateRange: dateRange
    };

    const filteredCompetitions = testService.getCompetitionTests(filter);
    setCompetitions(filteredCompetitions);
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

  const handleDateRangeChange = (newDateRange: {
    startDate?: Date;
    endDate?: Date;
  }) => {
    setDateRange(newDateRange);
  };

  const createCompetition = (competitionData: Omit<CompetitionTest, "id" | "status" | "createdAt" | "updatedAt">) => {
    const newCompetition = testService.createCompetitionTest(competitionData);
    
    // Refresh the list of competitions
    const updatedCompetitions = [...competitions, newCompetition];
    setCompetitions(updatedCompetitions);
    
    return newCompetition;
  };

  const updateCompetition = (id: number, data: Partial<CompetitionTest>) => {
    const updatedCompetition = testService.updateCompetitionTest(id, data);
    
    if (updatedCompetition) {
      // Update the list of competitions
      const updatedCompetitions = competitions.map(comp => 
        comp.id === id ? updatedCompetition : comp
      );
      setCompetitions(updatedCompetitions);
    }
    
    return updatedCompetition;
  };

  const deleteCompetition = (id: number) => {
    const success = testService.deleteCompetitionTest(id);
    
    if (success) {
      // Remove the deleted competition from the list
      const updatedCompetitions = competitions.filter(comp => comp.id !== id);
      setCompetitions(updatedCompetitions);
    }
    
    return success;
  };

  const loadCompetitionsByStatus = (status: 'upcoming' | 'active' | 'past' | 'all') => {
    setLoading(true);
    
    let filteredCompetitions: CompetitionTest[];
    if (status === 'all') {
      filteredCompetitions = testService.getCompetitionTests();
    } else {
      filteredCompetitions = testService.getCompetitionTestsByStatus(status);
    }
    
    setCompetitions(filteredCompetitions);
    setPage(1); // Reset to first page when changing status
    setLoading(false);
    
    return filteredCompetitions;
  };

  const publishCompetition = (id: number, publish: boolean = true) => {
    return updateCompetition(id, { status: publish });
  };

  const totalPages = Math.ceil(competitions.length / itemsPerPage);

  const displayedCompetitions = competitions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Get categorized competitions from the services
  const upcomingCompetitions = testService.getCompetitionTestsByStatus('upcoming');
  const activeCompetitions = testService.getCompetitionTestsByStatus('active');
  const pastCompetitions = testService.getCompetitionTestsByStatus('past');

  return {
    searchText,
    setSearchText,
    statusFilter,
    competitions,
    loading,
    page,
    itemsPerPage,
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
    totalPages,
    displayedCompetitions,
    upcomingCompetitions,
    activeCompetitions,
    pastCompetitions
  };
}