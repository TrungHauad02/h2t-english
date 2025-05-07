import ListUser from "../ListUsers";

interface StudentsListProps {
  users: any[];
  openRows: Record<number, boolean>;
  toggleRow: (id: number) => void;
  handleEdit: (user: any) => void;
  handleChangeStatus: (user: any) => void;
  handleRemove: (user: any) => void;
}

export default function StudentsList({
  users,
  openRows,
  toggleRow,
  handleEdit,
  handleChangeStatus,
  handleRemove,
}: StudentsListProps) {
  return (
    <ListUser
      users={users}
      openRows={openRows}
      toggleRow={(id: number) => toggleRow(id)}
      handleEdit={handleEdit}
      handleChangeStatus={handleChangeStatus}
      handleRemove={handleRemove}
    />
  );
}
