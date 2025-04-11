import { Box, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { Preparation } from "interfaces";
import useColor from "theme/useColor";
import PreparationMakeSentencesSection from "./makeSentences/PreparationMakeSentencesSection";
import { useEffect, useState } from "react";
import { preparationService } from "services";
import { toast } from "react-toastify";
import PreparationMatchWordSentencesSection from "./matchWordSentences/PreparationMatchWordSentencesSection";
import PreparationClassifySection from "./classify/PreparationClassifySection";

export default function PreparationSection({
  preparationId,
}: {
  preparationId: number | null;
}) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [data, setData] = useState<Preparation | null>();

  useEffect(() => {
    const fetchData = async () => {
      if (preparationId) {
        try {
          const resData = await preparationService.findById(preparationId);
          setData(resData.data);
        } catch (error) {
          toast.error("Error fetching preparation data");
        }
      }
    };
    fetchData();
  }, [preparationId]);

  const renderPreparation = () => {
    if (!data) return <></>;
    switch (data?.type) {
      case "MATCH_WORD_WITH_SENTENCES":
        return (
          <PreparationMatchWordSentencesSection questions={data.questions} />
        );
      case "WORDS_MAKE_SENTENCES":
        return <PreparationMakeSentencesSection questions={data.questions} />;
      default:
        return <PreparationClassifySection questions={data.questions} />;
    }
  };

  const backgroundColor = isDarkMode ? color.gray800 : color.gray50;
  const titleColor = isDarkMode ? color.teal300 : color.teal500;
  const tipColor = isDarkMode ? color.gray100 : color.gray700;
  const borderColor = isDarkMode ? color.gray700 : color.gray300;

  if (!data) return <></>;

  return (
    <Box
      sx={{
        mx: { xs: 0, md: 2, lg: 4 },
        px: { xs: 2, md: 4 },
        py: { xs: 1, md: 2 },
        bgcolor: backgroundColor,
        borderRadius: 2,
        border: `1px solid ${borderColor}`,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="subtitle1"
        fontSize={"1.1rem"}
        fontWeight={"bold"}
        sx={{ color: titleColor, mb: 1 }}
      >
        {data.title}
      </Typography>

      <Typography
        variant="subtitle2"
        fontWeight={"400"}
        sx={{ color: tipColor, mb: 2, fontStyle: "italic" }}
      >
        {data.tip}
      </Typography>

      {renderPreparation()}
    </Box>
  );
}
