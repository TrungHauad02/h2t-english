import { Box, Stack } from "@mui/material";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const imgLogin =
    "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_login.png?alt=media&token=0d295850-05fc-4d8c-973e-04714a05a284";

  return (
    <Box
      sx={{
        mt: { xs: 10, md: 18 }, 
        px: { xs: 2, sm: 4 }, 
        display: "flex",
        justifyContent: "center", 
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }} 
        spacing={2}
        sx={{
          width: "100%",
          maxWidth: "1200px", 
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={imgLogin}
            alt="Background"
            style={{
              width: "90%", 
              maxWidth: "40vw", 
              height: "auto",
            }}
          />
        </Box>

        <Box
          sx={{
            flex: 1, 
            display: "flex",
            justifyContent: "center",
          }}
        >          <LoginForm />
        </Box>
      </Stack>
    </Box>
  );
}
