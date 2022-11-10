import player from "./player.js";

window.addEventListener("load", player.start());

const deadline = new Date("Nov 25, 2022 19:00:00").getTime();
            const x = setInterval(function() {
            const now = new Date().getTime();
            const t = deadline - now;
            const days = Math.floor(t / (1000 * 60 * 60 * 24));
            const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((t % (1000 * 60)) / 1000);
            document.getElementById("timer").innerHTML = days + " dias " 
            + hours + " horas : " + minutes + " minutos : " + seconds + " segundos ";
                if (t < 0) {
                    clearInterval(x);
                    document.getElementById("timer").innerHTML = "O cultio foi adiado aguardem a próxima contagem";
                }
            }, 1000);
