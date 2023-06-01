Dos(document.getElementById("jsdos"), {
    wdosboxUrl: "https://js-dos.com/6.22/current/wdosbox.js",
    cycles: 3000,
    autolock: false,
}).ready(function (fs, main) {
  fs.extract("https://raw.githack.com/develKitten/test/main/msdos/vir_vac/virus/green/GREEN.zip").then(function () {
    main(["-c", "green.bat"]).then(function (ci) {
        window.ci = ci;
    });
  });
});