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
    let s1 = new Ship("carrier", 5,[]);
    let s2 = new Ship("battleship", 4,[]);
    let s3 = new Ship("destroyer", 3,[]);
    let s4 = new Ship("submarine", 3,[]);
    let s5 = new Ship("patrol", 2,[]);
    expect(gb.ships[0]).toStrictEqual(s1);  
    expect(gb.ships[1]).toStrictEqual(s2); 
    expect(gb.ships[2]).toStrictEqual(s3); 
    expect(gb.ships[3]).toStrictEqual(s4); 
    expect(gb.ships[4]).toStrictEqual(s5);   
});

test('places a ship on the board', ()=>{
    const gb = new gameBoard();
    let ship = gb.ships[4]; // should be patrol at length 2
    gb.placeShip(ship, [0,1]); // place is on the first two squares (horizontally)
    expect(gb.board[0].hasShip).not.toStrictEqual(false);  // Changed to not as will equal object rather than true now
    expect(gb.board[1].hasShip).not.toStrictEqual(false);  
    expect(gb.board[3].hasShip).toStrictEqual(false);  
});

test('receives an attack and checks if ship has been hit',()=>{
    const gb = new gameBoard();
    gb.placeShip(gb.ships[4], [0,1]); // place is on the first two squares (horizontally)
    gb.receiveAttack(0);
    gb.receiveAttack(0); // should not be allowed to hit the same square
    expect(gb.ships[4].hits).toStrictEqual(1);
    gb.receiveAttack(5);
    expect(gb.ships[4].hits).toStrictEqual(1);
    expect(gb.missed.length).toStrictEqual(1);

    // check sunk
    expect(gb.ships[4].isSunk()).toStrictEqual(false);
    gb.receiveAttack(1);
    expect(gb.ships[4].hits).toStrictEqual(2);
    expect(gb.ships[4].isSunk()).toStrictEqual(true);
}
);

test('check if all the ships are sunk in a game board', ()=>{
    const gb = new gameBoard();
    gb.placeShip(gb.ships[0], [1,2,3,4,5]);
    gb.placeShip(gb.ships[1], [11,21,31,41]);
    gb.placeShip(gb.ships[2], [17,27,37]);
    gb.placeShip(gb.ships[3], [67,68,69]);
    gb.placeShip(gb.ships[4], [0,10]);

    gb.receiveAttack(1);
    gb.receiveAttack(2);
    gb.receiveAttack(3);
    gb.receiveAttack(4);
    expect(gb.ships[0].hits).toStrictEqual(4);
    gb.receiveAttack(5);
    expect(gb.ships[0].hits).toStrictEqual(5);
    gb.receiveAttack(11);
    expect(gb.allShipsSunk()).toStrictEqual(false);
    gb.receiveAttack(21);
    gb.receiveAttack(31);
    gb.receiveAttack(41);
    gb.receiveAttack(17);
    gb.receiveAttack(27);
    gb.receiveAttack(37);
    gb.receiveAttack(67);
    expect(gb.allShipsSunk()).toStrictEqual(false);
    gb.receiveAttack(68);
    gb.receiveAttack(69);
    gb.receiveAttack(0);
    gb.receiveAttack(10);
    expect(gb.allShipsSunk()).toStrictEqual(true);
});


test('check to see if can place a ship here', ()=>{
    const gb = new gameBoard();
    // place ships for testing
    gb.placeShip(gb.ships[0], [1,2,3,4,5]);
    gb.placeShip(gb.ships[1], [11,21,31,41]);
    gb.placeShip(gb.ships[2], [17,27,37]);
    

    let place = gb.canPlaceShipHere(10, gb.ships[4], "Horizontal"); // false as will overlap into 11 where ships[1] is placed
    expect(place).toStrictEqual(false);
    place = gb.canPlaceShipHere(9, gb.ships[4], "Horizontal");  // false as will overlap onto next row
    expect(place).toStrictEqual(false);
    place = gb.canPlaceShipHere(8, gb.ships[4], "Horizontal"); 
    expect(place).toStrictEqual(true);

    place = gb.canPlaceShipHere(88, gb.ships[3], "Vertical");  //false as will overlap the board
    expect(place).toStrictEqual(false);
    place = gb.canPlaceShipHere(5, gb.ships[3], "Vertical"); // false as will overlap another ship
    expect(place).toStrictEqual(false);
    place = gb.canPlaceShipHere(10, gb.ships[3], "Vertical"); 
    expect(place).toStrictEqual(true);


});


