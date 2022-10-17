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
        console.log("player 1 shot: " + this.enemy.gameBoard.receiveAttack(coordinate));
        this.turn = false;
        this.enemy.turn = true;
        let theEnemy = this.enemy;
        setTimeout(function(){
            theEnemy.takeRandomShot();
        },1000);
    }

    takeRandomShot(){
        let randomNumber = Math.floor(Math.random()*100);
        console.log("player 2 shot: "  + this.enemy.gameBoard.receiveAttack(randomNumber));
        this.turn = false;
        this.enemy.turn = true;
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


