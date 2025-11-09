export const formatDate = (isoDate: string) => {
  if (!isoDate) return "";

  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",  // e.g., Nov
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,    // AM/PM format
  };

  return date.toLocaleString(undefined, options);
};
