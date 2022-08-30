var timerEl = document.getElementById('countdown');
var start = document.getElementById("start");
const main = document.getElementById("main");
var container = document.getElementById("container");
var check = document.getElementById("answerCheck");
const submit = document.getElementById("submit");
var leader = document.getElementById("leaderboard-card");
var board = document.getElementById("highscore-list");
var back = document.getElementById("back-button");
var clear = document.getElementById("clear-button");
var buttons = document.getElementsByClassName("inline-buttons")
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");

// question bank
let questions = [

  {

    question: "What Color is an Apple?",

    choiceA: "Green",

    choiceB: "Purple",

    choiceC: "Banana",

    choiceD: "Blue",

    correct: "A"

  }, {

    question: "What color is a pear?",

    choiceA: "Magenta",

    choiceB: "Green",

    choiceC: "Pickles",

    choiceD: "Pepperoni",

    correct: "B"

  }, {

    question: "What do Bananas grow on?",

    choiceA: "People",

    choiceB: "Rocks",

    choiceC: "Trees",

    choiceD: "Monkies",

    correct: "C"

  }, {

    question: "What color are blueberries?",

    choiceA: "red",

    choiceB: "red",

    choiceC: "Blue",

    choiceD: "red",

    correct: "C"

  }, {

    question: "Where do you find a pizza?",

    choiceA: "In an apple",

    choiceB: "In a potato",

    choiceC: "At the pizza parlor",

    choiceD: "Monkies",

    correct: "C"

  }, {

    question: "Which of these answers says Correct?",

    choiceA: "Wrong",

    choiceB: "Wrong",

    choiceC: "Correct",

    choiceD: "Monkies",

    correct: "C"

  }, {

    question: "What is 1+1?",

    choiceA: "3",

    choiceB: "123",

    choiceC: "2",

    choiceD: "Monkies",

    correct: "C"

  }, {

    question: "Can you read this question?",

    choiceA: "No",

    choiceB: "I cannot reaD",

    choiceC: "YES",

    choiceD: "Monkies",

    correct: "C"

  }, {

    question: "Do fish eat fruit",

    choiceA: "Yes they eat lots of fruit",

    choiceB: "the primary diet of fish is fruit",

    choiceC: "NO",

    choiceD: "Monkies",

    correct: "C"

  }

];

const lastQuestion = questions.length - 1;
let runningQuestion = 0;

// renders questions
function renderQuestion() {

  let q = questions[runningQuestion];



  main.innerHTML = "<p>" + q.question + "</p>";


  choiceA.innerHTML = q.choiceA;

  choiceB.innerHTML = q.choiceB;

  choiceC.innerHTML = q.choiceC;

  choiceD.innerHTML = q.choiceD;
};

// quiz timer
start.textContent = "START";
var timeLeft = 30;
function countdown() {
  // var timeLeft = 30;

  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = timeLeft;
      // Decrement `timeLeft` by 1
      timeLeft--;
    }
    else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = '';
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      // Call the `quizEnd()` function
      quizEnd();
    }
  }, 1000);
};

// start button color changer
start.addEventListener("mouseover", function (event) {

  event.target.style.color = "blue";

});

start.addEventListener("mouseout", function (event) {

  event.target.style.color = "";

});
start.addEventListener("click", function () {
  start.style.display = "none";
  renderQuestion();
  main.style.display = "block";

  countdown();

  console.log("this item has been clicked!");
});


// answer checker
function checkAnswer(answer) {
  if (answer == questions[runningQuestion].correct) {
    // answer is right
    answerIsCorrect();
  } else {
    // answer is wrong
    answerIsWrong();
  }
  count = 0;
  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  } else {
    // end the quiz and show the score
    quizEnd();
  }
};

// answer is correct
function answerIsCorrect() {
  check.textContent = "Correct!";
}

// answer is Wrong
function answerIsWrong() {
  check.textContent = "Wrong!";
  timeLeft = timeLeft - 5;
  console.log(timeLeft);
}

// score render
function quizEnd() {

  console.log("this works kinda");
  const choice = document.getElementById("choices");
  choice.remove();
  check.remove();
  timerEl.remove();
  if (timeLeft < 0) {
    main.textContent = "Your score is 0 points! Add your score to the leaderboard! It can be seen once you play again!";
  }
  else {
    main.textContent = "Your score is " + timeLeft + " points! Add your score to the leaderboard! It can be seen once you play again!";
  }
  document.getElementById("form").hidden = false;
  const noteInput = document.getElementById("initials");
  submit.addEventListener("click", function () {
    console.log(noteInput.value);
    document.getElementById("form").hidden = true;
    let userScore = {
      scored: timeLeft,
      name: noteInput.value
    }
    if (localStorage.getItem("score")) {
      let score = JSON.parse(localStorage.getItem("score"));
      console.log(score);
      score.push(userScore);
      localStorage.setItem("score", JSON.stringify(score));
    }
    else {
      let score = [];
      score.push(userScore);
      localStorage.setItem("score", JSON.stringify(score));
    }
  })
  let scores = JSON.parse(localStorage.getItem("score"))
  leader.hidden = false;
  scores.forEach(score => {
    board.innerHTML += `
  <h3>initials score</h3>
  ${score.name}
  ${score.scored}
  <hr> </hr>
  `})
};

clear.addEventListener("click", function () {
  console.log("cleared");
  localStorage.clear();
});

back.addEventListener("click", function () {
  console.log("cleared");
  location.reload();
});
