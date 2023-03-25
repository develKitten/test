if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  const alertClosed = getCookie("alertClosed");
  if (alertClosed != "true") {
    alert("이 웹사이트는 PC에서 최적화되어 있습니다. 모바일 환경에서는 일부 기능이 작동하지 않을 수 있습니다.");
  }
}

Dos(document.getElementById("jsdos"), {
    wdosboxUrl: "https://js-dos.com/6.22/current/wdosbox.js",
    cycles: 1000,
    autolock: false,
}).ready(function (fs, main) {
  fs.extract("https://raw.githack.com/develKitten/test/main/virus/pingpong/pingpong.zip").then(function () {
    main(["-c", "PINGPONG.bat"]).then(function (ci) {
        window.ci = ci;
    });
  });
});

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = "expires="+ d.toUTCString();
  const path = "path=/";
  document.cookie = cname + "=" + cvalue + ";" + expires + ";" + path;
}

function closeAlert() {
  setCookie("alertClosed", "true", 30);
  document.getElementById("alertBox").style.display = "none";
}

function checkCookie() {
  const alertClosed = getCookie("alertClosed");
  if (alertClosed != "") {
    document.getElementById("alertBox").style.display = "none";
  }
}

function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length == 2) {
    return parts.pop().split(";").shift();
  }
  return "";
}
