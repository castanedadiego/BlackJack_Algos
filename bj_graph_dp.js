
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

        let idx = (i>51)? i-52 : i;
        let returned_card = this.cards[idx];

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

    var drawEdges= (deck, graph,i)=>{

        while (i<52) {

            for(let h=0; h<= 52- i; h++){ //for all hit possibilities

                // O = round-outcome(i,h)
                outcome= roundOutcome(deck, i, h);
                //outcome 0 is the number of cards played in round; Outcome[1] is weight of edge/
                //We are also passing in, h, the number of hits to each edge to ease strategy retrieval.

                graph.setEdge(i.toString(), ( i +outcome[0] ).toString() , [ outcome[1].toString(), h] )
                //draw edge from i to ( O[0] + i ) \
                //cost is O[1], the Win Outcome of the round which is -1 for a win, 0 for a draw, and 1 for a loss.

            }

            i++;
        }

        return graph;
    }

    const winOutcome= (dealerHand, playerHand)=>{

        if (playerHand.num >21){
            return 1;
        }
        else{
            if (dealerHand.num > 21){
                return -1;
            }
            else if (playerHand.num === dealerHand.num){
                return 0;
            }

            else if (playerHand.num > dealerHand.num){
                return -1;
            }

            else if (playerHand.num < dealerHand.num){
                return 1;
            }

        }

    }

    const roundOutcome= (deck, i, hit) =>{

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

        while(dealerHand.num <17 && playerHand.num<=21 ){
            idx++ ;
            dealerHand.add_card( deck.draw(idx) );
        }


        let cardsInRound = playerHand.draw_count + dealerHand.draw_count ;

        let winStatus= winOutcome(dealerHand, playerHand);




        return [cardsInRound, winStatus];
    }




    const findMinValue= (arr)=>{

        //finds min value; if multiple mins, returns the first one

        let min = arr[0];
        let min_idx= 0;

        for(var i=1; i<arr.length; i++){

            min_idx = (min<= arr[i] )? min_idx : i ;
            min = (min<= arr[i] ) ? min : arr[i];
        }

        return [min, min_idx];
    }


    const getDistances= (startingFloyd)=>{
        let distances = [];

        for (const obj in startingFloyd){
            distances.push(startingFloyd[obj].distance);
        }

        return distances;
    }


    const getTracebacks=(graph, startingFloyd)=>{ //startingFloyd is the resulting object of runnin the Floyd- Marshall algorithm on
        let tracebacks= [];
        let distances = getDistances(startingFloyd);

        let minimum= findMinValue(distances);

        let node= graph.node( minimum[1] );

        tracebacks.push(node)

        while (parseInt(node)!= 0){

            let prev_node = startingFloyd[node].predecessor;
            tracebacks.push( prev_node ); //second item in tuple is number of hits
            node =  prev_node;
        }

        tracebacks.reverse();

        return tracebacks;
    }


    const getHits= (graph, tracebacks)=>{

        let hits= [];

        for(let i=0; i<tracebacks.length-1; i++){

            let origin= tracebacks[i];
            let target = tracebacks[i+1];

           hits.push(graph.edge(origin, target)[1] );
        }

        return hits;
    }


    class OptimalStrat{

        constructor() {
            this.deck= new Deck();
            this.graph = this.setGraph();
            this.floyd= alg.floydWarshall(this.graph, this.weight)[0];
            this.tbacks= getTracebacks(this.graph, this.floyd);
            this.hits= getHits(this.graph, this.tbacks);
        }


        setGraph= ()=>{
            let g= new Graph({directed: true});

            for(let i=0; i< 52; i++){
                g.setNode(`${i}`, i);
            }

            drawEdges(this.deck, g, 0);

            return g;
        }

        weight= (e)=> {
            return parseInt(this.graph.edge(e)[0] );
        }

    }


    let dpSolution= () => {

        d= new Deck();
        var dp_array = [];

        for (let i= 51; i>=0; i--){

            var choices= [0];

                for (let h=0; h<= 52-i; h++){

                    let o = roundOutcome(d, i, h);

                    if (i+ o[0] <=52){
                        choices.push( o[1] + dp_array[i + o[0] ]);
                    }
                }

                console.log(choices);
                dp_array[i]= Math.min(...choices);
        }

        return dp_array
    }










// initialize

let a= new OptimalStrat();
