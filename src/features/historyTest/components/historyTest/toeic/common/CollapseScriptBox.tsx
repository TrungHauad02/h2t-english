import React, { useState } from "react";
import { Box, Collapse, Typography, Button } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

type Props = {
  script?: string;
};

const ScriptCollapse: React.FC<Props> = ({ script }) => {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const [show, setShow] = useState(false);

  if (!script) return null;

  return (
    <Box mt={2}>
      <Button
        variant="outlined"
        size="small"
        onClick={() => setShow((prev) => !prev)}
        sx={{
          fontWeight: "bold",
          color: isDarkMode ? color.blue100 : color.blue700,
          borderColor: isDarkMode ? color.blue500 : color.blue400,
          textTransform: "none",
          mb: 1,
          "&:hover": {
            borderColor: isDarkMode ? color.blue300 : color.blue600,
            backgroundColor: isDarkMode ? color.blue900 : color.blue50,
          },
        }}
      >
        {show ? "Hide Transcript" : "Show Transcript"}
      </Button>

      <Collapse in={show}>
        <Box
          p={2}
          borderRadius={1}
          sx={{
            bgcolor: isDarkMode ? color.blue800 : color.blue100,
            color: isDarkMode ? color.blue50 : color.blue900,
            fontStyle: "italic",
            border: `1px dashed ${isDarkMode ? color.blue500 : color.blue300}`,
          }}
        >
          <Typography variant="body2">{script}</Typography>
        </Box>
      </Collapse>
    </Box>
  );
};

export default ScriptCollapse;
