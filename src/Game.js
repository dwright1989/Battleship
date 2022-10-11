import { startCase } from 'lodash';
import UILoad from './modules/UILoad';
import Player from './modules/Player';

export default class Game{

    selectedShip = null;
    shipAxis = "Horizontal";
    player1 = null;
    player2 = null;
    
    

    static start(){
        UILoad.loadIntroPage();
    }

    
    static initialisePlayer(name){
        this.player1 = new Player(name, "Human");
        UILoad.loadShipSelectionPage(this.player1);        
    }

    /*
    Ship that is selected to be PLACED
    */
    static setSelectedShip(ship){
        this.selectedShip = ship;
        UILoad.updateSelectedShipStyle(ship);
    }

    /*
    Ship that is selected to be PLACED - change the axis
    */
    static setShipAxis(axis){
        this.shipAxis = axis;
    }

    /*
    Generate AI Gameboard
    */
   static initialiseAI(){
        this.player2 = new Player("Computer", "AI");
    }

   static generateCoordinates(axis, pos, length){
       let coords = [pos];
        if(axis=="Vertical"){
            let partnerNumber = pos+10;
            for(let i=0; i<length-1; i++){
                coords.push(partnerNumber);
                partnerNumber+=10;
            }
        }else{
            let partnerNumber = pos+1;
            for(let i=0; i<length-1; i++){
                coords.push(partnerNumber);
                partnerNumber++;
            }
        }
        return coords;
   }


}
