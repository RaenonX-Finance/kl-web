export const getProgressText = (current: number, total: number, decimals: number = 0): string => (
  `${current} / ${total} (${(current / total * 100).toFixed(decimals)}%)`
);
