import Ship from './Ship';

export default class GameBoard{

    constructor(){
        this.board = [];
        this.ships = [];
        this.missed = [];
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


}

module.exports = GameBoard;