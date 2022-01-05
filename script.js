//Selectors
let timeDisplay = document.querySelector(".time");
let startStopButton = document.querySelector(".start");
let resetButton = document.querySelector(".reset");
let stopwatchButton = document.querySelector("#stopwatch-button");
let timerButton = document.querySelector("#timer-button");
let timerView = document.querySelector("#timerView");
let homeScreen = document.querySelector("#home-screen");
let stopwatchView = document.querySelector("#stopwatch");
let stopwatchBackButton = document.querySelector("#stopwatch-back-button");
let timerDisplay = document.querySelector(".timer-display");
let timerBackButton = document.querySelector("#timer-back-button");

var stopWatch = {
  countMilSeconds: 0.0,
  countSeconds: 0,
  countMinutes: 0,
  countHours: 0,
};

var timer = {
  countSeconds: 0,
  countMinutes: 0,
  countHours: 0,
};

var interval = null;

//Event Listeners
startStopButton.addEventListener("click", startStop);
resetButton.addEventListener("click", resetTimer);
stopwatchButton.addEventListener("click", selectStopwatch);
stopwatchBackButton.addEventListener("click", goBackFromStopwatch);
timerButton.addEventListener("click", selectTimer);
timerBackButton.addEventListener("click", goBackFromTimer);
//Functions

//start our stopwatch display as 00:00.00
milliseconds = stopWatch.countMilSeconds.toString().padStart(2, "0");
seconds = stopWatch.countSeconds.toString().padStart(2, "0");
minutes = stopWatch.countMinutes.toString().padStart(2, "0");
timeDisplay.innerHTML = minutes + ":" + seconds + "." + milliseconds;

//start our timer display as 00:00.00
timerSeconds = timer.countSeconds.toString().padStart(2, "0");
timerMinutes = timer.countMinutes.toString().padStart(2, "0");
timerHours = timer.countHours.toString().padStart(2, "0");
timerDisplay.innerHTML = timerHours + ":" + timerMinutes + ":" + timerSeconds;

//This is for switching start -> stop view when someone clicks the button
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

// run this function every ms to update the clock for the stopwatch
function startTimer() {
  interval = setInterval(function () {
    if (stopWatch.countHours > 0) {
      //add hours to the display only if we have to
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
      //If we only have minutes do not display hours.
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

//Stop running the startTimer function every ms
function stopTimer() {
  clearInterval(interval);
}

//reset our stopwatch values to 0, and update our display
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

//display our stopwatch screen and hide our home screen
function selectStopwatch() {
  stopwatchView.style.display = "block";
  homeScreen.style.display = "none";
}

//navigate back to our homescreen from our stopwatch view
function goBackFromStopwatch() {
  stopwatchView.style.display = "none";
  homeScreen.style.display = "flex";
  resetTimer();
}

//display our timer screen and hide our home homeScreen
function selectTimer() {
  timerView.style.display = "block";
  homeScreen.style.display = "none";
}

function goBackFromTimer() {
  timerView.style.display = "none";
  homeScreen.style.display = "flex";
}
