// Virus List
const items = [
    {
        title: "stoned",
        imgSrc: "./vir_img/1704.jpg",
        link: "1704/1704.html"
    },
    {
        title: "PingPong",
        imgSrc: "./vir_img/pingpong.jpg",
        link: "pingpong/ping.html"
    },
    {
        title: "1704",
        imgSrc: "./vir_img/1704.jpg",
        link: "1704/1704.html"
    },
    {
        title: "1704",
        imgSrc: "./vir_img/1704.jpg",
        link: "1704/1704.html"
    },
    {
        title: "stoned",
        imgSrc: "./vir_img/1704.jpg",
        link: "1704/1704.html"
    },
    {
        title: "PingPong",
        imgSrc: "./vir_img/pingpong.jpg",
        link: "pingpong/ping.html"
    },
    {
        title: "1704",
        imgSrc: "./vir_img/1704.jpg",
        link: "1704/1704.html"
    },
    {
        title: "1704",
        imgSrc: "./vir_img/1704.jpg",
        link: "1704/1704.html"
    },
    {
        title: "stoned",
        imgSrc: "./vir_img/1704.jpg",
        link: "1704/1704.html"
    },
    {
        title: "PingPong",
        imgSrc: "./vir_img/pingpong.jpg",
        link: "pingpong/ping.html"
    },
    {
        title: "1704",
        imgSrc: "./vir_img/1704.jpg",
        link: "1704/1704.html"
    },
    {
        title: "1704",
        imgSrc: "./vir_img/1704.jpg",
        link: "1704/1704.html"
    }
];

// page
let currentPage = 1;
const itemsPerPage = 6;
const itemList = document.getElementById("itemList");
const paginationButtons = document.querySelectorAll(".pagination button");

function renderItems() {
    itemList.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const end = Math.min(start + itemsPerPage, items.length);

    for (let i = start; i < end; i++) {
        const item = items[i];
        const li = document.createElement("li");
        li.className = "item";
        li.innerHTML = `
                        <div class="cardImg" style="background-image: url(${item.imgSrc})"></div>
                        <div class="cardLow">
                            <h3>${item.title}</h3>
                            <button class="run_btn" onclick="location.href='${item.link}'">run</button>
                        </div>
                    `;
        itemList.appendChild(li);
    }
}

function changePage(increment) {
    currentPage += increment;
    currentPage = Math.max(1, Math.min(currentPage, Math.ceil(items.length / itemsPerPage)));

    paginationButtons[1].textContent = currentPage;
    paginationButtons[1].classList[currentPage === 1 ? "add" : "remove"]("active");

    renderItems();
}

renderItems();