/* MS-DOS Emulator */
Dos(document.getElementById("jsdos"), {
    wdosboxUrl: "https://js-dos.com/6.22/current/wdosbox.js",
    cycles: 1000,
    autolock: false,
}).ready(function (fs, main) {
  fs.extract("https://raw.githack.com/develKitten/test/main/msdos/var_vac/virus/pingpong/pingpong.zip").then(function () {
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
    { message: '어서오세요, 처음오신 것을 환영합니다. 여러분들은 40년 전에 사용한 운영체제를 직접 보고 계십니다.', type: 'text' },
    { message: '\'검은 화면에, 그저 글자만 떠있는데 이게 어떻게 컴퓨터 환경일 수가 있지?\'라고 생각하실 수도 있겠습니다. 하지만 과거 환경은 실제로 이랬습니다. ', type: 'text' },
    { message: '지금의 컴퓨터 환경은 그림 위주의 환경이어서 초보자들도 쉽게 사용할 수가 있습니다. 하지만, 옛날에는 그림을 여러 개 띄울 컴퓨터 환경이 되지 못했습니다.', type: 'text' },
    { message: '따라서, 과거 사람들은 이런 환경에서 명령어를 입력하여 컴퓨터를 사용했습니다. 즉, 옛날 운영체제를 완전히 이해하려면 여기서 쓰이던 명령어를 알아야 합니다.', type: 'text'},
    { message: '... 아, 어려울 것 같다고요? 걱정 마세요, 여기서는 가장 기초적인 명령어 4개만 배우겠습니다. 금방 끝나니 걱정마세요 ^-^!', type:'text'}
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