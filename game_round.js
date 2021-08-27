class GameRound{
    constructor(shoe){
        this.shoe = shoe || new Deck();
        this.dealer= new DealerHand();
        this.player= new PlayerHand();
    }

    dealer_play(){
        this.dealer.play(this.shoe);
    }

}
