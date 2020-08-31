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
        right: 39,
        enter: 13
    },
    isPlaying: false,
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
    //brick: undefined,
    brickSize: {
        w: 105,
        h: 30
    },
    brickPos : {
        x: 0,
        y: 0
    },
    brickColors: ['rgb(255,0,0)','rgb(0,255,0)','rgb(0,0,255)','rgb(255,255,0)'],
    bricks: [],
    brickRows: 7,
    brickColumns: 9,
    

    // INITIALIZE THE GAME
    init(id){
        this.canvasId = id
        this.ctx = document.getElementById(this.canvasId).getContext('2d')
        console.log(this.ctx)
        this.setDimensions()
        this.createBricksArray()
        this.reset()
        this.setEventListener()  
    },

    // DIMENSIONS FOR THE CANVAS
    setDimensions() {

        const divSize = document.querySelector('#game-board')
        
        document.getElementById(this.canvasId).setAttribute('width', 1000)
        document.getElementById(this.canvasId).setAttribute('height', window.innerHeight)

        this.canvasSize = {
            w: 1000,
            h: window.innerHeight
        } 

    },

    // COMMANDS
    setEventListener() {

        document.onkeydown = e => {
            
            e.keyCode === this.keycode.left ? this.paddle.movePaddle('left') : null
            e.keyCode === this.keycode.right ? this.paddle.movePaddle('right') : null
            //console.log(e)

            // PAUSE / START
            if (e.keyCode === this.keycode.enter && this.isPlaying === false) {
                this.start()
                this.isPlaying = true
            } else if (e.keyCode === this.keycode.enter && this.isPlaying === true) {
                //console.log('Pausado')
                this.pause()
                this.isPlaying = false
            } 

        }
    },
 
    // PAUSE THE GAME
    pause() {
        clearInterval(this.interval)
    },

    // START THE GAME
    start(){

        //this.reset()
        this.interval = setInterval(() => {

            this.clearScreen()
            this.drawAll()
            this.drawBricks()
            this.isCollision()
            
         }, 50)
        
    },

    // RESET THE GAME
    reset() {

        this.drawBackground()

        const centerX = (this.canvasSize.w / 2) - (this.paddleSize.w / 2)
        const centerY = (this.canvasSize.h - 80)

        this.paddle = new Paddle(this.ctx, centerX, centerY, this.paddleSize.w, this.paddleSize.h, this.canvasSize)
        this.ball = new Ball(this.ctx, centerX + (this.paddleSize.w / 2), this.canvasSize.h / 2, this.ballSize.w, this.ballSize.h, this.canvasSize)
        
        this.ball.draw()
        this.paddle.draw()
        this.drawBricks()
    },

    // CREATE ARRAY OF BRICKS
    createBricksArray() {

        for (let c = 0; c < this.brickColumns; c++) {
            this.bricks[c] = []
    
            for (let r = 0; r < this.brickRows; r++) {
               this.bricks[c][r] = {x: 0, y: 0, status: true}
               //console.log(this.bricks[r][c])
            }
        } 
    },

    // BACKGROUND
    drawBackground() {
        
        this.ctx.lineWidth = 5
        this.ctx.fillStyle = 'black' //#d1ebf7
        this.ctx.fillRect(0, 0, this.canvasSize.w, this.canvasSize.h)
        this.ctx.strokeStyle = "white"
        this.ctx.strokeRect(0, 0, this.canvasSize.w, this.canvasSize.h)
        
    },
    
    // DRAW BRICKS WALL
    drawBricks() {
        //console.log(this.brickRows)
        
        for (let c = 0; c < this.brickColumns; c++) {

            for (let r = 1; r < this.brickRows; r++) {
                  
                if (this.bricks[c][r].status) {

                    this.brickPos.x = c * (this.brickSize.h + 80) + 7
                    this.brickPos.y = r * (this.brickSize.w - 70) 
                    this.bricks[c][r].x = this.brickPos.x
                    this.bricks[c][r].y =  this.brickPos.y
                    //this.ctx.fillStyle = this.brickColors[parseInt(Math.random()*this.brickColors.length)] 
                    //console.log(this.ctx.fillStyle);
                    switch (r) {
                        case 1:
                            this.ctx.fillStyle = 'red'
                        break
                        case 2: 
                        this.ctx.fillStyle = 'green'
                        break
                        case 3: 
                        this.ctx.fillStyle = 'yellow'
                        break
                        case 4:
                            this.ctx.fillStyle = 'blue'
                        break
                        case 5:
                            this.ctx.fillStyle = 'white'
                        break
                        case 6:
                            this.ctx.fillStyle = 'orange'
                        break
                    }

                    this.ctx.fillRect(this.brickPos.x, this.brickPos.y, this.brickSize.w, this.brickSize.h)
                    //console.log(this.bricks[0][0]);
                    //console.log(this.brickPos.y);
                }
                
            }
        }
        
    },

    // DRAW THE BOARD
    drawAll() {
        this.drawBackground()
        this.paddle.draw()
        this.ball.draw()
        //this.brick.draw()
    },


    // CLEAR SCREEN 
    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
    },
        
    // LIFE COUNTER
    lifeCounter() {

        this.lifes--

        // Update HTML deleting the heart
        const lifeNode = document.querySelectorAll('.life')
        lifeNode[this.lifes].style.opacity = '0'

    },

    // LOOSE LIFE
    resetBallAndPaddle() {

        if (this.lifes > 0) {
            console.log('entró');

            this.ball.ballPos.x = (this.canvasSize.w / 2)
            this.ball.ballPos.y = (this.canvasSize.h / 2)

            this.paddle.paddlePos.x = (this.canvasSize.w / 2) - (this.paddleSize.w / 2)
            this.paddle.paddlePos.y = (this.canvasSize.h - 70)

        } else {

            this.gameOver()

        }

    },
    
    // POP UPS GAME OVER/WIN
    banner() {

        const gameOverNode = document.querySelector('.gameover')
        const youWinNode = document.querySelector('.you-lose')
        
        // si pierde
        gameOverNode.style.opacity = '1'
        gameOverNode.style.display = 'flex'
        youWinNode.classList.remove('hide')

    },

    // GAMEOVER
    gameOver() {
                
        this.banner()

        clearInterval(this.interval)
        this.createBricksArray()
        this.reset()
        
    },

    // CHECK BOUNDERIES
    setBounderies() {

        // Up bounderie
        if (this.ball.ballPos.y - this.ball.ballRadius < 0) {

            this.ball.ballVel.y *= -1

        } else if (this.ball.ballPos.y + this.ball.ballRadius > this.canvasSize.h) {

            this.lifeCounter()

            this.resetBallAndPaddle()

        }

        // Right and left boundaries
        if (this.ball.ballPos.x < this.canvasSize.w - this.canvasSize.w || this.ball.ballPos.x > this.canvasSize.w - this.ballSize.w) {

            this.ball.ballVel.x *= -1

        } else {

            null

        }

    },

    // CHECK COLLISIONS
    paddleCollision() {

        if (this.ball.ballPos.y + this.ball.ballRadius > this.paddle.paddlePos.y &&
            this.ball.ballPos.y - this.ball.ballRadius < this.paddle.paddlePos.y + this.paddle.paddleSize.h &&
            this.ball.ballPos.x + this.ball.ballRadius > this.paddle.paddlePos.x &&
            this.ball.ballPos.x - this.ball.ballRadius < this.paddle.paddlePos.x + this.paddle.paddleSize.w) {
                
                this.ball.ballVel.y *= -1

        } else {

            null

        }
    },

    isBrickCollision(){
        
        for(let c = 0; c < this.brickColumns; c++) {

            for(let r = 1; r < this.brickRows; r++) {

             let b = this.bricks[c][r]

               if (b.status) { 

                    if (this.ball.ballPos.y + this.ball.ballRadius > b.y &&
                        this.ball.ballPos.y - this.ball.ballRadius < b.y + this.brickSize.h &&
                        this.ball.ballPos.x + this.ball.ballRadius > b.x &&
                        this.ball.ballPos.x - this.ball.ballRadius < b.x + this.brickSize.w) {
                        //console.log('golpea')
                        this.ball.ballVel.y *= -1
                        b.status = false
                        //console.log(b,'---',b.status)
                    }

              }
            
            }
        }
     },

    isCollision() {

        this.setBounderies()
        this.paddleCollision()
        this.isBrickCollision()
    }
    
}
