//GIVEN I am taking a code quiz
//WHEN I click the start button
//THEN a timer starts and I am presented with a question
//WHEN I answer a question
//THEN I am presented with another question
//WHEN I answer a question incorrectly
//THEN time is subtracted from the clock
//WHEN all questions are answered or the timer reaches 0
//THEN the game is over
//WHEN the game is over
//THEN I can save my initials and score

//Declare variables//
var time = 20;
// var scoreEl = getElementById("score").innerHTML;
// scoreEl.value = "The socre goes here";
var quizTime = time;
var quizTimer;

// Create a quiz class
class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
  }

  getQuestionIndex() {
    return this.questions[this.questionIndex];
  }
  guess(answer) {
    if (this.getQuestionIndex().answer == answer) {
      this.score++;
    } else {
      this.score--;
      clearInterval(quizTimer);
      console.log(time - 20);
      startCountdown(time - 20);
    }
    this.questionIndex++;
  }

  isEnded() {
    return this.questionIndex === this.questions.length;
  }
}

//create question class
class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }

  isCorrectAnwer(choice) {
    return this.answer === choice;
  }
}

//Show Question//
function displayQuestion() {
  if (quiz.isEnded()) {
    showScores();
  } else {
    let questionElement = document.getElementById("question");
    questionElement.innerHTML = quiz.getQuestionIndex().text;
    //options//
    let choices = quiz.getQuestionIndex().choices;
    for (let i = 0; i < choices.length; i++) {
      let choiceElement = document.getElementById("choice" + i);
      choiceElement.innerHTML = choices[i];
      guess("btn" + i, choices[i]);
    }

    progressStatus();
  }
}

//Guess//

function guess(id, guess) {
  let button = document.getElementById(id);
  button.onclick = function () {
    //why does this return null?//
    quiz.guess(guess);
    displayQuestion();

    // startCountdown(quizTime);
  };
}

//status//
function progressStatus() {
  let currentQuestionNumber = quiz.questionIndex + 1;
  let progressElement = document.getElementById("progress");
  progressElement.innerHTML = `Question ${currentQuestionNumber} of ${quiz.questions.length} 
 `;
}

//scores//
function showScores() {
  let quizEndHTML = `
<h1>0</h1>
<h2 id="end-text"Enter your initials to save your score: ${quiz.score} of ${quiz.questions.length}</h2>
<a href="end.html">Take Quiz Again</a>
`;
  let questionElement = document.getElementById("quiz");
  quizElement.innerHTML = quizEndHTML;
}
let questions = [
  new Question(
    "Who was the legendary Benedictine monk who invented champagne?",
    ["Don King", "Dom Perignon", "Dom Jean", "Don Juan"],
    "Dom Perignon"
  ),

  new Question(
    "In the Solar System, which is the hottest planet?",
    ["Earth", "Mercury", "Venus", "Saturn"],
    "Venus"
  ),

  new Question(
    "What is the name of the world’s largest island?",
    ["Iceland", "Greenland", "Maryland", "England"],
    "Greenland"
  ),

  new Question(
    "Who was the first actor to have played the role of James Bond in the movie series?",
    ["Roger Moore", "Daniel Craig", "Sir Sean Connery", "Timothy Dalton"],
    "Sir Sean Connery"
  ),
];

let quiz = new Quiz(questions);

displayQuestion();

//Timer//
let quizTimeInMinutes = time * 60 * 60;

let counting = document.getElementById("count-down");
var startCountdown = function (quizTime) {
  quizTimer = setInterval(function () {
    if (quizTime <= 0) {
      clearInterval(quizTimer);
      window.location.href = "end.html";

      var scoreEl = document.getElementById("score");
      console.log(scoreEl.value);

      time = quizTime;
    } else {
      quizTime--;
      time = quizTime;
      counting.innerText = quizTime;
    }
  }, 1000);
};

startCountdown(15);
