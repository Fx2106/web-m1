/**
 * Chrono-Snake - Misión M1
 * Lógica del Juego (Fase 2: Motor de Movimiento)
 */

// 1. Configuración y Constantes
const BOARD_SIZE = 15;
const boardElement = document.querySelector('#game-board');

// 2. Estado del Juego
let snake = [
    { x: 7, y: 7 }, { x: 6, y: 7 }, { x: 5, y: 7 },
    { x: 4, y: 7 }, { x: 3, y: 7 }, { x: 2, y: 7 }, { x: 1, y: 7 }
];
let apple = { x: 12, y: 7 };
let direction = { x: 1, y: 0 }; // Empezamos moviéndonos a la derecha
let nextDirection = { x: 1, y: 0 };
let gameInterval = null;
let gameSpeed = 200; // Milisegundos entre movimientos

/**
 * Crea las celdas del tablero en el DOM
 */
function createBoard() {
    boardElement.innerHTML = '';
    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        boardElement.appendChild(cell);
    }
}

/**
 * Captura las teclas para cambiar de dirección
 * Evita giros de 180 grados (no puedes ir a la izquierda si vas a la derecha)
 */
window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    
    if ((key === 'arrowup' || key === 'w') && direction.y === 0) {
        nextDirection = { x: 0, y: -1 };
    } else if ((key === 'arrowdown' || key === 's') && direction.y === 0) {
        nextDirection = { x: 0, y: 1 };
    } else if ((key === 'arrowleft' || key === 'a') && direction.x === 0) {
        nextDirection = { x: -1, y: 0 };
    } else if ((key === 'arrowright' || key === 'd') && direction.x === 0) {
        nextDirection = { x: 1, y: 0 };
    }
});

/**
 * Calcula la nueva posición y mueve la serpiente
 */
function moveSnake() {
    direction = { ...nextDirection };
    
    // Crear nueva cabeza
    const head = { 
        x: snake[0].x + direction.x, 
        y: snake[0].y + direction.y 
    };

    // Añadir cabeza al principio
    snake.unshift(head);

    // Como la longitud es fija (7), quitamos siempre la cola
    if (snake.length > 7) {
        snake.pop();
    }
}

/**
 * Dibuja los elementos del juego
 */
function draw() {
    const cells = document.querySelectorAll('.cell');
    
    // Limpiar clases previas
    cells.forEach(cell => {
        cell.classList.remove('snake', 'snake-head', 'apple');
    });

    // Dibujar serpiente
    snake.forEach((segment, index) => {
        // Verificar si está dentro del tablero para evitar errores de índice
        if (segment.x >= 0 && segment.x < BOARD_SIZE && segment.y >= 0 && segment.y < BOARD_SIZE) {
            const cellIndex = segment.y * BOARD_SIZE + segment.x;
            if (cells[cellIndex]) {
                cells[cellIndex].classList.add('snake');
                if (index === 0) cells[cellIndex].classList.add('snake-head');
            }
        }
    });

    // Dibujar manzana
    const appleIndex = apple.y * BOARD_SIZE + apple.x;
    if (cells[appleIndex]) {
        cells[appleIndex].classList.add('apple');
    }
}

/**
 * Bucle principal del juego
 */
function gameLoop() {
    moveSnake();
    
    // Por ahora, si se sale del tablero, lo reiniciamos (esto se pulirá en la Fase 3)
    if (snake[0].x < 0 || snake[0].x >= BOARD_SIZE || snake[0].y < 0 || snake[0].y >= BOARD_SIZE) {
        alert("¡Colisión con el muro! Reiniciando...");
        resetGame();
        return;
    }

    draw();
    setTimeout(gameLoop, gameSpeed);
}

function resetGame() {
    snake = [
        { x: 7, y: 7 }, { x: 6, y: 7 }, { x: 5, y: 7 },
        { x: 4, y: 7 }, { x: 3, y: 7 }, { x: 2, y: 7 }, { x: 1, y: 7 }
    ];
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    draw();
}

// Inicialización
createBoard();
draw();
setTimeout(gameLoop, gameSpeed);
