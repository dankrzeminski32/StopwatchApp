//Selectors
let timeDisplay = document.querySelector(".time");
let startStopButton = document.querySelector(".start");
let resetButton = document.querySelector(".reset");
let stopwatchButton = document.querySelector("#stopwatch-button");
let timerButton = document.querySelector("#timer-button");
let homeScreen = document.querySelector("#home-screen");
let stopwatchView = document.querySelector("#stopwatch");
let backButton = document.querySelector(".back-button");

var stopWatch = {
  countMilSeconds: 0.0,
  countSeconds: 0,
  countMinutes: 0,
  countHours: 0,
};

var interval = null;

//Event Listeners
startStopButton.addEventListener("click", startStop);
resetButton.addEventListener("click", resetTimer);
stopwatchButton.addEventListener("click", selectStopwatch);
backButton.addEventListener("click", goBack);

//Functions

milliseconds = stopWatch.countMilSeconds.toString().padStart(2, "0");
seconds = stopWatch.countSeconds.toString().padStart(2, "0");
minutes = stopWatch.countMinutes.toString().padStart(2, "0");
timeDisplay.innerHTML = minutes + ":" + seconds + "." + milliseconds;

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
    if (stopWatch.countHours > 0) {
      stopWatch.countMilSeconds += 1;
      milliseconds = stopWatch.countMilSeconds.toString().padStart(2, "0");
      seconds = stopWatch.countSeconds.toString().padStart(2, "0");
      minutes = stopWatch.countMinutes.toString().padStart(2, "0");
      hours = stopWatch.countHours.toString().padStart(2, "0");
      timeDisplay.innerHTML =
        hours + ":" + minutes + ":" + seconds + "." + milliseconds;
      if (milliseconds === "100") {
        stopWatch.countSeconds += 1;
        stopWatch.countMilSeconds = 0;
      }
      if (seconds === "60") {
        stopWatch.countMinutes += 1;
        stopWatch.countSeconds = 0;
      }
      if (minutes === "60") {
        stopWatch.countHours += 1;
        stopWatch.countMinutes = 0;
      }
    } else {
      stopWatch.countMilSeconds += 1;
      milliseconds = stopWatch.countMilSeconds.toString().padStart(2, "0");
      seconds = stopWatch.countSeconds.toString().padStart(2, "0");
      minutes = stopWatch.countMinutes.toString().padStart(2, "0");
      timeDisplay.innerHTML = minutes + ":" + seconds + "." + milliseconds;
      if (milliseconds === "100") {
        stopWatch.countSeconds += 1;
        stopWatch.countMilSeconds = 0;
      }
      if (seconds === "60") {
        stopWatch.countMinutes += 1;
        stopWatch.countSeconds = 0;
      }
      if (minutes === "60") {
        stopWatch.countHours += 1;
        stopWatch.countMinutes = 0;
      }
    }
  }, 1);
}

function stopTimer() {
  console.log("stopTimer");
  clearInterval(interval);
}

function resetTimer() {
  stopWatch.countHours = 0;
  stopWatch.countMilSeconds = 0;
  stopWatch.countMinutes = 0;
  stopWatch.countSeconds = 0;
  milliseconds = stopWatch.countMilSeconds.toString().padStart(2, "0");
  seconds = stopWatch.countSeconds.toString().padStart(2, "0");
  minutes = stopWatch.countMinutes.toString().padStart(2, "0");
  stopTimer();
  startStopButton.classList.remove("stop");
  startStopButton.classList.add("start");
  timeDisplay.innerHTML = minutes + ":" + seconds + "." + milliseconds;
}

function selectStopwatch() {
  stopwatchView.style.display = "block";
  homeScreen.style.display = "none";
}

function goBack() {
  stopwatchView.style.display = "none";
  homeScreen.style.display = "flex";
  resetTimer();
}
