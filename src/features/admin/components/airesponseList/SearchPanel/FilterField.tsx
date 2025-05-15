import { ReactNode } from "react";
import { Grid } from "@mui/material";

interface FilterFieldProps {
  xs?: number;
  sm?: number;
  md?: number;
  children: ReactNode;
}

export default function FilterField({ 
  xs = 12, 
  sm = 6, 
  md = 3, 
  children 
}: FilterFieldProps) {
  return (
    <Grid item xs={xs} sm={sm} md={md}>
      {children}
    </Grid>
  );
}