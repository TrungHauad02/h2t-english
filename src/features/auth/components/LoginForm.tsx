import { Box, Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { useLoginForm } from "../hooks/useLoginForm";
import { WETextField } from "components/input";

export default function Login() {
  const useLogin = useLoginForm();
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

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
      <WETextField
        label="Email"
        type="email"
        value={useLogin.email}
        onChange={(e) => useLogin.setEmail(e.target.value)}
        required={true}
        name="email"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            useLogin.handleLogin();
          }
        }}
      />
      <WETextField
        label="Password"
        type={useLogin.showPassword ? "text" : "password"}
        value={useLogin.password}
        onChange={(e) => useLogin.setPassword(e.target.value)}
        showPassword={useLogin.showPassword}
        setShowPassword={useLogin.setShowPassword}
        required={true}
        name="password"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            useLogin.handleLogin();
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
        onClick={() => {
          useLogin.handleLogin();
        }}
      >
        Log in
      </Button>
      <Box mt={1} display="flex" justifyContent="space-between">
        <Link
          onClick={() => navigate("/forgot-password")}
          variant="body2"
          sx={{
            color: isDarkMode ? color.gray100 : color.gray800,
            mt: 2,
            fontStyle: "italic",
            cursor: "pointer",
          }}
        >
          Forgot password?
        </Link>
      </Box>
    </Box>
  );
}
