function createGameBoard(size = 3, mark1 = "X", mark2 = "O") {

    let gameBoard = []
    for (let i = 0; i < size; i++) {
        let row = Array(size).fill(null)
        gameBoard.push(row)
    }

    function printBoard() {
        for (let i = 0; i < size; i++) {
            console.log(
                `${gameBoard[i][0] === null ? ' ' : gameBoard[i][0]} | ` +
                `${gameBoard[i][1] === null ? ' ' : gameBoard[i][1]} | ` +
                `${gameBoard[i][2] === null ? ' ' : gameBoard[i][2]}`
            )
        }
    }

    function draw(mark, coord) {
        gameBoard[coord[0]][coord[1]] = mark
    }

    return {
        gameBoard: gameBoard,
        printBoard: printBoard,
        draw: draw
    }
}

function createPlayer(mark) {

    function draw(gameBoard, coord) {
        gameBoard.draw(mark, coord)
    }

    function getInput(gameBoard) {
        const coord = prompt("Enter coordinates").split('').map(Number)
        if (coordIsValid(gameBoard, coord)) {
            return coord
        }
        return getInput()
    }

    function coordIsValid(gameBoard, coord) {
        if (gameBoard.gameBoard[coord[0]][coord[1]] === null) {
            return coord
        }
        return false
    }

    return {
        draw: draw,
        getInput: getInput
    }
}

const gameLogic = (function () {
    const scanWinner = (gameBoard) => {
        if (mark =
            scanHorizontal(gameBoard.gameBoard) ||
            scanVertical(gameBoard.gameBoard) ||
            scanDiagonal1(gameBoard.gameBoard) ||
            scanDiagonal2(gameBoard.gameBoard)
        ) {
            return mark
        }
        return false
    }

    const scanDraw = (gameBoard) => {
        gameBoard = gameBoard.flat(Infinity)
        if (gameBoard.includes(null)) {
            return false
        }
        return true
    }

    const scanHorizontal = (gameBoard) => {
        for (let i = 0; i < gameBoard.length; i++) {
            const row = gameBoard[i];
            const firstMark = row[0];
            let gameover = true
            for (let i = 0; i < row.length; i++) {
                const mark = row[i];
                if (mark === null || mark !== firstMark) {
                    gameover = false
                }
            }
            if (gameover) {
                return firstMark
            }
        }
        return false
    }

    const scanVertical = (gameBoard) => {
        for (let i = 0; i < gameBoard.length; i++) {
            let column = []
            for (let j = 0; j < gameBoard.length; j++) {
                column.push(gameBoard[j][i])
            }
            const firstMark = column[0];
            let gameover = true
            for (let i = 0; i < column.length; i++) {
                const mark = column[i];
                if (mark === null || mark !== firstMark) {
                    gameover = false
                }
            }
            if (gameover) {
                return firstMark
            }
        }
        return false
    }

    const scanDiagonal1 = (gameBoard) => {
        let diagonal = []
        for (let i = 0; i < gameBoard.length; i++) {
            diagonal.push(gameBoard[i][i])
        }
        const firstMark = diagonal[0];
        let gameover = true
        for (let i = 0; i < diagonal.length; i++) {
            const mark = diagonal[i];
            if (mark === null || mark !== firstMark) {
                gameover = false
            }
        }
        if (gameover) {
            return firstMark
        }
        return false
    }

    const scanDiagonal2 = (gameBoard) => {
        let diagonal = []
        for (let i = 0; i < gameBoard.length; i++) {
            diagonal.push(gameBoard[i][gameBoard.length - 1 - i])
        }
        const firstMark = diagonal[0];
        let gameover = true
        for (let i = 0; i < diagonal.length; i++) {
            const mark = diagonal[i];
            if (mark === null || mark !== firstMark) {
                gameover = false
            }
        }
        if (gameover) {
            return firstMark
        }
        return false
    }

    return {
        scanWinner: scanWinner
    }
})()

function createGame(mark1, mark2) {
    const gameBoard = createGameBoard()
    const player1 = createPlayer(mark1)
    const player2 = createPlayer(mark2)
    let player1Score = 0
    let player2Score = 0

    function start() {
        gameBoard.printBoard()
        console.log('Player 1 goes first')

        let gameover = false
        while (!gameover) {
            player1.draw(gameBoard, player1.getInput(gameBoard))
            gameBoard.printBoard()
            if (gameLogic.scanWinner(gameBoard)) {
                player1Score++
                console.log('Player 1 wins!')
                gameover = true
                break
            }

            player2.draw(gameBoard, player1.getInput(gameBoard))
            gameBoard.printBoard()
            if (gameLogic.scanWinner(gameBoard)) {
                player2Score++
                console.log('Player 2 wins!')
                gameover = true
                break
            }
        }

        console.log(`Score: ${player1Score} - ${player2Score}`)
    }

    return {
        start: start
    }
}

const game = createGame("X", "O")
game.start()
