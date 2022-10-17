import Ship from './Ship';

export default class GameBoard{

    constructor(){
        this.board = [];
        this.ships = [];
        this.missed = [];
        this.hits = [];
        this.shipsPlaced = 0;
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
    Check if a ship can be placed here due to overlap of board and other ships
    */
    canPlaceShipHere(firstSquare, ship, axis){
        if(this.board[firstSquare].hasShip==false || this.board[firstSquare].hasShip==null){
            let lastDigit = Number(String(firstSquare).slice(-1));
                if(axis=="Vertical"){
                    let maxPlacement = Number("9"+lastDigit);
                    if((firstSquare+((ship.length*10)-10))<=maxPlacement){
                        let nextSquare = firstSquare+10;
                        for(let i=0; i<ship.length-1; i++){
                            if(this.board[nextSquare].hasShip!=false && this.board[nextSquare].hasShip!=null){
                                return false;
                            }
                            nextSquare+=10;
                        }
                    }else{
                        return false;
                    }
                    return true;         
                }else{ // Horizontal
                    let maxPlacement = 10-ship.length;
                    if(lastDigit<=maxPlacement) {
                        let nextSquare = firstSquare+1;
                        for(let j=0; j<ship.length-1; j++){
                            if(this.board[nextSquare].hasShip!=false && this.board[nextSquare].hasShip!=null){
                                return false;
                            }
                            nextSquare++;
                        }
                    }else{
                        return false;
                    }
                    return true;
                }
        }else{
            return false;
        }
        
    }

    /*
    Place a ship of a specific length in a specific position
    */
    placeShip(ship, position){
        ship.setPosition(position);
        for(let i=0; i<position.length; i++){
            this.board[position[i]].hasShip = ship;
        }
        this.shipsPlaced++;
        if(this.shipsPlaced==5){
            return true;
        }

    }

    /*
    Receive an attack in a particular position and update the ship object or missed array
    */
   receiveAttack(coordinate){
       let result = "";
       // check if this square has been clicked before
       if(this.hits.includes(coordinate) || this.missed.includes(coordinate)){
       }
       else{
        for(let ship in this.ships){
            let positions = this.ships[ship].position;
            for(let pos in positions){
                    if(positions[pos] == coordinate){
                        if(!this.hits.includes(coordinate)){
                            this.ships[ship].hit();
                            this.hits.push(coordinate);
                            /// if it's a hit check if the ship is sunk
                            if(this.ships[ship].isSunk()){
                                result = "sunk";
                            }else{
                                result ="hit";
                            }
                            return result; 
                        }                                           
                    }
            }
        }
        
        this.missed.push(coordinate); 
        result = "miss";
       }
        
        return result;
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


/* 
module.exports = GameBoard;
*/ // Uncomment for testing