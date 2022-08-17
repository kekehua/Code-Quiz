var timerEl = document.getElementById('countdown');
var start = document.getElementById("start");
const main = document.getElementById("main");
var container = document.getElementById("container");
var check = document.getElementById("answerCheck");
const form = document.getElementById("form");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");


let questions = [

  {

      question : "What does HTML stand for?",

      imgSrc : "img/html.png",

      choiceA : "Correct",

      choiceB : "Wrong",

      choiceC : "Wrong",

      choiceD : "Monkies",

      correct : "A"

  },{

      question : "What does CSS stand for?",

      imgSrc : "img/css.png",

      choiceA : "Wrong",

      choiceB : "Correct",

      choiceC : "Wrong",

      choiceD : "Monkies",

      correct : "B"

  },{

      question : "What does JS stand for?",

      imgSrc : "img/js.png",

      choiceA : "Wrong",

      choiceB : "Wrong",

      choiceC : "Correct",

      choiceD : "Monkies",

      correct : "C"

  }

];

const lastQuestion = questions.length - 1;
let runningQuestion = 0;

function renderQuestion(){

    let q = questions[runningQuestion];

   

    main.innerHTML = "<p>"+ q.question +"</p>";


    choiceA.innerHTML = q.choiceA;

    choiceB.innerHTML = q.choiceB;

    choiceC.innerHTML = q.choiceC;

    choiceD.innerHTML = q.choiceD;
};


start.textContent = "START";
var timeLeft = 30;
function countdown() {
    // var timeLeft = 30;
  
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
      // As long as the `timeLeft` is greater than 1
      if (timeLeft > 1) {
        // Set the `textContent` of `timerEl` to show the remaining seconds
        timerEl.textContent = timeLeft ;
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

start.addEventListener("mouseover", function(event){
  
  event.target.style.color= "blue";

});

start.addEventListener("mouseout",function(event){

  event.target.style.color ="";

});
start.addEventListener("click", function() {
    start.style.display="none"; 
    renderQuestion();
    main.style.display = "block";

    countdown();
   
    console.log("this item has been clicked!");
});



function checkAnswer(answer){
  if( answer == questions[runningQuestion].correct){
      // change progress color to green
      answerIsCorrect();
  }else{
      // answer is wrong
      // change progress color to red
      answerIsWrong();
  }
  count = 0;
  if(runningQuestion < lastQuestion){
      runningQuestion++;
      renderQuestion();
  }else{
      // end the quiz and show the score
      quizEnd();
  }
};

// answer is correct
function answerIsCorrect(){
  check.textContent= "Correct!";
}

// answer is Wrong
function answerIsWrong(){
  check.textContent= "Wrong!";
  timeLeft=timeLeft-5;
  console.log(timeLeft);
}

// score render
function quizEnd(){
  localStorage.setItem("score",timeLeft);
  console.log("this works kinda");
  document.getElementById("choices").remove();
  check.remove();
  timerEl.remove();
  main.textContent = "Your score is " + timeLeft + " points!";
  document.getElementById("form").hidden = false;
  const noteInput = document.getElementById("initials");
  form.addEventListener("submit",function(){
    console.log("pain");
    localStorage.setItem("initials",noteInput.value);
    
  })
  
};


