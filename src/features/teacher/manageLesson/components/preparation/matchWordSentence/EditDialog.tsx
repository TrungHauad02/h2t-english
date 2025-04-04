import { Box, FormControlLabel, Switch } from "@mui/material";
import { WEDialog } from "components/display";
import { WETextField } from "components/input";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface EditDialogProps {
  isDialogOpen: boolean;
  editItem: any;
  tempItem: any;
  handleCloseDialog: () => void;
  handleSaveItem: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleToggleStatus: (value: boolean) => void;
}

export default function EditDialog({
  isDialogOpen,
  editItem,
  tempItem,
  handleCloseDialog,
  handleSaveItem,
  handleInputChange,
  handleToggleStatus,
}: EditDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <WEDialog
      open={isDialogOpen}
      title={
        editItem ? "Edit Word-Sentence Pair" : "Add New Word-Sentence Pair"
      }
      onCancel={handleCloseDialog}
      onOk={handleSaveItem}
    >
      <Box sx={{ mt: 2 }}>
        <WETextField
          label="Word"
          type="text"
          name="word"
          value={tempItem.word || ""}
          onChange={handleInputChange}
          required
          sx={{ mb: 2 }}
        />
        <WETextField
          label="Sentence"
          type="text"
          name="sentence"
          value={tempItem.sentence || ""}
          onChange={handleInputChange}
          multiline
          rows={3}
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: { xs: "0.75rem", sm: "1rem" },
              width: "100%",
              paddingLeft: "1rem",
              "& .MuiOutlinedInput-notchedOutline": {
                border: `1px solid ${color.gray400}`,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: `2px solid ${
                  isDarkMode ? color.emerald400 : color.emerald500
                }`,
              },
              fontSize: "1rem",
              marginBottom: "1rem",
            },
          }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={tempItem.status === true}
              onChange={(e) => handleToggleStatus(e.target.checked)}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: isDarkMode ? color.emerald400 : color.emerald500,
                  "&:hover": {
                    backgroundColor: isDarkMode
                      ? `${color.emerald400}33`
                      : `${color.emerald500}33`,
                  },
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: isDarkMode
                    ? color.emerald400
                    : color.emerald500,
                },
              }}
            />
          }
          label="Active"
          sx={{
            color: isDarkMode ? color.gray100 : color.gray900,
            mt: 1,
          }}
        />
      </Box>
    </WEDialog>
  );
}
