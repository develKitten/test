emulators.pathPrefix = "https://raw.githack.com/develKitten/test/main/msdos/vir_vac/virus/yankee/js-dos/";
alert("Setting path prefix: " + emulators.pathPrefix);  // pathPrefix 값을 팝업으로 출력

Dos(document.getElementById("jsdos"), {
  onprogress: function (stage, total, loaded) {
    alert(stage + ": " + loaded + "/" + total);  // 로딩 상태를 팝업으로 출력
  }
}).run('https://develkitten.github.io/test/msdos/vir_vac/virus/yankee/yankee.jsdos');
