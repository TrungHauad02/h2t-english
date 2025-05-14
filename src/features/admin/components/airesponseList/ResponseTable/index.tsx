import React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  useMediaQuery,
  useTheme
} from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { AIResponse } from "interfaces";
import { useTableState } from "./useTableState";
import { useDialogs } from "../Dialogs/useDialogs";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import ExpandedRow from "./ExpandedRow";
import ViewDialog from "../Dialogs/ViewDialog";
import { WEConfirmDelete } from "components/display";

interface ResponseTableProps {
  data: AIResponse[];
  onRefresh: () => void;
}

export default function ResponseTable({ data, onRefresh }: ResponseTableProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  // Use custom hooks
  const {
    openRowId,
    selectedResponse,
    setSelectedResponse,
    handleToggleRow,
    formatDate
  } = useTableState(onRefresh);
  
  const {
    viewDialogOpen,
    deleteDialogOpen,
    isDeleting,
    handleViewOpen,
    handleViewClose,
    handleDeleteOpen,
    handleDeleteClose,
    handleDeleteConfirm
  } = useDialogs({ onRefresh });

  // Calculate number of cells for expanded row's colspan
  const cellCount = isMobile ? 4 : 7;

  // Get the resource name for confirm delete dialog
  const getResourceName = () => {
    if (!selectedResponse) return "this AI Response";
    
    // If request is JSON, try to extract some meaningful info
    try {
      const request = JSON.parse(selectedResponse.request);
      if (request.type) return `AI Response: ${request.type}`;
      if (request.action) return `AI Response: ${request.action}`;
      if (request.command) return `AI Response: ${request.command}`;
      if (request.intent) return `AI Response: ${request.intent}`;
      
      // Default fallback
      return `AI Response #${selectedResponse.id}`;
    } catch {
      // If not JSON, use first few words of request
      const words = selectedResponse.request.split(' ').slice(0, 3).join(' ');
      return `AI Response: "${words}${selectedResponse.request.length > words.length ? '...' : ''}"`;
    }
  };

  return (
    <>
      <TableContainer 
        component={Paper} 
        elevation={0} 
        sx={{ 
          backgroundColor: "transparent",
          overflowX: "auto"
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHeader isMobile={isMobile} />
          <TableBody>
            {data.map((response) => (
              <React.Fragment key={response.id}>
                <TableRow
                  response={response}
                  openRowId={openRowId}
                  isMobile={isMobile}
                  onToggleRow={handleToggleRow}
                  onView={(response) => {
                    setSelectedResponse(response);
                    handleViewOpen(response);
                  }}
                  onDelete={(response) => {
                    setSelectedResponse(response);
                    handleDeleteOpen(response);
                  }}
                />
                <ExpandedRow
                  open={openRowId === response.id}
                  response={response}
                  isMobile={isMobile}
                  cellCount={cellCount}
                  onDelete={handleDeleteOpen}
                  formatDate={formatDate}
                />
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ViewDialog
        open={viewDialogOpen}
        response={selectedResponse}
        onClose={handleViewClose}
        formatDate={formatDate}
      />
      
      <WEConfirmDelete
        open={deleteDialogOpen}
        title="Delete AI Response"
        resourceName={getResourceName()}
        description="This action cannot be undone. The AI response and all related data will be permanently deleted from our servers."
        onCancel={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </>
  );
}