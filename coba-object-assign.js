const target = {};
const source1 = { a: 1, b: 2 };
const source2 = { b: 4, c: 5 };

console.log(target);

let returnedTarget = Object.assign(target, source1);

console.log(target);
console.log(returnedTarget);

returnedTarget = Object.assign(target, source2);

console.log(target);
console.log(returnedTarget);
