import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { emailService } from "services";

export const useSendOTPForm = (
  email: string,
  setEmail: (email: string) => void,
  onOtpValidated?: () => void
) => {
  const [otp, setOtp] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(0);
  const [isCounting, setIsCounting] = useState<boolean>(false);
  const countdownInterval = useRef<NodeJS.Timeout | null>(null);

  const startCountdown = (seconds: number) => {
    setCountdown(seconds);
    setIsCounting(true);

    if (countdownInterval.current) {
      clearInterval(countdownInterval.current);
    }

    countdownInterval.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval.current!);
          setIsCounting(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // Giảm sau mỗi 1 giây
  };

  const handleSendOTP = async () => {
    if (!email) {
      toast.error("Please fill in email to send OTP");
      return;
    }
    startCountdown(120);
    try {
      const response = await emailService.sendOTP(email);
      toast.success(response.message);
    } catch (error) {
      toast.error("Failed to send OTP");
    }
  };

  const handleValidateOTP = async () => {
    try {
      const response = await emailService.verifyOTP(email, otp);
      toast.success(response.message);
      onOtpValidated?.();
    } catch (error: any) {
      toast.error(error.response.data.data);
    }
  };

  return {
    email,
    setEmail,
    otp,
    setOtp,
    countdown,
    setCountdown,
    isCounting,
    setIsCounting,
    handleSendOTP,
    handleValidateOTP,
  };
};
