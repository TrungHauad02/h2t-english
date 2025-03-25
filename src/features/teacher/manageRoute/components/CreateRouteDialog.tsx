import { Stack } from "@mui/material";
import { WEDialog } from "components/display";
import { WESelectImage, WETextField } from "components/input";
import { Route } from "interfaces";

interface CreateRouteDialogProps {
  isOpenCreateDialog: boolean;
  handleOpenCreateDialog: () => void;
  data: Route;
  onChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDescription: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeImage: (value: string) => void;
  onCreateRoute: () => void;
}

export default function CreateRouteDialog({
  isOpenCreateDialog,
  handleOpenCreateDialog,
  data,
  onChangeTitle,
  onChangeDescription,
  onChangeImage,
  onCreateRoute,
}: CreateRouteDialogProps) {
  return (
    <WEDialog
      title="Create Route"
      open={isOpenCreateDialog}
      onCancel={handleOpenCreateDialog}
      onOk={onCreateRoute}
    >
      <Stack>
        <WETextField
          label="Title"
          value={data.title}
          onChange={onChangeTitle}
          type="text"
          required
        />
        <WETextField
          label="Description"
          value={data.description}
          onChange={onChangeDescription}
          type="text"
          required
        />
        <WESelectImage
          label="Image"
          value={data.image}
          onChange={onChangeImage}
          required
        />
      </Stack>
    </WEDialog>
  );
}
