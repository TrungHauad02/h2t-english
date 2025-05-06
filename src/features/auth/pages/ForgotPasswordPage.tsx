import { Box, Stack } from "@mui/material";
import SendOTPForm from "../components/SendOTPForm";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const imgForgotPassword =
    "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_login.png?alt=media&token=0d295850-05fc-4d8c-973e-04714a05a284";

  const [isFlipped, setIsFlipped] = useState(false);
  const [email, setEmail] = useState("");

  const handleFlip = () => {
    setIsFlipped(true);
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      sx={{
        width: "100%",
        maxWidth: "1200px",
        justifyContent: { xs: "center", md: "space-between" },
        alignItems: "center",
        gap: { xs: 2, md: 10 },
        mt: { xs: 10, md: 16 },
        mx: "auto",
      }}
    >
      <Box
        sx={{
          flex: 1,
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          mx: { xs: 2, md: 4 },
        }}
      >
        <Box
          component="img"
          src={imgForgotPassword}
          alt="Background"
          sx={{
            height: { xs: "30vh", md: "auto" },
            width: "100%",
            maxHeight: { xs: "100%", md: "600px" },
            objectFit: "cover",
          }}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          width: "100%",
          display: "flex",
          justifyContent: { xs: "center", md: "flex-end" },
          alignItems: "center",
          mx: { xs: 1, md: 4 },
          px: { xs: 2, md: 0 },
          maxWidth: { xs: "100%", md: "600px" },
          minWidth: { xs: "360px", md: "auto" },
          mb: 4,
        }}
      >
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <SendOTPForm
              onOtpValidated={handleFlip}
              email={email}
              setEmail={setEmail}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ForgotPasswordForm email={email} />
          </Box>
        </ReactCardFlip>
      </Box>
    </Stack>
  );
}
