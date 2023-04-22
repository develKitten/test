Dos(document.getElementById("jsdos"), {
    wdosboxUrl: "https://js-dos.com/6.22/current/wdosbox.js",
    cycles: 1000,
    autolock: false,
}).ready(function (fs, main) {
  fs.extract("CASCADE.zip").then(function () {
    main(["-c", "1704.bat"]).then(function (ci) {
        window.ci = ci;
    });
  });
});

// 