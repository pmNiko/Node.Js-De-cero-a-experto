


const getPokemonById = async(id) => {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (!resp.ok) { 
        throw new Error('Pokemon ID ' + id + ' not found') 
    }

    return await resp.json();
}


module.exports = getPokemonById
