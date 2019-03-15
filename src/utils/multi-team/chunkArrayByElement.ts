interface IAllTradeValues {
  name: string;
  playerId: string;
}
/**
 * **multi-team:** Chunks an array by a particular element in an array
 * @param {*} arr The array we are chunking
 * @param {*} el The element we are chunking by
 * @return An array of arrays chunked by the index of the element we passed
 */
export const chunkArrayByElement = (arr: any[], el: string) => {
  if (arr.length === 0) {
    return arr;
  }

  return arr.reduce(
    // TODO figure out what curr is IAllTradeValues | string
    (prev: IAllTradeValues[][] | [][], curr: any, index: number) => {
      if (curr === el) {
        if (index === 0 || index === arr.length - 1) {
          return prev;
        }

        if (prev[prev.length - 1].length !== 0) {
          prev.push([]);
        }
      } else {
        prev[prev.length - 1].push(curr);
      }
      return prev;
    },
    [[]]
  );
};