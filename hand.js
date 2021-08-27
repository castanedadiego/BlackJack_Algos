export default class Hand {
    constructor(){
        this.draw_count= 2;
        this.drawn_cards= [];

    }

    did_bust(draw_count) {
        if (draw_count > 21){
            console.log(`Count is ${draw_count}. Busted!`);
            return true;
        }
        else return false;
    };

    num(){
        let total =0;
        this.drawn_cards.forEach(card=> total + card.num_rank() );
        return total
    }

    add_card(card){

        this.drawn_cards.push(card);
        this.draw_count += card.num_rank;

        console.log(card);

        return card;
    }
}
