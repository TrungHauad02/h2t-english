import { Box, InputBase, useMediaQuery } from "@mui/material";
import { useRef, useState } from "react";

interface OTPInputProps {
  length?: number;
  onChange?: (otp: string) => void;
}

export default function OTPInput({ length = 6, onChange }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleChange = (index: number, value: string) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      onChange?.(newOtp.join(""));
      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const inputWidth = isMobile ? "14%" : "50px"; 

  return (
    <Box
      display="flex"
      justifyContent="center"
      gap={1}
      width="100%"
      maxWidth="600px"
      px={2} // tránh sát mép
    >
      {otp.map((digit, index) => (
        <InputBase
          key={index}
          value={digit}
          inputRef={(el) => (inputRefs.current[index] = el)}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e as React.KeyboardEvent<HTMLInputElement>)}
          inputProps={{
            maxLength: 1,
            style: {
              flex: 1,
              width: inputWidth,
              height: "45px",
              textAlign: "center",
              fontSize: "20px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            },
          }}
        />
      ))}
    </Box>
  );
}
