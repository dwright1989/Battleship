const player = require('../Player.js');

test('tests the player (AI) taking a random shot', () =>{
    let player1 = new player("Debbie", "Human");
    let player2 = new player("Computer", "AI");
    // add an enemy game board
    player1.setEnemy(player2); 
    player2.setEnemy(player1);

    player2.takeRandomShot();

    
    expect(player2.enemy.gameBoard.hits.length).toStrictEqual(0);
    expect(player2.enemy.gameBoard.missed.length).toStrictEqual(1);
});


test('tests generation of random board', () =>{
    let player1 = new player("Computer", "AI");
    // board should be generated on initialisation of player object with type==AI
    expect(player1.gameBoard.board).not.toStrictEqual([]);
    // check that 5 ships have been placed
    // total coordinates should equal - 5,4,3,3,2 = 17
    let coordCount = 0;
    for(let i=0; i<player1.gameBoard.board.length; i++){
        if(player1.gameBoard.board[i].hasShip!=false){
            coordCount++;
        }
    }
    expect(coordCount).toStrictEqual(17);
});
