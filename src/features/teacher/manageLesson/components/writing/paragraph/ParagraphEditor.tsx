import { Box, Typography, TextField } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface ParagraphEditorProps {
  paragraph: string;
  setParagraph: (value: string) => void;
}

export function ParagraphEditor({
  paragraph,
  setParagraph,
}: ParagraphEditorProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const textColor = isDarkMode ? color.gray100 : color.gray900;
  const borderColor = isDarkMode ? color.gray700 : color.gray200;

  return (
    <Box>
      <Typography variant="subtitle1" color={textColor} sx={{ mb: 1.5 }}>
        Paragraph Text
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        value={paragraph}
        onChange={(e) => setParagraph(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            borderColor: borderColor,
            bgcolor: isDarkMode ? color.gray700 : color.white,
            "&:hover fieldset": { borderColor: accentColor },
            "&.Mui-focused fieldset": { borderColor: accentColor },
          },
        }}
      />
    </Box>
  );
}
