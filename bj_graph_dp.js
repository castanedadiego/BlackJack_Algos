
//GRAPH EXERCISE BLACKJACK from MIT's 6.006

// H.  Cards played in this Game
// Profit: +1, 0, -1

//Helper Method Round Outcome (i,h). Out of entire deck, decide which card i to start at and how many hards to hit. (o i can be interpreted as how many cards have been played)
//Returns tuple: [# of cards played in this round, $ made]


var Graph = require("@dagrejs/graphlib").Graph;
var alg= require("@dagrejs/graphlib/").alg;

class Card {
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

class Deck {
    constructor(){
        this.cards= this.make_fresh_deck();
        this._draw_index = 0;
    }

    make_fresh_deck(){
        let fresh_deck= [];

        for(let i=1; i<=13; i++){
            fresh_deck.push(new Card("hearts", i));
            fresh_deck.push(new Card("clubs", i));
            fresh_deck.push(new Card("spades", i));
            fresh_deck.push(new Card("diamonds", i));
        }
        return fresh_deck.sort( () => Math.random() -0.5);
    }

    draw(i=0){

        if (i > 51){
            i= i- 52;
        }

        let returned_card = this.cards[i];
        this._draw_index++;

        return returned_card ;
    }
}

 class Hand {
    constructor(cards){
        this.drawn_cards= cards || [] ;
    }

    did_bust(draw_count) {
        if (draw_count > 21){
            console.log(`Count is ${draw_count}. Busted!`);
            return true;
        }
        else return false;
    };

    get draw_count(){
        return this.drawn_cards.length;
    }

    get num(){
        let total = 0;
        this.drawn_cards.forEach(card=> total += card.num_rank );
        return total;
    }

    add_card(card){

        this.drawn_cards.push(card);

        return card;
    }
}

    function drawEdges(deck, graph,i){

        while (i<52) {

            for(let h=0; h<= 52- i; h++){ //for all hit possibilities

                // O = round-outcome(i,h)
                outcome= roundOutcome(deck, i, h);
                console.log(outcome);

                graph.setEdge(i.toString(), ( i +outcome[0] ).toString() , [ outcome[1].toString(), h] ) //outcome 0 is the number of cards played in round; Outcome[1] is weight of edge

                //draw edge from i to ( O[0] + i ) \
                //cost is O[1]


                //topological sort + dfs
            }

            i++;
        }

        return graph;
    }

    function roundOutcome(deck, i, hit){

        let idx= i;

        let playerHand= new Hand( [deck.draw(idx), deck.draw(idx+1) ] );
        let dealerHand= new Hand( [deck.draw(idx+2), deck.draw(idx+3) ] );

        idx+=3;

        for(let j=1; j<= hit; j++){
            if (playerHand.num<=21){
                idx++ ;
                playerHand.add_card( deck.draw(idx) );
            }
        }

        if (playerHand.num <=21) {

            while(dealerHand.num <17 ){
                idx++ ;
                dealerHand.add_card( deck.draw(idx) );
            }
        }


        let cardsInRound = playerHand.draw_count + dealerHand.draw_count ;

        let winOutcome= winOutcome(dealerHand, playerHand);




        return [cardsInRound, winOutcome];
    }


    function winOutcome(dealerHand, playerHand){

        if (playerHand.num >21){
            var winOutcome= 1;
        }
        else{
            if (dealerHand.num > 21){
                var winOutcome=  -1;
            }
            else if (playerHand.num === dealerHand.num){
                var winOutcome= 0;
            }

            else if (playerHand.num > dealerHand.num){
                var winOutcome= -1;
            }

            else if (playerHand.num < dealerHand.num){
                var winOutcome= 1;
            }
        }

        return winOutcome

    }



    function findMinValue(arr){

        //finds min value; if multiple mins, returns the first one

        let min = arr[0];
        let min_idx= 0;

        for(var i=1; i<arr.length; i++){

            min_idx = (min<= arr[i] )? min_idx : i ;
            min = (min<= arr[i] ) ? min : arr[i];
        }

        return [min, min_idx];
    }


    function getDistances(startingFloyd){
        let distances = [];

        for (const obj in startingFloyd){
            distances.push(startingFloyd[obj].distance);
        }

        return distances;
    }


    function getTracebacks(graph, startingFloyd){ //startingFloyd is the resulting object of runnin the Floyd- Marshall algorithm on
        let tracebacks= [];
        let distances = getDistances(startingFloyd);


        let minimum= findMinValue(distances);

        let node= full.node( minimum[1] );

        tracebacks.push(node)

        while (parseInt(node)!= 0){

            let prev_node = floyd[0][node].predecessor;
            tracebacks.push( prev_node ); //second item in tuple is number of hits
            node =  prev_node;
        }

        tracebacks.reverse();

        return tracebacks;
    }


// initialize

let d= new Deck();

let g= new Graph({directed: true});
for(let i=0; i< 52; i++){
    g.setNode(`${i}`, i);
}

let nodes= g.nodes();

let full= drawEdges(d, g, 0);

function weight(e){ return parseInt(full.edge(e)[0] );}

let sorted= alg.topsort(full);

let floyd= alg.floydWarshall(full, weight);
let stFloyd= floyd[0];

let hits= [];

for(let i=0; i<tracebacks.length-1; i++){

    let origin= tracebacks[i];
    let target = tracebacks[i+1];

   hits.push(full.edge(origin, target)[1] );

}

console.log(floyd[0]);
