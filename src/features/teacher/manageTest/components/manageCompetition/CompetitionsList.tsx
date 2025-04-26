import React, { useState } from "react";
import {
  Stack,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { useErrors } from "hooks/useErrors";
import { CompetitionTest } from "interfaces";
import { extractErrorMessages } from "utils/extractErrorMessages";
import { WEConfirmDelete } from "components/display";
import useColor from "theme/useColor";
import CompetitionItem from "./CompetitionItem";

interface CompetitionsListProps {
  competitions: CompetitionTest[];
  fetchData: () => void;
  deleteCompetition: (id: number) => Promise<boolean>;
  updateCompetition: (id: number, data: Partial<CompetitionTest>) => Promise<any>;
}

export default function CompetitionsList({
  competitions,
  fetchData,
  deleteCompetition,
}: CompetitionsListProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { showError } = useErrors();


  const handleOpenDeleteDialog = (id: number) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteId(null);
    setOpenDeleteDialog(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      setIsDeleting(true);
         await deleteCompetition(deleteId);
      

    } catch (error) {
      showError({
        message: "Error deleting competition",
        severity: "error",
        details: extractErrorMessages(error),
      });
      console.error("Error deleting competition:", error);
    } finally {
      setIsDeleting(false);
      handleCloseDeleteDialog();
    }
  };

  // If there are no competitions, show a message
  if (competitions.length === 0) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          py: 8 
        }}
      >
        <Typography 
          variant="h5" 
          sx={{ 
            color: isDarkMode ? color.gray400 : color.gray600,
            mb: 2
          }}
        >
          No competitions found
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: isDarkMode ? color.gray500 : color.gray500,
            textAlign: 'center',
            maxWidth: 500,
            mb: 4
          }}
        >
          Try adjusting your search filters or create a new competition to get started.
        </Typography>
      </Box>
    );
  }

  return (
    <Stack sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        {competitions.map((competition) => (
          <Grid item xs={12} md={6} lg={4} key={competition.id}>
            <CompetitionItem
              competition={competition}
              handleOpenDeleteDialog={handleOpenDeleteDialog}
            />
          </Grid>
        ))}
      </Grid>

      <WEConfirmDelete
        open={openDeleteDialog}
        onCancel={handleCloseDeleteDialog}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        resourceName={competitions.find((c) => c.id === deleteId)?.title}
      />
    </Stack>
  );
}