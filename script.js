function createGameBoard(size = 3, mark1 = "X", mark2 = "O") {

    let gameBoard = []
    for (let i = 0; i < size; i++) {
        let row = Array(size).fill(null)
        gameBoard.push(row)
    }

    function printBoard() {
        for (let i = 0; i < size; i++) {
            console.log(gameBoard[i].join(' | '))
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
        getInput: getInput,
        mark: mark
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
        gameBoard = gameBoard.gameBoard.flat(Infinity)
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

    const coordIsValid = (gameBoard, coord) => {
        if (gameBoard.gameBoard[coord[0]][coord[1]] === null) {
            return coord
        }
        return false
    }

    return {
        scanWinner: scanWinner,
        scanDraw: scanDraw,
        coordIsValid: coordIsValid
    }
})()

function createGame(size, mark1, mark2) {
    const gameBoard = createGameBoard(size, mark1, mark2)
    const player1 = createPlayer(mark1)
    const player2 = createPlayer(mark2)
    let currentPlayer = player1

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
            if (gameLogic.scanDraw(gameBoard)) {
                console.log('Draw!')
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
            if (gameLogic.scanDraw(gameBoard)) {
                console.log('Draw!')
                gameover = true
                break
            }
        }

        console.log(`Score: ${player1Score} - ${player2Score}`)
    }

    function guiStart() {
        gameBoard.printBoard()
        console.log('Player 1 goes first')

        gui.grids.forEach((grid) => {
            grid.addEventListener('click', handleClick);
        });
    }

    function handleClick(e) {
        const coord = e.target.dataset.coordinate.split('').map(Number)

        if (!gameLogic.coordIsValid(gameBoard, coord)) {
            return
        }

        currentPlayer.draw(gameBoard, coord)
        gameBoard.printBoard()
        gui.render()
        if (mark = gameLogic.scanWinner(gameBoard)) {
            if (mark === mark1) {
                player1Score++
                announceWinner("Player 1")
                return
            } else {
                player2Score++
                announceWinner("Player 2")
                return
            }
        }
        if (gameLogic.scanDraw(gameBoard)) {
            announceDraw()
            return
        }

        currentPlayer = (currentPlayer === player1) ? player2 : player1
        gui.body.style.backgroundColor = (currentPlayer === player1) ? 'rgb(222, 240, 255)' : 'rgb(255, 222, 240)'
    }

    function removeEventListeners() {
        gui.grids.forEach((grid) => {
            grid.removeEventListener('click', handleClick);
            grid.removeEventListener('mouseover', gui.previewMark);
        });
    }

    function announceWinner(name) {
        console.log(`${name} wins!`)
        gui.notice.textContent = `${name} wins!`
        gui.notice.style.visibility = 'visible'
        gui.score.textContent = `Score: ${player1Score} - ${player2Score}`
        removeEventListeners()
    }

    function announceDraw() {
        console.log('Draw!')
        gui.notice.textContent = 'Draw!'
        removeEventListeners()
    }

    function currentPlayerMark() {
        return currentPlayer.mark
    }

    return {
        start: start,
        guiStart: guiStart,
        gameBoard: gameBoard,
        currentPlayerMark: currentPlayerMark
    }
}

function createGui() {
    const container = document.getElementById('container')
    const notice = document.querySelector('.notice')
    const reset = document.getElementById('reset')
    const slider = document.getElementById('slider')
    const sliderLabel = document.getElementById('sliderLabel')
    const score = document.querySelector('.score')
    const body = document.querySelector('body')

    sliderLabel.textContent = `Size: ${slider.value}`
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`

    game.gameBoard.gameBoard.forEach((row, rowIndex) => {
        row.forEach((mark, columnIndex) => {
            const grid = document.createElement('div')
            grid.classList.add('grid')
            grid.textContent = mark
            grid.dataset.coordinate = `${rowIndex}${columnIndex}`
            container.appendChild(grid)
        })
    })

    const grids = document.querySelectorAll('.grid')
    function previewMark(grid) {
        grid = grid.target
        if (game.gameBoard.gameBoard[grid.dataset.coordinate[0]][grid.dataset.coordinate[1]] === null) {
            grid.textContent = game.currentPlayerMark()
            grid.style.color = 'rgba(0, 0, 0, 0.2)'
        }
    }
    grids.forEach((grid) => {
        grid.style.fontSize = `min(${40 / size}vw, ${40 / size}vh)`;
        grid.addEventListener('mouseover', previewMark)
        grid.addEventListener('mouseout', () => {
            if (game.gameBoard.gameBoard[grid.dataset.coordinate[0]][grid.dataset.coordinate[1]] === null) {
                grid.textContent = ''
            }
            grid.style.color = 'black'
        })
        grid.addEventListener('click', () => {
            grid.style.color = 'black'
        })
    })

    function render() {
        game.gameBoard.gameBoard.forEach((row, rowIndex) => {
            row.forEach((mark, columnIndex) => {
                const grid = document.querySelector(`[data-coordinate="${rowIndex}${columnIndex}"]`)
                grid.textContent = mark
            })
        })
    }

    function resetContainer() {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        while (gui.notice.firstChild) {
            notice.removeChild(notice.firstChild);
        }
        gui.notice.style.visibility = 'hidden'
        body.style.backgroundColor = 'rgb(222, 240, 255)'
    }
    return {
        grids: grids,
        render: render,
        notice: notice,
        reset: reset,
        container: container,
        slider: slider,
        resetContainer: resetContainer,
        score: score,
        body: body,
        previewMark: previewMark
    }
}

let size = Number(document.getElementById('slider').value)
let player1Score = 0
let player2Score = 0
let game = createGame(size, "X", "O")
let gui = createGui()
game.guiStart()

gui.reset.addEventListener('click', () => {
    gui.resetContainer()
    game = createGame(size, "X", "O")
    gui = createGui()
    game.guiStart()
})

gui.slider.addEventListener('input', () => {

    gui.resetContainer()
    size = Number(gui.slider.value)
    game = createGame(size, "X", "O")
    gui = createGui()
    game.guiStart()
})

