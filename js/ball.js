export default class Ball{
    constructor(){
        this.radius = 10;

        // Center of the ball
        this.x = 250;
        this.y = 300;
        // velocity
        this.dx = 3;
        this.dy = -3;

        this.color = "#FFFFFF";
    }

    reset(){
        this.x = 250;
        this.y = 300;
        this.dx = 3;
        this.dy = -3;
    }

    update(canvas, paddle, bricks){
        
        this.x += this.dx;
        this.y += this.dy;

        //LEFT and Right walls
        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
            this.dx= -this.dx;
        }
        // Top Wall
        if(this.y - this.radius <= 0) {
            this.dy = -this.dy;        
        }
        // Bottom Wall
        if (this.y - this.radius > canvas.height){
            return "lifeLost";
        }
        // Paddle Collision
        if (this.y + this.radius >= paddle.y && // Bottom of ball touches top of paddle
            this.x >= paddle.x &&
            this.x <= paddle.x + paddle.width // Ball is smwhere above paddle horizontally
        ){ this.dy = -Math.abs(this.dy); // Math.abs also returns pos value
            this.y = paddle.y - this.radius; // prevent ball from getting stuck inside the paddle
        }
        // Brick Collision
        for (let brick of bricks){
            if(brick.destroyed) continue;

            if(
                this.x > brick.x &&
                this.x < brick.x + brick.width &&
                this.y > brick.y &&
                this.y < brick.y + brick.height
            ) {
                brick.destroyed =true;
                this.dy = -this.dy;
                break;
            }
        }
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#FFFFFF";
        // reset drawing cursor so that shapes dont accidentally connect
        ctx.beginPath();

        ctx.arc(
            this.x, 
            this.y, 
            this.radius, 
            0, //start angle
            Math.PI * 2 //end angle
        );
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}