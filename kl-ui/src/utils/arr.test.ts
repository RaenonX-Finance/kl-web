import {mergeThenSort} from './arr';


describe('Array utils', () => {
  it('merges then sorts', async () => {
    const newArr = mergeThenSort(
      [{basis: 7, val: 5}, {basis: 8, val: 2}],
      [{basis: 6, val: 7}, {basis: 7, val: 0}, {basis: 9, val: 6}],
      ({basis}) => basis,
    );

    expect(newArr.map(({basis}) => basis)).toEqual([6, 7, 8, 9]);
    expect(newArr.map(({val}) => val)).toEqual([7, 0, 2, 6]);
  });
});
