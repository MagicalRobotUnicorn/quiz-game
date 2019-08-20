 __         ______     ______   ______        ______   ______     __     __   __   __     ______        ______     ______     __    __     ______    
/\ \       /\  __ \   /\__  _\ /\  == \      /\__  _\ /\  == \   /\ \   /\ \ / /  /\ \   /\  __ \      /\  ___\   /\  __ \   /\ "-./  \   /\  ___\   
\ \ \____  \ \ \/\ \  \/_/\ \/ \ \  __<      \/_/\ \/ \ \  __<   \ \ \  \ \ \'/   \ \ \  \ \  __ \     \ \ \__ \  \ \  __ \  \ \ \-./\ \  \ \  __\   
 \ \_____\  \ \_____\    \ \_\  \ \_\ \_\       \ \_\  \ \_\ \_\  \ \_\  \ \__|    \ \_\  \ \_\ \_\     \ \_____\  \ \_\ \_\  \ \_\ \ \_\  \ \_____\ 
  \/_____/   \/_____/     \/_/   \/_/ /_/        \/_/   \/_/ /_/   \/_/   \/_/      \/_/   \/_/\/_/      \/_____/   \/_/\/_/   \/_/  \/_/   \/_____/ 

  ******************************************************************************************************************************************************

This is a timer based quiz game for Assignment 5 of the University of Oregon Coding Bootcamp.

Instructions:

To begin, select the button to start the game.
A series of 31 questions are presented.
For each question select the correct answer.
For a hint, open the console.

Upon completion of the game, the user's score is displayed.

*********************************************************************************************************************************************************

Coding Practices

*********************************************************************************************************************************************************

Initial Set Up:

The questions were scraped from the LOTR Wikipedia page using Node Js and Cheerio, a library which allows for the use of jQuery commmands on a desktop enviornment.
LOTR Wikipedia (Character Section): https://en.wikipedia.org/wiki/The_Lord_of_the_Rings
Cheerio for Node Js: https://cheerio.js.org/

Game Dynamics:

The game play consists of two timers, a 15 second timer to answer the question and a 5 second timer between questions.
These are commented in the code.

Event Handlers:
The game consists of three event handlers, each listening on one of three buttons.
1. A Start Up Button
2. A Correct Answer Button
3. An Incorrect Answer Button

When the turn is over, or either a correct or incorrect answer is selected, the outcome of the round is shown to the player and the next question is loaded five seconds later.

Giphy API:
A series of positive and negative GIFs depicting the Lord of the Rings were selected.
Upon completion of each question, a random number is generated corresponding to an index of either a positive or negative gif.
This is then concatinated into a ajax request and the corresponding gif is displayed to the user when response is received.




