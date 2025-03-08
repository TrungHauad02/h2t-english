import {
  Grid,
  Box,
  TextField,
  FormControlLabel,
  Switch,
  FormGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Vocabulary, WordType } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { WESelectImage } from "components/input";

interface VocabularyEditFormProps {
  editData: Vocabulary;
  setEditData: (data: Vocabulary) => void;
}

export default function VocabularyEditForm({
  editData,
  setEditData,
}: VocabularyEditFormProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const accentColor = isDarkMode ? color.teal300 : color.teal600;

  const handleVocabChange = (field: keyof Vocabulary, value: any) => {
    setEditData({ ...editData, [field]: value });
  };

  return (
    <Grid container spacing={2}>
      {/* Status switch */}
      <Grid item xs={12}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={editData.status}
                  onChange={(e) =>
                    handleVocabChange("status", e.target.checked)
                  }
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: accentColor,
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: accentColor,
                    },
                  }}
                />
              }
              label="Active"
            />
          </FormGroup>
        </Box>
      </Grid>

      {/* Image selection */}
      <Grid item xs={12}>
        <WESelectImage
          label="Vocabulary Image"
          value={editData.image}
          onChange={(base64) => handleVocabChange("image", base64)}
          required
        />
      </Grid>

      {/* Form fields */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Word"
          value={editData.word}
          onChange={(e) => handleVocabChange("word", e.target.value)}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 }, mb: 2 }}
        />

        <TextField
          fullWidth
          label="Phonetic"
          value={editData.phonetic}
          onChange={(e) => handleVocabChange("phonetic", e.target.value)}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 }, mb: 2 }}
        />

        <FormControl
          fullWidth
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 }, mb: 2 }}
        >
          <InputLabel id="word-type-label">Word Type</InputLabel>
          <Select
            labelId="word-type-label"
            value={editData.wordType}
            onChange={(e) => handleVocabChange("wordType", e.target.value)}
            label="Word Type"
          >
            <MenuItem value={WordType.NOUN}>Noun</MenuItem>
            <MenuItem value={WordType.VERB}>Verb</MenuItem>
            <MenuItem value={WordType.ADJECTIVE}>Adjective</MenuItem>
            <MenuItem value={WordType.ADVERB}>Adverb</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Meaning"
          value={editData.meaning}
          onChange={(e) => handleVocabChange("meaning", e.target.value)}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 }, mb: 2 }}
        />

        <TextField
          fullWidth
          label="Example"
          value={editData.example}
          onChange={(e) => handleVocabChange("example", e.target.value)}
          multiline
          rows={2}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
        />
      </Grid>
    </Grid>
  );
}
