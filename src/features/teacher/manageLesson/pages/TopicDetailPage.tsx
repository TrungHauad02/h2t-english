import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Stack,
  Typography,
  Container,
  Button,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDarkMode } from "hooks/useDarkMode";
import { Topic } from "interfaces";
import useColor from "theme/useColor";
import { listLessonService } from "../services/listLessonService";
import {
  QuestionsSection,
  TopicActions,
  TopicDetailsView,
  TopicEditForm,
  TopicHeader,
} from "../components/topic";

export default function TopicDetailPage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const { id, routeId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<Topic | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && routeId) {
      setLoading(true);
      setTimeout(() => {
        const topic = listLessonService.getTopicById(parseInt(id));
        if (topic) {
          setData(topic);
          setEditData({ ...topic });
        }
        setLoading(false);
      }, 500);
    }
  }, [id, routeId]);

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      setEditData({ ...data } as Topic);
    }
  };

  const handleSaveChanges = () => {
    if (editData) {
      setData(editData);
      setIsEditMode(false);
    }
  };

  const handleInputChange = (field: keyof Topic, value: any) => {
    if (editData) {
      setEditData({
        ...editData,
        [field]: value,
      });
    }
  };

  const handleGoBack = () => {
    navigate(-1);
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
          Topic not found
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
    <Container maxWidth="lg">
      <Stack sx={{ mt: 6, mb: 6, px: { xs: 2, md: 4 } }}>
        <TopicHeader onGoBack={handleGoBack} onEditMode={handleEditMode} />

        <TopicActions
          status={data.status}
          isEditMode={isEditMode}
          onSave={handleSaveChanges}
          onCancel={handleEditMode}
        />

        {isEditMode ? (
          <TopicEditForm
            editData={editData}
            handleInputChange={handleInputChange}
          />
        ) : (
          <TopicDetailsView data={data} />
        )}

        <QuestionsSection questions={data.questions} />
      </Stack>
    </Container>
  );
}
