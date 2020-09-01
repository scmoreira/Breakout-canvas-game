class PowerUps {

    constructor(ctx, paddleSizeW, paddleSizeH, ballSizeW, ballSizeH, canvasSize){
        this.ctx = ctx
        this.paddleSize = {
            w: paddleSizeW,
            h: paddleSizeH
        }
        this.ballSize = {
            w: ballSizeW,
            h: ballSizeH
        }
        this.powerUpPos = {
            x: undefined,
            y: undefined
        }
        this.powerUpSize = {
            w: 70,
            h: 70
        }
        this.powerUpVel = {
            x: 0,
            y: 10
        }
        this.powerUpGravity = .4
        this.canvasSize = canvasSize

        this.imageName = 'box-2.png'
        this.imageInstance = undefined 

        this.init()
    }

    init(){
       this.imageInstance = new Image()
       this.imageInstance.src = `./img/${this.imageName}`
        
    

    }

    draw(x, y){
        
            this.move(x, y)
            this.ctx.drawImage(this.imageInstance, x, y, this.powerUpSize.w, this.powerUpSize.h)
            // this.ctx.fillStyle = 'yellow'
            // this.ctx.fillRect(x, y, this.powerUpSize.w, this.powerUpSize.h)
            //console.log(x, y);
    }

    move(x, y){
        
        this.ctx.clearRect(0, 0, this.powerUpSize.w, this.powerUpSize.h)

        //this.powerUpPos.x += this.powerUpPos.x    
        //y += this.powerUpGravity
        //y += this.powerUpVel.y

        this.powerUpVel.y += this.powerUpGravity
        y += this.powerUpVel.y
        //console.log(y, '------');

       
    }

    
}
