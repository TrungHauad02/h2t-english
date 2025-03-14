import React from "react";
import {
    CardContent,
    Grid,
    Stack,
    TextField,
    Typography,
    Divider,
    InputAdornment,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CakeIcon from "@mui/icons-material/Cake";
import { WESelectImage } from "components/input";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { formatDate } from "utils/format";

interface EditModeContentProps {
    formData: any;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleAvatarChange: (url: string) => void;
    handleDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditModeContent: React.FC<EditModeContentProps> = ({
    formData,
    handleChange,
    handleAvatarChange,
    handleDateChange,
}) => {
    const color = useColor();
    const { isDarkMode } = useDarkMode();
    const textColor = isDarkMode ? color.gray200 : color.gray900;
    const borderColor = isDarkMode ? color.gray700 : color.gray300;

    return (
        <CardContent sx={{ p: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={3}>
                    <Stack spacing={3} alignItems="center">
                        <WESelectImage value={formData?.avatar || ""} onChange={handleAvatarChange} />
                        <Typography
                            variant="body2"
                            sx={{ color: isDarkMode ? color.gray300 : color.gray600, textAlign: "center" }}
                        >
                            Click to change profile picture
                        </Typography>
                    </Stack>
                </Grid>

                <Grid item xs={12} md={9}>
                    <Stack spacing={4}>
                        <TextField
                            fullWidth
                            name="name"
                            label="Full Name"
                            value={formData?.name}
                            onChange={handleChange}
                            sx={{
                                "& .MuiOutlinedInput-root fieldset": { borderColor },
                                "& .MuiInputLabel-root": { color: isDarkMode ? color.gray400 : color.gray600 },
                                "& .MuiInputBase-input": { color: textColor },
                            }}
                        />

                        <Divider sx={{ borderColor }} />

                        <Typography variant="subtitle1" sx={{ color: isDarkMode ? color.teal300 : color.teal700, fontWeight: "bold" }}>
                            Contact Information
                        </Typography>

                        <TextField
                            fullWidth
                            name="email"
                            label="Email Address"
                            value={formData?.email}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon sx={{ color: isDarkMode ? color.teal400 : color.teal600 }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root fieldset": { borderColor },
                                "& .MuiInputLabel-root": { color: isDarkMode ? color.gray400 : color.gray600 },
                                "& .MuiInputBase-input": { color: textColor },
                            }}
                        />

                        <TextField
                            fullWidth
                            name="phoneNumber"
                            label="Phone Number"
                            value={formData?.phoneNumber}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneIcon sx={{ color: isDarkMode ? color.teal400 : color.teal600 }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root fieldset": { borderColor },
                                "& .MuiInputLabel-root": { color: isDarkMode ? color.gray400 : color.gray600 },
                                "& .MuiInputBase-input": { color: textColor },
                            }}
                        />

                        <Divider sx={{ borderColor }} />

                        <Typography variant="subtitle1" sx={{ color: isDarkMode ? color.teal300 : color.teal700, fontWeight: "bold" }}>
                            Personal Information
                        </Typography>

                        <TextField
                            fullWidth
                            type="date"
                            label="Date of Birth"
                            value={formatDate(formData?.dateOfBirth || new Date())}
                            onChange={handleDateChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CakeIcon sx={{ color: isDarkMode ? color.teal400 : color.teal600 }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root fieldset": { borderColor },
                                "& .MuiInputLabel-root": { color: isDarkMode ? color.gray400 : color.gray600 },
                                "& .MuiInputBase-input": { color: textColor },
                            }}
                        />
                    </Stack>
                </Grid>
            </Grid>
        </CardContent>
    );
};

export default EditModeContent;
