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
