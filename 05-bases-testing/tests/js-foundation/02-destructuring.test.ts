import { characters } from "../../src/js-fundation/02-destructuring"


describe('Test on 02-destructuring', () => {

    test('characters should contains Batman, SpiderMan', () => {
        expect(characters).toContain('Batman')
        expect(characters).toContain('SpiderMan')
    })

    test('First character should be Batman, and second SpiderMan', () => {
        const [batman, spiderMan] = characters;

        expect(batman).toBe('Batman');
        expect(spiderMan).toBe('SpiderMan');
    })
})