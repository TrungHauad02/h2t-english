import { Box, Grid, Paper, Stack } from "@mui/material";
import { WETextField, WESelect } from "components/input";
import { useDarkMode } from "hooks/useDarkMode";
import { Preparation, PreparationType } from "interfaces";
import useColor from "theme/useColor";

interface PreparationEditFormProps {
  editData: Preparation | null;
  handleInputChange: (field: keyof Preparation, value: any) => void;
}

export default function PreparationEditForm({
  editData,
  handleInputChange,
}: PreparationEditFormProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const cardBgColor = isDarkMode ? color.gray700 : color.white;
  const borderColor = isDarkMode ? color.gray700 : color.gray200;

  const preparationTypeOptions = [
    {
      label: "Match Word With Sentences",
      value: PreparationType.MATCH_WORD_WITH_SENTENCES,
    },
    { label: "Classify", value: PreparationType.CLASSIFY },
    {
      label: "Words Make Sentences",
      value: PreparationType.WORDS_MAKE_SENTENCES,
    },
  ];

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
        {/* Left column - Preparation Type */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Box
              sx={{
                bgcolor: cardBgColor,
                borderRadius: 3,
                p: 3,
                border: `1px solid ${borderColor}`,
              }}
            >
              <WESelect
                label="Preparation Type"
                value={editData?.type || ""}
                options={preparationTypeOptions}
                onChange={(value) => handleInputChange("type", value)}
                placeholder="Select preparation type"
                required={true}
                helperText="Choose the type of preparation exercise"
                fullWidth={true}
                name="preparationType"
                showLabel={true}
                variant="outlined"
              />
            </Box>

            {/* Status field */}
            <Box
              sx={{
                bgcolor: cardBgColor,
                borderRadius: 3,
                p: 3,
                border: `1px solid ${borderColor}`,
              }}
            >
              <WESelect
                label="Status"
                value={editData?.status ? "true" : "false"}
                options={statusOptions}
                onChange={(value) =>
                  handleInputChange("status", value === "true")
                }
                placeholder="Select status"
                required={true}
                helperText="Set whether this preparation is active or inactive"
                fullWidth={true}
                name="preparationStatus"
                showLabel={true}
                variant="outlined"
              />
            </Box>
          </Stack>
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

            {/* Tip field */}
            <Box
              sx={{
                bgcolor: cardBgColor,
                p: 3,
                borderRadius: 3,
                border: `1px solid ${borderColor}`,
              }}
            >
              <WETextField
                required
                label="Tip"
                type="text"
                value={editData?.tip || ""}
                onChange={(e) => handleInputChange("tip", e.target.value)}
                multiline
                rows={4}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
