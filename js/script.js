if(localStorage.getItem('token') == null){
    alert('Voçe precisa estar logado para acessar esta pagina!')
    window.location.href = 'https://portaldocultio.netlify.app/'
}

const wrapper = document.querySelector(".wrapper"),
musicImage = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseButton = wrapper.querySelector(".play-pause"),
previousButton = wrapper.querySelector("#prev"),
nextButton = wrapper.querySelector("#next"),
progressArea = wrapper.querySelector(".progress-area"),
progressBar = wrapper.querySelector(".progress-bar"),
musicList = wrapper.querySelector(".music-list"),
showMoreButton = wrapper.querySelector("#more-music"),
hideMusicButton = musicList.querySelector("#close");

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);

let mensageIn = 'Benças e golorias meus mamadios irmãos, o pastior convida tudo que tenha as gargantias de oro' + '</br>' + 
'para lovarmos e engrandiaçermos o nome do sinhô em mais um cultio que será um momentio de multipricação para darmos golorias ' + '</br>' +
'e compartilharmos da palavra onde pisaremos na cabeça do inimigo e faremos cair por terra o opressor!' + '</br>' + 
'faltam...'+ '</br>'
let mensageNow = 'O Cultio já comecou apressa-te...' + '<br/>' + 'é chegada a hora!'
let mensageOut = 'É tempo de golorificar aguardem!' + '<br/>' + 'O próximo cultio vem ai';

window.addEventListener("load", ()=> {
    loadMusic(musicIndex); 
    playingNow();
});

function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImage.src = `img/${allMusic[indexNumb - 1].img}.jpg`;
    mainAudio.src = `music/${allMusic[indexNumb - 1].src}.mp3`;
}

function playMusic() {
    wrapper.classList.add("paused");
    playPauseButton.innerHTML = "<i class='bx bx-pause'></i>";
    mainAudio.play();
}

function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseButton.innerHTML = "<i class='bx bx-play'></i>";
    mainAudio.pause();
}

function previousMusic() {
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}

function nextMusic() {
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}

playPauseButton.addEventListener("click", ()=> {
    const isMusicPause = wrapper.classList.contains("paused");
    isMusicPause ? pauseMusic() : playMusic();
    playingNow();
});

previousButton .addEventListener("click", ()=>{
    previousMusic(); 
});

nextButton.addEventListener("click", ()=>{
    nextMusic();
});

mainAudio.addEventListener("timeupdate", (e)=> {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;
    let musicCurrentTime = wrapper.querySelector(".current"),
    musicDuration = wrapper.querySelector(".duration");

    mainAudio.addEventListener("loadeddata", ()=> {
        let audioDuration = mainAudio.duration;
        let totalMinutes = Math.floor(audioDuration / 60);
        let totalSeconds = Math.floor(audioDuration % 60);
        if(totalSeconds < 10) { 
            totalSeconds = `0${totalSeconds}`;
        }
        musicDuration.innerText = `${totalMinutes}:${totalSeconds}`;
    });
    let currentMinutes = Math.floor(currentTime / 60); 
    let currentSeconds = Math.floor(currentTime % 60);
    if(currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    }
    
    // Exibição dos minutos e segundos atuais da música
    musicCurrentTime.innerText = `${currentMinutes}:${currentSeconds}`;
});

progressArea.addEventListener("click", (e)=>{
    let progressWidthval = progressArea.clientWidth;
    let clickedOffSetX = e.offsetX; 
    let songDuration = mainAudio.duration;
    mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
    playMusic();
});

const repeatButton = wrapper.querySelector("#repeat-plist");
repeatButton.addEventListener("click", ()=> {
    let getText = repeatButton.innerText; 
    switch(getText) { 
        case "repeat":
            repeatButton.innerText = "repeat_one";
            repeatButton.setAttribute("title", "Song Looped");
            break;
        case "repeat_one":
            repeatButton.innerText = "shuffle";
            repeatButton.setAttribute("title", "Playback Shuffle");
            break;
        case "shuffle":
            repeatButton.innerText = "repeat";
            repeatButton.setAttribute("title", "Playlist Loop");
            break;
    }
});

mainAudio.addEventListener("ended", ()=> {
    let getText = repeatButton.innerText;

    switch(getText) { 
        case "repeat":
            nextMusic();
            break;
        case "repeat_one":
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;
        case "shuffle": 
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1); 
            do {
                randIndex = Math.floor((Math.random() * allMusic.length) + 1); 
            } while(musicIndex == randIndex);
            musicIndex = randIndex;
            loadMusic(musicIndex);
            playMusic();
            playingNow();
            break;
    }
});

showMoreButton.addEventListener("click", ()=> {
    musicList.classList.toggle("show");
});

hideMusicButton.addEventListener("click", ()=> {
    showMoreButton.click();
});

const ulTag = wrapper.querySelector("ul");

for (let i = 0; i < allMusic.length; i++) {
    let liTag = `<li li-index="${i + 1}">
                    <div class="row">
                        <span>${allMusic[i].name}</span>
                        <p>${allMusic[i].artist}</p>
                    </div>
                    <audio class="${allMusic[i].src}" src="music/${allMusic[i].src}.mp3"></audio>
                    <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
                </li>`;
        ulTag.insertAdjacentHTML("beforeend", liTag);
        
        let liAudioDuration = ulTag.querySelector(`#${allMusic[i].src}`);
        let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);
        liAudioTag.addEventListener("loadeddata", ()=> {
            let audioDuration = liAudioTag.duration;
            let totalMinutes = Math.floor(audioDuration / 60); 
            let totalSeconds = Math.floor(audioDuration % 60); 
            if(totalSeconds < 10) { 
                totalSeconds = `0${totalSeconds}`;
            }
            liAudioDuration.innerText = `${totalMinutes}:${totalSeconds}`;
            liAudioDuration.setAttribute("t-duration", `${totalMinutes}:${totalSeconds}`);
        });
} 

const allLiTags = ulTag.querySelectorAll("li");
function playingNow() {
    for (let j = 0; j < allLiTags.length; j++) {
        let audioTag = allLiTags[j].querySelector(".audio-duration"); 
        if (allLiTags[j].classList.contains("playing")) {
            allLiTags[j].classList.remove("playing");
            let adDuration = audioTag.getAttribute("t-duration");
            audioTag.innerText = adDuration;
        }
        if(allLiTags[j].getAttribute("li-index") == musicIndex) {
            allLiTags[j].classList.add("playing");
            audioTag.innerText = "Tocando";
        }
        allLiTags[j].setAttribute("onclick", "clicked(this)");
    }
}

function clicked(element) {
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}

const darkMode = document.querySelector('.dark-mode'),
    body = document.querySelector('.page');

darkMode.onclick = () => {
    body.classList.toggle('is-dark');
}

            const deadline = new Date("Jul 21, 2023 19:00:00").getTime();
            const x = setInterval(function() {
            const now = new Date().getTime();
            const t = deadline - now;
            const days = Math.floor(t / (1000 * 60 * 60 * 24));
            const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((t % (1000 * 60)) / 1000);
            document.getElementById("timer").innerHTML = mensageIn
            + days + " dias, " 
            + hours + " horas, " + minutes + " minutos e" + seconds + " segundos ";
                if (t < 0) {
                    clearInterval(x);
                    document.getElementById("timer").innerHTML = mensageNow;
                    TerminarCultio();                                                        
                }
            }, 1000);

            function TerminarCultio() {
                const lineUp = new Date("Jul 22, 2023 07:00:00").getTime();
                const y = setInterval(function() {
                    const now = new Date().getTime();
                    const time = lineUp - now;
                    if(time < 0){
                    clearInterval(y);
                    document.getElementById("timer").innerHTML = mensageOut;
                }
                },1000);
            } 

new Glider(document.querySelector(".js-carousel--simple"), {
        slidesToShow: 2,
        slidesToScroll: 2,
        draggable: true,
        arrows: 
        {
            prev: '.glider-prev',
            next: '.glider-next'
        },
        dots: ".js-carousel--simple-dots",
        scrollLock: true,
        responsive: [
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            },
        },
        ],
    });

$('.card').magnificPopup({
    delegate: 'a', 
    type: 'image',
    gallery:{enabled:true}
});

function sair(){
    localStorage.removeItem('token');
    //window.location.href = 'http://127.0.0.1:5500/index.html'
    window.location.href = 'https://portaldocultio.netlify.app/'
}
