import Timer from "./Timer.js";

//Selectors
const timeDisplay = document.querySelector(".time");
const startStopButton = document.querySelector(".start");
const resetButton = document.querySelector(".reset");
const stopwatchButton = document.querySelector("#stopwatch-button");
const timerButton = document.querySelector("#timer-button");
const timerView = document.querySelector("#timerView");
const homeScreen = document.querySelector("#home-screen");
const stopwatchView = document.querySelector("#stopwatch");
const stopwatchBackButton = document.querySelector("#stopwatch-back-button");
//var timerDisplay = document.querySelector(".timer-display");
//const timerBackButton = document.querySelector("#timer-back-button");
//const overlay = document.getElementById("overlay");
// const inputHours = document.querySelector("[data-hours]");
// const inputMinutes = document.querySelector("[data-minutes]");
// const inputSeconds = document.querySelector("[data-seconds]");
// const inputTitle = document.querySelector("[data-title]");
//const addNewTimer = document.querySelectorAll("[data-add-new-timer]");
//const playTimer = document.querySelector("[data-play-button]");

var stopWatch = {
  countMilSeconds: 0.0,
  countSeconds: 0,
  countMinutes: 0,
  countHours: 0,
};

var interval = null;

localStorage.clear();
//Event Listeners
startStopButton.addEventListener("click", startStop);
resetButton.addEventListener("click", resetStopwatch);
stopwatchButton.addEventListener("click", selectStopwatch);
timerButton.addEventListener("click", selectTimer);

//Functions
//start our stopwatch display as 00:00.00
let milliseconds;
let seconds;
let minutes;
milliseconds = stopWatch.countMilSeconds.toString().padStart(2, "0");
seconds = stopWatch.countSeconds.toString().padStart(2, "0");
minutes = stopWatch.countMinutes.toString().padStart(2, "0");
timeDisplay.innerHTML = minutes + ":" + seconds + "." + milliseconds;

//start our timer display as 00:00.00
// timerSeconds = timer.countSeconds.toString().padStart(2, "0");
// timerMinutes = timer.countMinutes.toString().padStart(2, "0");
// timerHours = timer.countHours.toString().padStart(2, "0");
// timerDisplay.innerHTML = timerHours + ":" + timerMinutes + ":" + timerSeconds;

//This is for switching start -> stop view when someone clicks the button
function startStop() {
  if (startStopButton.classList.contains("start")) {
    startStopButton.classList.remove("start");
    startStopButton.classList.add("stop");
    startStopwatch();
  } else {
    startStopButton.classList.remove("stop");
    startStopButton.classList.add("start");
    stopStopwatch();
  }
}

// run this function every ms to update the clock for the stopwatch
function startStopwatch() {
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

//Stop running the startStopwatch function every ms
function stopStopwatch() {
  clearInterval(interval);
}

//reset our stopwatch values to 0, and update our display
function resetStopwatch() {
  stopWatch.countHours = 0;
  stopWatch.countMilSeconds = 0;
  stopWatch.countMinutes = 0;
  stopWatch.countSeconds = 0;
  milliseconds = stopWatch.countMilSeconds.toString().padStart(2, "0");
  seconds = stopWatch.countSeconds.toString().padStart(2, "0");
  minutes = stopWatch.countMinutes.toString().padStart(2, "0");
  stopStopwatch();
  startStopButton.classList.remove("stop");
  startStopButton.classList.add("start");
  timeDisplay.innerHTML = minutes + ":" + seconds + "." + milliseconds;
}

//display our stopwatch screen and hide our home screen
function selectStopwatch() {
  stopwatchView.style.display = "block";
  timerView.style.display = "none";
}

//display our timer screen and hide our home homeScreen
function selectTimer() {
  timerView.style.display = "flex";
  stopwatchView.style.display = "none";
}
