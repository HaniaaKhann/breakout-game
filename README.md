# Breakout

A browser-based Breakout game with a neon arcade look. Built with HTML5 Canvas and vanilla JavaScript.

## How to Run

This project uses ES modules, so open it through a local server rather than double-clicking the HTML file.

```bash
npx serve .
```

Then open the URL shown in the terminal (usually `http://localhost:3000`).

## Controls

- **Mouse** — move the paddle
- **Space** — start the game
- **R** — restart after winning or losing

## Project Structure

```
index.html      — page and canvas
css/style.css   — layout and neon styling
js/game.js      — game loop, state, and UI
js/paddle.js    — paddle movement and drawing
js/ball.js      — ball physics and collisions
js/bricks.js    — brick grid setup
```

## Gameplay

You have 3 lives. Clear all 50 bricks to win. Miss the ball and you lose a life.
