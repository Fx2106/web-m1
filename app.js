/**
 * Chrono-Snake - Misión M1
 * Fase 3: Tiempo y manzanas
 */

// 1. Configuración
const BOARD_SIZE = 15;
const INITIAL_TIME = 60;
const MAX_TIME = 100;
const SNAKE_LENGTH = 7;
const INITIAL_SPEED = 370;
const SPEED_MULTIPLIER = 0.95;

const boardElement = document.querySelector('#game-board');
const timerElement = document.querySelector('#timer');
const speedElement = document.querySelector('#speed');
const overlayElement = document.querySelector('#overlay');
const statusTitleElement = document.querySelector('#status-title');
const statusDescElement = document.querySelector('#status-desc');
const restartButtonElement = document.querySelector('#restart-btn');

// 2. Estado del juego
let snake = [
    { x: 7, y: 7 },
    { x: 6, y: 7 },
    { x: 5, y: 7 },
    { x: 4, y: 7 },
    { x: 3, y: 7 },
    { x: 2, y: 7 },
    { x: 1, y: 7 }
];

let apple = { x: 12, y: 7 };
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };

let gameSpeed = INITIAL_SPEED;
let timer = INITIAL_TIME;

let gameInterval = null;
let timerInterval = null;
let gameRunning = true;

// Guardamos las celdas del tablero para no buscarlas continuamente
let cells = [];

// 3. Crear tablero
function createBoard() {
    boardElement.replaceChildren();

    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        boardElement.appendChild(cell);
    }

    cells = document.querySelectorAll('.cell');
}

// 4. Generar una manzana en una posición libre
function generateApple() {
    const freeCells = [];

    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            const occupiedBySnake = snake.some(
                (segment) => segment.x === x && segment.y === y
            );

            if (!occupiedBySnake) {
                freeCells.push({ x, y });
            }
        }
    }

    if (freeCells.length === 0) {
        return;
    }

    const randomIndex = Math.floor(Math.random() * freeCells.length);
    apple = freeCells[randomIndex];
}

// 5. Cambiar dirección
document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();

    if (key === 'n') {
        document.body.classList.toggle('dark-mode');
    }

    if (key === 'arrowup' || key === 'w') {
        if (direction.y === 0) {
            nextDirection = { x: 0, y: -1 };
        }
    }

    if (key === 'arrowdown' || key === 's') {
        if (direction.y === 0) {
            nextDirection = { x: 0, y: 1 };
        }
    }

    if (key === 'arrowleft' || key === 'a') {
        if (direction.x === 0) {
            nextDirection = { x: -1, y: 0 };
        }
    }

    if (key === 'arrowright' || key === 'd') {
        if (direction.x === 0) {
            nextDirection = { x: 1, y: 0 };
        }
    }
});

// 6. Mover la serpiente
function moveSnake() {
    direction = { ...nextDirection };

    const head = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    };

    // Añadimos la nueva cabeza
    snake.unshift(head);

    // La serpiente mantiene siempre 7 segmentos
    if (snake.length > SNAKE_LENGTH) {
        snake.pop();
    }
}

// 7. Comprobar colisión con los límites
function hasHitWall() {
    const head = snake[0];

    return (
        head.x < 0 ||
        head.x >= BOARD_SIZE ||
        head.y < 0 ||
        head.y >= BOARD_SIZE
    );
}

// 8. Comprobar colisión consigo misma
function hasHitSelf() {
    const head = snake[0];

    return snake
        .slice(1)
        .some((segment) => segment.x === head.x && segment.y === head.y);
}

// 9. Comprobar si hemos comido la manzana
function hasEatenApple() {
    const head = snake[0];

    return head.x === apple.x && head.y === apple.y;
}

// 10. Comer manzana
function eatApple() {
    timer -= 5;

    // Aumentamos la velocidad haciendo menor el tiempo entre movimientos
    gameSpeed = Math.max(60, Math.round(gameSpeed * SPEED_MULTIPLIER));

    generateApple();
    updateUI();
}

// 11. Actualizar interfaz
function updateUI() {
    timerElement.textContent = timer;

    const currentSpeed = INITIAL_SPEED / gameSpeed;
    speedElement.textContent = `${currentSpeed.toFixed(1)}`;
}

// 12. Dibujar juego
function draw() {
    cells.forEach((cell) => {
        cell.classList.remove('snake', 'snake-head', 'apple');
    });

    snake.forEach((segment, index) => {
        if (
            segment.x >= 0 &&
            segment.x < BOARD_SIZE &&
            segment.y >= 0 &&
            segment.y < BOARD_SIZE
        ) {
            const cellIndex = segment.y * BOARD_SIZE + segment.x;

            cells[cellIndex].classList.add('snake');

            if (index === 0) {
                cells[cellIndex].classList.add('snake-head');
            }
        }
    });

    const appleIndex = apple.y * BOARD_SIZE + apple.x;

    if (cells[appleIndex]) {
        cells[appleIndex].classList.add('apple');
    }
}

// 13. Terminar partida
function endGame(title, message) {
    gameRunning = false;
    clearTimeout(gameInterval);
    clearInterval(timerInterval);

    statusTitleElement.textContent = title;
    statusDescElement.textContent = message;
    overlayElement.classList.remove('hidden');
}

// 14. Bucle de movimiento
function gameLoop() {
    if (!gameRunning) {
        return;
    }

    moveSnake();

    // Colisión con muro
    if (hasHitWall()) {
        endGame(
            'GAME OVER',
            '¡Has chocado contra el muro!'
        );
        return;
    }

    // Colisión consigo misma
    if (hasHitSelf()) {
        endGame(
            'GAME OVER',
            '¡Te has chocado contigo mismo!'
        );
        return;
    }

    // Comer manzana
    if (hasEatenApple()) {
        eatApple();

        // Victoria
        if (timer <= 0) {
            endGame(
                '¡VICTORIA!',
                'Has conseguido llevar el tiempo a 0 segundos.'
            );
            return;
        }
    }

    draw();

    gameInterval = setTimeout(gameLoop, gameSpeed);
}

// 15. Bucle del temporizador
function updateTimer() {
    if (!gameRunning) {
        return;
    }

    timer++;

    // Derrota por sobrecarga temporal
    if (timer >= MAX_TIME) {
        timer = MAX_TIME;
        updateUI();
        endGame(
            'SOBRECARGA TEMPORAL',
            'El reloj ha llegado a 100 segundos.'
        );
        return;
    }

    updateUI();
}



// 16. Reiniciar partida
function resetGame() {
    clearTimeout(gameInterval);
    clearInterval(timerInterval);

    overlayElement.classList.add('hidden');

    snake = [
        { x: 7, y: 7 },
        { x: 6, y: 7 },
        { x: 5, y: 7 },
        { x: 4, y: 7 },
        { x: 3, y: 7 },
        { x: 2, y: 7 },
        { x: 1, y: 7 }
    ];

    apple = { x: 12, y: 7 };

    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };

    gameSpeed = INITIAL_SPEED;
    timer = INITIAL_TIME;
    gameRunning = true;

    generateApple();
    updateUI();
    draw();

    gameInterval = setTimeout(gameLoop, gameSpeed);
    timerInterval = setInterval(updateTimer, 1000);
}

restartButtonElement.addEventListener('click', () => {
    resetGame();
});

// 17. Inicialización
createBoard();
resetGame();
