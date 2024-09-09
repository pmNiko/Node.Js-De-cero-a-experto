// import getAgePlugin from 'get-age'

// const getAgePlugin = require('get-age');

export const getAge = (birthdate: string) => {
    if (!birthdate) return new Error('birthdate is required');

    // return getAgePlugin(birthdate)
    return new Date().getFullYear() - new Date(birthdate).getFullYear();
}

// module.exports = { getAge }
