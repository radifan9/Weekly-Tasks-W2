export const divideAndSort = (nums) => {
  const dividedNums = nums.toString().split("0");

  let newNums = [];
  for (const groupOfNum of dividedNums) {
    let arr = groupOfNum.split("");
    arr.sort();
    newNums = [...newNums, ...arr];
  }

  return newNums.join("");
};
