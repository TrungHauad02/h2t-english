import { Typography, Grid, Stack, IconButton, Button } from "@mui/material";
import RouteNodeCard from "./RouteNodeCard";
import { RouteNode } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { SaveIcon } from "lucide-react";

interface NodesListProps {
  nodes: RouteNode[];
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onSaveChange: () => void;
  onOpenAddNodeDialog: () => void;
}

export default function NodesList({
  nodes,
  onMoveUp,
  onMoveDown,
  onSaveChange,
  onOpenAddNodeDialog,
}: NodesListProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const [isEditMode, setIsEditMode] = useState(false);

  const sortedNodes = nodes.sort((a, b) => a.serial - b.serial);

  const onChangeEditMode = () => {
    if (isEditMode) {
      onSaveChange();
    }
    setIsEditMode(!isEditMode);
  };

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: isDarkMode ? color.gray100 : color.gray900,
            mb: 3,
          }}
        >
          Lessons ({nodes.length})
        </Typography>
        <Stack direction={"row"} spacing={2} sx={{ mb: 2 }}>
          <IconButton
            sx={{
              width: 40,
              height: 40,
              color: isDarkMode ? color.emerald400 : color.emerald600,
            }}
            onClick={onChangeEditMode}
          >
            {isEditMode ? <SaveIcon /> : <EditIcon />}
          </IconButton>
          <Button
            sx={{
              color: isDarkMode ? color.gray900 : color.gray100,
              bgcolor: isDarkMode ? color.emerald400 : color.emerald600,
              px: 2,
            }}
            onClick={onOpenAddNodeDialog}
          >
            Add new lesson
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {sortedNodes.map((node, index) => (
          <Grid item xs={12} sm={12} md={6} lg={4} key={node.id}>
            <RouteNodeCard
              node={node}
              isEditMode={isEditMode}
              onMoveDown={() => {
                if (isEditMode) onMoveDown(index);
              }}
              onMoveUp={() => {
                if (isEditMode) onMoveUp(index);
              }}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
