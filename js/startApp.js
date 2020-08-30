const breakOutGame = {
    name: 'break out game',
    authors:  'Ana Bermúdez, Cecilia Moreira, Juan Semprún',
    version: '1.0.0',
    license: undefined,
    description: 'Proyecto 1, Canvas game',
    canvasId: undefined,
    ctx: undefined,
    FPS: 60,
    canvasSize: {
        w: undefined,
        h: undefined
    },
    keycode : {
        left: 37,
        right: 39
    },
    paddle: undefined,
    paddleSize :{
        w: 200,
        h: 20
    },
    paddlePos : {
        x: undefined,
        y: undefined
    },
    ball: undefined, 
    ballSize : {
        w:25,
        h: 5
    },
    brick: undefined,
    brickSize: {
        w: undefined,
        h: 30
    },



    init(id){
        this.canvasId = id
        this.ctx = document.getElementById(this.canvasId).getContext('2d')
        console.log(this.ctx)
        this.setDimensions()
        this.setEventListener()   
        this.start()
    },

    setDimensions() {
        
        const divSize = document.querySelector('#game-board')
        
        document.getElementById(this.canvasId).setAttribute('width', window.innerWidth - 600)
        document.getElementById(this.canvasId).setAttribute('height', window.innerHeight)

        this.canvasSize = {
            w: window.innerWidth - 600,
            h: window.innerHeight
        }

    },

    setEventListener(){
        document.onkeydown = e => {
            e.keyCode === this.keycode.left ? this.paddle.movePaddle('left') : null
            e.keyCode === this.keycode.right ? this.paddle.movePaddle('right') : null
            //console.log(e)
        }
    },


    start(){

        this.reset()
        this.interval = setInterval(() => {

            this.clearScreen()
            this.drawAll()
            this.isCollision()
            
         }, 100)
        
    },

    reset() {

        this.drawBackground()
        const centerX = (this.canvasSize.w / 2) - (this.paddleSize.w / 2)
        const centerY = (this.canvasSize.h - 100)

        this.paddle = new Paddle(this.ctx, centerX, centerY, this.paddleSize.w, this.paddleSize.h, this.canvasSize)
        this.ball = new Ball(this.ctx, centerX + (this.paddleSize.w / 2), this.canvasSize.h / 2, this.ballSize.w, this.ballSize.h, this.canvasSize)
        this.brick = new Brick(this.ctx, 0, 0, 105, this.brickSize.h, this.canvasSize)
        
    },

    drawAll() {
        this.drawBackground()
        this.paddle.draw()
        this.ball.draw()
        this.brick.draw()
    },

    drawBackground(){
        this.ctx.fillStyle = '#d1ebf7'
        this.ctx.fillRect(0,0, this.canvasSize.w, this.canvasSize.h)
    },

    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
    },

    isCollision() {

        if (this.ball.ballPos.y + this.ball.ballRadius >= this.paddle.paddlePos.y &&
            this.ball.ballPos.x > this.paddle.paddlePos.x &&
            this.ball.ballPos.x <= this.paddle.paddlePos.x + this.paddle.paddleSize.w) {
                
                 this.ball.ballVel.y *= -1

        } else {

            null

        }
    }
    
}