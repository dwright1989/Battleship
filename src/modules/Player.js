import Game from "../Game";
import GameBoard from "./GameBoard";
import UILoad from "./UILoad";

export default class Player{

    constructor(name, type){
        this.name = name;
        this.type = type;
        this.gameBoard = new GameBoard();
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
        let result = this.enemy.gameBoard.receiveAttack(coordinate);
        this.turn = false;
        this.enemy.turn = true;
        let coordinates = [];
        if(result=="sunk"){
            let ship = this.enemy.getShipByCoordinate(coordinate);
            coordinates = ship.position;
            this.score++;
            UILoad.updateScore(this);
            
        }else{
            coordinates.push(coordinate);
        }
        UILoad.updateSquare(this, coordinates, result);
        UILoad.updateMessage(this, result);
        if(this.score==5){
            Game.end(this);
        }else{
            let theEnemy = this.enemy;
            setTimeout(function(){
                theEnemy.takeRandomShot();
            },1000);
        }
        
    }

    takeRandomShot(){
        let result = "";
        let randomNumber = 0;
        while(result==""){
            randomNumber = Math.floor(Math.random()*100);
            result = this.enemy.gameBoard.receiveAttack(randomNumber);
        }
        this.turn = false;
        this.enemy.turn = true;
        let coordinates = [];
        if(result=="sunk"){
            let ship = this.enemy.getShipByCoordinate(randomNumber);
            coordinates = ship.position;
            this.score++;
            UILoad.updateScore(this);
        }else{
            coordinates.push(randomNumber);
        }
        UILoad.updateSquare(this, coordinates, result);
        UILoad.updateMessage(this, result);
        if(this.score==5){
            Game.end(this);
        }
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

    getShipByCoordinate(coordinate){
        let theShips = this.gameBoard.ships;
        for(let i=0; i<theShips.length; i++){
            let coordinates = theShips[i].position;
            if(coordinates.includes(coordinate)){
                return theShips[i];
            }
        }
    }


    
}

/* module.exports = Player; */ // Uncomment for testing


