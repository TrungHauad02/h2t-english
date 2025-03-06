import { Typography } from "@mui/material";
import { WEDialog } from "components/display";

interface PublishDialogsProps {
  openPublish: boolean;
  openUnpublish: boolean;
  onCancelPublish: () => void;
  onCancelUnpublish: () => void;
  onConfirmPublish: () => void;
  onConfirmUnpublish: () => void;
}

export default function PublishDialogs({
  openPublish,
  openUnpublish,
  onCancelPublish,
  onCancelUnpublish,
  onConfirmPublish,
  onConfirmUnpublish,
}: PublishDialogsProps) {
  return (
    <>
      <WEDialog
        open={openPublish}
        title="Publish Route"
        onCancel={onCancelPublish}
        onOk={onConfirmPublish}
      >
        <Typography variant="body1">
          Are you sure you want to publish this route? Published routes will be
          visible to students.
        </Typography>
      </WEDialog>

      <WEDialog
        open={openUnpublish}
        title="Unpublish Route"
        onCancel={onCancelUnpublish}
        onOk={onConfirmUnpublish}
      >
        <Typography variant="body1">
          Are you sure you want to unpublish this route? Unpublished routes will
          not be visible to students.
        </Typography>
      </WEDialog>
    </>
  );
}
