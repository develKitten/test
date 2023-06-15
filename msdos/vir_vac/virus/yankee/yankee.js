emulators.pathPrefix = "https://raw.githack.com/develKitten/test/main/msdos/vir_vac/virus/yankee/js-dos/";
alert("Setting path prefix: " + emulators.pathPrefix);  // pathPrefix 값을 팝업으로 출력

Dos(document.getElementById("jsdos"), {}).run('https://develkitten.github.io/test/msdos/vir_vac/virus/yankee/yankee.jsdos');
