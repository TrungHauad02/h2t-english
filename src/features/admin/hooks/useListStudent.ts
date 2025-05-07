import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { RolesEnum, User } from "interfaces";
import { UserFilter } from "interfaces/FilterInterfaces";
import { userService } from "services";

export default function useListStudent() {
  // State for student data
  const [students, setStudents] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalElements, setTotalElements] = useState<number>(0);

  // State for pagination
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);

  // State for expandable rows
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});

  // State for dialogs
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isRemoveDialogOpen, setRemoveDialogOpen] = useState<boolean>(false);
  const [isChangeStatusDialogOpen, setChangeStatusDialogOpen] =
    useState<boolean>(false);

  // State for filters
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filter, setFilter] = useState<UserFilter>({
    roleList: [RolesEnum.STUDENT],
    sortBy: "-createdAt",
  });
  const [nameFilter, setNameFilter] = useState<string>("");
  const [emailFilter, setEmailFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [startCreatedAt, setStartCreatedAt] = useState<Date | null>(null);
  const [endCreatedAt, setEndCreatedAt] = useState<Date | null>(null);

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const currentFilter: UserFilter = {
        ...filter,
        name: nameFilter || undefined,
        email: emailFilter || undefined,
        status:
          statusFilter === "active"
            ? true
            : statusFilter === "inactive"
            ? false
            : undefined,
        startCreatedAt: startCreatedAt || undefined,
        endCreatedAt: endCreatedAt || undefined,
        sortBy: filter.sortBy as
          | "-createdAt"
          | "createdAt"
          | "updatedAt"
          | "-updatedAt"
          | undefined,
      };

      const response = await userService.findAll(
        page,
        itemsPerPage,
        currentFilter
      );
      setStudents(response.data.content);
      setTotalElements(response.data.totalElements);
    } catch (error) {
      toast.error("Error fetching student data");
      console.error("Error fetching students:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page, itemsPerPage, filter.sortBy]);

  // Handle row expansion
  const toggleRow = (id: number) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Pagination handlers
  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleItemsPerPageChange = (value: string | number) => {
    setItemsPerPage(value as number);
    setPage(1);
  };

  // Dialog handlers
  const handleEdit = (name: string) => {
    toast.info(`Edit user ${name}`);
    // Navigation logic would go here
  };

  const handleChangeStatus = (user: User) => {
    setSelectedUser(user);
    setChangeStatusDialogOpen(true);
  };

  const confirmChangeStatus = async () => {
    if (selectedUser) {
      try {
        const newStatus = selectedUser.status === true ? false : true;
        await userService.patch(selectedUser.id, { status: newStatus });

        setStudents((prev) =>
          prev.map((student) =>
            student.id === selectedUser.id
              ? { ...student, status: newStatus }
              : student
          )
        );

        toast.success(`Status for ${selectedUser.name} has been updated`);
      } catch (error) {
        toast.error("Failed to update user status");
      } finally {
        setChangeStatusDialogOpen(false);
        setSelectedUser(null);
      }
    }
  };

  const cancelChangeStatus = () => {
    setChangeStatusDialogOpen(false);
    setSelectedUser(null);
  };

  const handleRemove = (user: User) => {
    setSelectedUser(user);
    setRemoveDialogOpen(true);
  };

  const confirmRemove = async () => {
    if (selectedUser) {
      try {
        await userService.remove(selectedUser.id);

        // Update local state
        setStudents((prev) =>
          prev.filter((student) => student.id !== selectedUser.id)
        );
        setTotalElements((prev) => prev - 1);

        toast.success(`${selectedUser.name} has been removed`);
      } catch (error) {
        toast.error("Failed to remove user");
      } finally {
        setRemoveDialogOpen(false);
        setSelectedUser(null);
      }
    }
  };

  const cancelRemove = () => {
    setRemoveDialogOpen(false);
    setSelectedUser(null);
  };

  // Filter handlers
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleApplyFilters = () => {
    setPage(1);
    fetchStudents();
  };

  const handleResetFilters = () => {
    setNameFilter("");
    setEmailFilter("");
    setStatusFilter("");
    setStartCreatedAt(null);
    setEndCreatedAt(null);
    setFilter({
      roleList: [RolesEnum.STUDENT],
      sortBy: "-createdAt",
    });
    setPage(1);
    // Fetch with reset filters
    setTimeout(() => {
      fetchStudents();
    }, 0);
  };

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    // Ensure the value is of the correct type
    const sortValue = event.target.value as
      | "-createdAt"
      | "createdAt"
      | "updatedAt"
      | "-updatedAt";
    setFilter((prev) => ({
      ...prev,
      sortBy: sortValue,
    }));
  };

  return {
    students,
    isLoading,
    totalElements,
    page,
    itemsPerPage,
    openRows,
    selectedUser,
    isRemoveDialogOpen,
    isChangeStatusDialogOpen,
    showFilters,
    filter,
    nameFilter,
    emailFilter,
    statusFilter,
    startCreatedAt,
    endCreatedAt,
    fetchStudents,
    toggleRow,
    handleChangePage,
    handleItemsPerPageChange,
    handleEdit,
    handleChangeStatus,
    confirmChangeStatus,
    cancelChangeStatus,
    handleRemove,
    confirmRemove,
    cancelRemove,
    toggleFilters,
    handleApplyFilters,
    handleResetFilters,
    handleSortChange,
    setNameFilter,
    setEmailFilter,
    setStatusFilter,
    setStartCreatedAt,
    setEndCreatedAt,
  };
}
