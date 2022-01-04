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

var interval = null;
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

//use intervals to add to stopwatch.count
//when you hit 60, then add to minutes... etc

//May not need to use?
function startTimer() {
  interval = setInterval(function () {
    stopWatch.count++;
    console.log(stopWatch.count);
  }, 1000);
}

function stopTimer() {
  console.log("stopTimer");
  clearInterval(interval);
}
