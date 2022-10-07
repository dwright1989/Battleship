import { startCase } from 'lodash';
import UILoad from './modules/UILoad';
import Player from './modules/Player';

export default class Game{
    static start(){
        UILoad.loadIntroPage();
    }

    static initialisePlayer(name){
        let player1 = new Player(name, "Human");
        UILoad.loadShipSelectionPage(player1);        
    }


}

