# BlackJack_Algos


This small project was made as an implementation solution for an advanced problem from MIT 6.006 course on algorithms. Specifically, we are tackling a BlackJack problem.
Source: https://www.youtube.com/watch?v=jZbkToeNK2g&ab_channel=MITOpenCourseWare

Let the problem be defined as:

A BlackJack player is playing on a table alone against a dealer. The player has knowledge of all cards in the deck. We are optimizing for profit.

The nuance in this problem is that the regular blackjack strategy (i.e hitting vs standing) is trivial since we have vision over the entire deck.
Instead, the interesting challenge is in optimizing for the number of cards dealt in each 'round' (even at the expense of a round loss) so that we can later get more favorable draws. We are optimizing for the most efficient path such that, by the last card dealt, we made the highest cumulative profit.

There are two approaches to this problem, Graph Path-Finding Optimization and Dynamic Programming,  both of which are covered in this repo.

Using the graph approach: each graph node represents the deck state of # of cards already dealt. Connections between nodes will be made if its possible to, in one round, go from node A to node B. Edges' weights will be the outcome of the round (-1 for a win, 0 for a draw, or 1 for a loss). The resulting graph will be a Directed Acyclic Graph. We then run the Floyd-Warshall algorithm to find the shortest distance between any node pairs. For practical purposes, we lastly run methods to get the most profitable path starting from the undealt deck and the hit/stand stategy one would need to employ to traverse such path.


To use it yourself:
1. Install dependencies with npm install on directory.
2. Run bj_graph_dp.js on node.
3. The optimal path and strategy are properties of the object named "a". the tbacks property shows the optimal path, and hits shows the # of hits in each round to reach such path.
