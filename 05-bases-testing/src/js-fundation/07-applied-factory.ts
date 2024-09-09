

// Function factory without dependencies
export const buildMakePerson = ({ getUUID, getAge }: { getUUID: () => number, getAge: (value: string) => number }) => {
    return ({ name, birthdate }: { name: string, birthdate: string }) => {
        return {
            id: getUUID(),
            name,
            birthdate,
            age: getAge(birthdate)
        }
    }
}


// module.exports = {
//     buildMakePerson
// }