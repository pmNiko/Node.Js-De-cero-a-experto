
console.log('Inicio de programa ', 1);      // 1

setTimeout( () => {                     // 5
    console.log('Primer Timeout ', 5);
}, 3000 );


setTimeout( () => {
    console.log('Segundo Timeout ', 3);     // 3
}, 0 );


setTimeout( () => {
    console.log('Tercer Timeout ', 4);      // 4
}, 0 );


console.log('Fin de programa ', 2);         // 2