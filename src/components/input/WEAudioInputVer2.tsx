import React from "react";
import {
  Stack,
  Typography,
  IconButton,
  Box,
  CircularProgress,
  Tooltip,
  styled,
  Button,
  alpha,
} from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface WEAudioInputVer2Props {
  value: string;
  onChange: (base64: string) => void;
  label?: string;
  accept?: string;
  required?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const DropZone = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  transition: theme.transitions.create(["border-color", "background-color"]),
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    borderColor: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
  },
  "&.active": {
    borderColor: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  },
}));

const FilePreview = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  width: "100%",
  backgroundColor: theme.palette.action.selected,
  border: `1px solid ${theme.palette.divider}`,
}));

export default function WEAudioInputVer2({
  value,
  onChange,
  label,
  accept = "audio/*",
  required,
  disabled,
  loading = false,
}: WEAudioInputVer2Props) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = React.useState(false);
  const [fileInfo, setFileInfo] = React.useState<{
    name: string;
    size: string;
    duration?: string;
  } | null>(null);
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  React.useEffect(() => {
    if (value && !fileInfo) {
      setFileInfo({
        name: "audio.mp3",
        size: "N/A",
        duration: "N/A",
      });
    } else if (!value) {
      setFileInfo(null);
    }
  }, [value, fileInfo]);

  const handleFileRead = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result as string);

      // Get audio duration if possible
      let duration = "N/A";
      if (file.type.includes("audio")) {
        const audio = new Audio();
        audio.src = URL.createObjectURL(file);
        audio.onloadedmetadata = () => {
          duration = formatDuration(audio.duration);
          setFileInfo({
            name: file.name,
            size: formatFileSize(file.size),
            duration,
          });
          URL.revokeObjectURL(audio.src);
        };
      } else {
        setFileInfo({
          name: file.name,
          size: formatFileSize(file.size),
          duration,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const file = e.target.files?.[0];
    if (file) {
      handleFileRead(file);
    }
    if (e.target) {
      e.target.value = "";
    }
  };

  const handleClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileRead(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setFileInfo(null);
  };

  const primaryColor = isDarkMode ? color.teal400 : color.teal600;
  const textColor = isDarkMode ? color.gray100 : color.gray900;
  const secondaryTextColor = isDarkMode ? color.gray400 : color.gray600;

  return (
    <Stack spacing={1.5}>
      {label && (
        <Typography
          variant="body1"
          sx={{
            color: textColor,
            fontWeight: 500,
          }}
        >
          {label} {required && <span style={{ color: color.red500 }}>*</span>}
        </Typography>
      )}

      <input
        type="file"
        accept={accept}
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <DropZone
        onClick={handleClick}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={dragActive ? "active" : ""}
        sx={{
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.7 : 1,
        }}
      >
        <Stack
          direction="column"
          alignItems="center"
          spacing={2}
          sx={{ position: "relative" }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: primaryColor }} />
          ) : fileInfo ? (
            <FilePreview>
              <MusicNoteIcon
                sx={{
                  color: primaryColor,
                  fontSize: "2rem",
                }}
              />
              <Stack sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography
                  noWrap
                  sx={{
                    fontWeight: 500,
                    color: textColor,
                  }}
                >
                  {fileInfo.name}
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: secondaryTextColor,
                    }}
                  >
                    {fileInfo.size}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: secondaryTextColor,
                    }}
                  >
                    {fileInfo.duration}
                  </Typography>
                </Stack>
              </Stack>
              <Tooltip title="Remove file">
                <IconButton
                  onClick={handleRemoveFile}
                  size="small"
                  sx={{
                    color: secondaryTextColor,
                    "&:hover": {
                      color: color.red500,
                      backgroundColor: isDarkMode
                        ? color.gray600
                        : color.gray300,
                    },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </FilePreview>
          ) : (
            <>
              <CloudUploadIcon
                sx={{
                  fontSize: "3rem",
                  color: primaryColor,
                  opacity: 0.8,
                }}
              />
              <Stack alignItems="center" spacing={1}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: textColor,
                    textAlign: "center",
                  }}
                >
                  Drag and drop your audio file here
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: secondaryTextColor,
                    textAlign: "center",
                    mb: 1,
                  }}
                >
                  {accept === "audio/*"
                    ? "MP3, WAV, AAC files"
                    : accept.toUpperCase()}{" "}
                  supported
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick();
                  }}
                  sx={{
                    borderColor: primaryColor,
                    color: primaryColor,
                    "&:hover": {
                      backgroundColor: alpha(primaryColor, 0.08),
                      borderColor: primaryColor,
                    },
                  }}
                >
                  Select audio
                </Button>
              </Stack>
            </>
          )}
        </Stack>
      </DropZone>
    </Stack>
  );
}
