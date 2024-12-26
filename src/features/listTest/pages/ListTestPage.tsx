import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

export default function ListTestPage() {
  const { type } = useParams();
  return <Box sx={{ mt: 8 }}>List test {type}</Box>;
}
