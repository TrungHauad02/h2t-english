import { Box, Stack, Typography, Divider, Fade } from "@mui/material";
import { ListenAndWriteAWord } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import ExerciseItem from "./ExerciseItem";

interface ExerciseListProps {
  exercises: ListenAndWriteAWord[];
  isEditMode: boolean;
  onEdit: (exercise: ListenAndWriteAWord) => void;
  onDelete: (id: number) => void;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
}

export default function ExerciseList({
  exercises,
  isEditMode,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
}: ExerciseListProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  // Sort exercises by serial number for display
  const sortedExercises = [...exercises].sort((a, b) => a.serial - b.serial);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          py: 1,
          borderRadius: "8px 8px 0 0",
          backgroundColor: isDarkMode ? color.gray700 : color.gray200,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: isDarkMode ? color.white : color.gray800,
          }}
        >
          {exercises.length} Exercise{exercises.length !== 1 ? "s" : ""}
        </Typography>
      </Box>
      <Box
        sx={{
          borderRadius: "0 0 8px 8px",
          border: `1px solid ${isDarkMode ? color.gray700 : color.gray300}`,
          overflow: "hidden",
        }}
      >
        <Stack divider={<Divider />}>
          {sortedExercises.map((exercise, index) => (
            <Fade key={exercise.id} in={true} timeout={300 + index * 100}>
              <Box>
                <ExerciseItem
                  exercise={exercise}
                  isEditMode={isEditMode}
                  onEdit={() => onEdit(exercise)}
                  onDelete={() => onDelete(exercise.id)}
                  onMoveUp={onMoveUp ? () => onMoveUp(index) : undefined}
                  onMoveDown={onMoveDown ? () => onMoveDown(index) : undefined}
                  isFirst={index === 0}
                  isLast={index === sortedExercises.length - 1}
                />
              </Box>
            </Fade>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
