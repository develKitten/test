/* MS-DOS Emulator */

document.addEventListener("DOMContentLoaded", function() {
    let keys = document.querySelectorAll('.key');

    Dos(document.getElementById("jsdos"), {
        wdosboxUrl: "https://js-dos.com/6.22/current/wdosbox.js",
        cycles: 1000,
        autolock: false,
    }).ready(function(fs, main) {
        fs.extract("https://raw.githack.com/develKitten/test/main/msdos/msdos.zip").then(function () {
            main(["-c", "msdos.bat"]).then(function (ci) {
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
                        } else if (value === "col") {
                            ci.simulateKeyEvent(58, true); 
                            ci.simulateKeyEvent(58, false); 
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
            this.result = this.expectedRegex.test(this.inputString) ? 'ok' : 'no';
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

async function handleDialogEnded(initialDialog, nextDialog, reentryMessages, reentryRegex) {
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

    nextDialog.start();
}


const dialog = new DialogBox([
    { message: '환영합니다, 지금부터 튜토리얼을 시작합니다. 현재 보이시는 것은 40년 전의 컴퓨터 환경인 MS-DOS입니다.', type: 'text' },
    { message: '\'검은 화면에 흰 글자밖에 없는데 이게 컴퓨터 환경이라고?\' 그런 생각이 드실 수 있습니다. 그러나, 이것이 과거 컴퓨터 환경의 현실입니다.', type: 'text' },
    { message: '현대의 컴퓨터는 그림 위주로, 누구나 쉽게 다룰 수 있지만, 과거의 컴퓨터는 그림을 여러 개 띄울 컴퓨터 환경이 되지 못했습니다.', type: 'text' },
    { message: '따라서 사람들은 텍스트밖에 없는 환경에서 명령어를 입력해 컴퓨터를 조작했습니다. 즉, 당시 환경을 완전히 이해하려면, 이 명령어들을 배워야 합니다.', type: 'text' },
    { message: '...아, 어려울 것 같다고요? 걱정 마세요. 여기서는 기본 명령어 5개만 소개하니, 금방 배울 수 있을 겁니다. 시작해볼까요?', type: 'text' }
], "가이드");

let dialogBox, interDialogBox, result;
let d;

dialog.start();


let dialogMessages_1 = [
    { message: "첫번째로 알아볼 명령어는 'dir' 명령어입니다. 이 명령어는 현재 경로 내에 있는 파일들의 목록을 확인할 수 있습니다.", type: 'text' },
    { message: "예를 들어, 'dir'이라고 입력하면 현재 경로의 파일과 폴더 목록을 보여줍니다.", type: 'text' }
];

dialogBox_1 = new DialogBox(dialogMessages_1, "가이드");

dialog.dialogBox.addEventListener('dialogEnded', () => {
    dialogBox_1.start();
});


let dialogInterMessages_1 = [
    { message: "dir 명령어는 파일의 목록을 확인함. /w 옵션은 간단하게 나타냄.<br>명령어 : DIR 또는 DIR /w", type: 'text' }
];
let dialogMessages_2 = [
    { message: "잘했습니다! 이번엔 'cls' 명령어를 사용하여 화면을 깨끗하게 지워보세요.", type: 'text' }
];

interDialogBox_1 = new InteractiveDialogBox(dialogInterMessages_1, "가이드", "^(dir(\s?\/w)?)");
dialogBox_2 = new DialogBox(dialogMessages_2, "가이드");

dialogBox_1.dialogBox.addEventListener('dialogEnded', () => handleDialogEnded(
    interDialogBox_1,
    dialogBox_2,
    [{ message: "다시 입력하세요.<br>명령어 : DIR 또는 DIR /w", type: 'text' }],
    "^(dir(\s?\/w)?)"
));


let dialogInterMessages_2 = [
    { message: "자, 이제 cls 명령어를 입력해보세요!<br>명령어 : cls", type: 'text' }
];

let dialogMessages_3 = [
    { message: "잘하시는데요? 이번엔 'mkdir' 또는 'md' 명령을 입력하여 새로운 폴더를 생성해보세요.", type: 'text' },
    { message: "예를 들어, 'mkdir photos'를 입력하면 'photos'라는 이름의 폴더가 생성됩니다.", type: 'text' }
];

interDialogBox_2 = new InteractiveDialogBox(dialogInterMessages_2, "가이드", "^cls");
dialogBox_3 = new DialogBox(dialogMessages_3, "가이드");

dialogBox_2.dialogBox.addEventListener('dialogEnded', () => handleDialogEnded(
    interDialogBox_2,
    dialogBox_3,
    [{ message: "다시 입력하세요.<br>명령어 : cls", type: 'text' }],
    "^cls"
));


let dialogInterMessages_3 = [
    { message: "자, 이제 폴더를 생성해보도록 하죠.<br>명령어 : mkdir [폴더이름] 또는 md [폴더이름]<br>(예시 : mkdir test 또는 md test)", type: 'text' }
];

let dialogMessages_4 = [
    { message: "이번엔 다시 'dir' 명령어를 입력하여 업데이트된 파일과 폴더 목록을 확인해보세요. 새로 생성한 폴더가 목록에 포함되어야 합니다.", type: 'text' }
];

interDialogBox_3 = new InteractiveDialogBox(dialogInterMessages_3, "가이드", "^(mkdir|md) .+$");
dialogBox_4 = new DialogBox(dialogMessages_4, "가이드");


dialogBox_3.dialogBox.addEventListener('dialogEnded', () => handleDialogEnded(
    interDialogBox_3,
    dialogBox_4,
    [{ message: "다시 입력하세요.<br>명령어 : mkdir [폴더이름] 또는 md [폴더이름]<br>(예시 : mkdir test 또는 md test)", type: 'text' }],
    "^(mkdir|md) .+$"
));

let dialogInterMessages_4 = [
    { message: "명령어 : DIR 또는 DIR /w", type: 'text' }
];

let dialogMessages_5 = [
    { message: "확인이 되셨나요? 생성한 폴더가 확인이 되었으니, 다시 cls 명령어로 클리어해줍시다.", type: 'text' }
];

interDialogBox_4 = new InteractiveDialogBox(dialogInterMessages_4, "가이드", "^(dir(\s?\/w)?)");
dialogBox_5 = new DialogBox(dialogMessages_5, "가이드");

dialogBox_4.dialogBox.addEventListener('dialogEnded', () => handleDialogEnded(
    interDialogBox_4,
    dialogBox_5,
    [{ message: "다시 입력하세요.<br>명령어 : dir 또는 dir /w", type: 'text' }],
    "^(dir(\s?\/w)?)"
));

let dialogInterMessages_5 = [
    { message: "명령어 : cls", type: 'text' }
];

let dialogMessages_6 = [
    { message: "이제, chdir 또는 cd 명령어를 입력하여 방금 생성한 폴더로 이동해보세요. 예를 들어, 'cd photos'를 입력하면 'photos' 폴더로 이동합니다.", type: 'text' }
];

dialogBox_6 = new DialogBox(dialogMessages_6, "가이드");
interDialogBox_5 = new InteractiveDialogBox(dialogInterMessages_5, "가이드", "^cls\s?$");

dialogBox_5.dialogBox.addEventListener('dialogEnded', () => handleDialogEnded(
    interDialogBox_5,
    dialogBox_6,
    [{ message: "다시 입력하세요.<br>명령어 : cls", type: 'text' }],
    "^cls\s?$"
));

let dialogInterMessages_6 = [
    { message: "자, 이제 폴더 안으로 이동해봅시다!<br>명령어 : chdir [폴더 명] 또는 cd [폴더 명]<br>(예시 : chdir test 또는 cd test)", type: 'text' }
];

let dialogMessages_7 = [
    { message: "잘하셨습니다. 'cd ..'을 입력하여 이전 폴더로 돌아가보세요.", type: 'text' }
];

dialogBox_7 = new DialogBox(dialogMessages_7, "가이드");
interDialogBox_6 = new InteractiveDialogBox(dialogInterMessages_6, "가이드", "^(cd |chdir ).+");

dialogBox_6.dialogBox.addEventListener('dialogEnded', () => handleDialogEnded(
    interDialogBox_6,
    dialogBox_7,
    [{ message: "다시 입력하세요.<br>명령어 : chdir [폴더 명] 또는 cd [폴더 명]<br>(예시 : chdir test 또는 cd test)", type: 'text'}],
    "^(cd |chdir ).+"
));



let dialogInterMessages_7 = [
    { message: "명령어 : cd ..", type: 'text' }
];

let dialogMessages_8 = [
    { message: "마지막으로, del 명령어를 입력하여 파일을 삭제해보세요. msdos.bat 파일을 삭제해보겠습니다.", type: 'text' }
];

dialogBox_8 = new DialogBox(dialogMessages_8, "가이드");
interDialogBox_7 = new InteractiveDialogBox(dialogInterMessages_7, "가이드", "(cd|cd |chdir )\.\.");

dialogBox_7.dialogBox.addEventListener('dialogEnded', () => handleDialogEnded(
    interDialogBox_7,
    dialogBox_8,
    [{ message: "다시 입력하세요.<br>명령어 : cd ..", type: 'text' }],
    "(cd|cd |chdir )\.\."
));


let dialogInterMessages_8 = [
    { message: "msdos.bat 파일을 삭제해보세요!<br>명령어 : del msdos.bat", type: 'text' }
];

let dialogMessages_9 = [
    { message: "고생하셨습니다! 이로써 비로소 40년 전 운영체제를 간단하게 다룰 수 있게 되었습니다. 튜토리얼을 종료합니다.", type: 'text' }
];

interDialogBox_8 = new InteractiveDialogBox(dialogInterMessages_8, "가이드", "^del msdos\.bat$");
dialogBox_9 = new DialogBox(dialogMessages_9, "가이드");

dialogBox_8.dialogBox.addEventListener('dialogEnded', () => handleDialogEnded(
    interDialogBox_8,
    dialogBox_9,
    [{ message: "다시 입력하세요.<br>명령어 : del msdos.bat", type: 'text' }],
    "^del msdos\.bat$"
));

dialogBox_9.dialogBox.addEventListener('dialogEnded', () =>{
    window.location.href = 'vir_vac/MainList-virus.html';
});