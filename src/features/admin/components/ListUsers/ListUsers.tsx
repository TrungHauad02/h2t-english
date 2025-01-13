import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Collapse, Avatar, Typography, Box, Paper } from "@mui/material";
import { Edit, Delete, SwapHoriz, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { User } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { RolesEnum, StatusEnum } from "interfaces";
import { WEPaginationSelect } from "components/pagination";
import useListUsers from "./useListUsers";
import WEDialog from "../../../../components/display/dialog/WEDialog";

interface ListUserProps {
    users: User[];
    title: string;
}

const ListUser: React.FC<ListUserProps> = ({ users, title }) => {
    const color = useColor();
    const { isDarkMode } = useDarkMode();
    const {
        page,
        usersPerPage,
        paginatedUsers,
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
    } = useListUsers({ users });

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                {title}
            </Typography>
            <TableContainer
                component={Paper}
                sx={{ overflowX: "auto", maxWidth: "100%" }}
            >
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: isDarkMode ? color.emerald900 : color.emerald100 }}>
                            <TableCell sx={{ textAlign: "center", fontWeight: "bold" }} />
                            <TableCell sx={{ fontWeight: "bold" }}>Avatar</TableCell>
                            <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>Name</TableCell>
                            <TableCell sx={{ textAlign: "center", fontWeight: "bold", display: { xs: "none", sm: "table-cell" } }}>Email</TableCell>
                            <TableCell sx={{ textAlign: "center", fontWeight: "bold", display: { xs: "none", sm: "table-cell" } }}>Status</TableCell>
                            <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedUsers.map((user) => (
                            <React.Fragment key={user.id}>
                                <TableRow>
                                    <TableCell>
                                        <IconButton size="small" onClick={() => toggleRow(user.id)}>
                                            {openRows[user.id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        <Avatar src={user.avatar} alt={user.name} />
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{user.name}</TableCell>
                                    <TableCell
                                        sx={{ textAlign: "center", display: { xs: "none", sm: "table-cell" } }}>
                                        {user.email}
                                    </TableCell>
                                    <TableCell
                                        sx={{ textAlign: "center", display: { xs: "none", sm: "table-cell" } }}>
                                        <Box
                                            sx={{
                                                display: "inline-block",
                                                bgcolor: user.status === StatusEnum.ACTIVE ? (isDarkMode ? color.green900 : color.green500) : color.red,
                                                fontWeight: "bold",
                                                borderRadius: 1,
                                                padding: "4px 16px",
                                            }}
                                        >
                                            {user.status}
                                        </Box>
                                    </TableCell>

                                    <TableCell sx={{ textAlign: "center" }}>
                                        {user.roleEnum === RolesEnum.TEACHER && (
                                            <IconButton size="small" onClick={() => handleEdit(user.name)}>
                                                <Edit />
                                            </IconButton>
                                        )}
                                        <IconButton size="small" onClick={() => handleChangeStatus(user)}>
                                            <SwapHoriz />
                                        </IconButton>
                                        <IconButton size="small" onClick={() => handleRemove(user)}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{ bgcolor: isDarkMode ? color.teal900 : color.teal100 }}>
                                    <TableCell colSpan={6} sx={{ padding: 0, paddingLeft: { xs: 1, md: 14 } }}>
                                        <Collapse in={openRows[user.id]} unmountOnExit>
                                            <Box margin={2}>
                                                <Typography>
                                                    <strong>Name: </strong>
                                                    {user.name}
                                                </Typography>
                                                <Typography>
                                                    <strong>Email: </strong>
                                                    {user.email}
                                                </Typography>
                                                <Typography>
                                                    <strong>Status: </strong>
                                                    {user.status}
                                                </Typography>
                                                <Typography>
                                                    <strong>Phone: </strong>
                                                    {user.phoneNumber}
                                                </Typography>
                                                <Typography>
                                                    <strong>Date of Birth: </strong>
                                                    {user.dateOfBirth.toLocaleDateString()}
                                                </Typography>
                                                {user.roleEnum === RolesEnum.STUDENT && (
                                                    <Typography>
                                                        <strong>Motivation: </strong>
                                                        {user.contentMotivation}
                                                    </Typography>
                                                )}
                                                <Typography>
                                                    <strong>Start Date: </strong>
                                                    {user.startDate.toLocaleDateString()}
                                                </Typography>
                                                <Typography>
                                                    <strong>End Date: </strong>
                                                    {user.endDate.toLocaleDateString()}
                                                </Typography>
                                                {user.roleEnum === RolesEnum.TEACHER && (
                                                    <Typography>
                                                        <strong>Level: </strong>
                                                        {user.levelEnum}
                                                    </Typography>
                                                )}
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <WEPaginationSelect
                page={page}
                totalPage={Math.ceil(users.length / usersPerPage)}
                itemsPerPage={usersPerPage}
                onPageChange={handleChangePage}
                onItemsPerPageChange={handleUsersPerPageChange}
            />
            <WEDialog
                open={isRemoveDialogOpen}
                title="Confirm Delete"
                onCancel={cancelRemove}
                onOk={confirmRemove}
            >
                Are you sure you want to remove {selectedUser?.name}?
            </WEDialog>
            <WEDialog
                open={isChangeStatusDialogOpen}
                title="Confirm Status Change"
                onCancel={cancelChangeStatus}
                onOk={confirmChangeStatus}
            >
                Are you sure you want to change status of {selectedUser?.name} to{" "}
                {selectedUser?.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"}?
            </WEDialog>
        </Box>
    );
}

export default ListUser;
