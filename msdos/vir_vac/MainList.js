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
        imgSrc: "./vir_img/crash.png",
        link: "virus/crash/crash.html",
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
        imgSrc: "",
        link: "virus/yankee/yankee.html",
        tags: ["#외국", "#파일_바이러스"] 
    },
    {
        title: "월드컵 바이러스",
        imgSrc: "",
        link: "virus/worldcup/worldcup.html",
        tags: ["#한국"] 
    }
];

const menuBtn = document.querySelector('.menu-btn');
const navMain = document.querySelector('.nav-main');
const navCloseBtn = document.querySelector('.nav-close-btn');

menuBtn.addEventListener('click', () => {
    navMain.classList.toggle('open');
});

navCloseBtn.addEventListener('click', () => {
    navMain.classList.remove('open');
});

// page
let currentPage = 1;
const itemsPerPage = 7;
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
                <div class="tags">
                    ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}
                </div>
            </div>
        `;
        itemList.appendChild(li);
    }

    // Add this code to apply random gradient to tags
    document.querySelectorAll('.tag').forEach(function(tag) {
        var colors = ['#0aaecb', '#0fa0f5', '#47c3e2', '#1499e6']; // 그라데이션에 사용할 색상 배열
        var randomIndex = Math.floor(Math.random() * colors.length); // 랜덤 인덱스 생성
        var gradient = 'linear-gradient(to right, ' + colors[randomIndex] + ', ' + colors[(randomIndex + 1) % colors.length] + ')'; // 그라데이션 생성
        tag.style.background = gradient; // 배경색 설정
    });
}


function changePage(increment) {
    currentPage += increment;
    currentPage = Math.max(1, Math.min(currentPage, Math.ceil(items.length / itemsPerPage)));

    paginationButtons[1].textContent = currentPage;
    paginationButtons[1].classList[currentPage === 1 ? "add" : "remove"]("active");

    renderItems();
}

renderItems();