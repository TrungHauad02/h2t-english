import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Link,
} from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { useLoginForm } from "../hooks/useLoginForm";
import WETextField from "../../../components/input/WETexField"
import "react-toastify/dist/ReactToastify.css";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { handleLogin } = useLoginForm();
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      sx={{
        padding: 4,
        border: "1px solid #e0e0e0",
        borderRadius: "10px",
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
        bgcolor: isDarkMode ? color.gray900 : color.gray100,
        color: isDarkMode ? color.white : color.black,
        width: "40%"
      }}
    >
      <Typography variant="h4" align="center" mb={2}>
        Log in
      </Typography>
      <WETextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required={true}
        name="email"
        sx={{ marginBottom: "1rem !important" }}
      />
      <WETextField
        label="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        required={true}
        name="password"
      />
      <Button
        fullWidth
        variant="contained"
        sx={{
          bgcolor: color.emerald500,
          color: isDarkMode ? color.black : color.white,
          mt: 3,
        }}
        onClick={() => handleLogin(email, password)}
      >
        Log in
      </Button>
      <Box mt={2} display="flex" justifyContent="space-between">
        <Link href="#" variant="body2" sx={{ color: color.red, mt: 2 }}>
          Forgot password?
        </Link>
      </Box>
    </Box>
  );
};

export default Login;
