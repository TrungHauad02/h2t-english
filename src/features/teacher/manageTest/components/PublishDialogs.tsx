import { Typography } from "@mui/material";
import { WEDialog } from "components/display";

interface LessonPublishDialogsProps {
  openPublish: boolean;
  openUnpublish: boolean;
  onCancelPublish: () => void;
  onCancelUnpublish: () => void;
  onConfirmPublish: () => void;
  onConfirmUnpublish: () => void;
}

export default function LessonPublishDialogs({
  openPublish,
  openUnpublish,
  onCancelPublish,
  onCancelUnpublish,
  onConfirmPublish,
  onConfirmUnpublish,
}: LessonPublishDialogsProps) {
  return (
    <>
      <WEDialog
        open={openPublish}
        title="Publish Toeic"
        onCancel={onCancelPublish}
        onOk={onConfirmPublish}
      >
        <Typography variant="body1">
          Are you sure you want to publish this toeic? Published toeics will
          be visible to students.
        </Typography>
      </WEDialog>

      <WEDialog
        open={openUnpublish}
        title="Unpublish Toeic"
        onCancel={onCancelUnpublish}
        onOk={onConfirmUnpublish}
      >
        <Typography variant="body1">
          Are you sure you want to unpublish this toeic? Unpublished toeics
          will not be visible to students.
        </Typography>
      </WEDialog>
    </>
  );
}
