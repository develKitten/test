Dos(document.getElementById("jsdos"), {
    wdosboxUrl: "https://js-dos.com/6.22/current/wdosbox.js",
    cycles: 3000,
    autolock: false,
}).ready(function (fs, main) {
  fs.extract("https://raw.githack.com/develKitten/test/main/msdos/vir_vac/virus/yankee/yankee.zip").then(function () {
    main(["-c", "yankee.bat"]).then(function (ci) {
        window.ci = ci;
    });
  });
});
