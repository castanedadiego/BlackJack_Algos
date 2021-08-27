export class Card {
    constructor(suit, rank){
    this._suit = suit;
    this._rank = rank;
    }

    get num_rank(){
        if (this._rank == 1) return 1;
        else if (this._rank>10) return 10;
        else return this._rank;
        }
}
