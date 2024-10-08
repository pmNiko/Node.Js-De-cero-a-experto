interface User {
    id: number;
    name: string;
}


const users: User[] = [
    {
        id: 1,
        name: 'John Doe',
    },
    {
        id: 2,
        name: 'Jane Doe',
    },
]


export const getUserById = (
    id: number,
    callback: (error?: string, user?: User)
        => void) => {
    const user = users.find(function (user) {
        return user.id === id
    })

    if (!user) return callback(`User ${id} not found`);

    return callback(undefined, user);
}



// module.exports = {
//     getUserById
// }