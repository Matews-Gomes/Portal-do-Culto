import audios from "./data.js";
import { path, secondsToMinutes } from "./utils.js";
import elements from "./playerElements.js"

export default {
    audioData: audios,
    currentAudio: {},
    currentPlaying: 0,
    isPlaying: false,

    start() { 
        elements.get.call(this);           
        this.update();
    },

    play(){
        this.isPlaying = true;
        this.audio.play();
        this.playPause.innerText = "pause"

    },

    pause(){
        this.isPlaying = false;
        this.audio.pause();
        this.playPause.innerText = "play_arrow"
    },

    stop(){
        this.isPlaying = false;
        this.audio.pause();
    },

    previousPlay(){
        if(this.currentPlaying > 0){
            this.stop();
            this.currentPlaying--
            this.update();
            this.audio.play();
        }else{
            this.currentPlaying = this.audioData.length -1;
        }
    },

    nextPlay(){
        if(this.currentPlaying < this.audioData.length -1){
            this.stop();
            this.currentPlaying++
            this.update();
            this.audio.play();
        }
        else{
            this.currentPlaying = 0;
        }        
    },

    tooglePLayPause(){
        if (this.isPlaying) {
            this.pause();
        }else{
            this.play();
        }
    },

    toogleMute(){
        this.audio.muted = !this.audio.muted;
        this.volicon.innerText = this.audio.muted ? "volume_off" : "volume_up";
    },

    setSeek(value){
        this.audio.currentTime = value;
    },

        next() {
            this.currentPlaying++
            if (this.currentPlaying == this.audioData.length) this.restart();
            this.update();
            this.play();
        },

        timeUpdate(){
            this.currentDuration.innerText = secondsToMinutes(this.audio.currentTime);
            this.seekbar.value = this.audio.currentTime;
        },

        update(){
            this.currentAudio = this.audioData[this.currentPlaying];
            this.cover.style.background = `url('${path(
                this.currentAudio?.cover
            )}') no-repeat center center / cover`;
            this.title.innerText = this.currentAudio?.title;
            this.artist.innerText = this.currentAudio?.artist;
            elements.createAudioElement.call(this, path(this.currentAudio?.file));
            this.audio.onloadeddata = () =>{
                elements.actions.call(this);    
            }
        },

        restart(){
            this.currentPlaying = 0;
            this.update();
        }
};
