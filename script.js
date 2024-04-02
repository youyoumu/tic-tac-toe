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

    function draw(coord) {
        gameBoard.draw(mark, coord)
    }

    function getInput() {
        const coord = prompt("Enter coordinates").split('').map(Number)
        if (coordIsValid(coord)) {
            return coord
        }
        return getInput()
    }

    function coordIsValid(coord) {
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
    const scanWinner = () => {
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

gameBoard = createGameBoard()
player1 = createPlayer("X")
player2 = createPlayer("O")
gameBoard.printBoard()

let gameover = false
while (!gameover) {
    player1.draw(player1.getInput())
    gameBoard.printBoard()
    if (gameLogic.scanWinner(gameBoard)) {
        console.log('Player 1 wins!')
        gameover = true
        break
    }

    player2.draw(player1.getInput())
    gameBoard.printBoard()
    if (gameLogic.scanWinner(gameBoard)) {
        console.log('Player 2 wins!')
        gameover = true
        break
    }
}
