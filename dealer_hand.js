class DealerHand extends Hand {
    constructor(draw_threshold){
        super();
        this.draw_treshold= draw_threshold || 17;
    }

    play(shoe){
        while (this.draw_count < this.draw_treshold) {
            this.add_card( shoe.draw() );
            this.did_bust();

        }
    }
}
