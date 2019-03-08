/**
 * **multi-team:** Chunks an array by a particular element in an array
 * @param {*} arr The array we are chunking
 * @param {*} el The element we are chunking by
 * @return An array of arrays chunked by the index of the element we passed
 */
const chunkArrayByElement = (arr, el) => {
  if (arr.length === 0) {
    return arr;
  }

  return arr.reduce(
    (prev, curr, index) => {
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

module.exports = chunkArrayByElement;
