const sum = (p1, p2) => {
  console.log(p1);
  console.log(p2);
  return p1 + p2;
};

const result = sum(1, 5);
console.log(result);

const square = (p) => {
  console.log(p);
  return p * p;
};

const square2 = (p) => p * p;

function product(a, b) {
  return a * b;
}

const result2 = product(2, 6);
// result ahora es 12

const average = function (a, b) {
  return (a + b) / 2;
};

const result3 = average(2, 5);
// result ahora es 3.5
