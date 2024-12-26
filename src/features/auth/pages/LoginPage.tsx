import { Box } from '@mui/material';
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const imgLogin = "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_login.png?alt=media&token=0d295850-05fc-4d8c-973e-04714a05a284"

  return (
    <Box sx={{ mt: 18, display: "flex" }}>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src = {imgLogin}
          alt="Background"
          style={{
            maxWidth: "75%",
            height: "auto",
          }}
        />
      </Box>
      <LoginForm />
    </Box>
  );
}
