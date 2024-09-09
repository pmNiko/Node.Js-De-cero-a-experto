


const getPokemonById = (id, callback) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error('Pokemon ID ' + id + ' not found');
            }
            return resp.json();
        })
        .then(data => callback(null, data))
        .catch(error => callback(error.message))
        // .finally(() => console.log('Fetching finally.'))
}


module.exports = getPokemonById
