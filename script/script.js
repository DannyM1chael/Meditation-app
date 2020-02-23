const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    //Sounds
    const sounds = document.querySelectorAll('.sound-picker button');

    //Time Display
    const timeDisplay = document.querySelector('.time-display');

    //Length of outline
    const outlineLength = outline.getTotalLength();
    const timeSelect = document.querySelectorAll(".time-select button");

    //Duration
    let Duration = 600;
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;
    timeDisplay.textContent = `${Math.floor(Duration / 60)}:${Math.floor(Duration % 60)}`;

    timeSelect.forEach(option => {
        option.addEventListener("click", function() {
          fakeDuration = this.getAttribute("data-time");
          timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
        });
      });

    //Play sounds
    sounds.forEach(sound => {
        sound.addEventListener("click", function() {
          song.src = this.getAttribute("data-sound");
          video.src = this.getAttribute("data-video");
          checkPlaying(song);
        });
      });

    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    //Stop and play
    const checkPlaying = song => {
        if(song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        }else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    }

    //Animate the circle of time
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let progress = outlineLength - (currentTime / Duration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        if (currentTime >= Duration) {
            song.pause();
            song.currentTime = 0;
            play.src = "./svg/play.svg";
            video.pause();
            }
        }

};

app();