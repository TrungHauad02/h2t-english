import { Typography } from "@mui/material";
import { WEDialog } from "components/display";

interface LessonPublishDialogsProps {
  openPublish: boolean;
  openUnpublish: boolean;
  onCancelPublish: () => void;
  onCancelUnpublish: () => void;
  onConfirmPublish: () => void;
  onConfirmUnpublish: () => void;
  title: string;
}

export default function LessonPublishDialogs({
  openPublish,
  openUnpublish,
  onCancelPublish,
  onCancelUnpublish,
  onConfirmPublish,
  onConfirmUnpublish,
  title,
}: LessonPublishDialogsProps) {
  return (
    <>
      <WEDialog
        open={openPublish}
        title={"Publish " + title}
        onCancel={onCancelPublish}
        onOk={onConfirmPublish}
      >
        <Typography variant="body1">
          Are you sure you want to publish this {title}? Published {title}s will
          be visible to students.
        </Typography>
      </WEDialog>

      <WEDialog
        open={openUnpublish}
        title={"Unpublish " + {title}}
        onCancel={onCancelUnpublish}
        onOk={onConfirmUnpublish}
      >
        <Typography variant="body1">
          Are you sure you want to unpublish this {title} ? Unpublished {title}s 
          will not be visible to students.
        </Typography>
      </WEDialog>
    </>
  );
}
