import { Stack, Typography, Grid } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { useErrors } from "hooks/useErrors";
import { Route } from "interfaces";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useColor from "theme/useColor";
import { routeService } from "../../../../services/route/routeService";
import { extractErrorMessages } from "utils/extractErrorMessages";
import { WEConfirmDelete } from "components/display";
import RouteItem from "./RouteItem";

interface ListRoutesProps {
  list: Route[];
  fetchData: () => void;
}

export default function ListRoutes({ list, fetchData }: ListRoutesProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { showError } = useErrors();

  const textColor = isDarkMode ? color.white : color.black;

  const handleOpenDeleteDialog = (id: number) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteId(null);
    setOpenDeleteDialog(false);
  };

  const handleDelete = async () => {
    // Remove in db
    try {
      setIsDeleting(true);
      await routeService.remove(deleteId!);
      fetchData();
    } catch (error) {
      // Display error
      showError({
        message: "Error deleting route",
        severity: "error",
        details: extractErrorMessages(error),
      });
      console.error("Error deleting route");
    } finally {
      setIsDeleting(false);
      handleCloseDeleteDialog();
    }
  };

  const onViewDetail = (routeId: number) => {
    navigate(`/teacher/routes/${routeId}`);
  };

  return (
    <Stack sx={{ mt: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ color: textColor }}>
        List Routes
      </Typography>
      <Grid container spacing={2}>
        {list.map((route) => (
          <Grid item xs={12} md={6} lg={4} key={route.id}>
            <RouteItem
              route={route}
              onViewDetail={onViewDetail}
              handleOpenDeleteDialog={handleOpenDeleteDialog}
            />
          </Grid>
        ))}
      </Grid>

      <WEConfirmDelete
        open={openDeleteDialog}
        onCancel={handleCloseDeleteDialog}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        resourceName={list.find((n) => n.id === deleteId)?.title}
      />
    </Stack>
  );
}
