const users = [
    {
        id: 1,
        name: 'John Doe',
    },
    {
        id: 2,
        name: 'Jane Doe',
    },
]



export const getUserById = (id: number, callback: (error: string | null, user?: {}) => void) => {
    const user = users.find(user => user.id === id)

    if (!user) return callback(`User ${id} not found`);

    callback(null, user);
}



// module.exports = {
//     getUserById
// }