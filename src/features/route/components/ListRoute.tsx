import {
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  Grid,
  CardMedia,
  Button,
} from "@mui/material";
import { Route, User } from "interfaces";
import { routeService } from "../services/listRouteService";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { useNavigate } from "react-router-dom";
import { mockData } from "../services/mockData";

export default function ListRoute() {
  const listRoutes: Route[] = routeService.getListRoute();
  const mockTeacher: User = mockData.teacher;
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const textColor = isDarkMode ? color.gray100 : color.gray900;
  const cardBackgroundColor = isDarkMode ? color.gray700 : color.white;
  const cardBorderColor = isDarkMode ? color.gray600 : color.gray300;
  const buttonColor = isDarkMode ? color.teal300 : color.teal500;
  const buttonTextColor = isDarkMode ? color.gray900 : color.white;

  const handleViewDetail = (routeId: number) => {
    navigate(`/route/${routeId}`);
  };

  return (
    <Grid container spacing={3}>
      {listRoutes.map((route) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={route.id}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              bgcolor: cardBackgroundColor,
              border: `1px solid ${cardBorderColor}`,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            {/* Hình ảnh của Route */}
            <CardMedia
              component="img"
              height="140"
              image={route.image}
              alt={route.title}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              {/* Thông tin giáo viên */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ mb: 2 }}
              >
                <Avatar
                  src={mockTeacher.avatar}
                  alt={mockTeacher.name}
                  sx={{ width: 56, height: 56 }}
                />
                <Typography
                  variant="h6"
                  sx={{ color: textColor, fontWeight: "bold" }}
                >
                  {mockTeacher.name}
                </Typography>
              </Stack>

              {/* Thông tin lộ trình */}
              <Typography
                variant="h5"
                component="h2"
                sx={{ color: textColor, fontWeight: "bold", mb: 1 }}
              >
                {route.title}
              </Typography>
              <Typography variant="body1" sx={{ color: textColor, mb: 2 }}>
                {route.description}
              </Typography>

              {/* Nút "Xem chi tiết" */}
              <Button
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: buttonColor,
                  color: buttonTextColor,
                  "&:hover": {
                    bgcolor: isDarkMode ? color.teal400 : color.teal600,
                  },
                }}
                onClick={() => handleViewDetail(route.id)}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
