import { Typography, Grid, Stack, IconButton, Button } from "@mui/material";
import RouteNodeCard from "./RouteNodeCard";
import { RouteNode } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { SaveIcon } from "lucide-react";
import { useErrors } from "hooks/useErrors";
import { WEConfirmDelete } from "components/display";
import { extractErrorMessages } from "utils/extractErrorMessages";
import { routeNodeService } from "../../../../../services/route/routeNodeService";

interface NodesListProps {
  nodes: RouteNode[];
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onSaveChange: () => void;
  onOpenAddNodeDialog: () => void;
  fetchData: () => void;
}

export default function NodesList({
  nodes,
  onMoveUp,
  onMoveDown,
  onSaveChange,
  onOpenAddNodeDialog,
  fetchData,
}: NodesListProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const [isEditMode, setIsEditMode] = useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { showError } = useErrors();

  const sortedNodes = nodes.sort((a, b) => a.serial - b.serial);

  const handleOpenDeleteDialog = (id: number) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteId(null);
    setOpenDeleteDialog(false);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      // Remove node from database
      await routeNodeService.remove(deleteId!);

      // Get current nodes after deletion
      const currentNodes = nodes.filter((node) => node.id !== deleteId);

      // Sort nodes by their current serial
      const sortedNodes = [...currentNodes].sort((a, b) => a.serial - b.serial);

      // Update serial numbers to be sequential starting from 1
      const updatePromises = sortedNodes.map(async (node, index) => {
        const newSerial = index + 1;

        // Only update if serial number has changed
        if (node.serial !== newSerial) {
          await routeNodeService.patch(node.id, {
            serial: newSerial,
          });
        }
      });

      await Promise.all(updatePromises);

      fetchData();
    } catch (error) {
      // Display error
      showError({
        message: "Error deleting route node",
        severity: "error",
        details: extractErrorMessages(error),
      });
      console.error("Error deleting route node:", error);
    } finally {
      setIsDeleting(false);
      handleCloseDeleteDialog();
    }
  };

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
              onDelete={() => handleOpenDeleteDialog(node.id)}
            />
          </Grid>
        ))}
      </Grid>

      <WEConfirmDelete
        open={openDeleteDialog}
        onCancel={handleCloseDeleteDialog}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        resourceName={nodes.find((n) => n.id === deleteId)?.title}
      />
    </>
  );
}
