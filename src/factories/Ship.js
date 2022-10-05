export default class Ship{
    name = "";
    length = 0;
    position = [];
    hits = [];

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

    /*
    ######### SHORTEN #########
    */
    isSunk(){
        if(this.hits.length = this.length){
            return true;
        }else{
            return false;
        }
    }

}