import React, { useState, useEffect } from "react";
import { useMediaQuery, Theme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/type";
import { removeError, clearAllErrors } from "../../redux/slices/errorSlice";
import {
  ErrorDetails,
  ErrorFab,
  ErrorItem,
  ErrorList,
  ErrorSnackbar,
  WEErrorDisplayProps,
} from "./error";

export default function WEErrorDisplay({
  position = { vertical: "bottom", horizontal: "right" },
  autoHideTimeout = 0,
  maxErrors = 5,
}: WEErrorDisplayProps) {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const dispatch = useDispatch();

  // Get errors from Redux store
  const errors = useSelector((state: RootState) => state.error.errors).slice(
    0,
    maxErrors
  );

  // Local state
  const [isOpen, setIsOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedError, setSelectedError] = useState<ErrorItem | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [latestError, setLatestError] = useState<ErrorItem | null>(null);

  // Update latest error when errors change
  useEffect(() => {
    if (errors.length > 0) {
      const newLatestError = errors[0];

      // Only update if it's truly a new error (by comparing IDs)
      if (!latestError || newLatestError.id !== latestError.id) {
        setLatestError(newLatestError);
        setShowSnackbar(true);
      }
    } else {
      setLatestError(null);
      setShowSnackbar(false);
    }
  }, [errors, latestError]);

  // Auto hide snackbar after timeout
  useEffect(() => {
    if (showSnackbar && autoHideTimeout > 0) {
      const timer = setTimeout(() => {
        setShowSnackbar(false);
      }, autoHideTimeout);
      return () => clearTimeout(timer);
    }
  }, [showSnackbar, autoHideTimeout]);

  // Event handlers
  const handleToggleList = () => setIsOpen(!isOpen);
  const handleCloseList = () => setIsOpen(false);

  const handleDismissError = (errorId: string) => {
    dispatch(removeError(errorId));
  };

  const handleClearAllErrors = () => {
    dispatch(clearAllErrors());
    setIsOpen(false);
  };

  const handleShowDetails = (error: ErrorItem) => {
    setSelectedError(error);
    setDetailsDialogOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsDialogOpen(false);
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  // Don't render anything if there are no errors
  if (errors.length === 0) {
    return null;
  }

  return (
    <>
      {/* Floating action button with error count */}
      <ErrorFab
        count={errors.length}
        position={position}
        onClick={handleToggleList}
        isMobile={isMobile}
      />

      {/* Collapsible error list */}
      <ErrorList
        isOpen={isOpen}
        errors={errors}
        position={position}
        isMobile={isMobile}
        onClose={handleCloseList}
        onClearAll={handleClearAllErrors}
        onDismissError={handleDismissError}
        onShowDetails={handleShowDetails}
      />

      {/* Error details dialog */}
      <ErrorDetails
        error={selectedError}
        isOpen={detailsDialogOpen}
        onClose={handleCloseDetails}
      />

      {/* Snackbar for latest error */}
      <ErrorSnackbar
        error={latestError}
        isOpen={showSnackbar}
        onClose={handleCloseSnackbar}
        position={position}
        autoHideTimeout={autoHideTimeout}
      />
    </>
  );
}
