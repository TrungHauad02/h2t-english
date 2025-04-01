import React from "react";
import { Stack, Box, Typography, Button, Card } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { userService } from "../services/userServices";
import ViewModeContent from "./ViewModeContent";
import EditModeContent from "./EditModeContent";
import useTeacherInformation from "../hooks/useTeacherInformation";

export default function TeacherInformation() {
    const color = useColor();
    const { isDarkMode } = useDarkMode();
    const hooks = useTeacherInformation();

    React.useEffect(() => {
        const user = userService.getUserById(1);
        if (user) {
            hooks.setData(user);
            hooks.setFormData(user);
        }
    }, []);

    if (!hooks.data) {
        return (
            <Stack
                sx={{
                    mt: 8,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50vh",
                }}
            >
                <Typography
                    variant="h6"
                    sx={{ color: isDarkMode ? color.gray200 : color.gray800 }}
                >
                    Loading student profile...
                </Typography>
            </Stack>
        );
    }

    const paperBgColor = isDarkMode ? color.gray900 : color.gray50;
    const borderColor = isDarkMode ? color.gray700 : color.gray300;

    return (
        <Stack spacing={4} sx={{ mt: 4, px: { xs: 2, sm: 4, md: 6 }, pb: 8 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                }}
            >
                {!hooks.isEditMode ? (
                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={() => hooks.setIseditMode(true)}
                        sx={{
                            bgcolor: color.edit,
                            color: color.gray900,
                            "&:hover": {
                                bgcolor: isDarkMode ? color.emerald700 : color.emerald600,
                            },
                        }}
                    >
                        Edit Profile
                    </Button>
                ) : (
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={hooks.handleSave}
                            sx={{
                                bgcolor: color.save,
                                color: color.gray900,
                                "&:hover": {
                                    bgcolor: isDarkMode ? color.successDarkMode : color.success,
                                },
                            }}
                        >
                            Save
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<CancelIcon />}
                            onClick={hooks.handleCancel}
                            sx={{
                                bgcolor: color.delete,
                                color: color.white,
                                "&:hover": {
                                    bgcolor: isDarkMode ? color.red700 : color.red600,
                                },
                            }}
                        >
                            Cancel
                        </Button>
                    </Stack>
                )}
            </Box>

            <Card
                elevation={3}
                sx={{
                    bgcolor: paperBgColor,
                    borderRadius: 2,
                    overflow: "hidden",
                    border: `1px solid ${borderColor}`,
                }}
            >
                {!hooks.isEditMode && (
                    <Box
                        sx={{
                            height: 120,
                            bgcolor: isDarkMode ? color.teal900 : color.teal200,
                            position: "relative",
                        }}
                    />
                )}

                {hooks.isEditMode ? <EditModeContent
                    formData={hooks.formData}
                    handleChange={hooks.handleChange}
                    handleAvatarChange={hooks.handleAvatarChange}
                    handleDateChange={hooks.handleDateChange}
                /> : <ViewModeContent data={hooks.data} />}
            </Card>
        </Stack>
    );
}