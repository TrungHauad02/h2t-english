import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Collapse, Avatar, Typography, Box, Paper } from "@mui/material";
import { Edit, Delete, SwapHoriz, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Person, Email, Phone, CalendarToday, School } from '@mui/icons-material';
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { User, RolesEnum } from "interfaces";
import { WEPaginationSelect } from "components/pagination";
import useListUsers from "../hooks/useListUsers";
import { WEDialog, WEConfirmDelete } from "components/display";

interface ListUserProps {
    users: User[];
}

export default function ListUser({ users }: ListUserProps) {
    const color = useColor();
    const { isDarkMode } = useDarkMode();
    const hooks = useListUsers({ users });

    return (
        <Box>
            <TableContainer
                component={Paper}
                sx={{ overflowX: "auto", maxWidth: "100%" }}
            >
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: isDarkMode ? color.emerald900 : color.emerald100 }}>
                            <TableCell sx={{ textAlign: "center", fontWeight: "bold" }} />
                            <TableCell sx={{ fontWeight: "bold", display: { xs: "none", sm: "none", md: "table-cell" } }}>Avatar</TableCell>
                            <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>Name</TableCell>
                            <TableCell sx={{ textAlign: "center", fontWeight: "bold", display: { xs: "none", sm: "none", md: "table-cell" } }}>Role</TableCell>
                            <TableCell sx={{ textAlign: "center", fontWeight: "bold", display: { xs: "none", sm: "none", md: "table-cell" } }}>Status</TableCell>
                            <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {hooks.paginatedUsers.map((user) => (
                            <React.Fragment key={user.id}>
                                <TableRow>
                                    <TableCell>
                                        <IconButton size="small" onClick={() => hooks.toggleRow(user.id)}>
                                            {hooks.openRows[user.id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        <Avatar src={user.avatar} alt={user.name} />
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{user.name}</TableCell>
                                    <TableCell
                                        sx={{ textAlign: "center", display: { xs: "none", sm: "none", md: "table-cell" } }}>
                                        {user.roleEnum}
                                    </TableCell>
                                    <TableCell
                                        sx={{ textAlign: "center", display: { xs: "none", sm: "none", md: "table-cell" } }}>
                                        <Box
                                            sx={{
                                                display: "inline-block",
                                                bgcolor: user.status === true ? (isDarkMode ? color.green900 : color.green300) : color.warning,
                                                fontWeight: "bold",
                                                borderRadius: 1,
                                                padding: "4px 16px",
                                            }}
                                        >
                                            {user.status}
                                        </Box>
                                    </TableCell>

                                    <TableCell sx={{ textAlign: "center" }}>
                                        {(user.roleEnum === RolesEnum.TEACHER || user.roleEnum === RolesEnum.TEACHER_ADVANCE) && (
                                            <IconButton size="small" onClick={() => hooks.handleEdit(user.name)}>
                                                <Edit />
                                            </IconButton>
                                        )}
                                        <IconButton size="small" onClick={() => hooks.handleChangeStatus(user)}>
                                            <SwapHoriz />
                                        </IconButton>
                                        <IconButton size="small" onClick={() => hooks.handleRemove(user)}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{ bgcolor: isDarkMode ? color.teal900 : color.teal100 }}>
                                    <TableCell colSpan={7} sx={{ padding: 0, paddingLeft: { xs: 1, md: 14 } }}>
                                        <Collapse in={hooks.openRows[user.id]} unmountOnExit>
                                            <Box margin={2}>
                                                <Typography>
                                                    <Person sx={{ marginRight: 1 }} />
                                                    <strong>Role: </strong>
                                                    {user.roleEnum}
                                                </Typography>
                                                <Typography>
                                                    <Email sx={{ marginRight: 1 }} />
                                                    <strong>Email: </strong>
                                                    {user.email}
                                                </Typography>
                                                {(user.roleEnum === RolesEnum.TEACHER || user.roleEnum === RolesEnum.TEACHER_ADVANCE) && (
                                                    <>
                                                        <Typography>
                                                            <Phone sx={{ marginRight: 1 }} />
                                                            <strong>Phone: </strong>
                                                            {user.phoneNumber}
                                                        </Typography>
                                                        <Typography>
                                                            <CalendarToday sx={{ marginRight: 1 }} />
                                                            <strong>Date of Birth: </strong>
                                                            {user.dateOfBirth.toLocaleDateString()}
                                                        </Typography>
                                                        <Typography>
                                                            <School sx={{ marginRight: 1 }} />
                                                            <strong>Level: </strong>
                                                            {user.levelEnum}
                                                        </Typography>
                                                    </>
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
                page={hooks.page}
                totalPage={Math.ceil(users.length / hooks.usersPerPage)}
                itemsPerPage={hooks.usersPerPage}
                onPageChange={hooks.handleChangePage}
                onItemsPerPageChange={hooks.handleUsersPerPageChange}
            />
            <WEConfirmDelete
                open={hooks.isRemoveDialogOpen}
                resourceName={hooks.selectedUser?.name || "this user"}
                onCancel={hooks.cancelRemove}
                onConfirm={hooks.confirmRemove}
            />
            <WEDialog
                open={hooks.isChangeStatusDialogOpen}
                title="Confirm Status Change"
                onCancel={hooks.cancelChangeStatus}
                onOk={hooks.confirmChangeStatus}
            >
                Are you sure you want to change status of {hooks.selectedUser?.name} to{" "}
                {hooks.selectedUser?.status === true ? false : true}?
            </WEDialog>
        </Box>
    );
}