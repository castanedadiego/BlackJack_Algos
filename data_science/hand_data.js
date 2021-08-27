class HandData {
    constructor(hand){
        this.hand= hand;
    }

    get cards(){
        return this.hand.shoe.cards;
    }

    get busting_prob(){

        const dist_to_bust= 22- this.hand.draw_count;
        let count = 0;

        for (let i=0; i< this.cards.length; i++){

            let card= this.cards[i];
            //console.log(card.num_rank);

            if (dist_to_bust <= card.num_rank) {
                count++;
            }
        }
        return (count/ this.cards.length);
    }
}
