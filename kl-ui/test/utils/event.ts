import userEvent from '@testing-library/user-event';


type TypeInputOptions = {
  rerender: () => void,
  clear?: boolean,
};

export const typeInput = async (element: Element, text: string, options: TypeInputOptions) => {
  if (options?.clear) {
    await userEvent.clear(element);
    options.rerender();
  }

  for (const char of text) {
    await userEvent.type(element, char);
    options.rerender();
  }
};
