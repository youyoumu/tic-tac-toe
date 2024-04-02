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
    function takeTurn(gameBoard, coord) {
        gameBoard.draw(mark, coord)
    }

    function getInput() {
        const coord = prompt("Enter coordinates").split('').map(Number)
        takeTurn(gameBoard, coord)
    }

    return {
        takeTurn: takeTurn,
        getInput: getInput
    }
}

const gameLogic = (function () {
    const scanWinner = (gameBoard) => {
        console.log('scanning winner...')
    }

    return {
        scanWinner: scanWinner
    }
})()

gameBoard = createGameBoard()
player1 = createPlayer("X")
gameBoard.printBoard()

while (true) {
    player1.getInput()
    gameBoard.printBoard()
    gameLogic.scanWinner(gameBoard)

}
