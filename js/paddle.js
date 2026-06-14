export default class Paddle{
    constructor(){
        this.width = 80;
        this.height = 15;

        this.x = 210;
        this.y = 560;

        this.color = "#00F5FF";
    }

    updatePosition(mouseX){
        this.x = mouseX - this.width /2;
        const maxX = 500 -this.width;
        if (this.x <0){
            this.x=0;
        }
        if (this.x > maxX){
            this.x = maxX;
        }
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
        ctx.shadowBlur = 0;
    }
}