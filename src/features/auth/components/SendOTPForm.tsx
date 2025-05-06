import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useColor from "theme/useColor";
import WETextField from "../../../components/input/WETextField";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "hooks/useDarkMode";
import { useEffect } from "react";
import OTPInput from "components/input/WEOTPField";
import { useSendOTPForm } from "../hooks/useSendOTPForm";

export default function SendOTPForm({
  onOtpValidated,
  email,
  setEmail,
}: {
  onOtpValidated?: () => void;
  email: string;
  setEmail: (email: string) => void;
}) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const useSendOTP = useSendOTPForm(email, setEmail, onOtpValidated);
  const navigate = useNavigate();

  // useEffect để xử lý đếm ngược
  useEffect(() => {}, [useSendOTP.countdown]);

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
        label="Email"
        type="email"
        value={useSendOTP.email}
        onChange={(e) => useSendOTP.setEmail(e.target.value)}
        required={true}
        name="email"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            useSendOTP.handleSendOTP();
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
          mb: 2,
        }}
        onClick={useSendOTP.handleSendOTP}
        disabled={useSendOTP.isCounting}
      >
        {useSendOTP.isCounting
          ? `Resend OTP (${useSendOTP.countdown}s)`
          : "Send OTP"}
      </Button>

      {useSendOTP.isCounting && (
        <Typography
          variant="body2"
          sx={{ color: color.red, textAlign: "center", mb: 2 }}
        >
          Please wait for {useSendOTP.countdown} seconds to resend OTP.
        </Typography>
      )}

      <Box display="flex" justifyContent="center" width="100%">
        <OTPInput onChange={(value) => useSendOTP.setOtp(value)} />
      </Box>

      <Button
        fullWidth
        variant="contained"
        sx={{
          bgcolor: color.emerald500,
          color: isDarkMode ? color.black : color.white,
          mt: 1,
          mb: 2,
        }}
        onClick={useSendOTP.handleValidateOTP}
        disabled={!useSendOTP.isCounting}
      >
        Validate OTP
      </Button>
      <Box display="flex" justifyContent="space-between">
        <IconButton
          onClick={() => navigate("/login")}
          sx={{
            color: isDarkMode ? color.gray100 : color.gray800,
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
