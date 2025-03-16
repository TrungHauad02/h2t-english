import { Box, Typography } from "@mui/material";
import { TestWriting } from "interfaces";

interface WritingTestProps {
  testWritings: TestWriting[];
}

export default function WritingTest({ testWritings }: WritingTestProps) {
  return (
    <Box>
      <Typography variant="h5">Writing Test</Typography>
      {testWritings.length > 0 ? (
        testWritings.map((writing) => (
          <Typography key={writing.id}>{`Topic: ${writing.topic} (Min: ${writing.minWords}, Max: ${writing.maxWords})`}</Typography>
        ))
      ) : (
        <Typography>No writing topics available.</Typography>
      )}
    </Box>
  );
}
