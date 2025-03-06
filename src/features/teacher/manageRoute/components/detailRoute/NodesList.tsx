import { Typography, Grid, Stack, IconButton } from "@mui/material";
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
}

export default function NodesList({
  nodes,
  onMoveUp,
  onMoveDown,
  onSaveChange,
}: NodesListProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const [isEditMode, setIsEditMode] = useState(false);

  const onChangeEditMode = () => {
    if (isEditMode) {
      onSaveChange();
    }
    setIsEditMode(!isEditMode);
  };

  return (
    <>
      <Stack direction={"row"} justifyContent={"space-between"}>
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
      </Stack>

      <Grid container spacing={3}>
        {nodes.map((node, index) => (
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
