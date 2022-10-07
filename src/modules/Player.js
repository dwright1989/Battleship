import GameBoard from "./GameBoard";

export default class Player{
    name = "";
    score = 0;
    type = "Human"; // Human or AI

    constructor(name, type){
        this.name = name;
        this.type = type;
        this.gameBoard = new GameBoard();
        this.ships = [];
        this.enemy = null;
    }

    takeShot(coordinate){
        this.gameboard.enemy.receiveAttack(coordinate);
    }

    takeRandomShot(){
        let randomNumber = Math.floor(Math.random()*100);
        this.enemy.gameBoard.receiveAttack(randomNumber);
    }

    setEnemy(enemy){
        this.enemy = enemy;
    }


    
}


