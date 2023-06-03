// scroll
document.querySelector("nav").classList.add("fixed-top"); // 페이지 로딩 시 클래스 추가

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.querySelector("nav").classList.add("fixed-top");
  } else {
    document.querySelector("nav").classList.remove("fixed-top");
  }
}

// Call scrollFunction on page load as well
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
        column.className = 'col-md-6 col-lg-4';  // md 사이즈에선 2개, lg 사이즈에선 3개가 보이도록 변경합니다.
        column.appendChild(card);

        itemList.appendChild(column);

        // card click event
        card.addEventListener('click', function() {
            window.location = item.link;
        });
    });
}


window.onload = renderItems;
