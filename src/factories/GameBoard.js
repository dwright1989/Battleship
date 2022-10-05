import Ship from './Ship';

export default class GameBoard{

    constructor(){
        this.board = [];
        this.ships = [];
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
        const carrier = new Ship(5,[]);
        let battleship = new Ship(4,[]);
        let destroyer = new Ship(3,[]);
        let submarine = new Ship(3,[]);
        let patrol = new Ship(2,[]);
        this.ships = [carrier, battleship, destroyer, submarine, patrol];
    }

    /*
    Place a ship of a specific length in a specific position
    */
    placeShip(pos){
        // For each position, update the board
        for(let i=0; i<pos.length; i++){
            if(this.board[pos[i]].hasShip(true)){
                console.log("ERROR. SHIP ALREADY EXISTS HERE");
                break;
            }else{
                this.board[pos[i]].hasShip = true;
            }
            
        }
        let ship = new Ship(pos);
        return ship;
    }


}

module.exports = GameBoard;