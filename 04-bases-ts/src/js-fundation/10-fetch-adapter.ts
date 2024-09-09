// const {httpPlugin} = require('../plugins')

import { httpClientPlugin } from "../plugins";


const getPokemonById = async (id: number) => {
    const resp = await httpClientPlugin.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!resp) {
        throw new Error('Pokemon ID ' + id + ' not found')
    }

    return await resp;
}


module.exports = getPokemonById
