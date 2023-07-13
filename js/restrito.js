let labelUser = document.getElementById('labelUser');
let user = document.getElementById('user');
let labelSenha = document.getElementById('labelPassword');
let password = document.getElementById('password');
let inputs = document.getElementsByClassName('input');
let button = document.getElementById('btn-login');

function StateOne(obj) {
    obj.style.transform = 'translateY(2rem)';
    obj.style.color = '#ffff';
}

function StateTwo(obj) {
    obj.style.transform = 'translateY(0rem)';
    obj.style.color = 'var(--color4)';
}

function StateButtonIn(obj) {
    obj.style.boxShadow = '0 0 1rem 0.5rem var(--color4)';
}

function StateButtonOut(obj) {
    obj.style.boxShadow = 'none'
}

if (user.value != '') {
    StateTwo(labelUser);
}

if (password.value != '') {
    StateTwo(labelSenha);
}

for (let i of inputs) {
    i.addEventListener('click', (event) => {
        if (event.target.id == 'user') {
            StateTwo(labelUser);
        } else {
            StateTwo(labelSenha);
        }
    });

    i.addEventListener('focusin', (event) => {
        if (event.target.id == 'user') {
            StateTwo(labelUser);
        } else {
            StateTwo(labelSenha);
        }
    });

    i.addEventListener('focusout', (event) => {
        if (event.target.id == 'user') {
            if (user.value == '') {
                StateOne(labelUser);
            } else {
                StateTwo(labelUser);
            }
        } else {
            if (event.target.id == 'password') {
                if (password.value == '') {
                    StateOne(labelSenha);
                } else {
                    StateTwo(labelSenha);
                }
            }
        }
    });
}

button.addEventListener('focusin', (event) => {
    StateButtonIn(event.target.parentNode);
});

button.addEventListener('focusout', (event) => {
    StateButtonOut(event.target.parentNode);
});

function entrar() {
    let msgError = document.getElementById('msgError');
    let user = document.getElementById('user');
    let password = document.getElementById('password');

    let listUsers = [
        {
            user: "mamadio",
            password: "1234"
        },
        {
            user: "pastior",
            password: "golorias"
        }
    ];

    let userValid = listUsers.find((item) => {
        return user.value.toLowerCase() === item.user.toLowerCase() && password.value === item.password;
    });

    if (user.value === "" && password.value === "") {
        msgError.innerHTML = "Informe login e senha para entrar!";
        msgError.setAttribute('style', 'display: block');
    } else {
        if (userValid) {
            //window.location.href = 'http://127.0.0.1:5501/home.html';
            window.location.href = 'https://portaldocultio.netlify.app/home.html';
            let token = Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2);
            localStorage.setItem('token', token);
            
        } else {
            msgError.innerHTML = "Usuário ou senha incorretos!";
            msgError.setAttribute('style', 'display: block');
        }
    }
}
