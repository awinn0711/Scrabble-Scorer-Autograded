// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let scrabbleWord = input.question("Let's play some scrabble! Enter a word:");
   console.log(oldScrabbleScorer(scrabbleWord));
};

let simpleScorer = function(word) {
   let output = word.length;
   return output;
};
//console.log(simpleScorer("apple"));

let vowelBonusScorer = function(word) {
   let score = 0;
   word = word.toUpperCase();
   let vowels = ['A', 'E', 'I', 'O', 'U'];
   let cons = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
   for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         score += 3;
      } else if (cons.includes(word[i])) {
         score += 1;
      } 
   }
   return score;
};
//console.log(vowelBonusScorer("apple"));

let scrabbleScorer = function(word) {
   word = word.toLowerCase();
   let points = 0;
   
   for (let i = 0; i < word.length; i++) {
      for (item in newPointStructure) {
         if (word[i] === item) {
            points += newPointStructure[item];
         }
      }
   }
   return points;
}
// console.log(scrabbleScorer("frycook"));
// console.log(oldScrabbleScorer("frycook"));

let simpleObj = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
};
let vowelsScoreObj = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
};
let oldScrabbleScorerObj = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: oldScrabbleScorer
};
let scrabbleScorerObj = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer
};

const scoringAlgorithms = [simpleObj, vowelsScoreObj, scrabbleScorerObj];
// console.log(scoringAlgorithms[0]["name"]);
// console.log(simpleObj.scorerFunction("apples"));
// console.log(scoringAlgorithms[0].scorerFunction("apples"));


function scorerPrompt() {
   let scrabbleWord = input.question("Lets play some Scrabble! Enter a word to score: ");
   let scoreMethod = input.question(`Which scoring algorithm would you like to use?
   
   0 - Simple: One point per character
   1 - Vowel Bonus: Vowels are worth 3 points
   2 - Scrabble: Uses scrabble point system
   Enter 0, 1, or 2: `);
   console.log(`   Score for '${scrabbleWord}': ${scoringAlgorithms[scoreMethod].scorerFunction(scrabbleWord)}`);
   
}


function transform(obj) {
   let newPoints = {};
   for (value in obj) {
      for (let i = 0; i < obj[value].length; i++) {
         newPoints[obj[value][i].toLowerCase()] = Number(value);
      }
   }
   return newPoints;
};
//console.log(transform(oldPointStructure));

let newPointStructure = transform(oldPointStructure);
//console.log(newPointStructure);

// console.log("Scrabble scoring values for");
// console.log("letter a: ", newPointStructure.a);
// console.log("letter j: ", newPointStructure.j);
// console.log("letter z: ", newPointStructure["z"]);



function runProgram() {
   scorerPrompt();
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
