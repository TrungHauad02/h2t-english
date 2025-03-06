import { Box, Grid, Paper, Stack } from "@mui/material";
import { WETextField, WESelectImage } from "components/input";
import { useDarkMode } from "hooks/useDarkMode";
import { Topic } from "interfaces";
import useColor from "theme/useColor";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface TopicEditFormProps {
  editData: Topic | null;
  handleInputChange: (field: keyof Topic, value: any) => void;
}

export default function TopicEditForm({
  editData,
  handleInputChange,
}: TopicEditFormProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  // Common styles
  const cardBgColor = isDarkMode ? color.gray700 : color.white;
  const borderColor = isDarkMode ? color.gray700 : color.gray200;
  const accentColor = isDarkMode ? color.teal300 : color.teal600;

  const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    handleInputChange("status", event.target.value === "true");
  };

  const statusOptions = [
    { label: "Active", value: "true" },
    { label: "Inactive", value: "false" },
  ];

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.gray50,
        mb: 4,
      }}
    >
      <Grid container spacing={3}>
        {/* Left column - Image selection */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              bgcolor: cardBgColor,
              borderRadius: 3,
              p: 3,
              border: `1px solid ${borderColor}`,
            }}
          >
            <WESelectImage
              label="Topic Image"
              value={editData?.image || ""}
              onChange={(base64) => handleInputChange("image", base64)}
              required
            />
          </Box>
        </Grid>

        {/* Right column - Form fields */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            {/* Title field */}
            <Box
              sx={{
                bgcolor: cardBgColor,
                p: 3,
                borderRadius: 3,
                border: `1px solid ${borderColor}`,
              }}
            >
              <WETextField
                label="Title"
                type="text"
                value={editData?.title || ""}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Box>

            {/* Description field */}
            <Box
              sx={{
                bgcolor: cardBgColor,
                p: 3,
                borderRadius: 3,
                border: `1px solid ${borderColor}`,
              }}
            >
              <WETextField
                label="Description"
                type="text"
                value={editData?.description || ""}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                multiline
                rows={6}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Box>

            {/* Status selection */}
            <Box
              sx={{
                bgcolor: cardBgColor,
                p: 3,
                borderRadius: 3,
                border: `1px solid ${borderColor}`,
              }}
            >
              <FormControl fullWidth>
                <InputLabel
                  id="status-label"
                  sx={{
                    color: isDarkMode ? color.gray300 : color.gray700,
                  }}
                >
                  Status
                </InputLabel>
                <Select
                  labelId="status-label"
                  value={editData?.status ? "true" : "false"}
                  onChange={(e: any) => handleStatusChange(e)}
                  label="Status"
                  sx={{
                    backgroundColor: isDarkMode ? color.gray800 : color.white,
                    borderRadius: 2,
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: `1px solid ${
                        isDarkMode ? color.gray600 : color.gray300
                      }`,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: `2px solid ${accentColor}`,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: accentColor,
                    },
                  }}
                >
                  {statusOptions.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      sx={{
                        "&:hover": {
                          backgroundColor: isDarkMode
                            ? color.teal800
                            : color.teal100,
                        },
                        color: isDarkMode ? color.gray300 : color.gray800,
                      }}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
