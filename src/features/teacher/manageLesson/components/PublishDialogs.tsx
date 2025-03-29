import { Typography, Box, Stack } from "@mui/material";
import { WEDialog } from "components/display";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import PublishIcon from "@mui/icons-material/Publish";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const publishBgColor = isDarkMode ? color.teal900 : color.teal50;
  const unpublishBgColor = isDarkMode ? color.red900 : color.red100;
  const publishIconColor = isDarkMode ? color.teal300 : color.teal600;
  const unpublishIconColor = isDarkMode ? color.red400 : color.red600;
  const textColor = isDarkMode ? color.gray100 : color.gray800;

  return (
    <>
      <WEDialog
        open={openPublish}
        title="Publish Lesson"
        onCancel={onCancelPublish}
        onOk={onConfirmPublish}
      >
        <Stack spacing={3}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              bgcolor: publishBgColor,
              p: 2,
              borderRadius: 2,
              border: `1px solid ${isDarkMode ? color.teal800 : color.teal200}`,
            }}
          >
            <PublishIcon sx={{ fontSize: 40, color: publishIconColor }} />
            <Typography
              variant="body1"
              sx={{ color: textColor, fontWeight: "medium" }}
            >
              Are you sure you want to publish this lesson? Published lessons
              will be visible to students.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              borderRadius: 2,
              bgcolor: isDarkMode ? color.gray800 : color.gray100,
              border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
              <VisibilityIcon sx={{ color: color.emerald500 }} />
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", color: color.emerald500 }}
              >
                When a lesson is published:
              </Typography>
            </Box>
            <Box sx={{ ml: 4 }}>
              <Typography component="ul" sx={{ mt: 1, pl: 2 }}>
                <li>Students can access all lesson content</li>
                <li>The lesson will appear in student dashboards</li>
                <li>Students can complete assignments and quizzes</li>
                <li>You can still edit the lesson after publishing</li>
              </Typography>
            </Box>
          </Box>
        </Stack>
      </WEDialog>

      <WEDialog
        open={openUnpublish}
        title="Unpublish Lesson"
        onCancel={onCancelUnpublish}
        onOk={onConfirmUnpublish}
      >
        <Stack spacing={3}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              bgcolor: unpublishBgColor,
              p: 2,
              borderRadius: 2,
              border: `1px solid ${isDarkMode ? color.red800 : color.red200}`,
            }}
          >
            <UnpublishedIcon sx={{ fontSize: 40, color: unpublishIconColor }} />
            <Typography
              variant="body1"
              sx={{ color: textColor, fontWeight: "medium" }}
            >
              Are you sure you want to unpublish this lesson? Unpublished
              lessons will not be visible to students.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              borderRadius: 2,
              bgcolor: isDarkMode ? color.gray800 : color.gray100,
              border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
              <VisibilityOffIcon sx={{ color: color.red500 }} />
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", color: color.red500 }}
              >
                When a lesson is unpublished:
              </Typography>
            </Box>
            <Box sx={{ ml: 4 }}>
              <Typography component="ul" sx={{ mt: 1, pl: 2 }}>
                <li>Students will lose access to all lesson content</li>
                <li>The lesson will be hidden from student dashboards</li>
                <li>Existing progress will be saved but inaccessible</li>
                <li>You can republish the lesson at any time</li>
              </Typography>
            </Box>
          </Box>
        </Stack>
      </WEDialog>
    </>
  );
}
