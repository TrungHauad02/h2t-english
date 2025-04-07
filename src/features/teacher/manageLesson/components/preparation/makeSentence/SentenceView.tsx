import React from "react";
import { Box, Grid, useMediaQuery, Theme } from "@mui/material";
import { PreparationMakeSentences } from "interfaces";
import {
  SentenceCard,
  SentenceHeader,
  SentenceMobileView,
} from "./sentenceView/";

interface SentenceViewProps {
  data: PreparationMakeSentences[];
  isEditMode: boolean;
  onEdit: (item: PreparationMakeSentences) => void;
  onDelete: (id: number) => void;
}

export default function SentenceView({
  data,
  isEditMode,
  onEdit,
  onDelete,
}: SentenceViewProps) {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <Box>
      {/* Header with count and view style */}
      <SentenceHeader count={data.length} />

      {isMobile ? (
        /* Mobile view using accordion-style cards */
        <SentenceMobileView
          data={data}
          isEditMode={isEditMode}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ) : (
        /* Desktop view using grid of cards */
        <Grid container spacing={2}>
          {data.map((item) => (
            <Grid item xs={12} key={item.id}>
              <SentenceCard
                item={item}
                isEditMode={isEditMode}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
