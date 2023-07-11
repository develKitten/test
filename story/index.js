/* variables */
var video = document.getElementById('intro-video');
var playButton = document.getElementById('play-button');
var intro = document.getElementById('intro');
var background = document.getElementById('background');
var startButton = document.querySelector('.start-button');
var introChildren = intro.children;

/* before video starting */
intro.classList.add('hide');
background.classList.add('hide');

for (var i = 0; i < introChildren.length; i++) {
    introChildren[i].classList.add('hide'); 
}

playButton.addEventListener('click', function() {
    video.play();
    this.style.display = 'none';
});

/* after the video is ended */
video.addEventListener('ended', function() {
    this.style.display = 'none';
    background.classList.remove('hide');
    intro.classList.remove('hide');

    background.style.animation = 'fadeIn 2s'; 
    intro.style.animation = 'fadeIn 2s'; 

    for (var i = 0; i < introChildren.length; i++) {
        introChildren[i].classList.remove('hide'); 
        introChildren[i].style.animation = 'fadeIn 2s';
    }
});

startButton.addEventListener('click', function() {
    intro.style.animation = 'fadeOut 1s';
    background.style.animation = 'fadeOut 1s';

    intro.addEventListener('animationend', function() {
        intro.style.opacity = '0';
        background.style.opacity = '0';

        setTimeout(function() {
            intro.style.display = 'none';
            background.style.display = 'none';

            window.location.href = 'story/section1/section.html';
        }, 1000);
    });
});
