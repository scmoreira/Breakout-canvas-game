class Paddle {

    constructor(ctx, paddlePosX, paddlePosY, paddleW, paddleH, canvasSize){
        this.ctx = ctx
        this.paddlePos = {
            x: paddlePosX,
            y: paddlePosY
        }
        this.paddleSize = {
            w: paddleW,
            h: paddleH
        }
        this.paddleVel = 5
        this.canvasSize = canvasSize  
    }

    draw() {
        
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.paddlePos.x, this.paddlePos.y, this.paddleSize.w, this.paddleSize.h)
      
        this.movePaddle()
    }
    

    movePaddle(dir){
        // dir === 'left'  ? this.paddlePos.x -= 5 : null
        // dir === 'right' ? this.paddlePos.x += 5 : null
        dir === 'left' && this.paddlePos.x >= 0 ? this.paddlePos.x -= this.paddleVel : null
        dir === 'right' && this.paddlePos.x <= this.canvasSize.w - this.paddleSize.w ? this.paddlePos.x += this.paddleVel : null
        //console.log(this.paddlePos.x)
        // console.log('left') 
        // console.log('right')
    }
}