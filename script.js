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
    let interval = setInterval(function () {
      stopWatch.count++;
    }, 1000);
  } else {
    startStopButton.classList.remove("stop");
    startStopButton.classList.add("start");
    clearInterval(interval);
  }
}

//use intervals to add to stopwatch.count
//when you hit 60, then add to minutes... etc

//May not need to use?
function startTimer() {
  let interval = setInterval(function () {
    stopWatch.count++;
  }, 1000);
}

function stopTimer() {
  console.log("stopTimer");
  clearInterval(interval);
}
