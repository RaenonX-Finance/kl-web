export const initMockWindowMethods = () => {
  // https://stackoverflow.com/a/41619307/11571888
  window.matchMedia = window.matchMedia || (() => {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {},
    };
  });
};
