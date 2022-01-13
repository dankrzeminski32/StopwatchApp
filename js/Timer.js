export default class Timer {
  constructor(root) {
    root.innerHTML = Timer.getHTML();

    this.el = {
      useHours: 0,
      useMinutes: 0,
      useSeconds: 0,
      hours: root.querySelector(".timer__part--hours"),
      minutes: root.querySelector(".timer__part--minutes"),
      seconds: root.querySelector(".timer__part--seconds"),
      hoursDisplay: root.querySelector(".timerHoursDisplay"),
      secondsDisplay: root.querySelector(".timer__part--secondsDisplay"),
      minutesDisplay: root.querySelector(".timer__part--minutesDisplay"),
      control: root.querySelector(".timer__btn--control"),
      reset: root.querySelector(".timer__btn--reset"),
      modal: root.querySelector(".modal"),
      modalClose: root.querySelector(".close-button"),
      overlay: root.querySelector("#overlay"),
      resetConfirm: root.querySelector("#addNewTimer"),
    };

    this.interval = null;
    this.remainingSeconds = 0;

    this.el.control.addEventListener("click", () => {
      if (this.interval === null) {
        this.start();
      } else {
        this.stop();
      }
    });

    this.el.reset.addEventListener("click", () => {
      this.openModal();
    });
  }

  updateInterfaceTime() {
    console.log("AMOUNT OF HOURS:", this.el.useHours);
    var h = this.el.useHours;
    var m = this.el.useMinutes;
    var s = this.el.useSeconds;

    // const this.el.hoursDisplayText = document.createTextNode(
    //   h.toString().padStart(2, "0") + ":"
    // );
    var targetTimer = document.querySelector(".timer");

    if (this.el.useHours > 0) {
      this.el.hoursDisplay.style.display = "inline-block";
      if (this.el.useSeconds > 0) {
        console.log("1");
        this.el.useSeconds -= 1;
        this.el.hoursDisplay.textContent = h.toString().padStart(2, "0") + ":";
        this.el.minutesDisplay.textContent = m.toString().padStart(2, "0");
        this.el.secondsDisplay.textContent = s.toString().padStart(2, "0");
      } else if (this.el.useMinutes > 0) {
        console.log("2");
        this.el.useMinutes -= 1;
        this.el.useSeconds += 59;
        this.el.hoursDisplay.textContent = h.toString().padStart(2, "0") + ":";
        this.el.minutesDisplay.textContent = m.toString().padStart(2, "0");
        this.el.secondsDisplay.textContent = s.toString().padStart(2, "0");
      } else if (this.el.useHours > 0) {
        this.el.useHours -= 1;
        this.el.useMinutes += 59;
        this.el.useSeconds += 59;
        this.el.hoursDisplay.textContent = h.toString().padStart(2, "0") + ":";
        this.el.minutesDisplay.textContent = m.toString().padStart(2, "0");
        this.el.secondsDisplay.textContent = s.toString().padStart(2, "0");
      }
    } else if (this.el.useMinutes + this.el.useSeconds > 0) {
      this.el.hoursDisplay.style.display = "none";

      if (this.el.useSeconds > 0) {
        console.log("1");
        this.el.useSeconds -= 1;
        this.el.hoursDisplay.textContent = h.toString().padStart(2, "0") + ":";
        this.el.minutesDisplay.textContent = m.toString().padStart(2, "0");
        this.el.secondsDisplay.textContent = s.toString().padStart(2, "0");
      } else if (this.el.useMinutes > 0) {
        console.log("2");
        this.el.useMinutes -= 1;
        this.el.useSeconds += 59;
        this.el.minutesDisplay.textContent = m.toString().padStart(2, "0");
        this.el.secondsDisplay.textContent = s.toString().padStart(2, "0");
      }
    }
    //console.log(targetTimer);
    //this.el.minutesDisplay.textContent = m.toString().padStart(2, "0");
    //this.el.secondsDisplay.textContent = s.toString().padStart(2, "0");
  }

  updateInterfaceControls() {
    if (this.interval === null) {
      this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
      this.el.control.classList.add("timer__btn--start");
      this.el.control.classList.remove("timer__btn--stop");
    } else {
      this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
      this.el.control.classList.add("timer__btn--stop");
      this.el.control.classList.remove("timer__btn--start");
    }
  }

  start() {
    if (this.el.useMinutes + this.el.useSeconds + this.el.useHours === 0)
      return;

    this.interval = setInterval(() => {
      this.updateInterfaceTime();

      if (this.el.useMinutes + this.el.useSeconds + this.el.useHours === 0) {
        this.stop();
      }
    }, 1000);

    this.updateInterfaceControls();
  }

  stop() {
    clearInterval(this.interval);

    this.interval = null;

    this.updateInterfaceControls();
  }

  openModal() {
    if (this.el.modal == null) return;
    this.el.modal.classList.add("active");
    this.el.overlay.classList.add("active");
    //this.el.seconds.defaultValue = 0;
    //this.el.minutes.defaultValue = 0;
    //this.el.hours.defaultValue = 0;

    this.el.resetConfirm.addEventListener("click", () => {
      //grab the hours mins and seconds input
      // Convert into minutes and seconds...
      //Update interface time

      this.stop();
      console.log(this.el.hours);
      this.el.useHours = parseInt(this.el.hours.value) || 0;
      this.el.useMinutes = parseInt(this.el.minutes.value) || 0;
      this.el.useSeconds = parseInt(this.el.seconds.value) || 0;

      console.log(this.el.useHours);
      console.log(this.el.useMinutes);
      console.log(this.el.useSeconds);

      this.updateInterfaceTime();
      this.closeModal();
    });
    this.el.modalClose.addEventListener("click", () => {
      this.closeModal();
    });
  }

  closeModal() {
    if (this.el.modal == null) return;
    this.el.modal.classList.remove("active");
    this.el.overlay.classList.remove("active");
  }

  static getHTML() {
    return `
              <span class="timerHoursDisplay">00</span>
              <span class="timer__part timer__part--minutesDisplay">00</span>
              <span class="timer__part">:</span>
              <span class="timer__part timer__part--secondsDisplay">00</span>
              <button type="button" class="timer__btn timer__btn--control timer__btn--start">
                  <span class="material-icons">play_arrow</span>
              </button>
              <button type="button" class="timer__btn timer__btn--reset">
                  <span class="material-icons">timer</span>
              </button>

              <div class="modal" id="modal">
              <div class="modal-header">
                <div class="title">Edit Timer</div>
                <button data-close-button class="close-button">&times;</button>
                </div>

                <div class="modal-body">
                <div id="addTitle">

              </div>
                <div class="addTimer">

                  <div id="addHours">
                    <input
                      class="timer__part--hours"
                      id="hourInput"
                      type="number"
                      data-hours
                      placeholder="00
                      min="0"
                    />
                    <p>HRS</p>
                  </div>
                  :
                  <div id="addMinutes">
                    <input
                      class="timer__part--minutes"
                      id="minuteInput"
                      type="number"
                      data-minutes
                      placeholder="00"
                      min="0"
                    />
                    <p>MINS</p>
                  </div>
                  :
                  <div id="addSeconds">
                    <input
                      class="timer__part--seconds"
                      id="secondInput"
                      type="number"
                      data-seconds
                      placeholder="00"
                      min="0"
                    />
                    <p>SECS</p>
                  </div>
                </div>
                <button data-add-new-timer id="addNewTimer">Update Timer</button>
              </div>
            </div>
            <div id="overlay"></div>
          </div>
          `;
  }
}

new Timer(document.querySelector(".timer"));
