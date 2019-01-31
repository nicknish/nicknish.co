export const getDate = (startDate, endDate, current) => {
  if (startDate) {
    if (startDate === endDate) return startDate;
    if (endDate) return `${startDate} – ${endDate}`;
    if (current) return `${startDate} – Current`;
    return startDate;
  }

  if (current) return `Current`;

  return '';
};
