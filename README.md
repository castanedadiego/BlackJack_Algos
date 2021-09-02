# BlackJack_Algos


This small project was made as an implementation solution for an advanced problem from MIT 6.006 course on algorithms. Specifically, we are tackling a BlackJack problem.
Source: https://www.youtube.com/watch?v=jZbkToeNK2g&ab_channel=MITOpenCourseWare

Let the problem be defined as:

A BlackJack player is playing on a table alone against a dealer. The player has knowledge of all cards in the deck. We are optimizing for profit.

The nuance in this problem is that the regular blackjack strategy (i.e hitting vs standing) is trivial since we have vision over the entire deck.
Instead, the interesting challenge is in optimizing for the number of cards dealt in each 'round' (even at the expense of a round loss) so that we can later get more favorable draws. We are optimizing for the most efficient path such that, by the last card dealt, we made the highest cumulative profit.

There are two approaches to this problem, Graph Path-Finding Optimization and Dynamic Programming,  both of which, are covered in this repo.
