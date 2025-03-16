import { Box, Typography } from "@mui/material";
import { TestListening } from "interfaces";

interface ListeningTestProps {
  testListenings: TestListening[];
}

export default function ListeningTest({ testListenings }: ListeningTestProps) {
  return (
    <Box>
      <Typography variant="h5">Listening Test</Typography>
      {testListenings.length > 0 ? (
        testListenings.map((listening) => (
          <Typography key={listening.id}>{`Audio: ${listening.audio}`}</Typography>
        ))
      ) : (
        <Typography>No listening audios available.</Typography>
      )}
    </Box>
  );
}
