import { Grid } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { SpeakingConversation } from "interfaces";
import { WETextField } from "components/input";

interface ConversationFormProps {
  editData: SpeakingConversation;
  handleInputChange: (field: keyof SpeakingConversation, value: any) => void;
}

export default function ConversationForm({
  editData,
  handleInputChange,
}: ConversationFormProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <WETextField
          required
          label="Conversation Name"
          type="text"
          value={editData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "0.75rem",
              "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: "1.5px",
                borderColor: isDarkMode ? color.gray600 : color.gray300,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: isDarkMode ? color.teal400 : color.teal600,
                borderWidth: "2px",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: isDarkMode ? color.teal300 : color.teal500,
              },
            },
            "& .MuiInputLabel-root": {
              color: isDarkMode ? color.gray400 : color.gray600,
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: isDarkMode ? color.teal300 : color.teal600,
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <WETextField
          required
          disabled
          label="Serial Number"
          type="number"
          value={editData.serial}
          onChange={(e) =>
            handleInputChange("serial", parseInt(e.target.value))
          }
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "0.75rem",
              backgroundColor: isDarkMode ? color.gray700 : color.gray100,
              "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: "1.5px",
                borderColor: isDarkMode ? color.gray600 : color.gray300,
              },
              "&.Mui-disabled": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: isDarkMode ? color.gray600 : color.gray300,
                },
                color: isDarkMode ? color.gray400 : color.gray500,
              },
            },
            "& .MuiInputLabel-root": {
              color: isDarkMode ? color.gray400 : color.gray600,
            },
            "& .MuiInputLabel-root.Mui-disabled": {
              color: isDarkMode ? color.gray500 : color.gray500,
            },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <WETextField
          required
          label="Conversation Content"
          type="text"
          value={editData.content}
          onChange={(e) => handleInputChange("content", e.target.value)}
          multiline={true}
          rows={4}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "0.75rem",
              width: "100%",
              padding: "1rem",
              "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: "1.5px",
                borderColor: isDarkMode ? color.gray600 : color.gray300,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: isDarkMode ? color.teal400 : color.teal600,
                borderWidth: "2px",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: isDarkMode ? color.teal300 : color.teal500,
              },
              fontSize: "1rem",
            },
            "& .MuiInputLabel-root": {
              color: isDarkMode ? color.gray400 : color.gray600,
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: isDarkMode ? color.teal300 : color.teal600,
            },
          }}
        />
      </Grid>
    </Grid>
  );
}
