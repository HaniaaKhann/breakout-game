import Paddle from "./paddle.js";
import Ball from "./ball.js";
import {createBricks} from "./bricks.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddle = new Paddle();
const ball = new Ball();

canvas.width = 500;
canvas.height = 600;
let bricks = createBricks(canvas);
let bricksRemaining = bricks.length;

let gameState = "start"; 
let lives = 3;

canvas.addEventListener("mousemove", (event) => {
    paddle.updatePosition(event.offsetX);
});

window.addEventListener("keydown", (event) => {
    if(
        event.code === "Space" &&
        gameState === "start"
    ){
        gameState = "playing";
    }
    if (event.key.toLowerCase() ==="r" &&
        (gameState === "won" || gameState === "lost"))
    {
        restartGame();
    }
});


function restartGame(){
    lives = 3;
    bricks = createBricks(canvas);
    ball.reset();
    gameState = "start";

}

function update(){
    if (gameState !== "playing"){
        return;
    }
    const result = ball.update(canvas, paddle, bricks);

    bricksRemaining = bricks.filter(brick => !brick.destroyed).length;

    if (bricksRemaining === 0){
        gameState = "won";
    }
    if (result === "lifeLost"){
        lives--;
        if (lives<= 0){
            gameState ="lost";
        } else{
            ball.reset();
        }
    }
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    if (gameState === "won"){
        ctx.fillStyle = "#A8FF00";
        ctx.font = "30px Arial";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#A8FF00";
        ctx.fillText("You Win!Press R to Restart", 180, 280);
        ctx.fillText("Press R to Restart", 140, 320);

    }
    if (gameState === "lost"){
        ctx.fillStyle = "#FF0055";
        ctx.font = "30px Arial";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#FF0055";
        ctx.fillText("Game Over!", 180, 280);
        ctx.fillText("Press R to Restart", 140, 320);
    }

    if (gameState === "start"){
        ctx.fillStyle = "#FF00E5";
        ctx.font = "30px Arial";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#FF00E5";
        ctx.fillText("BREAKOUT", 170, 250);

        ctx.font = "18px Arial";
        ctx.fillStyle = "#00F5FF";
        ctx.fillText("Press Space to Start", 165, 300);
        return;
    }

    paddle.draw(ctx);
    ball.draw(ctx);

    ctx.fillStyle = "#00F5FF";
    ctx.font = "20px Arial";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#00F5FF";
    ctx.fillText(`Lives: ${lives}`, 20, 30);
    ctx.fillText(`Bricks: ${bricksRemaining}`, 350, 30);
    ctx.shadowBlur = 0;


    bricks.forEach(brick => {
        if(!brick.destroyed) {
            ctx.fillStyle = brick.color;
            ctx.shadowBlur = 5;
            ctx.shadowColor = brick.color;
            ctx.fillRect(
                brick.x,
                brick.y,
                brick.width,
                brick.height
            );
            ctx.shadowBlur = 0;
        }
    });

}

function gameLoop(){
    update();
    draw();

    requestAnimationFrame(gameLoop);
}

gameLoop();

