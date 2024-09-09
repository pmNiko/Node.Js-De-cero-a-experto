
import { getAge, getUUID } from '../plugins'
// const { v4: uuidv4 } = require('uuid');
// const getAge = require('get-age');

// Tenemos un fuerte complamiento de dependencias
const buildPerson = ({ name, birthdate }: { name: string, birthdate: string }) => {


    return {
        id: getUUID(),
        name,
        birthdate,
        age: getAge(birthdate)
    }
}


const obj = { name: 'John', birthdate: '1989-01-09' }

export const john = buildPerson({ name: obj.name, birthdate: obj.birthdate })


// module.exports = {
//     john
// }