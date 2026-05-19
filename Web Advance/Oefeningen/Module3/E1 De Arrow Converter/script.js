'use strict';

// Arrow functions
const telOp = (a, b) => a + b;

const isEvenGetal = getal => getal % 2 === 0;

const zegHallo = () => 'Hallo!';

// Show results
const output = document.getElementById('output');

output.innerHTML += `2 + 3 = ${telOp(2, 3)}<br>`;
output.innerHTML += `Is 4 even? ${isEvenGetal(4)}<br>`;
output.innerHTML += zegHallo();