import { Stack, Avatar, Box, Typography, Chip, Tooltip, Zoom } from "@mui/material";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { SpeakingConversation } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface CharacterInfoSectionProps {
  item: SpeakingConversation;
  isSelectedCharacter: boolean;
  colors: {
    border: string;
    background: string;
    highlight: string;
    avatar: string;
    chipBg: string;
    chipText: string;
  };
}

export default function CharacterInfoSection({
  item,
  isSelectedCharacter,
  colors,
}: CharacterInfoSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const textColor = isDarkMode ? color.gray200 : color.gray800;

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        p: 2,
        pb: 1.5,
        position: "relative",
      }}
    >
      <Avatar
        sx={{
          bgcolor: colors.avatar,
          color: color.white,
          width: 46,
          height: 46,
          fontWeight: "bold",
          border: `2px solid ${isDarkMode ? color.gray600 : color.white}`,
          boxShadow: 2,
          fontSize: 20,
        }}
      >
        {item.name.charAt(0)}
      </Avatar>

      <Box sx={{ flexGrow: 1 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={1}
          sx={{ mb: 0.5 }}
        >
          <Typography
            variant="h6"
            sx={{
              color: colors.highlight,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              fontSize: { xs: "1rem", sm: "1.1rem" },
            }}
          >
            {item.name}
            {isSelectedCharacter && (
              <Tooltip
                title="Your character"
                placement="top"
                TransitionComponent={Zoom}
              >
                <RecordVoiceOverIcon
                  sx={{
                    ml: 1,
                    fontSize: 16,
                    color: isDarkMode ? color.teal300 : color.teal600,
                  }}
                />
              </Tooltip>
            )}
          </Typography>

          <Chip
            label={`Line ${item.serial}`}
            size="small"
            sx={{
              bgcolor: colors.chipBg,
              color: colors.chipText,
              fontWeight: 500,
              borderRadius: 1.5,
              fontSize: "0.75rem",
            }}
          />
        </Stack>

        <Typography
          variant="body1"
          sx={{
            color: textColor,
            lineHeight: 1.6,
            fontSize: "0.95rem",
            p: 1.5,
            mt: 0.5,
            borderRadius: 1.5,
            bgcolor: isDarkMode
              ? "rgba(31, 41, 55, 0.4)"
              : "rgba(249, 250, 251, 0.8)",
            border: `1px solid ${
              isDarkMode ? color.gray700 : color.gray200
            }`,
          }}
        >
          {item.content}
        </Typography>
      </Box>
    </Stack>
  );
}
