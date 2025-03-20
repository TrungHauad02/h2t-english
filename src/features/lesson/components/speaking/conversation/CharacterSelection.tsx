import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Avatar,
  Container,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { SpeakingConversation } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface CharacterSelectionProps {
  characters: string[];
  data: SpeakingConversation[];
  selectedCharacter: string;
  setSelectedCharacter: (character: string) => void;
}

export default function CharacterSelection({
  characters,
  data,
  selectedCharacter,
  setSelectedCharacter,
}: CharacterSelectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  // Colors based on theme mode
  const cardBgColor = isDarkMode ? color.gray700 : color.white;
  const selectedCardBgColor = isDarkMode ? color.teal900 : color.teal100;
  const headerColor = isDarkMode ? color.emerald200 : color.emerald700;
  const subTextColor = isDarkMode ? color.gray300 : color.gray600;
  const primaryTextColor = isDarkMode ? color.gray100 : color.gray900;
  const cardBorderColor = isDarkMode ? color.teal600 : color.teal400;
  const cardHoverBgColor = isDarkMode ? color.gray600 : color.gray100;
  const avatarBgColor = isDarkMode ? color.teal600 : color.teal500;
  const avatarDefaultBgColor = isDarkMode ? color.gray600 : color.gray400;
  const checkIconColor = isDarkMode ? color.teal300 : color.teal600;

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      {/* Header Section with improved spacing and alignment */}
      <Box sx={{ mb: 4, maxWidth: "90%" }}>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{
            color: headerColor,
            mb: 1.5,
            lineHeight: 1.3,
          }}
        >
          Choose your character
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: subTextColor,
            lineHeight: 1.6,
          }}
        >
          Select a character to role-play in this conversation. You'll record
          yourself speaking their lines.
        </Typography>
      </Box>

      {/* Character Selection Cards with improved layout and animations */}
      <Grid container spacing={3} sx={{ mb: 4, px: { xs: 1, sm: 2 } }}>
        {characters.map((char) => {
          const isSelected = selectedCharacter === char;
          const lineCount = data.filter((item) => item.name === char).length;

          return (
            <Grid item xs={12} sm={6} md={4} key={char}>
              <Card
                elevation={isSelected ? 2 : 0}
                sx={{
                  bgcolor: isSelected ? selectedCardBgColor : cardBgColor,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  border: `2px solid ${
                    isSelected ? cardBorderColor : "transparent"
                  }`,
                  borderRadius: 2,
                  height: "100%",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: isDarkMode ? 4 : 3,
                    bgcolor: isSelected
                      ? selectedCardBgColor
                      : cardHoverBgColor,
                  },
                }}
                onClick={() => setSelectedCharacter(char)}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Stack
                    direction="row"
                    spacing={2.5}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Avatar
                      sx={{
                        bgcolor: isSelected
                          ? avatarBgColor
                          : avatarDefaultBgColor,
                        width: 48,
                        height: 48,
                        transition: "background-color 0.25s ease",
                      }}
                    >
                      <PersonIcon fontSize="medium" />
                    </Avatar>

                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: primaryTextColor,
                          fontWeight: 600,
                          fontSize: { xs: "1rem", sm: "1.1rem" },
                          mb: 0.5,
                        }}
                      >
                        {char}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: subTextColor,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {lineCount} {lineCount === 1 ? "line" : "lines"}
                      </Typography>
                    </Box>

                    {isSelected && (
                      <CheckCircleIcon
                        sx={{
                          color: checkIconColor,
                          fontSize: 28,
                          ml: 1,
                        }}
                      />
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
