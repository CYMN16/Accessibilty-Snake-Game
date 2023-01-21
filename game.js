// import {
//     SNAKE_SPEED, update as snakeUpdate, draw as snakeDraw,
//     getSnakeHead, snakeIntersection
// } from './snake.js'
//import { update as foodUpdate, draw as foodDraw } from './food.js'
//import { outsideGrid } from './grid.js'

let lastRenderTime = 0
let gameOver = false
let inputDirection = { x: 0, y: 0 }
let lastInputDirection = { x: 0, y: 0 }
let newSegments = 0

const SNAKE_SPEED = 10
const snakeBody = [
    { x: 10, y: 11 }
]

const up = document.getElementById('up');
const left = document.getElementById('left');
const down = document.getElementById('down');
const right = document.getElementById('right');

const gameBoard = document.getElementById("game-board")
const restartBtn = document.getElementById("restart-btn")
const GRID_SIZE = 21

// remove active class from all buttons when page loads
const buttons = document.querySelectorAll('.arrow-key');
buttons.forEach(button => button.classList.remove('active'));


let food = { x: 10, y: 2 }
const EXPANSION_RATE = 5

function updateFood() {
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE)
        food = getRandomFoodPosition()
    }
}

function drawFood(gameBoard) {
    const foodElement = document.createElement('div')
    foodElement.style.gridColumnStart = food.x
    foodElement.style.gridRowStart = food.y
    foodElement.classList.add('food')
    gameBoard.appendChild(foodElement)

}

function getRandomFoodPosition() {
    let newFoodPosition
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPositon()
    }
    return newFoodPosition
}

function randomGridPositon() {
    return {
        x: Math.floor(Math.random() * GRID_SIZE) + 1,
        y: Math.floor(Math.random() * GRID_SIZE) + 1
    }
}

function outsideGrid(position) {
    return (
        position.x < 1 || position.x > GRID_SIZE ||
        position.y < 1 || position.y > GRID_SIZE
    )
}



window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (lastInputDirection.y != 0) break
            inputDirection = { x: 0, y: -1 }
            buttons.forEach(button => button.classList.remove('active'));
            up.classList.add('active');
            break

        case 'ArrowDown':
            if (lastInputDirection.y != 0) break
            inputDirection = { x: 0, y: 1 }
            buttons.forEach(button => button.classList.remove('active'));
            down.classList.add('active');
            break

        case 'ArrowLeft':
            if (lastInputDirection.x != 0) break
            inputDirection = { x: -1, y: 0 }
            buttons.forEach(button => button.classList.remove('active'));
            left.classList.add('active');
            break

        case 'ArrowRight':
            if (lastInputDirection.x != 0) break
            inputDirection = { x: 1, y: 0 }
            buttons.forEach(button => button.classList.remove('active'));
            right.classList.add('active');
            break

    }
})

// window.addEventListener('microphone', e => {
//     switch (e.command) {
//         case 'Up':
//             if (lastInputDirection.y != 0) break
//             inputDirection = { x: 0, y: -1 }
//             break

//         case 'Down':
//             if (lastInputDirection.y != 0) break
//             inputDirection = { x: 0, y: 1 }
//             break

//         case 'Left':
//             if (lastInputDirection.x != 0) break
//             inputDirection = { x: -1, y: 0 }
//             break

//         case 'Right':
//             if (lastInputDirection.x != 0) break
//             inputDirection = { x: 1, y: 0 }
//             break

//     }
// })

function getInputDirection() {
    lastInputDirection = inputDirection
    return inputDirection
}


function updateSnake() {
    addSegments()
    const inputDirection = getInputDirection()
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    }
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}

function drawSnake(gameBoard) {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.style.gridRowStart = segment.y
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)
    })
}

function expandSnake(amount) {
    newSegments += amount
}

function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false
        return equalPositions(segment, position)
    })
}

function getSnakeHead() {
    return snakeBody[0]
}

function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true })
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
    }
    newSegments = 0
}
if(restartBtn){
    restartBtn.addEventListener('click', func => {
    window.location = '/'
})
}


function main(currentTime) {
    if (gameOver) {
        if (confirm('You Lost, press ok to restart')) {
            window.location = '/'
        }
        return
    }
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    lastRenderTime = currentTime

    update()
    draw()
}
if (up) {
    up.addEventListener('click', () => {
        if (lastInputDirection.y != 0) return
        inputDirection = { x: 0, y: -1 }
    });
}

if (left) {
left.addEventListener('click', () => {
    if (lastInputDirection.x != 0) return
    inputDirection = { x: -1, y: 0 }
});
}

if(down){
down.addEventListener('click', () => {
    if (lastInputDirection.y != 0) return
    inputDirection = { x: 0, y: 1 }
});

}

if(right){
right.addEventListener('click', () => {
    if (lastInputDirection.x != 0) return
    inputDirection = { x: 1, y: 0 }
});
}
window.requestAnimationFrame(main)

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}