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
        console.log(scanHorizontal(gameBoard.gameBoard))
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

    return {
        scanWinner: scanWinner
    }
})()

gameBoard = createGameBoard()
player1 = createPlayer("X")
player2 = createPlayer("O")
gameBoard.printBoard()

while (true) {
    player1.draw(player1.getInput())
    gameBoard.printBoard()
    gameLogic.scanWinner(gameBoard)

    player2.draw(player1.getInput())
    gameBoard.printBoard()
    gameLogic.scanWinner(gameBoard)
}
