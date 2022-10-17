import Game from "../Game";
import GameBoard from "./GameBoard";

export default class Player{

    constructor(name, type){
        this.name = name;
        this.type = type;
        this.gameBoard = new GameBoard();
        this.ships = [];
        this.enemy = null;
        if(type=="AI"){
            this.generateRandomBoard();
        }
        this.score = 0;
        if(type=="Human"){
            this.turn = true;
        }else{
            this.turn = false;
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
        let axisArray = ["Horizontal", "Vertical"];
        for(let i=0; i<theShips.length; i++){
            let randomAxis = Math.floor(Math.random()*2);
            let axis = axisArray[randomAxis];
            // get random board number
            let place = false;
            let randomBoardNumber = 0;
            while(!place){
                randomBoardNumber = Math.floor(Math.random() * (99+1));
                place = this.gameBoard.canPlaceShipHere(randomBoardNumber, theShips[i], axis);
            }
            if(place){
                // generate coordinates
                let coords = Game.generateCoordinates(axis, randomBoardNumber, theShips[i].length);
                theShips[i].setPosition(coords);
                this.gameBoard.placeShip(theShips[i], coords);
            }else{
                console.log("ERROR!!");
            }
        }
    }


    
}

/* module.exports = Player; */ // Uncomment for testing


