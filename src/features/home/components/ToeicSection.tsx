import { Box, Container, Grid, CircularProgress } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { ToeicCard, ToeicTitle, ToeicContent } from "./toeic";
import { useEffect, useState } from "react";
import { Toeic } from "interfaces";
import { toeicService } from "services";
import { toast } from "react-toastify";
import useAuth from "hooks/useAuth";
export default function ToeicSection() {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();
  const [toeics, setToeics] = useState<Toeic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userId = Number(useAuth().userId);

  useEffect(() => {
    const fetchToeics = async () => {
      setLoading(true);
      try {
        const resData = await toeicService.getToeicsForStudent(1, 5, userId , {
          sortBy: "-createdAt",
          status: true,
        });
        setToeics(resData.data.content);
      } catch (error) {
        console.error("Error fetching toeics:", error);
        toast.error("Failed to load TOEIC tests");
      } finally {
        setLoading(false);
      }
    };
    fetchToeics();
  }, []);

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: isDarkMode ? colors.gray900 : colors.gray50,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration - left */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          left: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${
            isDarkMode ? colors.teal800 + "30" : colors.teal200 + "50"
          } 0%, transparent 70%)`,
          zIndex: 0,
        }}
      />

      {/* Background decoration - right */}
      <Box
        sx={{
          position: "absolute",
          bottom: -80,
          right: -80,
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${
            isDarkMode ? colors.emerald800 + "30" : colors.emerald200 + "50"
          } 0%, transparent 70%)`,
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={{ xs: 3, md: 6 }} alignItems="center">
          <ToeicTitle />

          <Grid item xs={12} md={7}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress
                  size={60}
                  sx={{
                    color: isDarkMode ? colors.teal400 : colors.teal600,
                  }}
                />
              </Box>
            ) : (
              <Grid container spacing={3}>
                {toeics.map((toeic) => (
                  <Grid item key={toeic.id} xs={12} sm={6} md={6} lg={6}>
                    <ToeicCard toeic={toeic} />
                  </Grid>
                ))}
              </Grid>
            )}
            <ToeicContent />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
