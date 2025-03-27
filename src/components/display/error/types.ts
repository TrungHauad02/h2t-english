/**
 * Common types used in error components
 */

// Error severity types
export type ErrorSeverity = "error" | "warning" | "info";

// Error item interface
export interface ErrorItem {
  id: string;
  message: string;
  timestamp: Date;
  severity: ErrorSeverity;
  details?: string;
}

// Position configuration for error components
export interface ErrorPosition {
  vertical: "top" | "bottom";
  horizontal: "left" | "right";
}

// Props for the main error display component
export interface WEErrorDisplayProps {
  position?: ErrorPosition;
  autoHideTimeout?: number;
  maxErrors?: number;
}
