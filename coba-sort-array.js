// JavaScript implementation
function sortStrings(arr) {
  let temp;

  // Sorting strings using bubble sort
  for (let j = 0; j < arr.length - 1; j++) {
    for (let i = j + 1; i < arr.length; i++) {
      if (arr[j].name.localeCompare(arr[i].name) > 0) {
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
    }
  }
}

// Driver code
let arr = [
  { name: "GeeksforGeeks" },
  { name: "Quiz" },
  { name: "Practice" },
  { name: "Gblogs" },
  { name: "Coding" },
];

console.log(arr);
console.log(arr[0].name);

sortStrings(arr);
console.log("Strings in sorted order are : ");
for (let i = 0; i < arr.length; i++) {
  console.log(`String ${i + 1} is ${arr[i].name}`);
}

// This code is contributed by lokeshmvs21.
