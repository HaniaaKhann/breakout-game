import Paddle from "./paddle.js";
import Ball from "./ball.js";
import { createBricks } from "./bricks.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 600;

const paddle = new Paddle(canvas.width);
const ball = new Ball();

let gameState = "start";
let lives = 3;
let currentLevel =1;
const MAX_LEVELS =5;

const keys = { left: false, right: false };
const PADDLE_SPEED = 7;
let bricks;
let bricksRemaining;
function loadLevel(level){
    bricks = createBricks(canvas, level);
    bricksRemaining = bricks.length;
    const speed = 3 + (level -1) *0.5;
    ball.reset(speed)
    paddle.reset();
}

loadLevel(1);

function getCanvasX(clientX) {
    const rect = canvas.getBoundingClientRect();
    return (clientX - rect.left) * (canvas.width / rect.width);
}

canvas.addEventListener("mousemove", (event) => {
    paddle.updatePosition(getCanvasX(event.clientX));
});

canvas.addEventListener("touchstart", (event) => {
    event.preventDefault();
    if (gameState !== "playing"){
        handleMenuAction();
        return;
    }
    paddle.updatePosition(getCanvasX(event.touches[0].clientX));
}, { passive: false });

canvas.addEventListener("touchmove", (event) => {
    event.preventDefault();
    if (gameState !=="playing"){
        return;
    }
    paddle.updatePosition(getCanvasX(event.touches[0].clientX));
}, { passive: false });

window.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft" || event.key.toLowerCase() === "a") {
        keys.left = true;
    }
    if (event.code === "ArrowRight" || event.key.toLowerCase() === "d") {
        keys.right = true;
    }
    if (event.code === "Space") {
        handleMenuAction();
    }
    
    
    if (
        event.key.toLowerCase() === "r" &&
        (gameState === "won" || gameState === "lost")
    ) {
        restartGame();
    }
});

window.addEventListener("keyup", (event) => {
    if (event.code === "ArrowLeft" || event.key.toLowerCase() === "a") {
        keys.left = false;
    }
    if (event.code === "ArrowRight" || event.key.toLowerCase() === "d") {
        keys.right = false;
    }
});
function handleMenuAction(){
    if (gameState === "start"){
        gameState = "playing";
    }else if (gameState === "levelComplete") {
        currentLevel++;
        loadLevel(currentLevel);
        gameState = "playing";
    }else if (gameState === "won" || gameState === "lost") {
        restartGame();
    }
}
function restartGame() {
    lives = 3;
    currentLevel =1;
    loadLevel(currentLevel);
    gameState = "start";
}

function updatePaddleInput() {
    if (keys.left) {
        paddle.move(-PADDLE_SPEED);
    }
    if (keys.right) {
        paddle.move(PADDLE_SPEED);
    }
}

function update() {
    updatePaddleInput();

    if (gameState !== "playing") {
        return;
    }

    const result = ball.update(canvas, paddle, bricks);

    if (result === "brickDestroyed") {
        bricksRemaining--;
        if (bricksRemaining === 0) {
            if (currentLevel >= MAX_LEVELS) {
                gameState ="won";
            } else {
                gameState = "levelComplete";
            }
        }
    }

    if (result === "lifeLost") {
        lives--;
        if (lives <= 0) {
            gameState = "lost";
        } else {
            ball.reset(3+(currentLevel -1)*0.5);
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    if (gameState === "levelComplete") {
        ctx.fillStyle = "#A8FF00";
        ctx.font = "30px Arial";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#A8FF00";
        ctx.textAlign = "center";
        ctx.fillText(`Level ${currentLevel} Complete!`, canvas.width / 2, 280);
        ctx.font = "18px Arial";
        ctx.fillText("Tap or Press Space for Next Level", canvas.width / 2, 320);
        ctx.textAlign = "left";
        ctx.shadowBlur = 0;
        return;
    }
    if (gameState === "won") {
        ctx.fillStyle = "#A8FF00";
        ctx.font = "30px Arial";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#A8FF00";
        ctx.textAlign = "center";
        ctx.fillText("You Beat All Levels!", canvas.width / 2, 280);
        ctx.font = "18px Arial";
        ctx.fillText("Tap or Press R to Restart", canvas.width / 2, 320);
        ctx.textAlign = "left";
        ctx.shadowBlur = 0;
        return;
    }

    if (gameState === "lost") {
        ctx.fillStyle = "#FF0055";
        ctx.font = "30px Arial";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#FF0055";
        ctx.textAlign = "center";
        ctx.fillText("Game Over!", canvas.width / 2, 280);
        ctx.font = "18px Arial";
        ctx.fillText("Tap or Press R to Restart", canvas.width / 2, 320);
        ctx.textAlign = "left";
        ctx.shadowBlur = 0;
        return;
    }

    if (gameState === "start") {
        ctx.fillStyle = "#FF00E5";
        ctx.font = "30px Arial";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#FF00E5";
        ctx.textAlign = "center";
        ctx.fillText("BREAKOUT", canvas.width / 2, 250);

        ctx.font = "18px Arial";
        ctx.fillStyle = "#00F5FF";
        ctx.fillText("Tap or Press Space to Start", canvas.width / 2, 300);
        ctx.fillText("Arrow Keys / A D to Move", canvas.width / 2, 330);
        ctx.textAlign = "left";
        ctx.shadowBlur = 0;
        return;
    }

    paddle.draw(ctx);
    ball.draw(ctx);

    ctx.fillStyle = "#00F5FF";
    ctx.font = "20px Arial";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#00F5FF";
    ctx.textAlign ="center";
    ctx.fillText(`Level: ${currentLevel}`, canvas.width/2, 30);
    ctx.textAlign = "left";
    ctx.fillText(`Lives: ${lives}`, 20, 30);
    ctx.fillText(`Bricks: ${bricksRemaining}`, 380, 30);
    ctx.shadowBlur = 0;

    bricks.forEach((brick) => {
        if (!brick.destroyed) {
            ctx.fillStyle = brick.color;
            ctx.shadowBlur = 5;
            ctx.shadowColor = brick.color;
            ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
            ctx.shadowBlur = 0;
        }
    });
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
