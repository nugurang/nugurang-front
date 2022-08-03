export const getMaxEqualOrSmallerFromArray = (
  array: number[],
  target: number,
) => {
  const uniqueArray = [...array].filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
  const arrayEqualOrSmallerThanTarget = [...uniqueArray].filter((value) => {
    return value <= target;
  });
  const sortedArray = [...arrayEqualOrSmallerThanTarget].sort();
  const result = sortedArray.pop();
  return result;
};
