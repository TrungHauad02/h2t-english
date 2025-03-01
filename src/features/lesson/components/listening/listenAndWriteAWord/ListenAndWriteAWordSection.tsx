import { Box, Stack, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import useListenAndWriteAWordSection from "./useListenAndWriteAWordSection";
import { WEButton, WETexField } from "components/input";
import { CircleRounded } from "@mui/icons-material";
import WEActionButtons from "components/input/WEActionButtons";
import { WEConfirmDialog, WEScoreDialog } from "components/display";

export default function ListenAndWriteAWordSection() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const hooks = useListenAndWriteAWordSection();

  if (hooks.stateData.length === 0) {
    return <></>;
  }

  return (
    <Box
      sx={{
        mx: { xs: 0, md: 2, lg: 4 },
        px: { xs: 2, md: 4 },
        py: { xs: 1, md: 2 },
        bgcolor: isDarkMode ? color.gray800 : color.gray200,
      }}
    >
      <Typography
        variant="subtitle1"
        fontSize={"1.1rem"}
        fontWeight={"bold"}
        sx={{ color: isDarkMode ? color.emerald200 : color.emerald800 }}
      >
        Listen the audio and write a word
      </Typography>
      <Stack sx={{ mt: 1 }}>
        <Stack direction={"row"} justifyContent={"flex-end"}>
          <Box
            sx={{
              py: 1,
              px: 2,
              bgcolor: isDarkMode ? color.green900 : color.green100,
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <Typography>
              {hooks.getItemRemain()}{" "}
              {hooks.getItemRemain() === 1 ? "item" : "items"} remaining
            </Typography>
          </Box>
        </Stack>
        <Box sx={{ m: 1, mt: 2 }}>
          <audio
            src={hooks.stateData[hooks.curIndex].audio}
            controls
            style={{ width: "100%" }}
          />
        </Box>
      </Stack>
      <Stack
        direction={"row"}
        alignItems={"center"}
        sx={{
          flexWrap: "wrap",
          mx: 2,
          px: 2,
          py: 1,
          bgcolor: isDarkMode ? color.gray900 : color.gray100,
        }}
      >
        {hooks.stateData[hooks.curIndex].sentence.map((item, index) =>
          item === "" ? (
            <Box key={index} sx={{ px: 1 }}>
              <WETexField
                type="text"
                value={hooks.stateData[hooks.curIndex].userAnswer}
                onChange={(e) => hooks.onChangeAnswer(e.target.value)}
              />
            </Box>
          ) : (
            <Box
              key={index}
              sx={{
                px: 0.5,
                py: 1,
                height: "100%",
              }}
            >
              <Typography>{item}</Typography>
            </Box>
          )
        )}
      </Stack>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent={"flex-end"}
        sx={{ mt: 2, mr: 2 }}
        spacing={2}
      >
        <Stack
          direction={"row"}
          spacing={1}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          {hooks.stateData.map((item, index) => (
            <Box key={index}>
              <CircleRounded
                sx={{
                  color:
                    index === hooks.curIndex ? color.teal500 : color.gray500,
                }}
              />
            </Box>
          ))}
          <Stack direction={"row"} spacing={2} justifyContent={"flex-end"}>
            <WEButton
              sx={{
                width: { xs: "50px", md: "100px" },
                bgcolor: color.teal500,
                color: color.white,
              }}
              onClick={hooks.onPrev}
            >
              Prev
            </WEButton>
            <WEButton
              sx={{
                width: { xs: "50px", md: "100px" },
                bgcolor: color.teal500,
                color: color.white,
              }}
              onClick={hooks.onNext}
            >
              Next
            </WEButton>
          </Stack>
        </Stack>
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
        <WEActionButtons
          isSubmit={!!hooks.score}
          onSubmit={hooks.onShowConfirm}
          onReset={hooks.onReset}
          onShowExplain={hooks.onShowExplain}
          size="large"
        />
      </Box>
      {hooks.isShowConfirm && (
        <WEConfirmDialog
          isShowConfirm={hooks.isShowConfirm}
          onShowConfirm={hooks.onShowConfirm}
          onSubmit={hooks.onSubmit}
          numberAnswered={hooks.stateData.length - hooks.getItemRemain()}
          numberOfQuestions={hooks.stateData.length}
        />
      )}
      {hooks.isShowScoreDialog && (
        <WEScoreDialog
          score={hooks.score}
          isShowScoreDialog={hooks.isShowScoreDialog}
          onCloseScoreDialog={hooks.onCloseScoreDialog}
          numberOfQuestions={hooks.stateData.length}
        />
      )}
    </Box>
  );
}
