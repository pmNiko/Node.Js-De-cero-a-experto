const {httpPlugin} = require('../plugins')


const getPokemonById = async(id) => {
    const resp = await httpPlugin.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!resp) { 
        throw new Error('Pokemon ID ' + id + ' not found') 
    }

    return await resp;
}


module.exports = getPokemonById
