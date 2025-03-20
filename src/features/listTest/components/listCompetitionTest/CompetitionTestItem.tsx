import { CompetitionTest } from "interfaces";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useTestItemStyles } from "../../hooks/useTestItemStyles";
import { useNavigate } from "react-router-dom";

export default function CompetitionTestItem({ test }: { test: CompetitionTest }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const styles = useTestItemStyles(hovered);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={styles.cardStyles}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <CardContent sx={styles.cardContentStyles}>
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            sx={styles.typographyStyles.title}
          >
            {test?.title}
          </Typography>
          <Typography variant="body2" sx={styles.typographyStyles.body} paragraph>
            Duration: {test?.duration} minutes
          </Typography>
          <Typography variant="body2" sx={styles.typographyStyles.body} paragraph>
            Total questions: {test?.totalQuestions || "N/A"}
          </Typography>
          <Typography variant="body2" sx={styles.typographyStyles.body} paragraph>
            Start Time: {new Date(test?.startTime).toLocaleString()}
          </Typography>
          <Typography variant="body2" sx={styles.typographyStyles.body} paragraph>
            End Time: {new Date(test?.endTime).toLocaleString()}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button sx={styles.buttonStyles.seeHistory}>See History</Button>
            <Button
              variant="contained"
              sx={styles.buttonStyles.doTest}
              onClick={() => navigate(`${test.id}`)}
            >
              Do Test
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
