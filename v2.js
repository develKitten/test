var dosbox = '';
var exeName = 'V2.COM'; 
var zipUrl = 'V2.zip';
		
dosbox = new Dosbox({
		id: "dosbox",
		onload: dosbox => dosbox.run(zipUrl, exeName),
});
dosbox.ui.overlay.hide();
dosbox.ui.showLoader();
dosbox.downloadScript();
