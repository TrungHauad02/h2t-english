import React, { useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  Stack,
  SxProps,
  Theme,
  Button,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface WESelectImageProps {
  value: string;
  onChange: (base64: string) => void;
  label?: string;
  sx?: SxProps<Theme>;
  required?: boolean;
  disabled?: boolean;
}

const WESelectImage = ({
  value,
  onChange,
  label,
  sx,
  required,
  disabled,
}: WESelectImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  const handleFileRead = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return; 
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleFileRead(file);
    }
  };

  const handleClick = () => {
    if (disabled) return; 
    fileInputRef.current?.click();
  };

  return (
    <Stack spacing={1} sx={sx} pb={2}>
      {label && (
        <Typography
          sx={{
            color: isDarkMode ? color.gray100 : color.gray900,
            fontSize: "1rem",
            textAlign: "left",
            pl: "0.2rem",
          }}
        >
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </Typography>
      )}

      <Box
        sx={{
          border: `2px dashed ${color.gray400}`,
          borderRadius: "1rem",
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: disabled ? "not-allowed" : "pointer", 
          backgroundColor: isDarkMode ? color.gray800 : color.gray50,
          minHeight: 200,
          overflow: "hidden",
          "&:hover": {
            borderColor: isDarkMode ? color.emerald400 : color.emerald500,
          },
        }}
        onClick={handleClick}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {value ? (
          <img
            src={value}
            alt="Preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "0.5rem",
            }}
          />
        ) : (
          <>
            <IconButton
              color="primary"
              sx={{
                color: isDarkMode ? color.emerald400 : color.emerald600,
                mb: 1,
              }}
            >
              <AddPhotoAlternateIcon fontSize="large" />
            </IconButton>
            <Typography
              variant="body2"
              sx={{ color: color.gray500, textAlign: "center" }}
            >
              Click to upload image
              <br />
              (PNG, JPG, JPEG)
            </Typography>
          </>
        )}
      </Box>
      {value && !disabled && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            color="error"
            onClick={() => onChange("")}
          >
            Remove image
          </Button>
        </Box>
      )}
    </Stack>
  );
};

export default WESelectImage;
