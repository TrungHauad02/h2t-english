import { Avatar, Box, CardContent, FormControl, Grid, InputAdornment, OutlinedInput, Stack, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CakeIcon from "@mui/icons-material/Cake";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import UpdateIcon from "@mui/icons-material/Update";
import { formatDate } from "utils/format";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { User } from "interfaces";

interface ViewModeContentProps {
    data: User | null;
}

export const ViewModeContent = ({ data }: ViewModeContentProps) => {
    const color = useColor();
    const { isDarkMode } = useDarkMode();

    const textColor = isDarkMode ? color.gray200 : color.gray900;
    const accentColor = isDarkMode ? color.teal300 : color.teal600;
    const secondaryTextColor = isDarkMode ? color.gray300 : color.gray600;

    return (
        <CardContent sx={{ pb: 4, pt: 10, position: "relative", maxwidth: { md: "1400px" } }}>
            <Box
                sx={{
                    position: "absolute",
                    top: -80,
                    left: { xs: "50%", md: 100 },
                    transform: { xs: "translateX(-50%)", md: "none" },
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    border: `4px solid ${isDarkMode ? color.teal700 : color.white}`,
                    overflow: "hidden",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
            >
                <Avatar src={data?.avatar} alt={data?.name} sx={{ width: "100%", height: "100%" }} />
            </Box>

            <Typography
                variant="h4"
                sx={{
                    position: {md: "absolute"},
                    top: 0,
                    left: { xs: "50%", md: 300 },
                    fontWeight: "bold",
                    textAlign: { xs: "center", md: "left" },
                    mt: { xs: 2, md: 0 },
                    color: isDarkMode ? color.teal300 : color.teal700,
                }}
            >
                {data?.name}
            </Typography>

            <Grid container spacing={4} mt={0}>
                <Grid item xs={12} md={6}>
                    <Stack spacing={3}>
                        <Box>
                            <Typography variant="subtitle2" sx={{ color: secondaryTextColor, mb: 1 }}>
                                Contact Information
                            </Typography>
                            <Stack spacing={2}>
                                <FormControl fullWidth variant="outlined">
                                    <OutlinedInput
                                        id="email-input"
                                        value={data?.email}
                                        disabled
                                        readOnly
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <EmailIcon sx={{ color: accentColor }} />
                                            </InputAdornment>
                                        }
                                        sx={{
                                            bgcolor: isDarkMode ? color.gray800 : color.gray100,
                                            "& .MuiOutlinedInput-notchedOutline": { borderColor: "transparent" },
                                            "& .MuiInputBase-input": { color: textColor, cursor: "default" },
                                        }}
                                    />
                                </FormControl>

                                <FormControl fullWidth variant="outlined">
                                    <OutlinedInput
                                        id="phone-input"
                                        value={data?.phoneNumber}
                                        disabled
                                        readOnly
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <PhoneIcon sx={{ color: accentColor }} />
                                            </InputAdornment>
                                        }
                                        sx={{
                                            bgcolor: isDarkMode ? color.gray800 : color.gray100,
                                            "& .MuiOutlinedInput-notchedOutline": { borderColor: "transparent" },
                                            "& .MuiInputBase-input": { color: textColor, cursor: "default" },
                                        }}
                                    />
                                </FormControl>
                            </Stack>
                        </Box>
                    </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Stack spacing={3}>
                        <Box>
                            <Typography variant="subtitle2" sx={{ color: secondaryTextColor, mb: 1 }}>
                                Personal Information
                            </Typography>
                            <Stack spacing={2}>
                                <FormControl fullWidth variant="outlined">
                                    <OutlinedInput
                                        id="dob-input"
                                        value={formatDate(data?.dateOfBirth)}
                                        disabled
                                        readOnly
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <CakeIcon sx={{ color: accentColor }} />
                                            </InputAdornment>
                                        }
                                        sx={{
                                            bgcolor: isDarkMode ? color.gray800 : color.gray100,
                                            "& .MuiOutlinedInput-notchedOutline": { borderColor: "transparent" },
                                            "& .MuiInputBase-input": { color: textColor, cursor: "default" },
                                        }}
                                    />
                                </FormControl>

                                {/* Account Status */}
                                <Box sx={{ display: "flex", alignItems: "center", p: 1.5, bgcolor: isDarkMode ? color.gray800 : color.teal50, borderRadius: 2 }}>
                                    <Typography variant="body2" sx={{ color: secondaryTextColor, fontWeight: "medium" }}>
                                        Account Status:
                                        <Box component="span" sx={{ ml: 1, color: data?.status ? color.emerald600 : color.red600, fontWeight: "bold" }}>
                                            {data?.status ? "Active" : "Inactive"}
                                        </Box>
                                    </Typography>
                                </Box>

                                {/* Created At */}
                                <Box sx={{ display: "flex", alignItems: "center", p: 1.5, bgcolor: isDarkMode ? color.gray800 : color.teal50, borderRadius: 2 }}>
                                    <CalendarTodayIcon sx={{ mr: 1.5, color: accentColor }} />
                                    <Typography variant="body2" sx={{ color: secondaryTextColor, fontWeight: "medium" }}>
                                        Created: {formatDate(data?.createdAt || new Date())}
                                    </Typography>
                                </Box>

                                {/* Updated At */}
                                <Box sx={{ display: "flex", alignItems: "center", p: 1.5, bgcolor: isDarkMode ? color.gray800 : color.teal50, borderRadius: 2 }}>
                                    <UpdateIcon sx={{ mr: 1.5, color: accentColor }} />
                                    <Typography variant="body2" sx={{ color: secondaryTextColor, fontWeight: "medium" }}>
                                        Updated: {formatDate(data?.updatedAt || new Date())}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </CardContent>
    );
};

export default ViewModeContent;
