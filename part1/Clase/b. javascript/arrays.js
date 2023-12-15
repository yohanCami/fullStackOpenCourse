const t = [1, -1, 3];

t.push(5);

console.log(t.length); // se imprime 4
console.log(t[1]); // se imprime -1

t.forEach((value) => {
  console.log(value); // se imprimen los números 1, -1, 3, 5 cada uno en su propia línea
});

// Cuando se usa React, a menudo se usan técnicas de programación funcional. Una característica
//del paradigma de programación funcional es el uso de estructuras de datos inmutables.
//En el código de React, es preferible usar el método concat, que no agrega el elemento al array,
//pero crea un nuevo array en la que se incluyen el contenido del array anterior y el nuevo elemento.

const t2 = t.concat(5); // crea un nuevo array

console.log(t); // se imprime [1, -1, 3]
console.log(t2); // se imprime [1, -1, 3, 5]

//Método map

const m1 = t.map((value) => value * 2);
console.log(m1); // se imprime [2, 4, 6]

//Asignación de desestructuración

const [first, second, ...rest] = t;

console.log(first, second); // se imprime 1, 2
console.log(rest); // se imprime [3, 4 ,5]
