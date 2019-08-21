// jQuery selectors for two display divs
var $buttonDisplay = $('#buttonDisplay');
var $questionDisplay = $('#questionHeading');

// Score and current question declared as globals
var score = 0;
var indexThroughQuestions = 0;

// Vars for times declared as globals (15 seconds for question, 5 seconds between questions)
var questionTime = 15;
var loadingTime = 5;

// Timing intervals declared as global variables
var questionInterval;
var loadingInterval;

// GIF Id's on Giphy for both positive and negative reaction Gifs
var positiveMemes = ['zGnnFpOB1OjMQ', 'VEKefKJkKbhyU', 'zg92oefUzKfWU', 'AuSi9GagFjcys', 'YbTTq5SovQQIU', 'wPb0Er6MG6d9K', 'pVOvhisKbiMVi', 'ly3tQYHmXMsCI', 'I2TqO0oJBaNoc', 'AtzQ6pX6t2aaI'];
var negativeMemes = ['1FR40e3b76Jnq', '47ukyqqk1nEFq', 'zpDJ6gBzsFFx6', 'qEFAJ8GZ0p33y', 'b1VRWNeZbrTos', 'VXoekWrwRUO7S', 'IWBHK9CLAkKPK', 'BF2hDMXteE8O4', 'EtxR8iU8jhw7C', 'nl8gOUtlmHGE0'];

// Object template for questions
function QuizQuestion(question, answer, category) {
  this.Question = question;
  this.Answer = answer;
  this.Category = category;
}

// Questions created by scraping the LOTR Wikipedia page with Node.js and Cheerio
var characterQuestions = [
  {
    "Question": "Who is bearer of the One Ring, given to him by Bilbo Baggins?",
    "Answer": "Frodo Baggins",
    "Category": "Character"
  },
  {
    "Question": "Who is gardener and friend of the Bagginses?",
    "Answer": "Samwise Gamgee",
    "Category": "Character"
  },
  {
    "Question": "Who is Frodo's cousin and friend?",
    "Answer": "Meriadoc Brandybuck (Merry)",
    "Category": "Character"
  },
  {
    "Question": "Who is Frodo's cousin and friend?",
    "Answer": "Peregrin Took (Pippin or Pip)",
    "Category": "Character"
  },
  {
    "Question": "Who is a wizard, leads the Fellowship until his fall in Moria, returns from death to lead the armies of the West against Sauron?",
    "Answer": "Gandalf the Grey",
    "Category": "Character"
  },
  {
    "Question": "Who is a descendant of Isildur and rightful heir to the thrones of Arnor and Gondor?",
    "Answer": "Aragorn",
    "Category": "Character"
  },
  {
    "Question": "Who is an Elf prince and son of King Thranduil of the Silvan Elves of Northern Mirkwood?",
    "Answer": "Legolas Greenleaf",
    "Category": "Character"
  },
  {
    "Question": "Who is son of Glain, a dwarf?",
    "Answer": "Gimli",
    "Category": "Character"
  },
  {
    "Question": "Who is the eldest son and heir of Denethor?",
    "Answer": "Boromir",
    "Category": "Character"
  },
  {
    "Question": "Who is ruling Steward of Gondor and Lord of Minas Tirith?",
    "Answer": "Denethor",
    "Category": "Character"
  },
  {
    "Question": "Who is the younger son of Denethor and brother of Boromir?",
    "Answer": "Faramir",
    "Category": "Character"
  },
  {
    "Question": "Who is the Elf co-ruler of Lothlarien, and grandmother of Arwen?",
    "Answer": "Galadriel",
    "Category": "Character"
  },
  {
    "Question": "Who is the Elf co-ruler of Lothlarien, husband of Galadriel, and grandfather of Arwen?",
    "Answer": "Celeborn",
    "Category": "Character"
  },
  {
    "Question": "Who is the Half-elven Lord of Rivendell and father of Arwen?",
    "Answer": "Elrond",
    "Category": "Character"
  },
  {
    "Question": "Who is daughter of Elrond, love interest of Aragorn?",
    "Answer": "Arwen Undamiel",
    "Category": "Character"
  },
  {
    "Question": "Who is Frodo's uncle?",
    "Answer": "Bilbo Baggins",
    "Category": "Character"
  },
  {
    "Question": "Who is King of Rohan, ally of Gondor?",
    "Answer": "Thaoden",
    "Category": "Character"
  },
  {
    "Question": "Who is the 3rd Marshal of the Mark and Thaoden's nephew and later King of Rohan after Thaoden's death?",
    "Answer": "Eomer",
    "Category": "Character"
  },
  {
    "Question": "Who is sister of Eomer, who disguises herself as a male warrior named Dernhelm to fight beside Thaoden?",
    "Answer": "Eowyn",
    "Category": "Character"
  },
  {
    "Question": "Who is oldest of the Ents?",
    "Answer": "Treebeard",
    "Category": "Character"
  },
  {
    "Question": "Who is lives at the edge of the Old Forest near the barrow-downs, a mysterious character with great powers?",
    "Answer": "Tom Bombadil",
    "Category": "Character"
  },
  {
    "Question": "Who is an elf who lives in Rivendell and saves Frodo from the Ringwraiths?",
    "Answer": "Glorfindel",
    "Category": "Character"
  },
  {
    "Question": "Who is the Dark Lord and titular Lord of the Rings, a fallen Maia, helped the Elves of Eregion forge the Rings of Power in the Second Age?",
    "Answer": "Sauron",
    "Category": "Character"
  },
  {
    "Question": "Who is men enslaved by Sauron when they accepted his treacherous gifts of Rings of Power?",
    "Answer": "The Nazgul or Ringwraiths",
    "Category": "Character"
  },
  {
    "Question": "Who is the Lord of the Nazgul, and Sauron's most powerful servant, who commands Sauron's army?",
    "Answer": "The Witch-king of Angmar",
    "Category": "Character"
  },
  {
    "Question": "Who is a wizard who seeks the One Ring for himself... originally the chief of the order of wizards of which Gandalf is also a member corrupted by Sauron through the palantir?",
    "Answer": "Saruman the White",
    "Category": "Character"
  },
  {
    "Question": "Who is a secret servant of Saruman and traitor to Rohan, who poisons Thaoden's perceptions with well placed advice?",
    "Answer": "Gra­ma Wormtongue",
    "Category": "Character"
  },
  {
    "Question": "Who is a river hobbit originally named Smeagol and an obsessive previous owner of the One Ring, planning to steal it back?",
    "Answer": "Gollum",
    "Category": "Character"
  },
  {
    "Question": "Who is a giant spider who dwells in the pass of Cirith Ungol above Minas Morgul?",
    "Answer": "Shelob",
    "Category": "Character"
  },
  {
    "Question": "Who is a Balrog dwelling beneath the Mines of Moria?",
    "Answer": "Durin's Bane",
    "Category": "Character"
  },
  {
    "Question": "Who is also known as the Lieutenant of Barad-dar. The chief emissary of Sauron, he confronts the Army of the West outside the Black Gate?",
    "Answer": "Mouth of Sauron",
    "Category": "Character"
  }
];

// Inital function
// Prepares/Displays the initial landing page and randomizes the questions
function prepareQuiz() {
  console.log('LOTR Character Quiz!');
  console.log('Greetings! Look here for quiz hints...');
  $('#questionHeading').text('One quiz to rule them all... one quiz to guide them...');

  characterQuestions.sort(function (a, b) { return 0.5 - Math.random() });

  var $defaultDisplay = $('<div id="defaultDisplay"><center>');

  var $introHeading = $('<h2 class="initialText">What lies ahead is the most difficult test all LOTR character Trivia..</h2>');
  $introHeading.append('<br /><center><h2 class="initialText">Good luck, player!</h2>')
  var $introButton = $('<button type="button" class="btn btn-secondary btn-lg btn-block startGame" id="startButton">');
  $introButton.text('Start Game');

  $defaultDisplay.append($introHeading);
  $defaultDisplay.append($introButton);

  $buttonDisplay.html($defaultDisplay);

}

// Main function of the game
// Displays the question, selects random answers from the other characters in the game, assigns the correct and incorrect answer classes to the buttons, starts the countdown
function askQuestion(questionNumber) {
  $('#questionHeading').html('');
  $buttonDisplay.html('');
  var answersArray = [];
  answersArray.push(questionNumber);

  for (var i = 0; i < 3; i++) {

    while (true) {
      var randomAnswer = Math.floor((Math.random() * characterQuestions.length));
      if (randomAnswer != questionNumber && answersArray.indexOf(randomAnswer) == -1) {
        answersArray.push(randomAnswer);
        break;
      }
    }
  }

  answersArray.sort(function (a, b) { return 0.5 - Math.random() });

  for (var i = 0; i < 4; i++) {
    var $answerButton = $('<button type="button" class="btn btn-secondary btn-lg btn-block">');
    if (answersArray[i] == questionNumber) {
      $answerButton.addClass('correctAnswer');
    }
    else {
      $answerButton.addClass('incorrectAnswer');
    }

    $answerButton.html(characterQuestions[answersArray[i]].Answer);

    $buttonDisplay.append($answerButton);
  }

  var $currentQuestion = characterQuestions[questionNumber].Question;
  console.log("pssst... the answer is: " + characterQuestions[questionNumber].Answer);
  $('#questionHeading').html($currentQuestion);

  var $dynamicDisplay = $('<section><div class="circle-wrap"><div class="circle"><div class="mask full"><div class="fill"></div></div><div class="mask half"><div class="fill"></div></div><div class="inside-circle">15</div></div></div></section>');
  $dynamicDisplay.attr('id','dynamicDisplay');

  $buttonDisplay.append($dynamicDisplay);
  intervalId = setInterval(updateQuestionClock, 1000);
}

// Updates the clock interval, transforms the outer circle outline by the corresponding amount of degrees per second
function updateQuestionClock() {
  questionTime--;
  var percentage = (questionTime / 15) * 180;
  $('.circle-wrap .circle .fill').css('transform', 'rotate(-' + percentage + 'deg)');
  $('.inside-circle').text(questionTime);

  if (questionTime == 0) {
    clearInterval(intervalId);
    questionTime = 15;
    negativeResult("Ran out of time!");
  }
}


// Function which is triggered on a correct answer
// Deactivates the buttons, diplays the results, calls the Giphy API function, and sets the timeout for the next question
// Checks victory condition
function positiveResult() {
  $('#dynamicDisplay').html('');
  callGiphy("positive");
  clearInterval(intervalId);
  questionTime = 15;
  $('button.btn.btn-secondary.btn-lg.btn-block.incorrectAnswer').removeClass('incorrectAnswer');
  $('button.btn.btn-secondary.btn-lg.btn-block.correctAnswer').removeClass('correctAnswer');

  $('#dynamicDisplay').append('<center><div id="resultHeading">Correct Answer!</div>');

  if (indexThroughQuestions < characterQuestions.length - 1) {
    setTimeout(function () { askQuestion(++indexThroughQuestions); }, 5000);
  }
  else {
    setTimeout(function() {endQuiz();}, 3000);
  }
}

// Function which is triggered on an incorrect answer
// Deactivates the buttons, diplays the results, calls the Giphy API function, and sets the timeout for the next question
// Checks victory condition
function negativeResult(reason = "Incorrect Answer!") {
  $('#dynamicDisplay').html('');
  callGiphy("negative");
  clearInterval(intervalId);
  questionTime = 15;
  $('button.btn.btn-secondary.btn-lg.btn-block.incorrectAnswer').removeClass('incorrectAnswer');
  $('button.btn.btn-secondary.btn-lg.btn-block.correctAnswer').removeClass('correctAnswer');

  $('#dynamicDisplay').append('<center><div id="resultHeading">' + reason + '</div>');

  if (indexThroughQuestions < characterQuestions.length - 1) {
    setTimeout(function () { askQuestion(++indexThroughQuestions); }, 5000);
  }
  else {
    setTimeout(function() {endQuiz();}, 3000);
  }
}

// End of Game function
// Displays Score and final GIF
function endQuiz() {
  $buttonDisplay.html('');
  $questionDisplay.text('Congrats!');
  $buttonDisplay.append('<div id="resultHeading">Congrats!!</div>');
  $buttonDisplay.append('<div id="prepare">Your score is ' + score + ' out of a possible 31.</div>')
  var queryURL = 'https://api.giphy.com/v1/gifs/' + positiveMemes[0] + '?api_key=BtLHjwFVEd9ldzm3g7ETWmE8L67pdyzT";

  $.ajax({
    url: queryURL,
    method: "GET"
  }). then(function(response) {
    $buttonDisplay.append(('<div id="resultGifDiv"><img src="' + response.data.images.original.url  + '" id="resultGif"></div>'));
  });
}

// GIPHY Function Call
// Uses random index from positive or negative array to display corresponding gif (result of ajax call to GIPHY API)
function callGiphy(result) {
  var image;
  var index;

  if (result == "positive") {
    index = Math.floor(Math.random() * positiveMemes.length);
    image = positiveMemes[index];
  }
  else {
    index = Math.floor(Math.random() * negativeMemes.length);
    image = negativeMemes[index];
  }
 
  var queryURL = 'https://api.giphy.com/v1/gifs/' + image + '?api_key=BtLHjwFVEd9ldzm3g7ETWmE8L67pdyzT';

  $.ajax({
    url: queryURL,
    method: "GET"
  }). then(function(response) {
    $('#dynamicDisplay').append(('<div id="resultGifDiv"><img src="' + response.data.images.original.url  + '" id="resultGif"></div>'));
    $('#dynamicDisplay').append('<div id="prepare">Prepare for the next question...</div>');
  });

}

// Event handlers for on click, prepare quiz functions
$(document).ready(function () {
  prepareQuiz();

  $("body").on("click", "button.btn.btn-secondary.btn-lg.btn-block.startGame", function () {
    askQuestion(indexThroughQuestions);
  });

  $("body").on("click", "button.btn.btn-secondary.btn-lg.btn-block.incorrectAnswer", function () {
    negativeResult();
  });

  $("body").on("click", "button.btn.btn-secondary.btn-lg.btn-block.correctAnswer", function () {
    score++;
    positiveResult();
  });
});



