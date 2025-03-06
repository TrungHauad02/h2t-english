import { Box, Button } from "@mui/material";
import useColor from "theme/useColor";
import WETextField from "../../../components/input/WETexField"
import { useDarkMode } from "hooks/useDarkMode";
import { useForgotPasswordForm } from "../hooks/useForgotPasswordForm";

export default function ForgotPasswordForm() {
    const color = useColor();
    const { isDarkMode } = useDarkMode();
    const useForgotPassword = useForgotPasswordForm();

    return (
        <Box
            sx={{
                padding: 3,
                border: "1px solid #e0e0e0",
                borderRadius: "10px",
                boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                bgcolor: isDarkMode ? color.gray900 : color.gray100,
                color: isDarkMode ? color.white : color.black,
                width: "100%",
            }}
        >
            <WETextField
                label="New Password"
                type={useForgotPassword.showPassword ? "text" : "password"}
                value={useForgotPassword.password}
                onChange={(e) => useForgotPassword.setPassword(e.target.value)}
                showPassword={useForgotPassword.showPassword}
                setShowPassword={useForgotPassword.setShowPassword}
                required={true}
                name="password"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        useForgotPassword.handleResetPassword();
                    }
                }}
            />
            <WETextField
                label="Confirm Password"
                type={useForgotPassword.showPassword ? "text" : "password"}
                value={useForgotPassword.confirmPassword}
                onChange={(e) => useForgotPassword.setConfirmPassword(e.target.value)}
                showPassword={useForgotPassword.showPassword}
                setShowPassword={useForgotPassword.setShowPassword}
                required={true}
                name="password"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        useForgotPassword.handleResetPassword();
                    }
                }}
            />
            <Button
                fullWidth
                variant="contained"
                sx={{
                    bgcolor: color.emerald500,
                    color: isDarkMode ? color.black : color.white,
                    mt: 1,
                }}
                onClick={() => useForgotPassword.handleResetPassword()}
            >
                Reset password
            </Button>
        </Box>
    );
}