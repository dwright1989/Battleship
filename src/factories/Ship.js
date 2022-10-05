export default class Ship{
    length = 0;
    position = [];
    hits = [];

    constructor(length, position){
        this.position = position;
        this.length = length;
    }

    hit(){
        this.hits++;
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