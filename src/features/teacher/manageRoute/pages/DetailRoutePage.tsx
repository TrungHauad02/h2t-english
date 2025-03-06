import { useEffect, useState } from "react";
import { Stack, Typography, Button, CircularProgress } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { routeService } from "../services/listRouteService";
import {
  NodesList,
  PageHeader,
  PublishActions,
  PublishDialogs,
  RouteDetailsView,
  RouteEditForm,
} from "../components/detailRoute";
import { Route } from "interfaces";

export default function DetailRoutePage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<Route | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<Route | null>(null);
  const [openPublishDialog, setOpenPublishDialog] = useState(false);
  const [openUnpublishDialog, setOpenUnpublishDialog] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      const route = routeService.getRouteById(parseInt(id));
      if (route) {
        setData(route);
        setEditedData({ ...route });
      }
      setLoading(false);
    }
  }, [id]);

  const handleGoBack = () => navigate(-1);
  const handleEditMode = () => setEditMode(!editMode);

  const handleSaveChanges = () => {
    if (editedData) {
      setData(editedData);
      setEditMode(false);
    }
  };

  const handlePublishClick = () => setOpenPublishDialog(true);
  const handleUnpublishClick = () => setOpenUnpublishDialog(true);

  const handlePublish = () => {
    if (data) {
      const updatedData = { ...data, status: true };
      setData(updatedData);
      if (editedData) setEditedData(updatedData);
      setOpenPublishDialog(false);
    }
  };

  const handleUnpublish = () => {
    if (data) {
      const updatedData = { ...data, status: false };
      setData(updatedData);
      if (editedData) setEditedData(updatedData);
      setOpenUnpublishDialog(false);
    }
  };

  if (loading) {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 6, minHeight: "60vh" }}
      >
        <CircularProgress
          size={40}
          sx={{ color: isDarkMode ? color.emerald400 : color.emerald600 }}
        />
      </Stack>
    );
  }

  if (!data) {
    return (
      <Stack sx={{ mt: 6, p: 3 }}>
        <Typography
          variant="h5"
          color={isDarkMode ? color.gray100 : color.gray900}
        >
          Route not found
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          sx={{
            mt: 2,
            color: isDarkMode ? color.emerald400 : color.emerald600,
          }}
        >
          Go Back
        </Button>
      </Stack>
    );
  }

  return (
    <Stack sx={{ mt: 6, mb: 6, px: { xs: 2, md: 4 } }}>
      <PageHeader onGoBack={handleGoBack} onEditMode={handleEditMode} />

      <PublishActions
        status={data.status}
        onPublish={handlePublishClick}
        onUnpublish={handleUnpublishClick}
      />

      {editMode ? (
        <RouteEditForm
          editedData={editedData}
          setEditedData={setEditedData}
          onSave={handleSaveChanges}
          onCancel={handleEditMode}
        />
      ) : (
        <>
          <RouteDetailsView data={data} />
          <NodesList nodes={data.routeNodes} />
        </>
      )}

      <PublishDialogs
        openPublish={openPublishDialog}
        openUnpublish={openUnpublishDialog}
        onCancelPublish={() => setOpenPublishDialog(false)}
        onCancelUnpublish={() => setOpenUnpublishDialog(false)}
        onConfirmPublish={handlePublish}
        onConfirmUnpublish={handleUnpublish}
      />
    </Stack>
  );
}
