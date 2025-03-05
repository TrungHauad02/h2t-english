import { Box, Button, Avatar, FormControlLabel, Radio } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { useRegisterForm } from "../hooks/useRegisterForm";
import WETextField from "../../../components/input/WETexField"
import { RolesEnum } from "interfaces";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
    const useRegister = useRegisterForm();
    const color = useColor();
    const { isDarkMode } = useDarkMode();

    return (
        <Box
            sx={{
                padding: 3,
                border: "1px solid #e0e0e0",
                borderRadius: "10px",
                boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                bgcolor: isDarkMode ? color.gray900 : color.gray100,
                color: isDarkMode ? color.white : color.black,
                width: "80%",
            }}
        >
            <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    id="avatar-upload"
                    onChange={(e) => useRegister.handleChooseAvatar(e.target.files?.[0] ?? null)}
                />

                <label htmlFor="avatar-upload" style={{ cursor: "pointer" }}>
                    <Avatar
                        src={useRegister.avatar ?? ""}
                        sx={{ width: 80, height: 80, mb: 1 }}
                    />
                </label>
            </Box>
            <WETextField
                label="Email"
                type="email"
                value={useRegister.email}
                onChange={(e) => useRegister.setEmail(e.target.value)}
                required={true}
                name="email"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        useRegister.handleRegister();
                    }
                }}
            />
            <WETextField
                label="User name"
                type="name"
                value={useRegister.userName}
                onChange={(e) => useRegister.setUserName(e.target.value)}
                required={true}
                name="userName"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        useRegister.handleRegister();
                    }
                }}
            />
            {useRegister.role === RolesEnum.TEACHER && (
                <>
                    <WETextField
                        label="Phone Number"
                        type="text"
                        value={useRegister.phoneNumber}
                        onChange={(e) => useRegister.setPhoneNumber}
                        required
                    />
                    <WETextField
                        label="Date of Birth"
                        type="date"
                        value={useRegister.dateOfBirth ? useRegister.dateOfBirth.toISOString().split("T")[0] : ""}
                        onChange={(e) => useRegister.setDateOfBirth(new Date(e.target.value))}
                        required
                    />
                </>
            )}
            <WETextField
                label="Password"
                type={useRegister.showPassword ? "text" : "password"}
                value={useRegister.password}
                onChange={(e) => useRegister.setPassword(e.target.value)}
                showPassword={useRegister.showPassword}
                setShowPassword={useRegister.setShowPassword}
                required={true}
                name="password"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        useRegister.handleRegister();
                    }
                }}
            />
            <WETextField
                label="Confirm Password"
                type={useRegister.showPassword ? "text" : "password"}
                value={useRegister.confirmPassword}
                onChange={(e) => useRegister.setConfirmPassword(e.target.value)}
                showPassword={useRegister.showPassword}
                setShowPassword={useRegister.setShowPassword}
                required={true}
                name="password"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        useRegister.handleRegister();
                    }
                }}
            />
            <Box display="flex" justifyContent="center" gap={2}>
                <FormControlLabel
                    control={
                        <Radio
                            checked={useRegister.role === RolesEnum.STUDENT}
                            onChange={() => useRegister.setRole(RolesEnum.STUDENT)}
                        />
                    }
                    label="Student"
                />
                <FormControlLabel
                    control={
                        <Radio
                            checked={useRegister.role === RolesEnum.TEACHER}
                            onChange={() => useRegister.setRole(RolesEnum.TEACHER)}
                        />
                    }
                    label="Teacher"
                />
            </Box>
            <Button
                fullWidth
                variant="contained"
                sx={{
                    bgcolor: color.emerald500,
                    color: isDarkMode ? color.black : color.white,
                    mt: 1,
                }}
                onClick={() => useRegister.handleRegister()}
            >
                Register
            </Button>
        </Box>
    );
};