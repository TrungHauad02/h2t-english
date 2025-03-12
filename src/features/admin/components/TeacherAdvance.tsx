import { Avatar, Button, MenuItem, Stack, TextField, Grid, Box } from "@mui/material";
import WETextField from "components/input/WETextField";
import { LevelsEnum, StatusEnum } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { WEDialog } from "components/display";
import { useNavigate } from "react-router-dom";
import useTeacherAdvance from "../hooks/useTeacherAdvance";

export default function TeacherAdvance() {
    const color = useColor();
    const { isDarkMode } = useDarkMode();
    const hooks = useTeacherAdvance();
    const navigate = useNavigate();

    return (
        <Stack sx={{ margin: "auto", mt: 2, maxWidth: 1150, padding: 4, boxShadow: 3, borderRadius: 2, backgroundColor: "background.paper" }}>
            <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    id="avatar-upload"
                    onChange={(e) => hooks.handleChooseAvatar(e.target.files?.[0] ?? null)}
                    disabled={!hooks.isEditing}
                />
                <label htmlFor="avatar-upload" style={{ cursor: "pointer" }}>
                    <Avatar src={hooks.user.avatar ?? ""} sx={{ width: 150, height: 150, mb: 1 }} />
                </label>
            </Box>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <WETextField label="Email" type="email" name="email"
                        value={hooks.user.email}
                        onChange={hooks.handleInputChange}
                        required placeholder="Enter your email"
                        disabled={!hooks.isEditing} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <WETextField label="Name" type="text" name="name"
                        value={hooks.user.name}
                        onChange={hooks.handleInputChange}
                        required placeholder="Enter your name"
                        disabled={!hooks.isEditing} />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <WETextField label="Phone Number" type="tel" name="phoneNumber"
                        value={hooks.user.phoneNumber}
                        onChange={hooks.handleInputChange}
                        required placeholder="Enter your phone number"
                        disabled={!hooks.isEditing} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <WETextField label="Date of Birth" type="date" name="dateOfBirth"
                        value={hooks.user.dateOfBirth ? hooks.user.dateOfBirth.toISOString().split("T")[0] : ""}
                        onChange={hooks.handleInputChange} required
                        disabled={!hooks.isEditing} />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField label="Level" name="level" value={hooks.user.level} onChange={hooks.handleInputChange} select fullWidth disabled={!hooks.isEditing}>
                        {Object.values(LevelsEnum).map((level) => (
                            <MenuItem key={level} value={level}>
                                {level}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Status"
                        name="status"
                        value={hooks.user.status ? StatusEnum.ACTIVE : StatusEnum.INACTIVE}
                        onChange={(e) => hooks.setUser((prevUser) => ({
                            ...prevUser,
                            status: e.target.value === StatusEnum.ACTIVE
                        }))}
                        select
                        fullWidth
                        disabled={!hooks.isEditing}
                    >
                        <MenuItem value={StatusEnum.ACTIVE}>ACTIVE</MenuItem>
                        <MenuItem value={StatusEnum.INACTIVE}>INACTIVE</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={12}>
                    <Box display="flex" justifyContent="space-between">
                        <Button variant="contained" sx={{ bgcolor: isDarkMode ? color.red700 : color.red500, flex: 1, mx: 1 }} onClick={hooks.handleRemove}>
                            Delete
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ bgcolor: isDarkMode ? color.edit : color.edit, flex: 1, mx: 1 }}
                            onClick={hooks.handleChange}
                        >
                            {hooks.isEditing ? "Lock" : "Change"}
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ bgcolor: isDarkMode ? color.btnSubmitBg : color.btnSubmitHoverBg, flex: 1, mx: 1 }}
                            onClick={() => {
                                hooks.handleSubmit();
                                navigate("/admin/manage-teacher");
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <WEDialog
                open={hooks.isRemoveDialogOpen}
                title="Confirm Delete"
                onCancel={hooks.cancelRemove}
                onOk={hooks.confirmRemove}
            >
                Are you sure you want to Delete?
            </WEDialog>
        </Stack>
    );
}
