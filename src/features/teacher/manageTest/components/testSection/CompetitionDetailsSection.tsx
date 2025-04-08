import React from "react";
import { Box, Card, CardContent } from "@mui/material";
import { CompetitionDetailsView, CompetitionEditForm } from "../common";
import { TestHeader, PublishActions } from "../../components";
import { CompetitionTest } from "interfaces";

interface CompetitionDetailsSectionProps {
  testData: CompetitionTest;
  isEditMode: boolean;
  editData: CompetitionTest;
  handleEditMode: () => void;
  handleInputChange: (field: string, value: any) => void;
  handleSaveChanges: () => void;
  handlePublishClick: () => void;
  handleUnpublishClick: () => void;
}

export const CompetitionDetailsSection: React.FC<CompetitionDetailsSectionProps> = ({
  testData,
  isEditMode,
  editData,
  handleEditMode,
  handleInputChange,
  handleSaveChanges,
  handlePublishClick,
  handleUnpublishClick
}) => {
  return (
    <Box id="test-details">
      <Card elevation={2} sx={{ overflow: 'visible' }}>
        <CardContent sx={{ p: 3 }}>
          <TestHeader
            title="Competition Details"
            onEditMode={handleEditMode}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <PublishActions
              status={testData.status}
              onPublish={handlePublishClick}
              onUnpublish={handleUnpublishClick}
            />
          </Box>
          
          {isEditMode ? (
            <CompetitionEditForm
              editData={editData}
              handleInputChange={handleInputChange}
              onSave={handleSaveChanges}
              onCancel={handleEditMode}
            />
          ) : (
            <CompetitionDetailsView data={testData} />
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default CompetitionDetailsSection;