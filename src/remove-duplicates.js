export default function removeDuplicates(array) {
  const removed = [];

  array.forEach((element) => {
    if (!removed.includes(element)) removed.push(element);
  });

  return removed;
}
