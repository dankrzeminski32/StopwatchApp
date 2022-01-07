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
var timerDisplay = document.querySelector(".timer-display");
const timerBackButton = document.querySelector("#timer-back-button");
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");
const inputHours = document.querySelector("[data-hours]");
const inputMinutes = document.querySelector("[data-minutes]");
const inputSeconds = document.querySelector("[data-seconds]");
const addNewTimer = document.querySelectorAll("[data-add-new-timer]");
const playTimer = document.querySelector("[data-play-button]");
const timerList = document.querySelector("[data-timer-list]");

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
stopwatchBackButton.addEventListener("click", goBackFromStopwatch);
timerButton.addEventListener("click", selectTimer);
timerBackButton.addEventListener("click", goBackFromTimer);
timerList.addEventListener("click", startCountingDown);
// playTimer.addEventListener("click", startCountingDown);

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

addNewTimer.forEach((newTimer) => {
  newTimer.addEventListener("click", () => {
    const modal = newTimer.closest(".modal");
    addNewTimers();
    closeModal(modal);
  });
});

//Functions
//start our stopwatch display as 00:00.00
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

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

function addNewTimers() {
  let timer = {
    countHours: 0,
    countMinutes: 0,
    countSeconds: 0,
  };

  timer.countHours = Math.abs(inputHours.value);
  timer.countMinutes = Math.abs(inputMinutes.value);
  timer.countSeconds = Math.abs(inputSeconds.value);

  if (localStorage.getItem("timers") == "") {
    let timers = [];
    localStorage.setItem("timers", JSON.stringify(timers));
    localStorage.push;
  } else {
  }
}

// function addNewTimers() {
//   timer.countHours = Math.abs(inputHours.value);
//   timer.countMinutes = Math.abs(inputMinutes.value);
//   timer.countSeconds = Math.abs(inputSeconds.value);
//   timerSeconds = timer.countSeconds.toString().padStart(2, "0");
//   timerMinutes = timer.countMinutes.toString().padStart(2, "0");
//   timerHours = timer.countHours.toString().padStart(2, "0");
//   newTimerDisplay = document.createElement("li");
//   newTime = timerHours + ":" + timerMinutes + ":" + timerSeconds;
//   newTimerDisplay.innerHTML = `
//   <div class="timer-container">
//     <button data-modal-target="#modal">Add New Timer</button>
//     <h1 class="timer-display">${newTime}</h1>
//     <button data-modal-target="#modal">Edit</button>
//     <button data-play-button>Play</button>
//   </div>`;
//   timerList.appendChild(newTimerDisplay);
//   inputSeconds.value = 0;
//   inputMinutes.value = 0;
//   inputHours.value = 0;
// }

function startCountingDown(event) {
  if (event.target && event.target.matches("[data-play-button]")) {
    relativeTimerPlayButton = event.target;
    console.log(relativeTimerPlayButton);
    timeDisplayed = relativeTimerPlayButton.parentNode.children[1];
    hours = timeDisplayed.innerHTML.split(":")[0];
    intHours = parseInt(hours);
    console.log(intHours);
    //Minutes
    Minutes = timeDisplayed.innerHTML.split(":")[1];
    intMinutes = parseInt(Minutes);
    console.log(intMinutes);
    //Seconds
    Seconds = timeDisplayed.innerHTML.split(":")[2];
    intSeconds = parseInt(Seconds);
    console.log(intSeconds);

    let thisTimer = {
      countSeconds: intSeconds,
      countMinutes: intMinutes,
      countHours: intHours,
    };

    timerDisplay = relativeTimerPlayButton.parentNode.children[1];

    var countDown = setInterval(() => {
      console.log("interval not cleared");

      if (
        thisTimer.countHours + thisTimer.countMinutes + thisTimer.countSeconds >
        0
      ) {
        if (thisTimer.countSeconds > 0) {
          console.log("running seconds");
          thisTimer.countSeconds -= 1;
          timerSeconds = thisTimer.countSeconds.toString().padStart(2, "0");
          timerMinutes = thisTimer.countMinutes.toString().padStart(2, "0");
          timerHours = timer.countHours.toString().padStart(2, "0");
          timerDisplay.innerHTML =
            timerHours + ":" + timerMinutes + ":" + timerSeconds;
        } else if (timer.countMinutes > 0) {
          thisTimer.countMinutes -= 1;
          thisTimer.countSeconds += 59;
          timerMinutes = thisTimer.countMinutes.toString().padStart(2, "0");
          timerSeconds = thisTimer.countSeconds.toString().padStart(2, "0");
          timerDisplay.innerHTML =
            timerHours + ":" + timerMinutes + ":" + timerSeconds;
        } else {
          thisTimer.countHours -= 1;
          thisTimer.countMinutes += 59;
          thisTimer.countSeconds += 59;
          timerSeconds = timer.countSeconds.toString().padStart(2, "0");
          timerMinutes = timer.countMinutes.toString().padStart(2, "0");
          timerHours = timer.countHours.toString().padStart(2, "0");
          timerDisplay.innerHTML =
            timerHours + ":" + timerMinutes + ":" + timerSeconds;
        }
      } else {
        console.log("interval not cleared");
        clearInterval(countDown);
        return;
      }
    }, 1000);
  }
}
