export const divideAndSort = (nums) => {
  // Convert from numbers to a string
  // Split the string with "0" as the separator
  const dividedNums = nums.toString().split("0");

  let newNums = dividedNums.map((groupOfNum) => {
    let arr = groupOfNum.split(""); // Convert string into array
    arr.sort((a, b) => a - b);
    return arr;
  });

  // flat() : creates a new array with all sub-array concatenate recursively
  // then join them together as one string
  return newNums.flat().join("");
};
