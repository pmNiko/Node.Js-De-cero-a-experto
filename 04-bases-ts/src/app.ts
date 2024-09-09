
// const getPokemonById = require('./js-fundation/09-Async-Await')
// const getPokemonById = require('./js-fundation/10-fetch-adapter')

import { getPokemonById } from "./js-fundation/09-Async-Await";


// const asyncFn = async() =>{
//     const res = await getPokemonById(1000);
//     console.table({res})    
// }

// asyncFn()


// getPokemonById(200).then(console.table)

getPokemonById(30)
    .then(({ name }) => console.table({ name }))
    .catch(error => console.table({ error: error.message }))
    .finally(() => console.log('Finished!'))
















/** ---------------------------------------------------------------- */


/** Patron factory adapter */
// const {getUUID, getAge} = require('./plugins')
// const {buildMakePerson} = require('./js-fundation/07-applied-factory')
// // factory function applied
// const buildPerson = buildMakePerson({getUUID, getAge})

// const jhon = buildPerson({name: 'John', birthdate: '1989-01-09'})
// const jane = buildPerson({name: 'Jane', birthdate: '1990-04-10'})

// console.table({jhon});
// console.table({jane});
