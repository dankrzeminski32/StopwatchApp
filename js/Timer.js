export default class Timer {
  constructor(root) {
    root.innerHTML = Timer.getHTML();

    this.el = {
      minutes: root.querySelector(".timer__part--minutes"),
      seconds: root.querySelector(".timer__part--seconds"),
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
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;

    this.el.minutes.textContent = minutes.toString().padStart(2, "0");
    this.el.seconds.textContent = seconds.toString().padStart(2, "0");
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
    if (this.remainingSeconds === 0) return;

    this.interval = setInterval(() => {
      this.remainingSeconds--;
      this.updateInterfaceTime();

      if (this.remainingSeconds === 0) {
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
    this.el.resetConfirm.addEventListener("click", () => {
      if (inputMinutes < 60) {
        this.stop();
        this.remainingSeconds = inputMinutes * 60;
        this.updateInterfaceTime();
      }
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
              <span class="timer__part timer__part--minutes">00</span>
              <span class="timer__part">:</span>
              <span class="timer__part timer__part--seconds">00</span>
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
                      id="hourInput"
                      type="number"
                      data-hours
                      placeholder="00"
                      min="0"
                    />
                    <p>HRS</p>
                  </div>
                  :
                  <div id="addMinutes">
                    <input
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
                      id="secondInput"
                      type="number"
                      data-seconds
                      placeholder="00"
                      min="0"
                    />
                    <p>SECS</p>
                  </div>
                </div>
                <button data-add-new-timer id="addNewTimer">Add Timer</button>
              </div>
            </div>
            <div id="overlay"></div>
          </div>
          `;
  }
}

new Timer(document.querySelector(".timer"));
