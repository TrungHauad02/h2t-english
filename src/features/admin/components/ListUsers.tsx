import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
} from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { User } from "interfaces";
import { UserTableHeader, UserTableRow } from "./userList";

interface ListUserProps {
  users: User[];
  openRows: Record<string, boolean>;
  toggleRow: (id: number) => void;
  handleEdit: (name: string) => void;
  handleChangeStatus: (user: User) => void;
  handleRemove: (user: User) => void;
}

export default function ListUser({
  users,
  openRows,
  toggleRow,
  handleEdit,
  handleChangeStatus,
  handleRemove,
}: ListUserProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <TableContainer
      component={Paper}
      sx={{
        overflowX: "auto",
        maxWidth: "100%",
        borderRadius: "1.5rem",
        boxShadow: isDarkMode
          ? "0 8px 32px rgba(0,0,0,0.6)"
          : "0 8px 24px rgba(0,0,0,0.15)",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: isDarkMode
            ? "0 12px 40px rgba(0,0,0,0.7)"
            : "0 12px 32px rgba(0,0,0,0.2)",
        },
        border: `1px solid ${isDarkMode ? color.teal800 : color.teal100}`,
      }}
    >
      <Table>
        <TableHead>
          <UserTableHeader />
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              isOpen={openRows[user.id]}
              onToggle={() => toggleRow(user.id)}
              onEdit={handleEdit}
              onChangeStatus={handleChangeStatus}
              onRemove={handleRemove}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
