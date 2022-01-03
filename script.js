//Selectors
let timeDisplay = document.querySelector(".time");
console.log(timeDisplay);

let startStopButton = document.querySelector(".start");
console.log(startStopButton);

let resetButton = document.querySelector(".reset");
console.log(resetButton);

var stopWatch = {
  start: 0,
  count: 0,
};
//Event Listeners
startStopButton.addEventListener("click", startStop);

//Functions

function startStop() {
  if (startStopButton.classList.contains("start")) {
    startStopButton.classList.remove("start");
    startStopButton.classList.add("stop");
    startTimer();
  } else {
    startStopButton.classList.remove("stop");
    startStopButton.classList.add("start");
    stopTimer();
  }
}

function startTimer() {
  console.log("startTimer");
}

function stopTimer() {
  console.log("stopTimer");
}
