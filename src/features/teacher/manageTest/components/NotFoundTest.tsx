import { Button, Stack, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useColor from "theme/useColor";
import { useNavigate } from "react-router-dom";

export default function NotFoundTest({ title }: { title: string }) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Stack sx={{ mt: 6, p: 3 }}>
      <Typography
        variant="h5"
        color={isDarkMode ? color.gray100 : color.gray900}
      >
        {title}
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
