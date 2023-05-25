/* MS-DOS Emulator */
Dos(document.getElementById("jsdos"), {
    wdosboxUrl: "https://js-dos.com/6.22/current/wdosbox.js",
    cycles: 1000,
    autolock: false,
}).ready(function (fs, main) {
  fs.extract("https://raw.githack.com/develKitten/test/main/msdos/vir_vac/virus/pingpong/pingpong.zip").then(function () {
    main(["-c", "pingpong.bat"]).then(function (ci) {
        window.ci = ci;
    });
  });
});

document.querySelector('#jsdos').focus();


/* tutorial box */
let currentMessage = 0;
let characterName = "가이드";
const dialogBox = document.createElement('div');
let interval; // Declare interval variable here to be accessible globally

const messages = [
    { message: '환영합니다, 시간여행자여. 지금 보시는 것은 40년 전의 컴퓨터 환경입니다.', type: 'text' },
    { message: '\'검은 화면에 흰 글자... 이게 컴퓨터 환경이라고?\' 그런 생각이 드실 수 있습니다. 그러나, 이것이 과거의 현실입니다.', type: 'text' },
    { message: '현대의 컴퓨터는 그림 위주로, 누구나 쉽게 다룰 수 있지만, 과거의 컴퓨터는 , 그림을 여러 개 띄울 컴퓨터 환경이 되지 못했습니다', type: 'text' },
    { message: '따라서 사람들은 옛날 환경에서 명령어를 입력해 컴퓨터를 조작했습니다. 즉, 당시 환경을 완전히 이해하려면, 이 명령어들을 배워야 합니다.', type: 'text'},
    { message: '아, 어려워 보인다고요? 걱정 마세요. 여기서는 기본 명령어 4개만 소개하니, 금세 배울 수 있을 겁니다. 시작해볼까요?', type:'text'}
];

function renderDialogBox() {
    dialogBox.innerHTML = `
        <div id="dialogTitle">
            ${characterName}
        </div>
        <div id="message" class="textOutput"></div>
        <div id="dialogFooter">
            ${(currentMessage === messages.length - 1) ? 'Ok' : 'Next'}
        </div>
    `;
    dialogBox.classList.remove('zoomOut');
    dialogBox.classList.add('zoomIn');
    type(messages[currentMessage].message);
}
function type(sentence) {
    let i = 0;
    const textOutput = document.querySelector(".textOutput");
    textOutput.innerHTML = "";

    const intervalDuration = 15;
    clearInterval(interval); // Stop any ongoing text printing

    function printCharacter() {
        if (i < sentence.length) { // If sentence is not yet fully printed
            textOutput.innerHTML += sentence[i];
            i++;
            setTimeout(printCharacter, intervalDuration);
        }
    }
    printCharacter();
}


function handleClick() {
    if (currentMessage < messages.length - 1) {
        currentMessage++;
        renderDialogBox();
        console.log("hey");
    } else {
        console.log("here");
        dialogBox.classList.remove('zoomIn');
        dialogBox.classList.add('zoomOut');

        // Use the 'animationend' event instead of setTimeout to wait for the animation to finish
        dialogBox.addEventListener('animationend', () => {
            dialogBox.style.display = "none"; // Hide dialog box after animation ends
        }, { once: true }); // Make sure the event listener only runs once

        console.log('Dialog Ended');
    }
}

window.onload = () => {
    dialogBox.id = 'dialogBox';
    document.body.appendChild(dialogBox);
    renderDialogBox();
};

document.addEventListener('keydown', (event) => {
    if ((event.code === 'Enter' || event.code === 'Space') && document.querySelector(".textOutput").innerText === messages[currentMessage].message) {
        handleClick();
    }
});

if ('ontouchstart' in window) {
    dialogBox.addEventListener('touchstart', handleClick);
} else {
    dialogBox.addEventListener('click', handleClick);
}