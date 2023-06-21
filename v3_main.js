// -----------------------------------------------
//                Constant, Variables
// ------------------------------------------------

// prev-section
const nextButton = document.querySelector(".next-button");
const textOutput = document.querySelector(".text-output");
const cursor = document.querySelector(".cursor");
const textContainer = document.querySelector(".text-container");
// container 
const main = document.querySelector(".main");
const sub = document.querySelector(".sub");
const sButton = document.querySelector(".start-button");
const stars = document.querySelector(".background-stars");

const dialog = [
  "시간 여행자여, 환영합니다. 지금부터는 90년대의 컴퓨터 세계로의 여정이 시작됩니다.",
  "그리고, 당신은 그 곳에서 세계를 혼란에 빠뜨렸던 컴퓨터 바이러스들의 존재를 눈으로 보게 될 것입니다.",
  "하지만 두려워하지 마십시오.<br>여느 컴퓨터가 그렇듯, 옛날에도 컴퓨터를 지켜줬던 '백신'이라는 수호자가 있었으니... <br><br>그 수호자가 여행자님을 보호할 것입니다.",
  "그럼, 부디 안전하고 즐거운 컴퓨터 여행이 되시길..."
];

let index = 0;
let interval;


// -----------------------------------------------
//                Event 처리
// -----------------------------------------------

type(dialog);

function onNextButtonClick(event) {
  if (index < dialog.length - 1) {
    index++;
    type(dialog);
  }
}

function onKeydown(event) {
  if (event.key === "Enter") {
    if (index < dialog.length - 1) {
      index++;
      type(dialog);
    }
  }
}

function onTouchstart(event) {
  if (index < dialog.length - 1) {
    index++;
    type(dialog);
  }
}

function sbuttonClicked(event){
  fadeOutAndNavigate();
}

// -----------------------------------------------
//                Type Function
// ------------------------------------------------

function type(
  sentences) {
  let i = 0;

  if (index < sentences.length) {
    textOutput.innerHTML = "";
    nextButton.classList.add("hidden");

    const currentSentence = sentences[index];
    const intervalDuration = 30;

    // 출력 시작 전에 이벤트 리스너 제거
    document.removeEventListener("click", onNextButtonClick);
    document.removeEventListener("keydown", onKeydown);
    document.removeEventListener("touchstart", onTouchstart);

    interval = setInterval(function () {
      if (i < currentSentence.length) { // 한 문장이 다 출력되지 않았을 경우
        // 태그인 경우 처리
        if (currentSentence[i] === "<") {
          const closingTagIndex = currentSentence.indexOf(">", i);
          const tag = currentSentence.substring(i, closingTagIndex + 1);
          textOutput.innerHTML += tag;
          i = closingTagIndex + 1;
        } 
        else { // 태그가 아닌 일반 문장일 경우
          textOutput.innerHTML += currentSentence[i];
          i++;
        }
      }  
      else { // 한 문장이 다 출력되면
        // 출력 끝난 후에 이벤트 리스너 추가
        document.addEventListener("click", onNextButtonClick);
        document.addEventListener("keydown", onKeydown);
        document.addEventListener("touchstart", onTouchstart);

        // nextButton 다시 보이게 하기
        clearInterval(interval);
        nextButton.classList.remove("hidden");
        
        // 다른 문장이 남았을 때
        if (index < sentences.length - 1) {
          const nextButton = document.querySelector(".next-button");
          nextButton.style.display = "inline-block";
        } else { // 마지막 문장일 때
          const nextButton = document.querySelector(".next-button");
          
          // ---------- 이벤트 리스너들 -----------
          document.addEventListener("click", function () {
            intro();
          });

          document.addEventListener("keydown", function (event) {
            intro();

          });

          document.addEventListener("touchstart", function () {
            intro();
          });
        }
      }
    }, intervalDuration);
  }
}

function intro(){
  // prev-section hidden
  nextButton.classList.add("hidden");
  textOutput.classList.add("hidden");
  textContainer.classList.add("hidden");

  const container = document.querySelector('.container');
  container.classList.add('fadeInUp');

  // print intro
  main.classList.remove("hidden");
  sub.classList.remove("hidden");
  sButton.classList.remove("hidden");
  stars.classList.remove("hidden");

  sButton.addEventListener("click", sbuttonClicked);
}

const elements = document.querySelectorAll('.container'); 
const background = document.querySelector('.background-container');

const fadeOutDuration = 500; 
const nextPageDelay = 500; 


function fadeOutAndNavigate() {
  let opacity = 1;
  const intervalDuration = fadeOutDuration / 100; 
  const interval = setInterval(() => {
    opacity -= 0.01; 
    elements.forEach((element) => {
      element.style.opacity = opacity;
      background.style.opacity = opacity;
    });
    if (opacity <= 0) {
      clearInterval(interval); 
      setTimeout(() => {
        var visited = localStorage.getItem('visited'); 
        window.location.href = 'msdos/tutorial.html'; 
      }, nextPageDelay);
    }
  }, intervalDuration);
}

/*
function fadeOutAndNavigate() {
  let opacity = 1;
  const intervalDuration = fadeOutDuration / 100; 
  const interval = setInterval(() => {
    opacity -= 0.01; 
    elements.forEach((element) => {
      element.style.opacity = opacity;
      background.style.opacity = opacity;
    });
    if (opacity <= 0) {
      clearInterval(interval); 
      setTimeout(() => {
        var visited = localStorage.getItem('visited'); 
        if (!visited) {
          window.location.href = 'msdos/tutorial.html'; 
        }
        else {
          window.location.href = 'msdos/vir_vac/MainList-virus.html';
        }
      }, nextPageDelay);
    }
  }, intervalDuration);
}


*/