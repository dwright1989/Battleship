import { startCase } from 'lodash';
import UILoad from './modules/UILoad';
import Player from './modules/Player';

export default class Game{

    selectedShip = null;
    shipAxis = "Horizontal";
    player1 = null;
    

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


}

