// scroll
document.querySelector("nav").classList.add("fixed-top");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.querySelector("nav").classList.add("fixed-top");
  } else {
    document.querySelector("nav").classList.remove("fixed-top");
  }
}

window.addEventListener("load", scrollFunction);


// Virus List
const items = [
    {
        title: "탁구 바이러스",
        imgSrc: "./vir_img/pingpong.jpg",
        link: "virus/pingpong/ping.html",
        tags: ["#외국", "#부트_바이러스"]
    },
    {
        title: "폭포 바이러스",
        imgSrc: "./vir_img/1704.jpg",
        link: "virus/1704/1704.html",
        tags: ["#외국", "#파일_바이러스"]
    },
    {
        title: "LSD 바이러스",
        imgSrc: "./vir_img/lsd.png",
        link: "virus/LSD/LSD.html",
        tags: ["#외국"]
    },
    {
        title: "Ambulance",
        imgSrc: "./vir_img/ambul.png",
        link: "virus/ambulance/ambul.html",
        tags: ["#외국"]
    },
    {
        title: "녹색 애벌레 바이러스",
        imgSrc: "./vir_img/green.png",
        link: "virus/green/green.html",
        tags: ["#외국", "#파일_바이러스"] 
    },
    {
        title: "양키두들 바이러스",
        imgSrc: "./vir_img/yankee.jpg",
        link: "virus/yankee/yankee.html",
        tags: ["#외국", "#소리주의"] 
    },
    {
        title: "월드컵 바이러스",
        imgSrc: "./vir_img/2002.png",
        link: "virus/worldcup/worldcup.html",
        tags: ["#한국"] 
    }
];


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


function renderItems() {
    const itemList = document.getElementById('itemList');

    // clear current items
    itemList.innerHTML = '';

    items.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'item';

        const cardImg = document.createElement('div');
        cardImg.className = 'cardImg';
        cardImg.style.backgroundImage = 'url(' + item.imgSrc + ')';

        const cardBody = document.createElement('div');
        cardBody.className = 'cardLow';

        const cardTitle = document.createElement('h5');
        cardTitle.textContent = item.title;
        cardBody.appendChild(cardTitle);

        item.tags.forEach((tag) => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = tag;
            cardBody.appendChild(span);
        });

        card.appendChild(cardImg);
        card.appendChild(cardBody);

        const column = document.createElement('div');
        column.className = 'col-md-6 col-lg-4';
        column.appendChild(card);

        itemList.appendChild(column);

        // card click event
        card.addEventListener('click', function() {
            window.location = item.link;
        });
    });
}

const dialog = new DialogBox([
    { message: '90년대 시절 활동했던 컴퓨터 바이러스와 백신 프로그램들을 직접 만나보실 수 있습니다!', type: 'text' },
    { message: '컴퓨터 바이러스는 감염되는 과정을 삭제하고 넣은 시뮬레이션 프로그램으로, 감염 위험은 없으니 걱정하시지 않아도 됩니다 ^^.', type: 'text' },
    { message: '90년대 바이러스들은 대부분 \'특정 시간\'이 되면 활동하였습니다. 들어가자마자 바로 효과가 뜨는 것이 아니니 기다려야 하는 점, 양해 부탁드립니다.', type: 'text' },
], "가이드");



window.onload = function() {
    var visited = localStorage.getItem('visited');
    renderItems();

    if (!visited) {
        localStorage.setItem('visited', true);
        dialog.start();
    }
}
