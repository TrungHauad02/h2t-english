import { Grid, Box, FormControlLabel, Switch, FormGroup } from "@mui/material";
import { Vocabulary, WordType } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { WESelectImage } from "components/input";
import { WETextField, WESelect } from "components/input";

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

  const wordTypeOptions = [
    { label: "Noun", value: WordType.NOUN },
    { label: "Verb", value: WordType.VERB },
    { label: "Adjective", value: WordType.ADJECTIVE },
    { label: "Adverb", value: WordType.ADVERB },
  ];

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
        <WETextField
          label="Word"
          type="text"
          value={editData.word}
          onChange={(e) => handleVocabChange("word", e.target.value)}
          required
        />

        <WETextField
          label="Phonetic"
          type="text"
          value={editData.phonetic}
          onChange={(e) => handleVocabChange("phonetic", e.target.value)}
          required
        />

        <WESelect
          showLabel
          label="Word Type"
          value={editData.wordType}
          options={wordTypeOptions}
          onChange={(value) => handleVocabChange("wordType", value)}
          required
          name="wordType"
        />

        <Box sx={{ mt: 1.5 }}>
          <WETextField
            label="Meaning"
            type="text"
            value={editData.meaning}
            onChange={(e) => handleVocabChange("meaning", e.target.value)}
            required
          />
        </Box>

        <WETextField
          label="Example"
          type="text"
          value={editData.example}
          onChange={(e) => handleVocabChange("example", e.target.value)}
          multiline
          rows={2}
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: { xs: "0.75rem", sm: "1rem" },
              width: "100%",
              paddingLeft: "1rem",
              "& .MuiOutlinedInput-notchedOutline": {
                border: `1px solid ${color.gray400}`,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: `2px solid ${
                  isDarkMode ? color.emerald400 : color.emerald500
                }`,
              },
              fontSize: "1rem",
              marginBottom: "1rem",
            },
          }}
        />
      </Grid>
    </Grid>
  );
}
