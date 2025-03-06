import { useRef, useState } from "react";
import { toast } from "react-toastify";

export const useSendOTPForm = (onOtpValidated?: () => void) => {
    const [email, setEmail] = useState<string>("");
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
        }, 1000);  // Giảm sau mỗi 1 giây
    };

    const handleSendOTP = () => {
        if(!email){
            toast.error("Please fill in both email to dend OTP");
            return;
        }
        // Gọi API gửi OTP
        startCountdown(120);
        toast.success("OTP has been sent")
    };

    const handleValidateOTP = () => {
        // Gọi API xác thực OTP
        if(otp == "123456"){
            toast.success("OTP is valid, please reset new password");
            onOtpValidated?.();
        }
        else{
            toast.error("OTP not valid");
            return;
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
}
