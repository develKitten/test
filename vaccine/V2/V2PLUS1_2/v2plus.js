Dos(document.getElementById("jsdos"), {
    wdosboxUrl: "https://js-dos.com/6.22/current/wdosbox.js",
    cycles: 1000,
    autolock: false,
}).ready(function (fs, main) {
  fs.extract("https://raw.githack.com/develKitten/test/main/vaccine/V2/V2PLUS1_2/V2PLUS1_2.zip").then(function () {
    main(["-c", "v2_test.bat"]).then(function (ci) {
        window.ci = ci;
    });
  });
});

// 