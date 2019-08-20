// quiz question object
// quiz question contains:
//  * GIPHY API Access Code: BtLHjwFVEd9ldzm3g7ETWmE8L67pdyzT
//  * LOTR API Access Code: M3wx3CzB_JnO47DkAinm
//    * https://the-one-api.herokuapp.com/v1
//    * /book/5cf5805fb53e011a64671582
//    * Authorization: Bearer your-api-key-123

// other answers randomized?

// Potter API
// $2a$10$keI8PT9iiqnbBl/NUjDhZeDd9X1cVemSK.K5eOE7ZH0maFQH9dQ1K



// All answers in an array
// Correct answers given index
// Other answers randomized onload



var $buttonDisplay = $('#buttonDisplay');
var $questionDisplay = $('#questionHeading');

var score = 0;
var indexThroughQuestions = 0;

var questionTime = 15;
var loadingTime = 5;

var questionInterval;
var loadingInterval;

var positiveMemes = ['zGnnFpOB1OjMQ', 'VEKefKJkKbhyU', 'zg92oefUzKfWU', 'AuSi9GagFjcys', 'YbTTq5SovQQIU', 'wPb0Er6MG6d9K', 'pVOvhisKbiMVi', 'ly3tQYHmXMsCI', 'I2TqO0oJBaNoc', 'AtzQ6pX6t2aaI'];
var negativeMemes = ['1FR40e3b76Jnq', '47ukyqqk1nEFq', 'zpDJ6gBzsFFx6', 'qEFAJ8GZ0p33y', 'b1VRWNeZbrTos', 'VXoekWrwRUO7S', 'IWBHK9CLAkKPK', 'BF2hDMXteE8O4', 'EtxR8iU8jhw7C', 'nl8gOUtlmHGE0'];

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
    "Question": "Who is son of GlÃ³in, a dwarf?",
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
    "Question": "Who is the Elf co-ruler of LothlÃ³rien, and grandmother of Arwen?",
    "Answer": "Galadriel",
    "Category": "Character"
  },
  {
    "Question": "Who is the Elf co-ruler of LothlÃ³rien, husband of Galadriel, and grandfather of Arwen?",
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
    "Answer": "Arwen UndÃ³miel",
    "Category": "Character"
  },
  {
    "Question": "Who is Frodo's uncle?",
    "Answer": "Bilbo Baggins",
    "Category": "Character"
  },
  {
    "Question": "Who is King of Rohan, ally of Gondor?",
    "Answer": "ThÃ©oden",
    "Category": "Character"
  },
  {
    "Question": "Who is the 3rd Marshal of the Mark and ThÃ©oden's nephew. Later King of Rohan after ThÃ©oden's death?",
    "Answer": "Ã‰omer",
    "Category": "Character"
  },
  {
    "Question": "Who is sister of Ã‰omer, who disguises herself as a male warrior named Dernhelm to fight beside ThÃ©oden?",
    "Answer": "Ã‰owyn",
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
    "Question": "Who is an elf who lives in Rivendell and saves Frodo from the Ringwraiths.?",
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
    "Answer": "The NazgÃ»l or Ringwraiths",
    "Category": "Character"
  },
  {
    "Question": "Who is the Lord of the NazgÃ»l, and Sauron's most powerful servant, who commands Sauron's army?",
    "Answer": "The Witch-king of Angmar",
    "Category": "Character"
  },
  {
    "Question": "Who is a wizard who seeks the One Ring for himself... originally the chief of the order of wizards of which Gandalf is also a member corrupted by Sauron through the palantÃ­r?",
    "Answer": "Saruman the White",
    "Category": "Character"
  },
  {
    "Question": "Who is a secret servant of Saruman and traitor to Rohan, who poisons ThÃ©oden's perceptions with well placed advice?",
    "Answer": "GrÃ­ma Wormtongue",
    "Category": "Character"
  },
  {
    "Question": "Who is a river hobbit originally named SmÃ©agol and an obsessive previous owner of the One Ring, planning to steal it back?",
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
    "Question": "Who is also known as the Lieutenant of Barad-dÃ»r. The chief emissary of Sauron, he confronts the Army of the West outside the Black Gate?",
    "Answer": "Mouth of Sauron",
    "Category": "Character"
  }
];

function prepareQuiz() {
  characterQuestions.sort(function (a, b) { return 0.5 - Math.random() });

  var $defaultDisplay = $('<div>');

  var $introHeading = $('<h2>What lies ahead is the most difficult test all LOTR character Trivia</h2>');
  var $introButton = $('<button type="button" class="btn btn-secondary btn-lg btn-block startGame">');
  $introButton.text('Start Game');

  $defaultDisplay.append($introHeading);
  $defaultDisplay.append($introButton);

  $buttonDisplay.html($defaultDisplay);

}

function askQuestion(questionNumber) {
  $('#questionHeading').html('');
  $buttonDisplay.html('');
  var answersArray = [];
  answersArray.push(questionNumber);

  for (var i = 0; i < 4; i++) {

    while (true) {
      var randomAnswer = Math.floor((Math.random() * characterQuestions.length));
      if (randomAnswer != questionNumber && answersArray.indexOf(randomAnswer) == -1) {
        answersArray.push(randomAnswer);
        break;
      }
    }
  }

  answersArray.sort(function (a, b) { return 0.5 - Math.random() });

  console.log(answersArray);
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
  $('#questionHeading').html($currentQuestion);

  // $questionDisplay.append($);
  var $dynamicDisplay = $('<div>');
  $dynamicDisplay.attr('id','dynamicDisplay');

  $buttonDisplay.append($dynamicDisplay);
  intervalId = setInterval(updateQuestionClock, 1000);
}

function updateQuestionClock() {
  questionTime--;
  $('#dynamicDisplay').html(questionTime);

  if (questionTime == 0) {
    clearInterval(intervalId);
    questionTime = 15;
    negativeResult("Ran out of time!");
  }
}



function positiveResult() {
  clearInterval(intervalId);
  $('button.btn.btn-secondary.btn-lg.btn-block.incorrectAnswer').removeClass('incorrectAnswer');
  $('button.btn.btn-secondary.btn-lg.btn-block.correctAnswer').removeClass('correctAnswer');

  $('#dynamicDisplay').html("You got it right!");

  score++;

  if (indexThroughQuestions < characterQuestions.length - 1) {
    setTimeout(function () { askQuestion(++indexThroughQuestions); }, 5000);
  }
  else {
    endQuiz();
  }
  // load positive meme

}

function negativeResult(reason = "Incorrect Answer!") {
  clearInterval(intervalId);
  $('button.btn.btn-secondary.btn-lg.btn-block.incorrectAnswer').removeClass('incorrectAnswer');
  $('button.btn.btn-secondary.btn-lg.btn-block.correctAnswer').removeClass('correctAnswer');

  $('#dynamicDisplay').html(reason);

  if (indexThroughQuestions < characterQuestions.length - 1) {
    setTimeout(function () { askQuestion(++indexThroughQuestions); }, 5000);
  }
  else {
    endQuiz();
  }
}

$(document).ready(function () {
  prepareQuiz();

  $("body").on("click", "button.btn.btn-secondary.btn-lg.btn-block.startGame", function () {
    askQuestion(indexThroughQuestions);
  });

  $("body").on("click", "button.btn.btn-secondary.btn-lg.btn-block.incorrectAnswer", function () {
    negativeResult();
  });

  $("body").on("click", "button.btn.btn-secondary.btn-lg.btn-block.correctAnswer", function () {
    positiveResult();
  });
});

