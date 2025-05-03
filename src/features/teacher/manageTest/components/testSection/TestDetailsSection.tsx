import React from "react";
import { Box, Card, CardContent } from "@mui/material";
import { TestDetailsView, TestEditForm } from "../common";
import { TestHeader, PublishActions } from "../../components";
import { Test } from "interfaces";

interface TestDetailsSectionProps {
  testData: Test;
  isEditMode: boolean;
  editData: Test;
  handleEditMode: () => void;
  handleInputChange: (field: keyof Test, value: any) => void;
  handleSaveChanges: () => void;
  handlePublishClick: () => void;
  handleUnpublishClick: () => void;
}

export const TestDetailsSection: React.FC<TestDetailsSectionProps> = ({
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
            title={`${testData.type || ""} Test Details`}
            onEditMode={handleEditMode}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <PublishActions
              status={testData.status}
              onPublish={handlePublishClick}
              onUnpublish={handleUnpublishClick}
              title={"Test"}
            />
          </Box>
          
          {isEditMode ? (
            <TestEditForm
              editData={editData}
              handleInputChange={handleInputChange}
              onSave={handleSaveChanges}
              onCancel={handleEditMode}
            />
          ) : (
            <TestDetailsView data={testData} />
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default TestDetailsSection;