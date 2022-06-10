export const getDataUrl = (): string => {
  return process.env.NODE_ENV === 'production' ?
    'wss://data.kl-law.net' :
    'ws://localhost:8000';
};
