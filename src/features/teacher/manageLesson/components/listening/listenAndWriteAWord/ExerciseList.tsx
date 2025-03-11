import { Stack } from "@mui/material";
import ExerciseItem from "./ExerciseItem";
import { ListenAndWriteAWord } from "interfaces";

interface ExerciseListProps {
  data: ListenAndWriteAWord[];
  isEditMode: boolean;
  onEdit: (item: ListenAndWriteAWord) => void;
  onDelete: (id: number) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}

export default function ExerciseList({
  data,
  isEditMode,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
}: ExerciseListProps) {
  return (
    <Stack spacing={3} sx={{ mt: 3 }}>
      {data
        .sort((a, b) => a.serial - b.serial)
        .map((item, index) => (
          <ExerciseItem
            key={item.id}
            item={item}
            isEditMode={isEditMode}
            onEdit={onEdit}
            onDelete={onDelete}
            onMoveUp={() => onMoveUp(item.id)}
            onMoveDown={() => onMoveDown(item.id)}
          />
        ))}
    </Stack>
  );
}
