import { useState, ReactNode } from "react";
import { Button, Collapse, SxProps, Theme } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface CollapsibleSectionProps {
  text: string;
  children: ReactNode;
  sx?: SxProps<Theme>;
}

const CollapsibleSection = ({
  text,
  children,
  sx,
}: CollapsibleSectionProps) => {
  const [showContent, setShowContent] = useState(false);

  const buttonStyles: SxProps<Theme> = {
    margin: "1rem 2%",
    backgroundColor: "#dadada",
    color: "#000",
    justifyContent: "space-between",
    display: "flex",
    width: "95%",
    textAlign: "left",
    textTransform: "capitalize",
    fontSize: "1.25rem",
    padding: "1rem 1.5rem",
    ...sx,
  };

  const collapseStyles = {
    paddingX: "1.5rem",
  };

  return (
    <>
      <Button onClick={() => setShowContent(!showContent)} sx={buttonStyles}>
        {text}
        {showContent ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Button>
      <Collapse
        in={showContent}
        timeout={{ enter: 1000, exit: 500 }}
        sx={collapseStyles}
      >
        {children}
      </Collapse>
    </>
  );
};

export default CollapsibleSection;
