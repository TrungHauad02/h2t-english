import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Paper,
  TextField,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import EditIcon from "@mui/icons-material/Edit";
import { FiberManualRecord as BulletIcon } from "@mui/icons-material";
import { Writing } from "interfaces";
import { useState } from "react";
import SectionHeader from "../common/SectionHeader";

interface WritingTipsSectionProps {
  editData: Writing | null;
  handleInputChange: (field: keyof Writing, value: any) => void;
  onSave: () => void;
}

export default function WritingTipsSection({
  editData,
  handleInputChange,
  onSave,
}: WritingTipsSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const textColor = isDarkMode ? color.gray100 : color.gray900;
  const borderColor = isDarkMode ? color.gray700 : color.gray200;

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const handleAddTip = () => {
    const newTips = editData?.tips ? [...editData.tips, ""] : [""];
    handleInputChange("tips", newTips);
  };

  const handleRemoveTip = (index: number) => {
    const newTips = editData?.tips.filter((_, i) => i !== index);
    handleInputChange("tips", newTips);
  };

  const handleTipChange = (index: number, value: string) => {
    const newTips = [...(editData?.tips || [])];
    newTips[index] = value;
    handleInputChange("tips", newTips);
  };

  const handleSave = () => {
    onSave();
    setIsEditMode(false);
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.gray50,
        my: 4,
        border: `1px solid ${borderColor}`,
      }}
    >
      <SectionHeader
        title="Writing Tips"
        editText="Edit Tips"
        icon={<LightbulbIcon />}
        isEditMode={isEditMode}
        handleSaveChanges={handleSave}
        handleEditMode={() => setIsEditMode(false)}
        handleCancelEdit={() => setIsEditMode(true)}
      />

      <List
        sx={{
          px: 0,
          py: 0,
          "& .MuiListItem-root:not(:last-child)": {
            borderBottom: `1px solid ${
              isDarkMode ? color.gray600 : color.gray200
            }`,
          },
        }}
      >
        {isEditMode ? (
          <Box>
            {/* Render each tip as a separate TextField */}
            {editData?.tips.map((tip, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <TextField
                  label={`Tip ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  sx={{
                    mb: 1,
                    bgcolor: isDarkMode ? color.gray700 : color.white,
                  }}
                  value={tip}
                  onChange={(e) => handleTipChange(index, e.target.value)}
                />
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleRemoveTip(index)}
                  sx={{
                    display: "block",
                    mt: 1,
                    borderColor: isDarkMode ? color.red400 : color.red600,
                    color: isDarkMode ? color.red400 : color.red600,
                    "&:hover": {
                      borderColor: isDarkMode ? color.red500 : color.red700,
                      bgcolor: "rgba(220, 38, 38, 0.04)",
                    },
                  }}
                >
                  Remove
                </Button>
              </Box>
            ))}
            {/* Add a new Tip button */}
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={handleAddTip}
              sx={{
                mt: 2,
                borderColor: accentColor,
                color: accentColor,
                "&:hover": {
                  borderColor: accentColor,
                  bgcolor: "rgba(0, 150, 136, 0.1)",
                },
              }}
            >
              Add New Tip
            </Button>
          </Box>
        ) : (
          editData &&
          editData.tips.map((tip, index) => (
            <ListItem
              key={index}
              sx={{
                px: 2.5,
                py: 1.75,
                alignItems: "flex-start",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: "32px !important",
                  color: accentColor,
                  alignSelf: "flex-start",
                  mt: "8px",
                }}
              >
                <BulletIcon
                  sx={{
                    fontSize: "10px",
                    filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.1))",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    sx={{
                      color: textColor,
                      fontSize: "1.02rem",
                      lineHeight: "1.6",
                      fontWeight: 400,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {tip}
                  </Typography>
                }
                sx={{ my: 0 }}
              />
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
}
