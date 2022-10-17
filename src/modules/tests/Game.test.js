
const game = require('../../Game.js');

test('receive coordinates based on a position and axis', ()=>{
    let coords = game.generateCoordinates("Horizontal", 1, 5);
    expect(coords).toStrictEqual([1,2,3,4,5]);
    coords = game.generateCoordinates("Vertical", 1, 5);
    expect(coords).toStrictEqual([1,11,21,31,41]);
    coords = game.generateCoordinates("Horizontal", 1, 2);
    expect(coords).toStrictEqual([1,2]);
    coords = game.generateCoordinates("Vertical", 22, 3);
    expect(coords).toStrictEqual([22,32,42]);
});