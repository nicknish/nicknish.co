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

export const isBrowser = () => typeof window !== 'undefined';

export const prefersDarkMode = () => {
  if (isBrowser()) {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    return media.matches === true;
  }
};

// Cleans up GQL data to get directly to each record
export const cleanupData = data => {
  return data.edges.map(({ node }) => node);
};
