class Ball {

    constructor(ctx, ballPosX, ballPosY, ballW, ballH, canvasSize){
        this.ctx = ctx
        this.ballPos = {
            x: ballPosX,
            y: ballPosY
        }
        this.ballSize = {
            w: ballW,
            h: ballH
        }
        this.ballRadius = this.ballSize.w / 2
        this.ballVel = {
            x: 10,
            y: 30
        }
        this.ballGravity = .8
        this.canvasSize = canvasSize
    }

    draw(){

        this.move()

        this.ctx.fillStyle = 'red'
        this.ctx.beginPath()
        this.ctx.arc(this.ballPos.x, this.ballPos.y, 15, 0, Math.PI * 2)
        this.ctx.closePath()
        this.ctx.fill()
        
    }

    move(){
        
        this.ctx.clearRect(0, 0, this.ballSize.w, this.ballSize.h);

        this.ballPos.x += this.ballVel.x    
        this.ballVel.y += this.ballGravity
        this.ballPos.y += this.ballVel.y

    }

}