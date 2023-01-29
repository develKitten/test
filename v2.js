console.clear();
console.log('Created by Sven Neumann <sven@svencodes.com>');

var dosbox, exeName, zipUrl = '';

document.getElementById('zip')
	.addEventListener('drop', event => zipUrl = URL.createObjectURL(event.dataTransfer.files[0]));
document.getElementById('start')
	.addEventListener('click', event => {
		exeName = document.getElementById('exe').value;
		zipUrl =  URL.createObjectURL(document.getElementById('zip').files[0]);
		if(exeName === '' || zipUrl === '') return alert('Please enter .EXE name and .ZIP file');
		dosbox = new Dosbox({
			id: "dosbox",
			onload: dosbox => dosbox.run(zipUrl, exeName),
			onrun: (dosbox, app) => {
				console.log("Starting: '" + app + "'");
				let fullscreen = document.getElementById('fullscreen');
				fullscreen.style.display = '';
				fullscreen.addEventListener('click', event => dosbox.requestFullScreen());
			}
		});
		dosbox.ui.overlay.hide();
		dosbox.ui.showLoader();
		dosbox.downloadScript();
	});
