export function createBricks(canvas) {
    const bricks = [];

    const rows =5;
    const cols =10;

    const brickColors = [
    "#FF00E5",
    "#FF5E00",
    "#FFD500",
    "#00F5FF",
    "#A8FF00"
];

    const brickWidth = 45;
    const brickHeight = 15;
    const gap = 5;

    const totalWidth = cols * brickWidth + (cols - 1) * gap;
    const offsetX = (canvas.width - totalWidth) / 2;
    const offsetY = 50;

    for (let row =0; row<rows;row++){
        for (let col =0; col<cols; col++){
            const x = offsetX +col*(brickWidth +gap);
            const y = offsetY + row*(brickHeight + gap);

            bricks.push({
                x, 
                y, 
                width: brickWidth,
                height: brickHeight,
                color: brickColors[row % brickColors.length],
                destroyed: false
            });
        }
    }
    return bricks;
}