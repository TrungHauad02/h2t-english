import React, { useState } from "react";
import {
  Stack,
  Typography,
  Grid,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { useErrors } from "hooks/useErrors";
import { Toeic } from "interfaces";
import { extractErrorMessages } from "utils/extractErrorMessages";
import { WEConfirmDelete } from "components/display";
import useColor from "theme/useColor";
import ToeicItem from "./ToeicItem";

interface ToeicsListProps {
  toeicTests: Toeic[];
  fetchData: () => void;
  deleteToeicTest: (id: number) => Promise<boolean>;
  updateToeicTest: (id: number, data: Partial<Toeic>) => Promise<any>;
}

export default function ToeicsList({
  toeicTests,
  fetchData,
  deleteToeicTest
}: ToeicsListProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { showError } = useErrors();

  const textColor = isDarkMode ? color.white : color.black;

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
     await deleteToeicTest(deleteId);
      

    } catch (error) {
      showError({
        message: "Error deleting TOEIC test",
        severity: "error",
        details: extractErrorMessages(error),
      });
      console.error("Error deleting TOEIC test:", error);
    } finally {
      setIsDeleting(false);
      handleCloseDeleteDialog();
    }
  };

  // If there are no TOEIC tests, show a message
  if (toeicTests.length === 0) {
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
          No TOEIC tests found
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
          Try adjusting your search filters or create a new TOEIC test to get started.
        </Typography>
      </Box>
    );
  }

  return (
    <Stack sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        {toeicTests.map((toeic) => (
          <Grid item xs={12} md={6} lg={4} key={toeic.id}>
            <ToeicItem
              toeic={toeic}
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
        resourceName={toeicTests.find((t) => t.id === deleteId)?.title}
      />
    </Stack>
  );
}