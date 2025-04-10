import React from "react";
import { Box, Card, CardContent } from "@mui/material";
import { TestHeader, PublishActions } from "../../components";
import { Toeic } from "interfaces";

import ToeicEditForm from "./ToeicEditForm"
import ToeicDetailsView from "./ToeicDetailsView";

interface ToeicDetailsSectionProps {
  testData: Toeic;
  isEditMode: boolean;
  editData: Toeic;
  handleEditMode: () => void;
  handleInputChange: (field: string, value: any) => void;
  handleSaveChanges: () => void;
  handlePublishClick: () => void;
  handleUnpublishClick: () => void;
}

export const ToeicDetailsSection: React.FC<ToeicDetailsSectionProps> = ({
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
            title="Toeic Test Details"
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
            <ToeicEditForm
              editData={editData}
              handleInputChange={handleInputChange}
              onSave={handleSaveChanges}
              onCancel={handleEditMode}
            />
          ) : (
            <ToeicDetailsView data={testData} />
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ToeicDetailsSection;