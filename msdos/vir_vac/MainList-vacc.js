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
        title: "VACCINE",
        imgSrc: "./vac_img/V1.png",
        link: "vaccine/V1/v1.html",
        tags: ["#1988년", "#brain"]
    },
    {
        title: "VACCINE2",
        imgSrc: "./vac_img/v2.PNG",
        link: "vaccine/V2/VACCINE2/v2.html",
        tags: ["#1989년", "#LBC"]
    },
    {
        title: "V2 Plus 1.2",
        imgSrc: "./vac_img/v2_plus_1_2.PNG",
        link: "vaccine/V2/V2PLUS1_2/v2plus.html",
        tags: ["#1990년", "#PINGPONG"]
    },
    {
        title: "V3 Test Version",
        imgSrc: "./vac_img/V3.png",
        link: "vaccine/V3/V3.html",
        tags: ["#1990년", "최초 V3 프로그램"]
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
        column.className = 'col-md-6 col-lg-4'; 
        column.appendChild(card);

        itemList.appendChild(column);

        // card click event
        card.addEventListener('click', function() {
            window.location = item.link;
        });
    });
}


window.onload = renderItems;
