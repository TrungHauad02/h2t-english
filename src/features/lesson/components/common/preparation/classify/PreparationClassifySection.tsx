import { Box, Grid, Stack, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import WordItem from "../WordItem";
import usePreparationClassifySection from "./usePreparationClassifySection";
import WEActionButtons from "components/input/WEActionButtons";
import { WEConfirmDialog, WEScoreDialog } from "components/display";

export default function PreparationClassifySection({
  questions,
}: {
  questions: number[];
}) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const hooks = usePreparationClassifySection(questions);

  return (
    <Stack sx={{ mt: 1 }}>
      {/** Classify Items */}
      <Stack direction={"row"} justifyContent={"flex-end"}>
        <Box
          sx={{
            py: 1,
            px: 2,
            bgcolor: isDarkMode ? color.green900 : color.green100,
            borderRadius: 2,
            boxShadow: 1,
            visibility: hooks.members.length !== 0 ? "visible" : "hidden",
          }}
        >
          <Typography>
            {hooks.members.length}{" "}
            {hooks.members.length === 1 ? "item" : "items"} remaining
          </Typography>
        </Box>
      </Stack>
      <Stack
        direction={"row"}
        sx={{
          mt: 1,
          gap: { xs: 1, md: 2 },
          p: 2,
          bgcolor: isDarkMode ? color.gray700 : color.gray300,
          borderRadius: 1,
          flexWrap: "wrap",
          minHeight: "52px",
        }}
      >
        {hooks.members.map((item, index) => (
          <WordItem
            item={item}
            key={index}
            highlight={item === hooks.selectedItem}
            onClick={() => hooks.onSelectItem(item)}
          />
        ))}
      </Stack>
      {/** Classify Groups */}
      <Grid
        container
        sx={{
          mt: 1,
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
          },
          gap: { xs: 1, md: 2 },
          p: { xs: 0.5, md: 1 },
          borderRadius: 1,
        }}
      >
        {hooks.groups.map((group, index) => (
          <Grid
            item
            key={index}
            sx={{
              bgcolor:
                hooks.selectedItem !== null
                  ? isDarkMode
                    ? color.gray400
                    : color.gray600
                  : isDarkMode
                  ? color.gray800
                  : color.gray200,
              border: `4px solid ${isDarkMode ? color.gray600 : color.gray400}`,
              borderRadius: 2,
            }}
          >
            <Stack>
              {/** Group Name */}
              <Stack
                sx={{
                  p: { xs: 1, md: 2 },
                  bgcolor: isDarkMode ? color.gray700 : color.gray300,
                }}
                justifyContent={"center"}
              >
                <Typography textAlign={"center"}>{group.name}</Typography>
              </Stack>
              {/** Classify Items In Group */}
              <Stack
                direction={"row"}
                sx={{
                  minHeight: "100px",
                  p: { xs: 1.5, md: 2 },
                  gap: { xs: 1, md: 2 },
                  flexWrap: "wrap",
                  ":hover": {
                    cursor: hooks.selectedItem !== null ? "pointer" : "default",
                  },
                }}
                onClick={() => hooks.onSelectGroup(group)}
              >
                {group.members.map((item, index) => (
                  <WordItem
                    item={item}
                    key={index}
                    onClick={() => hooks.onSelectItemInGroup(item, group)}
                  />
                ))}
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 2 }}>
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
          numberAnswered={hooks.getNumberAnswered()}
          numberOfQuestions={hooks.numberOfItems}
        />
      )}
      {hooks.isShowScoreDialog && (
        <WEScoreDialog
          score={hooks.score}
          isShowScoreDialog={hooks.isShowScoreDialog}
          onCloseScoreDialog={hooks.onCloseScoreDialog}
          numberOfQuestions={hooks.numberOfItems}
        />
      )}
    </Stack>
  );
}
