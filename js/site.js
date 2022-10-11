const deadline = new Date("Oct 14, 2022 19:30:00").getTime();
            const x = setInterval(function() {
            const now = new Date().getTime();
            const t = deadline - now;
            const days = Math.floor(t / (1000 * 60 * 60 * 24));
            const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((t % (1000 * 60)) / 1000);
            document.getElementById("timer").innerHTML = days + "d " 
            + hours + "h : " + minutes + "m : " + seconds + "s ";
                if (t < 0) {
                    clearInterval(x);
                    document.getElementById("timer").innerHTML = "É tempo de golorificar o cultio já " + 
                    "comecou, venham pro cuto orar...!";
                }
            }, 1000);