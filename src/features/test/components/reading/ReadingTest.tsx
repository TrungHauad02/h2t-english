import { Box, Typography } from "@mui/material";
import { TestReading } from "interfaces";

interface ReadingTestProps {
  testReadings: TestReading[];
}

export default function ReadingTest({ testReadings }: ReadingTestProps) {
  return (
    <Box>
      <Typography variant="h5">Reading Test</Typography>
      {testReadings.map((reading) => (
        <Typography key={reading.id}>{`Reading Passage: ${reading.file}`}</Typography>
      ))}
    </Box>
  );
}
