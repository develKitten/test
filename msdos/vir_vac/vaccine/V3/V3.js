document.addEventListener("DOMContentLoaded", function () {
  let keys = document.querySelectorAll('.key');
  Dos(document.getElementById("jsdos"), {
    wdosboxUrl: "https://js-dos.com/6.22/current/wdosbox.js",
    cycles: 1000,
    autolock: false,
  }).ready(function (fs, main) {
    fs.extract("https://raw.githack.com/develKitten/test/main/msdos/vir_vac/vaccine/V3/V3.zip").then(function () {
      main(["-c", "v2_test.bat"]).then(function (ci) {
        window.ci = ci;

        keys.forEach((key) => {
          key.addEventListener('click', (event) => {
            let value = event.target.value;

            if (value === "Enter") {
              ci.simulateKeyEvent(13, true);
              ci.simulateKeyEvent(13, false);
            } else if (value === "Backspace") {
              ci.simulateKeyEvent(8, true);
              ci.simulateKeyEvent(8, false);
            } else if (value === "space") {
              ci.simulateKeyEvent(32, true);
              ci.simulateKeyEvent(32, false);
            } else if (value === "dot") {
              ci.simulateKeyEvent(190, true);
              ci.simulateKeyEvent(190, false);
            } else if (value === "bar") {
              ci.simulateKeyEvent(47, true);
              ci.simulateKeyEvent(47, false);
            } else if (value === "col"){
              ci.simulateKeyEvent(16, true);
              ci.simulateKeyEvent(186, true); 
              ci.simulateKeyEvent(186, false); 
              ci.simulateKeyEvent(16, false); 
            } else {
              const upperCaseValue = value.toUpperCase();
              const keyCode = upperCaseValue.charCodeAt(0);
              ci.simulateKeyEvent(keyCode, true);
              ci.simulateKeyEvent(keyCode, false);
            }
          });
        });
      });
    });
  });
  document.querySelector('#jsdos').focus();

});


/* virtual keyboards */

let virtualKeyboard = document.getElementById('virtual-keyboard');

if (/Mobi|Android/i.test(navigator.userAgent)) {
  virtualKeyboard.style.display = 'block';
}

/* Classes */
class DialogBox {
  constructor(messages, characterName) {
    this.messages = messages;
    this.currentMessage = 0;
    this.characterName = characterName;
    this.dialogBox = document.createElement('div');
    this.dialogBox.id = 'dialogBox';
    document.body.appendChild(this.dialogBox);
  }


  render() {
    this.dialogBox.style.display = "block";
    this.dialogBox.innerHTML = `
          <div id="dialogTitle">
              ${this.characterName}
          </div>
          <div id="message" class="textOutput"></div>
          <div id="dialogFooter">
              ${(this.currentMessage === this.messages.length - 1) ? 'Ok' : 'Next'}
          </div>
      `;
    this.dialogBox.classList.remove('offani');
    this.dialogBox.classList.add('onani');
    this.type(this.messages[this.currentMessage].message);
  }

  type(sentence) {
    let i = 0;
    const textOutput = this.dialogBox.querySelector(".textOutput");
    textOutput.innerHTML = "";
    const intervalDuration = 0.05;

    function printCharacter() {
      if (i < sentence.length) {
        textOutput.innerHTML += sentence[i];
        i++;
        setTimeout(printCharacter, intervalDuration);
      }
    }
    printCharacter();
  }

  handleClick() {
    if (this.currentMessage < this.messages.length - 1) {
      this.currentMessage++;
      this.render();
    } else {
      this.dialogBox.classList.remove('onani');
      this.dialogBox.classList.add('offani');

      this.dialogBox.addEventListener('animationend', () => {
        this.dialogBox.style.display = "none";

        // Dispatch dialogEnded event
        this.dialogBox.dispatchEvent(new Event('dialogEnded'));
      }, { once: true });
    }
  }


  bindEvents() {
    if ('ontouchstart' in window) {
      this.dialogBox.addEventListener('touchstart', this.handleClick.bind(this));
    } else {
      this.dialogBox.addEventListener('click', this.handleClick.bind(this));
    }
    document.addEventListener('keydown', (event) => {
      if ((event.code === 'Enter' || event.code === 'Space') && this.dialogBox.querySelector(".textOutput").innerText === this.messages[this.currentMessage].message) {
        this.handleClick();
      }
    });
  }

  start() {
    setTimeout(this.render.bind(this), 1000);
    this.bindEvents();
  }
}

class InteractiveDialogBox extends DialogBox {
  constructor(messages, characterName, expectedRegex) {
    super(messages, characterName);
    this.inputString = '';
    this.expectedRegex = new RegExp(expectedRegex);
    this.result = null;  // Result of the check
  }

  render() {
    this.dialogBox.style.display = "block";
    this.dialogBox.innerHTML = `
          <div id="dialogTitle">
              ${this.characterName}
          </div>
          <div id="message" class="textOutput"></div>
      `;
    this.dialogBox.classList.remove('offani');
    this.dialogBox.classList.add('onani');
    this.type(this.messages[this.currentMessage].message);
  }

  type(sentence) {
    const textOutput = this.dialogBox.querySelector(".textOutput");
    textOutput.innerHTML = sentence;
  }

  checkInput(event) {
    let inputKey = '';

    if (event.type === 'keydown') {
      inputKey = event.key;
    } else if (event.type === 'click') {
      inputKey = event.target.value;
      if (inputKey === "Enter") {
        inputKey = 'Enter';
      } else if (inputKey === "Backspace") {
        inputKey = 'Backspace';
      } else if (inputKey === "space") {
        inputKey = ' ';
      } else if (inputKey === "dot") {
        inputKey = '.';
      }  else if (inputKey === "col") {
        inputKey = ':';
      }
    }

    if (inputKey !== 'Enter') {
      if (inputKey.length === 1 && inputKey !== 'Backspace') {  // Exclude control keys such as 'Backspace'
        this.inputString += inputKey;
      } else if (inputKey === 'Backspace') {
        // If 'Backspace', remove the last character of inputString
        this.inputString = this.inputString.slice(0, -1);
      }
    } else {
      // Compare inputString with expectedRegex
      console.log(this.inputString);
      this.result = this.expectedRegex.test(this.inputString) ? 'ok' : 'no';
      console.log(this.result);
      this.inputString = '';

      // Trigger an event to notify that a check has been made
      this.dialogBox.dispatchEvent(new Event('inputChecked'));

      // After check, close the dialog
      this.dialogBox.classList.remove('onani');
      this.dialogBox.classList.add('offani');
      this.dialogBox.addEventListener('animationend', () => {
        this.dialogBox.style.display = "none";
        // Dispatch dialogEnded event
        this.dialogBox.dispatchEvent(new Event('dialogEnded'));
      }, { once: true });
    }
  }




  handleClick() {
    if (this.currentMessage < this.messages.length - 1) {
      this.currentMessage++;
      this.render();
    } else {
      this.dialogBox.classList.remove('onani');
      this.dialogBox.classList.add('offani');

      this.dialogBox.addEventListener('animationend', () => {
        this.dialogBox.style.display = "none";
        // Dispatch dialogEnded event
        this.dialogBox.dispatchEvent(new Event('dialogEnded'));
      }, { once: true });
    }
  }

  bindEvents() {
    if (!this.boundCheckInput) {
      this.boundCheckInput = event => this.checkInput(event);

      // Listen to virtual keyboard events
      const keys = document.querySelectorAll('.key');
      keys.forEach((key) => {
        key.addEventListener('click', this.boundCheckInput);
      });

      document.addEventListener('keydown', this.boundCheckInput);
    }
  }

  removeEvents() {
    if (this.boundCheckInput) {
      const keys = document.querySelectorAll('.key');
      keys.forEach((key) => {
        key.removeEventListener('click', this.boundCheckInput);
      });

      document.removeEventListener('keydown', this.boundCheckInput);
      this.boundCheckInput = null;
    }
  }


  start() {
    this.removeEvents();

    setTimeout(this.render.bind(this), 1000);
    this.bindEvents();

    // Make start return a Promise that resolves when 'dialogEnded' event is dispatched
    return new Promise(resolve => {
      this.dialogBox.addEventListener('dialogEnded', () => {
        // Remove keydown event listener when dialog is ended
        this.removeEvents();
        resolve(this.result);
      }, { once: true });
    });

  }
}

// dialog
async function handleDialogEnded(initialDialog, reentryMessages, reentryRegex) {
  let result = await initialDialog.start();
  let d;

  do {
    if (result === 'no') {
      if (d) {
        d.removeEvents();
        d = null;
      }

      d = new InteractiveDialogBox(reentryMessages, "가이드", reentryRegex);
      result = await d.start();
    }
  } while (result === 'no');

  initialDialog.removeEvents();
  initialDialog = null;

  if (d) {
    d.removeEvents();
    d = null;
  }
}

let dialogInterMessages_1 = [
  { message: "V3(VACCINE III) 프로그램을 실행시켜봅시다.<br>명령어 : V3 A:", type: 'text' }
];

interDialogBox_1 = new InteractiveDialogBox(dialogInterMessages_1, "가이드", "^(v3|V3|v3.com|V3.COM) (a|A):");

handleDialogEnded(
  interDialogBox_1,
  [{ message: "다시 입력하세요.<br>명령어 : V3 A:", type: 'text' }],
  "^(v3|V3|v3.com|V3.COM) (a|A):"
);