import { Test } from "interfaces";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useTestItemStyles } from "./TestItemStyles";
import { useNavigate } from "react-router-dom";
export default function TestItem({ test }: { test: Test }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const { cardStyles, cardContentStyles, typographyStyles, buttonStyles } =
    useTestItemStyles(hovered);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={cardStyles}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <CardContent sx={cardContentStyles}>
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            sx={typographyStyles.title}
          >
            {test?.title}
          </Typography>
          <Typography variant="body2" sx={typographyStyles.body} paragraph>
            Duration: {test?.duration} minutes
          </Typography>
          <Typography variant="body2" sx={typographyStyles.body} paragraph>
            Total question: {test?.totalQuestions}
          </Typography>
          <Typography variant="body2" sx={typographyStyles.body} paragraph>
            Score: {test?.scoreLastOfTest || 0}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button sx={buttonStyles.seeHistory}>See History</Button>
            <Button variant="contained" sx={buttonStyles.doTest}
            onClick={() => navigate(`${test.id}`)}>
              Do Test
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
