const breakOutGame = {
    name: 'break out game',
    authors:  'Ana Bermúdez, Cecilia Moreira, Juan Semprún',
    version: '1.0.0',
    license: undefined,
    description: 'Proyecto 1, Canvas game',
    canvasId: undefined,
    ctx: undefined,
    FPS: 60,
    lifes: 3,
    score: undefined,
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
        w: 25,
        h: 5
    },
    ballRadius: undefined,
    ballVel: {
        x: 0,
        y: 50
    },
    ballGravity: 0,
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
        
        document.getElementById(this.canvasId).setAttribute('width', 1100)
        document.getElementById(this.canvasId).setAttribute('height', window.innerHeight)

        this.canvasSize = {
            w: 1000,
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
            
         }, 50)
        
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
       // this.brick.draw()
    },

    drawBackground(){
        this.ctx.fillStyle = '#d1ebf7'
        this.ctx.fillRect(0,0, this.canvasSize.w, this.canvasSize.h)
    },

    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
    },

    resetBallAndPaddle() {

        if (this.lifes > 0) {

            this.ball.ballPos.x = (this.canvasSize.w / 2)
            this.ball.ballPos.y = (this.canvasSize.h / 2)

            this.paddle.paddlePos.x = (this.canvasSize.w / 2) - (this.paddleSize.w / 2)
            this.paddle.paddlePos.y = (this.canvasSize.h - 100)

        } else {

            this.gameOver()

        }

    },

    gameOver() {


        clearInterval(this.interval)

    },

    setBounderies() {

        // Up bounderie
        if (this.ball.ballPos.y - this.ball.ballRadius < 0) {

            this.ball.ballVel.y *= -1

        } else if (this.ball.ballPos.y + this.ball.ballRadius > this.canvasSize.h) {

            this.lifes--

            this.resetBallAndPaddle()

        }

        // Right and left boundarie
        if (this.ball.ballPos.x < this.canvasSize.w - this.canvasSize.w || this.ball.ballPos.x > this.canvasSize.w - this.ballSize.w) {

            this.ball.ballVel.x *= -1

        } else {

            null

        }

    },

    paddleCollision() {

        if (this.ball.ballPos.y + this.ball.ballRadius >= this.paddle.paddlePos.y &&
            this.ball.ballPos.x > this.paddle.paddlePos.x &&
            this.ball.ballPos.x <= this.paddle.paddlePos.x + this.paddle.paddleSize.w) {
                
                 this.ball.ballVel.y *= -1

        } else {

            null

        }
    },

    isCollision() {

        this.setBounderies()
        this.paddleCollision()

    }
    
}