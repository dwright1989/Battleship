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
        if(type=="AI"){
            this.generateRandomBoard();
        }
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

    generateRandomBoard(){
        let theShips = this.gameBoard.ships;
        for(let i=0; i<theShips.length; i++){
            // generate random index between 0 and length
            // randomly selected horizontal or vertical
            // check can place ship here
            // ship.setRandomPos()
            // add to gameboard
            // remove  ship from cloned array
        }
    }


    
}


