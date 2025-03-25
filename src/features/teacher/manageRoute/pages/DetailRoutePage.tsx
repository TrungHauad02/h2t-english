import { Stack, Typography, Button, CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import {
  NodesList,
  PageHeader,
  PublishActions,
  PublishDialogs,
  RouteDetailsView,
  RouteEditForm,
} from "../components/detailRoute";
import useDetailRoutePage from "../hooks/useDetailRoutePage";
import AddNodeDialog from "../components/detailRoute/AddNodeDialog";

export default function DetailRoutePage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const hooks = useDetailRoutePage();

  if (hooks.loading) {
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

  if (!hooks.data) {
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
          onClick={hooks.handleGoBack}
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
      <PageHeader
        onGoBack={hooks.handleGoBack}
        onEditMode={hooks.handleEditMode}
      />

      <PublishActions
        status={hooks.data.status}
        onPublish={hooks.handlePublishClick}
        onUnpublish={hooks.handleUnpublishClick}
      />

      {hooks.editMode ? (
        <RouteEditForm
          editedData={hooks.editedData}
          setEditedData={hooks.setEditedData}
          onSave={hooks.handleSaveChanges}
          onCancel={hooks.handleEditMode}
        />
      ) : (
        <>
          <RouteDetailsView data={hooks.data} />
          <NodesList
            nodes={hooks.data.routeNodes}
            onMoveUp={hooks.onMoveUp}
            onMoveDown={hooks.onMoveDown}
            onSaveChange={hooks.handleSaveChanges}
            onOpenAddNodeDialog={hooks.handleOpenAddNodeDialog}
          />
        </>
      )}

      <PublishDialogs
        openPublish={hooks.openPublishDialog}
        openUnpublish={hooks.openUnpublishDialog}
        onCancelPublish={() => hooks.setOpenPublishDialog(false)}
        onCancelUnpublish={() => hooks.setOpenUnpublishDialog(false)}
        onConfirmPublish={hooks.handlePublish}
        onConfirmUnpublish={hooks.handleUnpublish}
      />
      <AddNodeDialog
        open={hooks.openAddNodeDialog}
        onCancel={() => hooks.handleOpenAddNodeDialog()}
        onOk={() => hooks.handleAddNode()}
        data={hooks.newNode}
        setData={hooks.setNewNode}
        newLesson={hooks.newLesson}
        setNewLesson={hooks.setNewLesson}
      />
    </Stack>
  );
}
