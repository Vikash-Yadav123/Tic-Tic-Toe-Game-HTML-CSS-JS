let gamecell = document.querySelectorAll('.cell');
let game = document.querySelector('.gamecell');
let rstbtn = document.querySelector('.btn');
let showGame = document.querySelector('.showalert');
let showValue = document.querySelector('.alervalue');
let txt = document.querySelector('.text');
let player_X = document.querySelector('.player-x');
let player_O = document.querySelector('.player-o');
let playerx_value = document.querySelector('.value-x');
let playero_value = document.querySelector('.value-o');
let para = document.querySelector('.para');

// MAKE A VAR FOR PLAYER
let currentPlayer = 'X';
let nextPlayer = 'O';
let playerturn = currentPlayer;


// MAKE A FUNCTION RESTART FOR AGAIN START GAME
const restartgame = () => {
    gamecell.forEach((cell) => {
        cell.textContent = "";
    })
    showGame.style.display = "none";
    player_O.classList.remove('active');
    player_X.classList.remove('active');

    game.style.visibility = "visible";
    para.innerHTML = "";
    startgame();
}

// MAKE A FUNCTION DISABLE FOR GAME DISABLE
const disable = (msg, msg2) => {
    gamecell.forEach((cell) => {
        cell.removeEventListener('click', seprate);



    })
    showGame.style.display = "block";
    showValue.innerHTML = msg;
    txt.innerHTML = msg2;
    game.style.visibility = "hidden"
}


// MAKE A FUNCTION CHECKTIE FOR CHECK TIE
const checktie = () => {
    let cellcount = 0;
    gamecell.forEach((cell) => {
        if (cell.textContent == "") {
            cellcount++;
        }
    })

    return cellcount === 0 && !checkwingame();
}


// MAKE A FUNCTION CHECKWIN FOR CHECK WIN
const checkwingame = () => {
    const index = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < index.length; i++) {
        const [pos1, pos2, pos3] = index[i];
        if (gamecell[pos1].textContent != '' && gamecell[pos1].textContent === gamecell[pos2].textContent && gamecell[pos2].textContent === gamecell[pos3].textContent) {
            return true;
        }
    }
    return false;
}

// MAKE A FUNCTION PLAYETURN FOR PLAYER TURN CHANGE 
const changeplayerturn = () => {
    if (playerturn == currentPlayer) {
        player_O.classList.add('active');
        player_X.classList.remove('active');
        para.innerHTML = "Player O turn";

        playerturn = nextPlayer;
    } else {
        playerturn = currentPlayer;
        player_O.classList.remove('active');
        player_X.classList.add('active');
        para.innerHTML = "Player X turn";


    }
}

// SEPRATE FUNCTION
const seprate = (e) => {
    if (e.target.textContent == "") {
        e.target.textContent = playerturn;

        if (checkwingame()) {
            para.innerHTML = `Player ${playerturn}  Win Game`;
            if (playerturn === 'X') {
                playerx_value.innerHTML++;
            } else {
                playero_value.innerHTML++;
            }
            disable(`${playerturn} `, `Winner`);

        } else if (checktie()) {
            disable('Tie', 'Game');
            para.innerHTML = 'Game End';
        }
        else {
            changeplayerturn();
        }
    }
}

// START GAME FUNCTION START
const startgame = () => {
    gamecell.forEach((cell) => {
        cell.addEventListener('click', seprate);
    })
}
rstbtn.addEventListener('click', restartgame);

startgame();
