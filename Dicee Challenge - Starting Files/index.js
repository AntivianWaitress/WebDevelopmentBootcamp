var randomNumber = 0;
var diceImgPath;
var dices = document.querySelectorAll(".diceImg");
var diceRolls = [];

// for each dice on the website
for(i = 0; i < dices.length; i++){
    // create a random number & reset the imgPath
    diceImgPath = "images/dice";
    randomNumber = Math.floor(Math.random() * 6) + 1;
    // loop through all possible numbers (1-6)
    for (j = 1; j <= 6; j++){
        //if number matches the random number, change dice-img to that number and add roll to array
        if(randomNumber === j){

           diceImgPath += j + ".png";
           dices[i].src = diceImgPath;
           diceRolls.push(j);
    }
  }
}

// set highestNumber to the first diceRoll
var highestNumber = diceRolls[0];
// for each dice roll
for (n = 0; n < diceRolls.length; n++){
// when dice roll is higher than recent highest, change highestNumber to index of diceRoll
  if(diceRolls[n] > highestNumber){
    highestNumber = diceRolls[n];
  }
}

//look how many times diceRolls contains the highestNumber
var winnerCount = 0;
for (m = 0; m <= diceRolls.length; m++){
  if (diceRolls[m] === highestNumber){
    winnerCount++;
  }
}

//if the highestNumber exists more than once in diceRolls, its a draw
if (winnerCount > 1){
  document.querySelector("h1").innerHTML = "Draw!";
} else {
  //otherwise the player of the index of highestNumber + 1 is the winner
    var winner = (diceRolls.indexOf(highestNumber)) + 1;
   document.querySelector("h1").innerHTML = "Player " + winner + " wins!"
}
