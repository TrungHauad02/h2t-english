import { ErrorLog, SeverityEnum } from "interfaces";

// Generate a random past date within the last 30 days
const getRandomPastDate = (maxDaysAgo: number = 30): Date => {
  const today = new Date();
  const daysAgo = Math.floor(Math.random() * maxDaysAgo);
  const result = new Date(today);
  result.setDate(today.getDate() - daysAgo);
  return result;
};

// Generate random error codes
const generateErrorCode = (): string => {
  const prefixes = ["SYS", "DB", "API", "AUTH", "NET", "UI", "SEC", "VAL"];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const errorNumber = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `${prefix}-${errorNumber}`;
};

// Sample error messages
const errorMessages = [
  "Connection timeout while connecting to database",
  "Failed to authenticate user with the provided credentials",
  "API endpoint returned unexpected response format",
  "System process terminated unexpectedly",
  "Database query execution exceeded timeout limit",
  "Network connection interrupted during data transfer",
  "Invalid configuration parameter detected in system settings",
  "Memory allocation failed for requested operation",
  "File system permission denied for requested action",
  "Data integrity validation failed for submitted record",
  "User session expired during transaction execution",
  "System unable to process request due to resource constraints",
  "Remote service unavailable during integration attempt",
  "Concurrent transaction conflict detected in database operation",
  "Request payload exceeded maximum allowed size",
  "Required system dependencies not found or incompatible",
  "Security constraint violation detected in user operation",
  "Certificate validation failed for secure connection",
  "Rate limit exceeded for API endpoint",
  "Data parsing error for received payload",
];

// Generate mock error logs
export const mockErrorLogs: ErrorLog[] = Array.from({ length: 50 }, (_, index) => {
  const createdAt = getRandomPastDate(30);
  const updatedAt = new Date(createdAt);
  
  // Some logs were updated later
  if (Math.random() > 0.7) {
    updatedAt.setHours(updatedAt.getHours() + Math.floor(Math.random() * 24));
  }
  
  // Determine severity with a bias toward lower severity
  let severity: SeverityEnum;
  const rand = Math.random();
  if (rand < 0.15) {
    severity = SeverityEnum.HIGH;
  } else if (rand < 0.45) {
    severity = SeverityEnum.MEDIUM;
  } else {
    severity = SeverityEnum.LOW;
  }

  // Higher severity errors are more likely to still be active
  const status = severity === SeverityEnum.HIGH 
    ? Math.random() > 0.2
    : severity === SeverityEnum.MEDIUM 
      ? Math.random() > 0.6
      : Math.random() > 0.8;

  return {
    id: index + 1,
    errorCode: generateErrorCode(),
    message: errorMessages[Math.floor(Math.random() * errorMessages.length)],
    severity,
    status,
    createdAt,
    updatedAt,
  };
});