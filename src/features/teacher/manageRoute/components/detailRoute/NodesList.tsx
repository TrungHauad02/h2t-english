import { Typography, Grid } from "@mui/material";
import RouteNodeCard from "./RouteNodeCard";
import { RouteNode } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

export default function NodesList({ nodes }: { nodes: RouteNode[] }) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          color: isDarkMode ? color.gray100 : color.gray900,
          mb: 3,
        }}
      >
        Lessons ({nodes.length})
      </Typography>

      <Grid container spacing={3}>
        {nodes.map((node) => (
          <Grid item xs={12} sm={6} md={4} key={node.id}>
            <RouteNodeCard node={node} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
