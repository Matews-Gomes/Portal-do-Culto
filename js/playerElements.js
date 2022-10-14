export default {
    get() {
        this.cover = document.querySelector(".band-image");
        this.title = document.querySelector(".title-music");
        this.artist = document.querySelector(".artist");
        this.playPause = document.querySelector("#play");
        this.seekbar = document.querySelector("#seekbar");
    },

    createAudioElement(audio) {
        this.audio = new Audio(audio);
    },
}