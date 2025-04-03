import { Box, Paper, Fade } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { Grammar } from "interfaces";
import { useState } from "react";
import SectionHeader from "../common/SectionHeader";
import { TipsDisplayMode, TipsEditMode } from "./tips";

interface GrammarTipsSectionProps {
  editData: Grammar | null;
  handleInputChange: (field: keyof Grammar, value: any) => void;
  onSave: () => void;
}

export default function GrammarTipsSection({
  editData,
  handleInputChange,
  onSave,
}: GrammarTipsSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [hoveredTipIndex, setHoveredTipIndex] = useState<number | null>(null);

  // Theming
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const paperBg = isDarkMode ? color.gray800 : color.gray50;
  const textColor = isDarkMode ? color.gray100 : color.gray900;
  const cardBg = isDarkMode ? color.gray700 : color.white;
  const chipBg = isDarkMode ? color.teal700 : color.teal100;
  const chipColor = isDarkMode ? color.teal50 : color.teal800;

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
    <Fade in={true} timeout={500}>
      <Box
        component={Paper}
        elevation={3}
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: "1.5rem",
          backgroundColor: paperBg,
          mb: 4,
        }}
      >
        <SectionHeader
          title="Grammar Tips"
          editText="Edit Tips"
          icon={<LightbulbIcon sx={{ color: accentColor }} />}
          isEditMode={isEditMode}
          handleSaveChanges={handleSave}
          handleEditMode={() => setIsEditMode(true)}
          handleCancelEdit={() => setIsEditMode(false)}
        />

        {isEditMode ? (
          <TipsEditMode
            editData={editData}
            handleTipChange={handleTipChange}
            handleRemoveTip={handleRemoveTip}
            handleAddTip={handleAddTip}
            accentColor={accentColor}
            cardBg={cardBg}
          />
        ) : (
          <TipsDisplayMode
            editData={editData}
            textColor={textColor}
            chipBg={chipBg}
            chipColor={chipColor}
            hoveredTipIndex={hoveredTipIndex}
            setHoveredTipIndex={setHoveredTipIndex}
          />
        )}
      </Box>
    </Fade>
  );
}
