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
const timerBackButton = document.querySelector("#timer-back-button");
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");
const inputHours = document.querySelector("[data-hours]");
const inputMinutes = document.querySelector("[data-minutes]");
const inputSeconds = document.querySelector("[data-seconds]");
const inputTitle = document.querySelector("[data-title]");
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

localStorage.clear();
//Event Listeners
startStopButton.addEventListener("click", startStop);
resetButton.addEventListener("click", resetStopwatch);
stopwatchButton.addEventListener("click", selectStopwatch);
timerButton.addEventListener("click", selectTimer);
timerList.addEventListener("click", startCountingDown);
//timerList.addEventListener("click", stopCountingDown);
timerList.addEventListener("click", resetTimer);
document.addEventListener("DOMContentLoaded", getTimers);
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
  timerView.style.display = "block";
  stopwatchView.style.display = "none";
}

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
  inputSeconds.value = 0;
  inputMinutes.value = 0;
  inputHours.value = 0;
  inputTitle.value = "";
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
  inputSeconds.value = 0;
  inputMinutes.value = 0;
  inputHours.value = 0;
  inputTitle.value = "";
}

function addNewTimers() {
  let timer = {
    intervalID: 0,
    paused: true,
    originalHours: 0,
    originalMinutes: 0,
    originalSeconds: 0,
    title: "",
    countHours: 0,
    countMinutes: 0,
    countSeconds: 0,
  };

  timer.countHours = Math.abs(inputHours.value);
  timer.countMinutes = Math.abs(inputMinutes.value);
  timer.countSeconds = Math.abs(inputSeconds.value);
  timer.originalHours = Math.abs(inputHours.value);
  timer.originalMinutes = Math.abs(inputMinutes.value);
  timer.originalSeconds = Math.abs(inputSeconds.value);
  timer.title = titleInput.value;

  var timers;

  if (localStorage.getItem("timers") === null) {
    timers = [];
  } else {
    timers = JSON.parse(localStorage.getItem("timers"));
  }

  let timerUniqueValue = true;

  timers.forEach(function (timer) {
    if (timer.title == titleInput.value) {
      alert("Please make each timer have a unique title.");
      timerUniqueValue = false;
    }
  });

  if (timerUniqueValue == true) {
    timers.push(timer);
    localStorage.setItem("timers", JSON.stringify(timers));
    newTimerDisplay = document.createElement("li");
    timerSeconds = timer.countSeconds.toString().padStart(2, "0");
    timerMinutes = timer.countMinutes.toString().padStart(2, "0");
    timerHours = timer.countHours.toString().padStart(2, "0");
    newTime = timerHours + ":" + timerMinutes + ":" + timerSeconds;
    newTimerDisplay.innerHTML = `
    <h1 class="timer-title">${timer.title}</h1>
    <div class="timer-container">
   <h1 class="timer-display">${newTime}</h1>
   <button class="edit-button" data-modal-target="#modal">Edit</button>
   <button class="play-button" data-play-button></button>
   <button class="reset-timer" data-reset-button>Reset</button>
 </div>`;
    newTimerDisplay.classList.add("timer-item");
    timerList.appendChild(newTimerDisplay);
  }
}

function getTimers() {
  let timers;

  if (localStorage.getItem("timers") === null) {
    timers = [];
    let originalTimer = {
      intervalID: 0,
      paused: true,
      originalHours: 0,
      originalMinutes: 5,
      originalSeconds: 0,
      title: "Timer1",
      countHours: 0,
      countMinutes: 5,
      countSeconds: 0,
    };
    timers.push(originalTimer);
    localStorage.setItem("timers", JSON.stringify(timers));
  } else {
    timers = JSON.parse(localStorage.getItem("timers"));
  }

  timers.forEach(function (timer) {
    newTimerDisplay = document.createElement("li");
    timerSeconds = timer.countSeconds.toString().padStart(2, "0");
    timerMinutes = timer.countMinutes.toString().padStart(2, "0");
    timerHours = timer.countHours.toString().padStart(2, "0");
    newTime = timerHours + ":" + timerMinutes + ":" + timerSeconds;
    newTimerDisplay.innerHTML = `
    <h1 class="timer-title">${timer.title}</h1>
    <div class="timer-container">
     <h1 class="timer-display">${newTime}</h1>
     <button class="edit-button" data-modal-target="#modal">Edit</button>
     <button class="play-button" data-play-button></button>
     <button class="reset-timer" data-reset-button>Reset</button>
   </div>`;

    newTimerDisplay.classList.add("timer-item");

    timerList.appendChild(newTimerDisplay);
  });
}

function startCountingDown(event) {
  if (
    event.target &&
    event.target.matches("[data-play-button]") &&
    event.target.classList.contains("play-button")
  ) {
    console.log("THIS IS RUNNING AGAININNNN");

    let relativeTimerTitle =
      event.target.parentElement.previousElementSibling.innerText;

    let timers = JSON.parse(localStorage.getItem("timers"));

    let relativeTimerIndex;

    for (let i = 0; i < timers.length; i++) {
      if (timers[i].title == relativeTimerTitle) {
        relativeTimerIndex = i;
        break;
      } else {
        continue;
      }
    }

    let thisTimer = timers[relativeTimerIndex];
    let timerDisplay;
    thisTimer.paused = false;
    console.log("THIS IS RUNNING EVERYTIME");
    localStorage.setItem("timers", JSON.stringify(timers));
    timerDisplay = event.target.previousElementSibling.previousElementSibling;

    event.target.classList.remove("play-button");
    event.target.classList.add("stopTimer");
    console.log(event.target);

    countDown = setInterval(() => {
      let relativeTimerTitle =
        event.target.parentElement.previousElementSibling.innerText;

      let timers = JSON.parse(localStorage.getItem("timers"));

      let relativeTimerIndex;

      for (let i = 0; i < timers.length; i++) {
        if (timers[i].title == relativeTimerTitle) {
          relativeTimerIndex = i;
          break;
        } else {
          continue;
        }
      }

      let thisTimer = timers[relativeTimerIndex];
      thisTimer.intervalID = countDown;
      console.log(thisTimer, countDown);
      if (
        thisTimer.countHours + thisTimer.countMinutes + thisTimer.countSeconds >
          0 &&
        thisTimer.paused == false
      ) {
        console.log("CONDITIONS ARE TRUE", thisTimer);
        if (thisTimer.countSeconds > 0) {
          thisTimer.countSeconds -= 1;
          timerSeconds = thisTimer.countSeconds.toString().padStart(2, "0");
          timerMinutes = thisTimer.countMinutes.toString().padStart(2, "0");
          timerHours = thisTimer.countHours.toString().padStart(2, "0");
          timerDisplay.innerText =
            timerHours + ":" + timerMinutes + ":" + timerSeconds;
        } else if (thisTimer.countMinutes > 0) {
          thisTimer.countMinutes -= 1;
          thisTimer.countSeconds += 59;
          timerMinutes = thisTimer.countMinutes.toString().padStart(2, "0");
          timerSeconds = thisTimer.countSeconds.toString().padStart(2, "0");
          timerDisplay.innerText =
            timerHours + ":" + timerMinutes + ":" + timerSeconds;
        } else {
          thisTimer.countHours -= 1;
          thisTimer.countMinutes += 59;
          thisTimer.countSeconds += 59;
          timerSeconds = thisTimer.countSeconds.toString().padStart(2, "0");
          timerMinutes = thisTimer.countMinutes.toString().padStart(2, "0");
          timerHours = thisTimer.countHours.toString().padStart(2, "0");
          timerDisplay.innerText =
            timerHours + ":" + timerMinutes + ":" + timerSeconds;
        }
      } else {
        clearInterval(countDown);
      }
      localStorage.setItem("timers", JSON.stringify(timers));
    }, 5000);
  } else if (event.target.classList.contains("stopTimer")) {
    console.log("STOP");
    let relativeTimerTitle =
      event.target.parentElement.previousElementSibling.innerText;
    console.log(relativeTimerTitle);
    let timers = JSON.parse(localStorage.getItem("timers"));

    let relativeTimerIndex;

    for (let i = 0; i < timers.length; i++) {
      if (timers[i].title == relativeTimerTitle) {
        relativeTimerIndex = i;
        break;
      } else {
        continue;
      }
    }
    console.log(relativeTimerIndex);
    let thisTimer = timers[relativeTimerIndex];
    thisTimer.paused = true;
    localStorage.setItem("timers", JSON.stringify(timers));
    event.target.classList.remove("stopTimer");
    event.target.classList.add("play-button");
  }
}

function resetTimer(event) {
  if (event.target && event.target.matches("[data-reset-button]")) {
    console.log("THIS SHOULD NOT BE RUNNNING");
    relativeTimerTitle =
      event.target.parentElement.previousElementSibling.innerText;

    var timers = JSON.parse(localStorage.getItem("timers"));

    let relativeTimerIndex;

    for (let i = 0; i < timers.length; i++) {
      if (timers[i].title == relativeTimerTitle) {
        relativeTimerIndex = i;
        break;
      } else {
        continue;
      }
    }

    let timerDisplay;
    let thisTimer = timers[relativeTimerIndex];

    thisTimer.countMinutes = thisTimer.originalMinutes;
    thisTimer.countSeconds = thisTimer.originalSeconds;
    thisTimer.countHours = thisTimer.originalHours;

    localStorage.setItem("timers", JSON.stringify(timers));

    timerDisplay =
      event.target.previousElementSibling.previousElementSibling
        .previousElementSibling;

    timerSeconds = thisTimer.countSeconds.toString().padStart(2, "0");
    timerMinutes = thisTimer.countMinutes.toString().padStart(2, "0");
    timerHours = thisTimer.countHours.toString().padStart(2, "0");
    timerDisplay.innerText =
      timerHours + ":" + timerMinutes + ":" + timerSeconds;
  } else {
    return;
  }
}
