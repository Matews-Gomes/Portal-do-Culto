import { secondsToMinutes } from "./utils.js";

export default {
    get() {
        this.cover = document.querySelector(".band-image");
        this.title = document.querySelector(".title-music");
        this.artist = document.querySelector(".artist");
        this.playPause = document.querySelector("#playpause");
        this.forward = document.querySelector("#forward");
        this.backward = document.querySelector("#backward");
        this.volicon = document.querySelector("#volIcon");
        this.seekbar = document.querySelector("#seekbar");
        this.currentDuration  = document.querySelector("#current-duration");
        this.totalDuration  = document.querySelector("#total-duration");
    },

    createAudioElement(audio) {
        this.audio = new Audio(audio);
    },

    actions(){
        this.audio.onended = () => this.next();
        this.audio.ontimeupdate = () => this.timeUpdate();
        this.playPause.onclick = () => this.tooglePLayPause();
        this.forward.onclick = () => this.nextPlay();
        this.backward.onclick = () => this.previousPlay();
        this.volicon.onclick = () => this.toogleMute();
        this.seekbar.oninput = () => this.setSeek(this.seekbar.value);
        this.seekbar.onchange = () => this.setSeek(this.seekbar.value);
        this.seekbar.max = this.audio.duration;
        this.totalDuration.innerText = secondsToMinutes(this.audio.duration);
    }
};