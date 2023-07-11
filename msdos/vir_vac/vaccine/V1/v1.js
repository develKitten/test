document.addEventListener("DOMContentLoaded", function () {
  let keys = document.querySelectorAll('.key');
  Dos(document.getElementById("jsdos"), {
    wdosboxUrl: "https://js-dos.com/6.22/current/wdosbox.js",
    cycles: 1000,
    autolock: false,
  }).ready(function (fs, main) {
    fs.extract("https://raw.githack.com/develKitten/test/main/msdos/vir_vac/vaccine/V1/V1.zip").then(function () {
      main(["-c", "v1.bat"]).then(function (ci) {
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
