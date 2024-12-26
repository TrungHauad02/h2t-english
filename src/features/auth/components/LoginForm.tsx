import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    IconButton,
    InputAdornment,
    Link,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { useLoginForm } from "../hooks/useLoginForm";
import "react-toastify/dist/ReactToastify.css";

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { handleLogin } = useLoginForm();
    const color = useColor();
    const { isDarkMode } = useDarkMode();

    return (
        <Box sx={{ display: "flex" }}>
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_login.png?alt=media&token=0d295850-05fc-4d8c-973e-04714a05a284"
                    alt="Background"
                    style={{
                        maxWidth: "55%",
                        height: "auto",
                    }}
                />
            </Box>
            <Box
                sx={{
                    padding: 4,
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                    bgcolor: isDarkMode ? color.gray900 : color.gray100,
                    color: isDarkMode ? color.white : color.black,
                }}
            >
                <Typography variant="h4" align="center" mb={2}>
                    Log in
                </Typography>
                <TextField
                    fullWidth
                    required
                    variant="outlined"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    margin="normal"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleLogin(email, password)
                        }
                    }}
                />
                <TextField
                    fullWidth
                    required
                    variant="outlined"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    margin="normal"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleLogin(email, password)
                        }
                    }}
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
        </Box>
    );
};

export default Login;
