Dos(document.getElementById("jsdos"), {
    wdosboxUrl: "https://js-dos.com/6.22/current/wdosbox.js",
    cycles: 3000,
    autolock: false,
}).ready(function (fs, main) {
  fs.extract("https://raw.githack.com/develKitten/test/main/msdos/vir_vac/virus/worldcup/2002.zip").then(function () {
    main(["-c", "2002.bat"]).then(function (ci) {
        window.ci = ci;
    });
  });
});
