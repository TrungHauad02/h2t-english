import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function ListLessonPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  return <Box sx={{ mt: 8 }}>List lesson {type}</Box>;
}
