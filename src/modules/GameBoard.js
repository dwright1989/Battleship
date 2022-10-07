import Ship from './Ship';
import Player from './Player';

export default class GameBoard{

    constructor(){
        this.board = [];
        this.ships = [];
        this.missed = [];
        this.hits = [];
        this.initialise();
    }

    /*
    Create a game board with 100 squares (10x10 typical Battleship board)
    Create the typical ship objects
    */
    initialise(){
        this.createBoard();
        this.createShips();
    }

    createBoard(){
        for(let i=0; i<100; i++){
            this.board.push({hasShip: false, isShot: false});
        }
    }

    createShips(){
        let carrier = new Ship("carrier", 5,[]);
        let battleship = new Ship("battleship", 4,[]);
        let destroyer = new Ship("destroyer", 3,[]);
        let submarine = new Ship("submarine", 3,[]);
        let patrol = new Ship("patrol", 2,[]);
        this.ships = [carrier, battleship, destroyer, submarine, patrol];
    }

    /*
    Place a ship of a specific length in a specific position
    */
    placeShip(ship, position){
        ship.setPosition(position);
        for(let i=0; i<position.length; i++){
            this.board[position[i]].hasShip = true;
        }
    }

    /*
    Receive an attack in a particular position and update the ship object or missed array
    */
   receiveAttack(coordinate){
        for(let ship in this.ships){
            let positions = this.ships[ship].position;
        for(let pos in positions){
                if(positions[pos] == coordinate){
                    if(!this.hits.includes(coordinate)){
                        this.ships[ship].hit();
                        this.hits.push(coordinate);
                    }
                    return;                    
                }
            }
        }
        
        this.missed.push(coordinate); 
   }

   /*
   Check if all ships are sunk
   */
  allShipsSunk(){
    let shipsSunk = 0;   
    for(let i=0; i<this.ships.length; i++){
        if(this.ships[i].isSunk()){
            shipsSunk++;
        }
    }
    if(shipsSunk==this.ships.length){
        return true;
    }
    return false;
  }


}
