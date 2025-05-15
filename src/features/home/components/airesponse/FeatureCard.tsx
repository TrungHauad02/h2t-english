import { Box, Card, CardContent, Typography, Stack, Chip } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface FeatureCardProps {
  feature: {
    icon: React.ReactNode;
    title: string;
    description: string;
    details: string[];
    gradientColors: string[];
    accentColor: string;
  };
  index: number;
}

export default function FeatureCard({ feature, index }: FeatureCardProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Card
      sx={{
        height: "100%",
        background: isDarkMode
          ? `linear-gradient(145deg, ${color.gray800} 0%, ${color.gray900} 100%)`
          : color.white,
        borderRadius: 4,
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: "translateY(0)",
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        position: "relative",
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
        "@keyframes fadeInUp": {
          from: { opacity: 0, transform: "translateY(30px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "&:hover": {
          transform: "translateY(-8px) scale(1.02)",
          boxShadow: `0 20px 60px ${feature.accentColor}25`,
          borderColor: feature.accentColor,

          "& .gradient-bar": {
            height: 12,
          },

          "& .icon-container": {
            transform: "rotate(10deg) scale(1.1)",
          },
        },
      }}
    >
      <Box
        className="gradient-bar"
        sx={{
          height: 8,
          background: `linear-gradient(135deg, ${feature.gradientColors[0]} 0%, ${feature.gradientColors[1]} 100%)`,
          transition: "height 0.3s ease",
        }}
      />

      <CardContent sx={{ p: 4 }}>
        <Stack spacing={3}>
          <Box
            className="icon-container"
            sx={{
              width: 80,
              height: 80,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${feature.accentColor}15 0%, ${feature.accentColor}05 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: feature.accentColor,
              transition: "transform 0.3s ease",
              border: `2px solid ${feature.accentColor}30`,
            }}
          >
            {feature.icon}
          </Box>

          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: isDarkMode ? color.white : color.gray900,
                mb: 1,
              }}
            >
              {feature.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: isDarkMode ? color.gray400 : color.gray600,
                lineHeight: 1.6,
              }}
            >
              {feature.description}
            </Typography>
          </Box>

          <Stack spacing={1.5}>
            {feature.details.map((detail, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  animation: `slideIn 0.5s ease-out ${
                    index * 0.1 + idx * 0.05
                  }s both`,
                  "@keyframes slideIn": {
                    from: { opacity: 0, transform: "translateX(-20px)" },
                    to: { opacity: 1, transform: "translateX(0)" },
                  },
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: feature.accentColor,
                    flexShrink: 0,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: isDarkMode ? color.gray300 : color.gray700,
                  }}
                >
                  {detail}
                </Typography>
              </Box>
            ))}
          </Stack>

          <Box sx={{ mt: 2 }}>
            <Chip
              label="Learn More"
              size="small"
              sx={{
                backgroundColor: `${feature.accentColor}15`,
                color: feature.accentColor,
                fontWeight: "medium",
                "&:hover": {
                  backgroundColor: `${feature.accentColor}25`,
                },
              }}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
