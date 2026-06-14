export default class Paddle {
    constructor(canvasWidth = 500) {
        this.canvasWidth = canvasWidth;
        this.width = 80;
        this.height = 15;
        this.y = 560;
        this.color = "#00F5FF";
        this.reset();
    }

    reset() {
        this.x = (this.canvasWidth - this.width) / 2;
    }

    clampX() {
        const maxX = this.canvasWidth - this.width;
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x > maxX) {
            this.x = maxX;
        }
    }

    updatePosition(pointerX) {
        this.x = pointerX - this.width / 2;
        this.clampX();
    }

    move(dx) {
        this.x += dx;
        this.clampX();
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 0;
    }
}
