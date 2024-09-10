import { getPokemonById } from "../../src/js-fundation/10-fetch-adapter";


describe('Test on 08-Promises', () => {
    test('getPokemonById should return a pokemon', async () => {
        const pokemon = await getPokemonById(1)

        expect(pokemon).toBeDefined();
        expect(pokemon.name).toBeDefined();
    })

    test('should return an error if pokemon does not exist', () => {
        const pokemonId = 10000;
        const errorMesasge = `Pokemon ID ${pokemonId} not found`;

        expect(getPokemonById(10000)).rejects.toThrow(errorMesasge);
        expect(getPokemonById(10000)).rejects.toThrow(expect.any(Error));
    })
})