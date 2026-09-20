/**
 * Chrono-Snake - Misión M1
 * Lógica del Juego (Fase 1: Renderizado Inicial)
 */

const BOARD_SIZE = 15;
const boardElement = document.querySelector('#game-board');

// Estado inicial sugerido para el renderizado de prueba
const snake = [
    { x: 7, y: 7 }, { x: 6, y: 7 }, { x: 5, y: 7 },
    { x: 4, y: 7 }, { x: 3, y: 7 }, { x: 2, y: 7 }, { x: 1, y: 7 }
];
const apple = { x: 12, y: 7 };

/**
 * Crea las celdas del tablero en el DOM
 */
function createBoard() {
    boardElement.innerHTML = ''; // Limpiar por si acaso
    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        boardElement.appendChild(cell);
    }
}

/**
 * Dibuja los elementos del juego basándose en sus coordenadas
 */
function draw() {
    const cells = document.querySelectorAll('.cell');
    
    // Limpiar clases previas
    cells.forEach(cell => {
        cell.classList.remove('snake', 'snake-head', 'apple');
    });

    // Dibujar serpiente
    snake.forEach((segment, index) => {
        const cellIndex = segment.y * BOARD_SIZE + segment.x;
        if (cells[cellIndex]) {
            cells[cellIndex].classList.add('snake');
            if (index === 0) cells[cellIndex].classList.add('snake-head');
        }
    });

    // Dibujar manzana
    const appleIndex = apple.y * BOARD_SIZE + apple.x;
    if (cells[appleIndex]) {
        cells[appleIndex].classList.add('apple');
    }
}

// Inicialización de la Fase 1
createBoard();
draw();
