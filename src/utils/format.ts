export function formatDate(date: Date | undefined): string {
  if (!date) {
    return "";
  }
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  if (!(parsedDate instanceof Date) || isNaN(parsedDate.getTime())) {
    return "";
  }
  const day = String(parsedDate.getDate()).padStart(2, "0");
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const year = parsedDate.getFullYear();

  const hours = parsedDate.getHours();
  const minutes = String(parsedDate.getMinutes()).padStart(2, "0");
  const seconds = String(parsedDate.getSeconds()).padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  return `${day}/${month}/${year}, ${formattedHours}:${minutes}:${seconds} ${period}`;
}

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

export function formatDateShort(date: Date | undefined): string {
  if (!date) {
    return "";
  }
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  if (!(parsedDate instanceof Date) || isNaN(parsedDate.getTime())) {
    return "";
  }
  const day = String(parsedDate.getDate()).padStart(2, "0");
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const year = parsedDate.getFullYear();
  return `${day}/${month}/${year}`;
}

export const formatLocalDateForFilter = (
  date: Date,
  endOfDay: boolean = false
): string => {
  const dateCopy = new Date(date);

  if (endOfDay) {
    dateCopy.setHours(23, 59, 59, 999);
  } else {
    dateCopy.setHours(0, 0, 0, 0);
  }

  const year = dateCopy.getFullYear();
  const month = String(dateCopy.getMonth() + 1).padStart(2, "0");
  const day = String(dateCopy.getDate()).padStart(2, "0");
  const hours = String(dateCopy.getHours()).padStart(2, "0");
  const minutes = String(dateCopy.getMinutes()).padStart(2, "0");
  const seconds = String(dateCopy.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};
