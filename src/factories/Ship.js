export default class Ship{
    name = "";
    length = 0;
    position = [];
    hits = 0;

    constructor(name, length, position){
        this.position = position;
        this.length = length;
        this.name = name;
    }

    hit(){
        this.hits++;
    }

    setPosition(pos){
        this.position = pos;
    }

    isSunk(){
        console.log("in the is sunk function");
        console.log("this ship is: " + this.name + " the length is: " + this.length + " the hits is:" + this.hits);
        if(this.hits == this.length){
            return true;
        }else{
            return false;
        }
    }

}