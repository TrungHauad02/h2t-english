import { Avatar, Button, MenuItem, Stack, TextField, Grid, Box } from "@mui/material";
import WETextField from "components/input/WETextField";
import { LevelsEnum, StatusEnum } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import UseTeacherAdvance from "../hooks/UseTeacherAdvance";
import { WEDialog } from "components/display";
import { useNavigate } from "react-router-dom";

export default function TeacherAdvance() {
    const color = useColor();
    const { isDarkMode } = useDarkMode();
    const useTeacherAdvance = UseTeacherAdvance();
    const navigate = useNavigate();

    return (
        <Stack sx={{ margin: "auto", mt: 2, maxWidth: 1150, padding: 4, boxShadow: 3, borderRadius: 2, backgroundColor: "background.paper" }}>
            <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    id="avatar-upload"
                    onChange={(e) => useTeacherAdvance.handleChooseAvatar(e.target.files?.[0] ?? null)}
                    disabled={!useTeacherAdvance.isEditing}
                />
                <label htmlFor="avatar-upload" style={{ cursor: "pointer" }}>
                    <Avatar src={useTeacherAdvance.avatar ?? ""} sx={{ width: 150, height: 150, mb: 1 }} />
                </label>
            </Box>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <WETextField label="Email" type="email" name="email"
                        value={useTeacherAdvance.email}
                        onChange={useTeacherAdvance.handleInputChange}
                        required placeholder="Enter your email"
                        disabled={!useTeacherAdvance.isEditing} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <WETextField label="Name" type="text" name="name"
                        value={useTeacherAdvance.name}
                        onChange={useTeacherAdvance.handleInputChange}
                        required placeholder="Enter your name"
                        disabled={!useTeacherAdvance.isEditing} />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <WETextField label="Phone Number" type="tel" name="phoneNumber"
                        value={useTeacherAdvance.phoneNumber}
                        onChange={useTeacherAdvance.handleInputChange}
                        required placeholder="Enter your phone number"
                        disabled={!useTeacherAdvance.isEditing} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <WETextField label="Date of Birth" type="date" name="dateOfBirth"
                        value={useTeacherAdvance.dateOfBirth ? useTeacherAdvance.dateOfBirth.toISOString().split("T")[0] : ""}
                        onChange={useTeacherAdvance.handleInputChange} required
                        disabled={!useTeacherAdvance.isEditing} />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField label="Level" name="level" value={useTeacherAdvance.level} onChange={useTeacherAdvance.handleInputChange} select fullWidth disabled={!useTeacherAdvance.isEditing}>
                        {Object.values(LevelsEnum).map((level) => (
                            <MenuItem key={level} value={level}>
                                {level}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField label="Status" name="status" value={useTeacherAdvance.status ? StatusEnum.ACTIVE : StatusEnum.INACTIVE} onChange={(e) => useTeacherAdvance.setStatus(e.target.value === StatusEnum.ACTIVE)} select fullWidth disabled={!useTeacherAdvance.isEditing}>
                        <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                        <MenuItem value="INACTIVE">INACTIVE</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={12}>
                    <Box display="flex" justifyContent="space-between">
                        <Button variant="contained" sx={{ bgcolor: isDarkMode ? color.red700 : color.red500, flex: 1, mx: 1 }} onClick={useTeacherAdvance.handleRemove}>
                            Delete
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ bgcolor: isDarkMode ? color.edit : color.edit, flex: 1, mx: 1 }}
                            onClick={useTeacherAdvance.handleChange}
                        >
                            {useTeacherAdvance.isEditing ? "Lock" : "Change"}
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ bgcolor: isDarkMode ? color.btnSubmitBg : color.btnSubmitHoverBg, flex: 1, mx: 1 }}
                            onClick={() => {
                                useTeacherAdvance.handleSubmit();
                                navigate("/admin/manage-teacher");
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <WEDialog
                open={useTeacherAdvance.isRemoveDialogOpen}
                title="Confirm Delete"
                onCancel={useTeacherAdvance.cancelRemove}
                onOk={useTeacherAdvance.confirmRemove}
            >
                Are you sure you want to Delete?
            </WEDialog>
        </Stack>
    );
}
