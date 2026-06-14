export default class Ball {
    constructor() {
        this.radius = 10;
        this.color = "#FFFFFF";
        this.baseSpeed =3;
        this.reset();
    }

    reset(speed = this.baseSpeed) {
        this.x = 250;
        this.y = 300;
        this.dx = speed;
        this.dy = -speed;
        this.baseSpeed = speed;
    }

    update(canvas, paddle, bricks) {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x - this.radius <= 0) {
            this.x = this.radius;
            this.dx = -this.dx;
        } else if (this.x + this.radius >= canvas.width) {
            this.x = canvas.width - this.radius;
            this.dx = -this.dx;
        }

        if (this.y - this.radius <= 0) {
            this.y = this.radius;
            this.dy = -this.dy;
        }

        if (this.y + this.radius >= canvas.height) {
            return "lifeLost";
        }

        if (
            this.dy > 0 &&
            this.y + this.radius >= paddle.y &&
            this.y - this.radius <= paddle.y + paddle.height &&
            this.x + this.radius >= paddle.x &&
            this.x - this.radius <= paddle.x + paddle.width
        ) {
            const hitPos = (this.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
            const clampedHit = Math.max(-1, Math.min(1, hitPos));
            const speed = Math.hypot(this.dx, this.dy);
            const maxBounceAngle = Math.PI / 3;
            const bounceAngle = clampedHit * maxBounceAngle;

            this.dx = speed * Math.sin(bounceAngle);
            this.dy = -Math.abs(speed * Math.cos(bounceAngle));
            this.y = paddle.y - this.radius;
        }

        for (const brick of bricks) {
            if (brick.destroyed) {
                continue;
            }

            const closestX = Math.max(brick.x, Math.min(this.x, brick.x + brick.width));
            const closestY = Math.max(brick.y, Math.min(this.y, brick.y + brick.height));
            const distX = this.x - closestX;
            const distY = this.y - closestY;
            const distanceSquared = distX * distX + distY * distY;

            if (distanceSquared > this.radius * this.radius) {
                continue;
            }

            brick.destroyed = true;

            const overlapLeft = this.x + this.radius - brick.x;
            const overlapRight = brick.x + brick.width - (this.x - this.radius);
            const overlapTop = this.y + this.radius - brick.y;
            const overlapBottom = brick.y + brick.height - (this.y - this.radius);
            const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

            if (minOverlap === overlapLeft || minOverlap === overlapRight) {
                this.dx = -this.dx;
                if (minOverlap === overlapLeft) {
                    this.x = brick.x - this.radius;
                } else {
                    this.x = brick.x + brick.width + this.radius;
                }
            } else {
                this.dy = -this.dy;
                if (minOverlap === overlapTop) {
                    this.y = brick.y - this.radius;
                } else {
                    this.y = brick.y + brick.height + this.radius;
                }
            }

            return "brickDestroyed";
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}
