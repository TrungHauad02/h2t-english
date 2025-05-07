import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { RolesEnum, LevelsEnum, User } from "interfaces";
import { UserFilter } from "interfaces/FilterInterfaces";
import { userService } from "services";
import { useNavigate } from "react-router-dom";

export default function useListTeacher() {
  const navigate = useNavigate();
  // State for teacher data
  const [teachers, setTeachers] = useState<User[]>([]);
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
    roleList: [RolesEnum.TEACHER, RolesEnum.TEACHER_ADVANCE],
    sortBy: "-createdAt",
  });
  const [nameFilter, setNameFilter] = useState<string>("");
  const [emailFilter, setEmailFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("all"); // "all", "teacher", "teacher_advance"
  const [levelFilter, setLevelFilter] = useState<string>(""); // Empty for all levels
  const [startCreatedAt, setStartCreatedAt] = useState<Date | null>(null);
  const [endCreatedAt, setEndCreatedAt] = useState<Date | null>(null);

  const fetchTeachers = async () => {
    setIsLoading(true);
    try {
      // Prepare the role list based on filter
      let roleList: RolesEnum[] = [];
      if (roleFilter === "all") {
        roleList = [RolesEnum.TEACHER, RolesEnum.TEACHER_ADVANCE];
      } else if (roleFilter === "teacher") {
        roleList = [RolesEnum.TEACHER];
      } else if (roleFilter === "teacher_advance") {
        roleList = [RolesEnum.TEACHER_ADVANCE];
      }

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
        level: levelFilter ? (levelFilter as LevelsEnum) : undefined,
        roleList: roleList,
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
      setTeachers(response.data.content);
      setTotalElements(response.data.totalElements);
    } catch (error) {
      toast.error("Error fetching teacher data");
      console.error("Error fetching teachers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
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

        setTeachers((prev) =>
          prev.map((teacher) =>
            teacher.id === selectedUser.id
              ? { ...teacher, status: newStatus }
              : teacher
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
        setTeachers((prev) =>
          prev.filter((teacher) => teacher.id !== selectedUser.id)
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
    fetchTeachers();
  };

  const handleResetFilters = () => {
    setNameFilter("");
    setEmailFilter("");
    setStatusFilter("");
    setRoleFilter("all");
    setLevelFilter("");
    setStartCreatedAt(null);
    setEndCreatedAt(null);
    setFilter({
      roleList: [RolesEnum.TEACHER, RolesEnum.TEACHER_ADVANCE],
      sortBy: "-createdAt",
    });
    setPage(1);
    // Fetch with reset filters
    setTimeout(() => {
      fetchTeachers();
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

  const onAddTeacher = () => {
    navigate("teacher-advance");
  };

  return {
    teachers,
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
    roleFilter,
    levelFilter,
    startCreatedAt,
    endCreatedAt,
    fetchTeachers,
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
    setRoleFilter,
    setLevelFilter,
    setStartCreatedAt,
    setEndCreatedAt,
    onAddTeacher,
  };
}
