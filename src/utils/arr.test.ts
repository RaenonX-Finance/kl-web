import {insertElement} from './arr';


describe('Array utils', () => {
  describe('Insert elements', () => {
    it('inserts elements to the head', async () => {
      const a = [1, 2, 3];
      const b = [4, 5, 6];
      expect(insertElement(a, b, 3)).toStrictEqual([4, 5, 6, 1, 2, 3]);
    });
    it('inserts elements to the head 2', async () => {
      const a = [1, 2, 3, 4, 5, 6];
      const b = [7, 8, 9];
      expect(insertElement(a, b, 6)).toStrictEqual([7, 8, 9, 1, 2, 3, 4, 5, 6]);
    });

    it('replaces elements', async () => {
      const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const b = [10, 11, 12];
      expect(insertElement(a, b, 3)).toStrictEqual([1, 2, 3, 10, 11, 12, 7, 8, 9]);
    });

    it('inserts elements to an empty array with null offset', async () => {
      const a = [] as number[];
      const b = [4, 5, 6];
      expect(insertElement(a, b, null)).toStrictEqual([4, 5, 6]);
    });

    it('replaces latest elements to array with null offset', async () => {
      const a = [1, 2, 3, 4, 5, 6];
      const b = [7, 8, 9];
      expect(insertElement(a, b, null)).toStrictEqual([1, 2, 3, 7, 8, 9]);
    });
  });
});
