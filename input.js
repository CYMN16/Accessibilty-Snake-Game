let inputDirection = { x: 0, y: 0 }
let lastInputDirection = { x: 0, y: 0 }

const up = document.getElementById('up');
const left = document.getElementById('left');
const down = document.getElementById('down');
const right = document.getElementById('right');

// remove active class from all buttons when page loads
const buttons = document.querySelectorAll('.arrow-key');
buttons.forEach(button => button.classList.remove('active'));



up.addEventListener('click', () => {
    if (lastInputDirection.y != 0) return
    inputDirection = { x: 0, y: -1 }
});

left.addEventListener('click', () => {
    if (lastInputDirection.x != 0) return
    inputDirection = { x: -1, y: 0 }
});

down.addEventListener('click', () => {
    if (lastInputDirection.y != 0) return
    inputDirection = { x: 0, y: 1 }
});

right.addEventListener('click', () => {
    if (lastInputDirection.x != 0) return
    inputDirection = { x: 1, y: 0 }
});

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

export function getInputDirection() {
    lastInputDirection = inputDirection
    return inputDirection
}