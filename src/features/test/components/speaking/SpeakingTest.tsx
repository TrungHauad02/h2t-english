import { Box, Typography } from "@mui/material";
import { TestSpeaking } from "interfaces";

interface SpeakingTestProps {
  testSpeakings: TestSpeaking[];
}

export default function SpeakingTest({ testSpeakings }: SpeakingTestProps) {
  return (
    <Box>
      <Typography variant="h5">Speaking Test</Typography>
      {testSpeakings.length > 0 ? (
        testSpeakings.map((speaking) => (
          <Typography key={speaking.id}>{`Speaking File: ${speaking.file}`}</Typography>
        ))
      ) : (
        <Typography>No speaking files available.</Typography>
      )}
    </Box>
  );
}
