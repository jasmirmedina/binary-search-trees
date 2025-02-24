export default function mergeSort(array) {
  if (array.length <= 1) return array;

  const mid = Math.floor(array.length / 2);
  const left = array.slice(0, mid);
  const right = array.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(arrayLeft, arrayRight) {
  const sortedArray = [];

  while (arrayLeft.length && arrayRight.length) {
    if (arrayLeft[0] < arrayRight[0]) {
      sortedArray.push(arrayLeft.shift());
    } else {
      sortedArray.push(arrayRight.shift());
    }
  }

  return sortedArray.concat(arrayLeft.slice().concat(arrayRight.slice()));
}
