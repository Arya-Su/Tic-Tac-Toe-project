let PlayerText = document.getElementById('PlayerText')
let restartBtn = document.getElementById('restartBtn')

//Nine parts of the box
let boxes = Array.from(document.getElementsByClassName('box'))

//Two player mode
let modeBtns = Array.from(document.getElementsByName('mode'))

// Marking blocks when won
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

//CONSTANTS
const O_TEXT = "O"
const X_TEXT = "X"
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const clickSound = document.getElementById("button_sound")
const winSound = document.getElementById("win_sound");


//Deafult for begining the game
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)
let mode = 'single'

//Starting the game 
const startGame = () => {
    modeBtns.forEach(btn => {
        btn.addEventListener('change', () => {
            mode = btn.value
            restart()
        })
    })
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

let gameFinished = false

function boxClicked(e) {
    if (gameFinished) {
        return
    }

    const id = e.target.id
    clickSound.play()


    if (!spaces[id]) {
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer
        clickSound.play()

        if (playerHasWon() !== false) {
            PlayerText.innerHTML = `Player ${currentPlayer} has won!`
            let winning_blocks = playerHasWon()

            winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator)

            gameFinished = true
            winSound.play();

            return
        }

        if (mode === 'single') {
            currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT

            if (!gameFinished) {
                computerPlay()
                clickSound.play()

                if (playerHasWon() !== false) {
                    PlayerText.innerHTML = `Player ${currentPlayer} has won!`
                    let winning_blocks = playerHasWon()

                    winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator)

                    gameFinished = true

                    winSound.play();

                    return
                }

            }
        } else {
            currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
            clickSound.play();

        }
    }
}

// Playing against computer
function computerPlay() {
    if (gameFinished) {
        return
    }

    // Generate random number between 0 and 8 until an empty space is found
    let id = Math.floor(Math.random() * 9)
    while (spaces[id]) {
        id = Math.floor(Math.random() * 9)
    }

    // Set the space to O and update the display
    spaces[id] = O_TEXT
    boxes[id].innerText = O_TEXT

    if (playerHasWon() !== false) {
        PlayerText.innerHTML = `Player ${O_TEXT} has won!`
        let winning_blocks = playerHasWon()

        winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator)

        gameFinished = true
        winSound.play();

        return
    }

    currentPlayer = X_TEXT
}

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c]
        }
    }
    return false
}

// Restarting the game
restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)

    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor = ''
    })

    PlayerText.innerHTML = 'Tic Tac Toe'

    currentPlayer = X_TEXT
    gameFinished = false
}

function computerPlay() {
    // Generate random number between 0 and 8 until an empty space is found
    let id = Math.floor(Math.random() * 9)
    while (spaces[id]) {
        id = Math.floor(Math.random() * 9)
    }

    // Set the space to O and update the display
    spaces[id] = O_TEXT
    boxes[id].innerText = O_TEXT

    if (playerHasWon() !== false) {
        PlayerText.innerHTML = `Player ${O_TEXT} has won!`
        let winning_blocks = playerHasWon()

        winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator)
        return
    }

    currentPlayer = X_TEXT
}

startGame()
