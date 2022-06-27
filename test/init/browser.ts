export const initMockBrowserApis = () => {
  jest.mock('use-resize-observer', () => {
    return jest.requireActual('use-resize-observer/polyfilled');
  });
};
