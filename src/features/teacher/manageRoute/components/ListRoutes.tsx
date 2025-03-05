import {
  Stack,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  CardMedia,
  Chip,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { Route } from "interfaces";
import useColor from "theme/useColor";

interface ListRoutesProps {
  list: Route[];
}

export default function ListRoutes({ list }: ListRoutesProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const textColor = isDarkMode ? color.white : color.black;
  const subTextColor = isDarkMode ? color.gray300 : color.gray700;
  const backgroundColor = isDarkMode ? color.gray800 : color.white;
  const buttonColor = isDarkMode ? color.teal400 : color.teal500;
  const buttonTextColor = isDarkMode ? color.white : color.black;

  return (
    <Stack sx={{ mt: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ color: textColor }}>
        List Routes
      </Typography>
      <Grid container spacing={2}>
        {list.map((route) => (
          <Grid item xs={12} sm={6} md={4} key={route.id}>
            <Card sx={{ maxWidth: 345, backgroundColor }}>
              <CardMedia
                component="img"
                height="140"
                image={route.image}
                alt={route.title}
              />
              <CardContent>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Stack>
                    <Typography
                      variant="h6"
                      component="div"
                      gutterBottom
                      sx={{ color: textColor }}
                    >
                      {route.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ color: subTextColor }}
                      noWrap
                    >
                      {route.description}
                    </Typography>
                  </Stack>
                  <Chip
                    label={route.status ? "Published" : "Unpublished"}
                    sx={{
                      bgcolor: route.status
                        ? buttonColor
                        : isDarkMode
                        ? color.gray500
                        : color.gray300,
                    }}
                  />
                </Stack>
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{
                      borderColor: buttonColor,
                      color: buttonTextColor,
                      "&:hover": {
                        borderColor: buttonColor,
                        backgroundColor: buttonColor,
                      },
                    }}
                  >
                    View detail
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{
                      borderColor: color.delete,
                      color: buttonTextColor,
                      "&:hover": {
                        borderColor: color.delete,
                        backgroundColor: color.delete,
                      },
                    }}
                  >
                    Delete
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
