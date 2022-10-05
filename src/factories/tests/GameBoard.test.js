const gameBoard = require('../GameBoard.js');
const { default: Ship } = require('../Ship.js');

test('creates a new gameboard', () =>{
    const gb = new gameBoard();
    expect(gb.board[0]).toStrictEqual({hasShip: false, isShot: false});
    expect(gb.board[99]).toStrictEqual({hasShip: false, isShot: false});
    expect(gb.board.length).toStrictEqual(100);
});

test('adds ships ready to be placed', ()=>{
    const gb = new gameBoard();
    let s1 = new Ship(5, []);
    let s2 = new Ship(4, []);
    let s3 = new Ship(3, []);
    let s4 = new Ship(2, []);
    expect(gb.ships[0]).toStrictEqual(s1);  
    expect(gb.ships[1]).toStrictEqual(s2); 
    expect(gb.ships[2]).toStrictEqual(s3); 
    expect(gb.ships[3]).toStrictEqual(s3); 
    expect(gb.ships[4]).toStrictEqual(s4);   
});