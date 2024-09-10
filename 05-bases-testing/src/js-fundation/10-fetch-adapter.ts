// const {httpPlugin} = require('../plugins')

import { httpClientPlugin } from "../plugins";


export const getPokemonById = async (id: number) => {
    try {
        const resp = await httpClientPlugin.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

        if (!resp) throw new Error(`Pokemon ID ${id} not found`)

        return resp;
    } catch (error) {
        throw error
    }
}


