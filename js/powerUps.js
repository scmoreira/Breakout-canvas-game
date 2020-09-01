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
            w: 50,
            h: 50
        }
        this.powerUpVel = {
            x: 0,
            y: 50
        }
        this.powerUpGravity = 50
        this.canvasSize = canvasSize

        // this.imageName = this.imageName
        // this.imageInstance = undefined 

        // this.init()
    }

    // init(){
    //    this.imageInstance = new Image()
    //     image.src = `img/${this.imageName}`
    //     //image.onload = () => this.ctx.drawImage(image, tthis.powerUpPos.x, this.powerUpPos.y, this.powerUpSize.w, this.powerUpSize.h
    

    // }

    draw(x, y){
        
            this.move(x, y)
            this.ctx.fillStyle = 'yellow'
            this.ctx.fillRect(x, y, this.powerUpSize.w, this.powerUpSize.h)
            console.log(x, y);

        //this.ctx.drawImage(this.imageInstance, this.powerUpPos.x, this.powerUpPos.y, this.powerUpSize.w, this.powerUpSize.h)
    }

    move(x, y){
        
        this.ctx.clearRect(0, 0, this.powerUpSize.w, this.powerUpSize.h)

        //this.powerUpPos.x += this.powerUpPos.x    
        //y += this.powerUpGravity
        //y += this.powerUpVel.y

        this.powerUpVel.y += this.powerUpGravity
        y += this.powerUpVel.y
        console.log(y, '------');

       
    }

}
