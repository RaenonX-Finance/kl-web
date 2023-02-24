export const nowMs = () => {
  const [sec, ns] = process.hrtime();
  return (sec * 1e3) + (ns / 1e6);
};
