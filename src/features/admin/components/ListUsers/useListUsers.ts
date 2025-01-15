import { User } from "interfaces";
import { useState } from "react";
import { toast } from "react-toastify";
import { StatusEnum } from "interfaces";

interface UseListUserProps {
  users: User[];
}

interface UseListUserReturn {
  page: number;
  usersPerPage: number;
  paginatedUsers: User[];
  totalPage: number;
  openRows: Record<string, boolean>;
  toggleRow: (id: string) => void;
  handleChangePage: (event: React.ChangeEvent<unknown>, value: number) => void;
  handleUsersPerPageChange: (value: string | number) => void;
  handleEdit: (name: string) => void;
  handleChangeStatus: (user: User) => void; 
  confirmChangeStatus: () => void; 
  cancelChangeStatus: () => void; 
  handleRemove: (user: User) => void; 
  confirmRemove: () => void; 
  cancelRemove: () => void; 
  isRemoveDialogOpen: boolean; 
  isChangeStatusDialogOpen: boolean;
  selectedUser: User | null;
}

const useListUsers = ({ users }: UseListUserProps): UseListUserReturn => {
  const [userList, setUserList] = useState<User[]>(users);
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(8);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isRemoveDialogOpen, setRemoveDialogOpen] = useState(false);
  const [isChangeStatusDialogOpen, setChangeStatusDialogOpen] = useState(false);

  const toggleRow = (id: string) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleUsersPerPageChange = (value: string | number) => {
    setUsersPerPage(value as number);
    setPage(1);
  };

  const startIndex = (page - 1) * usersPerPage;
  const paginatedUsers = userList.slice(startIndex, startIndex + usersPerPage); 
  const totalPage = Math.ceil(userList.length / usersPerPage);  

  const handleEdit = (name: string) => {
    toast.info(`Edit user ${name}`);
  };

  const handleChangeStatus = (user: User) => {
    setSelectedUser(user);
    setChangeStatusDialogOpen(true); 
  };

  const confirmChangeStatus = () => {
    if (selectedUser) {
      const updatedUsers = userList.map((user) =>
        user.id === selectedUser.id
          ? { ...user, status: user.status === StatusEnum.ACTIVE ? StatusEnum.INACTIVE : StatusEnum.ACTIVE }
          : user
      );

      setUserList(updatedUsers);
      toast.success(`User ${selectedUser.name} status changed!`);

      setChangeStatusDialogOpen(false);
      setSelectedUser(null);
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

  const confirmRemove = () => {
    if (selectedUser) {
      const updatedUsers = userList.filter((user) => user.id !== selectedUser.id);
      setUserList(updatedUsers);
      toast.success(`User ${selectedUser.name} removed!`);
      setRemoveDialogOpen(false);
      setSelectedUser(null); 
    }
  };

  const cancelRemove = () => {
    setRemoveDialogOpen(false);
    setSelectedUser(null);
  };

  return {
    page,
    usersPerPage,
    paginatedUsers,
    totalPage,
    openRows,
    toggleRow,
    handleChangePage,
    handleUsersPerPageChange,
    handleEdit,
    handleChangeStatus, 
    confirmChangeStatus, 
    cancelChangeStatus, 
    handleRemove,
    confirmRemove,
    cancelRemove,
    isRemoveDialogOpen,
    isChangeStatusDialogOpen,
    selectedUser,
  };
};

export default useListUsers;
