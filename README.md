# Snake-crono

Misión M1 · El Despertar del DOM — Web Development I.

## De que va el juego
Snake-crono es un juego en la que vas controlando una serpiente mientras que tienes un reloj que va subiendo segundo por segundo. Tu objetivo es ir comiendo las manzanas del tablero que te reducen el tiempo del reloj en 5s y ganas un poquito de velocidad. Ganas si consigues que el tiempo del reloj llegue a 0. Cuidado: pierdes cuando el reloj llega a 100s, cuando te chocas contra ti mismo y cuando te chocas contra la pared.

## Uso de IA
Usé dos IAs: Gemini CLI y Chatgpt, que me han ido ayudando durante todo el proyecto. Usé Gemini CLI al inicio para que me diese un esqueleto del proyecto: el HTML, el CSS y el Javascript. Después he ido usando Chatgpt para completar lo que faltaba e ir afinando cada parte de poco a poco. Quitando un par de cosas pequeñas (como escribir el inicio del esqueleto del HTML y los colores y fuentes en HTML), todo el proyecto se ha realizado y completado con la IA.
Ejemplo de promt real: "tengo pensado como un serpiente de esos que come manzanas pero con otras reglas: eres un serpiente de 6 o 7 cuadriculas en un tablero de x*x. tienes al principio tienes un minuto q va sumando segundo a segundo, cuando coges una manzana ganas velicidad y restas 5 segundos al temporizador, el objetivo es coseguir q el temporizador llegue a 0s. divideme el proyecto en varias fases". 

## Autopsia
1. Una de las decisiones que hice fue si poner "window.addEventListener('keydown', (event) => {" o "document.addEventListener('keydown', (event) => {". Al final me decanté por document por que me pareció que era mas controlable y predecible hacer que capte las teclas dentro del HTML que en toda la ventana del navegador.
2. También decisión fue dejar de usar el alert() que estabamos usan al principio y lo sustituimos por #overlay que, a pesar de ser más difícil, daba una estética mejor que con alert().
