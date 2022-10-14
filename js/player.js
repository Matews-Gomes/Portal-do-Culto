import audios from "./data.js";
import { path } from "./utils.js";
import elements from "./playerElements.js"

export default {
    audioData: audios,
    currentAudio: {},
    currentPlaying: 0,
    isPlaying: false,

    start() { 
        elements.get.call(this);
        elements
        this.actions();       
        this.update();
        this.audio.onended = () => this.next();
    },


    actions(){
        this.playPause.onclick = () => this.tooglePLayPause();
        this.seekbar.oninput = () => this.setSeek(this.seekbar.value);
        this.seekbar.onchange = () => this.setSeek(this.seekbar.value);
        //this.seekbar.max = this.audio.duration;
    },

    play(){
        this.isPlaying = true;
        this.audio.play();
    },

    pause(){
        this.isPlaying = false;
        this.audio.pause();
    },

    tooglePLayPause(){
        if (this.isPlaying) {
            this.pause();
        }else{
            this.play();
        }
    },

    setSeek(value){
        this.audioData.audio.currentTime = value;
    },

        next() {
            this.currentPlaying++
            if (this.currentPlaying == this.audioData.length) this.restart();
            this.update();
            this.audio.play();
        },

        update(){
            this.currentAudio = this.audioData[this.currentPlaying];
            this.cover.style.background = `url('${path(
                this.currentAudio.cover
            )}') no-repeat center center / cover`;
            this.title.innerText = this.currentAudio.title;
            this.artist.innerText = this.currentAudio.artist;
            elements.createAudioElement.call(this, path(this.currentAudio.file));
            this.seekbar.max = this.audio.duration;
        },

        restart(){
            this.currentPlaying = 0;
            this.update();
        }
};
