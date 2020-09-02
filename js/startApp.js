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
    score: 0,
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
        x: 10,
        y: 30
    },
    ballGravity: 0,
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
    powerUp: undefined,
    powerUpsArray: [{  
        x: undefined, 
        y: undefined,
        type: undefined
    }], 
    powerUpSize: {
        w: 35,
        h: 35
    },
    powerUpType: ['smallPaddle', 'bigPaddle', 'fastBall', 'crazyKeys'],


    // INITIALIZE THE GAME
    init(id){
        this.canvasId = id
        this.ctx = document.getElementById(this.canvasId).getContext('2d')
        console.log(this.ctx)
        this.setDimensions()
        this.createBricksArray()
        this.reset()
        this.setEventListener()  
        this.soundManagement()
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
                
        //document.addEventListener("mousemove", this.paddle.movePaddle('mouseMoveHandler'), false);
                
        // document.onmousemove = e => {
        //     console.log('mouseee')

        //     let relativeX = e.clientX + 600

        //     console.log(this.canvasId, '------')
        //     if (relativeX > this.canvasSize.w - this.canvasSize.w && relativeX < this.canvasSize.w) {
        //         this.paddle.paddlePos.x = relativeX - this.paddle.paddleSize.w / 2;
        //         console.log(e.clientX)
        //     }
        // }

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

        this.setEventListener()

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
        this.powerUp = new PowerUps(this.ctx, this.paddleSize.w, this.paddleSize.h, this.ballSize.w, this.ballSize.h,this.canvasSize )

        this.ball.draw()
        this.paddle.draw()
        this.drawBricks()
    },

    // CREATE ARRAY OF BRICKS
    createBricksArray() {

        for (let c = 0; c < this.brickColumns; c++) {
            this.bricks[c] = []
    
            for (let r = 0; r < this.brickRows; r++) {
               this.bricks[c][r] = {x: 0, y: 0, status: true, power: false}
               
            }
           
        }
        
        // Generate random powerups location
        for (let i = 0; i < 7; i++) {
             
            let columnIndex = Math.floor(Math.random() * 8)
            let rowIndex = Math.floor(Math.random() * 6) + 1
            
           if (this.bricks[columnIndex][rowIndex].power === true) {
              
                null
              
           } else {
               
                this.bricks[columnIndex][rowIndex].power = true
                 
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

    // DRAW POWER-UPS
    drawPowerUps() {
        for (let i = 0; i < this.powerUpsArray.length; i++) {
            if (i === 0) {
                null
            } else {
                  
                let powerUpPosX = this.powerUpsArray[i].x + (this.brickSize.w / 2 - this.powerUpSize.w/2)
                let powerUpPosY = this.powerUpsArray[i].y + this.brickSize.h
                let randomType = Math.floor(Math.random() * this.powerUpType.length)
                this.powerUpsArray[i].type = this.powerUpType[randomType]
                //console.log(this.powerUpsArray[i].type);
                
                this.powerUp.draw(powerUpPosX, powerUpPosY)
                this.powerUpsArray[i].y += 10

                this.isPowerUpCollision(powerUpPosX, powerUpPosY)
            } 
        }
       
    },

    // DRAW THE BOARD
    drawAll() {

        this.drawBackground()
        this.paddle.draw()
        this.ball.draw()
        this.drawPowerUps()
        //console.log(this.powerUpsArray)
    },

    setScore() {
            
        this.score += 10
        const scoreNode = document.querySelector('.score span')
        
        // console.log(this.score, '---', scoreNode)

        this.score < 100 ? scoreNode.innerText = '0' + this.score : scoreNode.innerText = this.score

    },


    // CHECK BOUNDERIES
    setBounderies() {

        // Up and down bounderies
        if (this.ball.ballPos.y - this.ball.ballRadius < 0) {

            wall_hit.play()
            this.ball.ballVel.y *= -1

        } else if (this.ball.ballPos.y + this.ball.ballRadius > this.canvasSize.h) {

            
            this.lifeCounter()

            //this.isLosingLife()

        }

        // Right and left boundaries
        if (this.ball.ballPos.x < this.canvasSize.w - this.canvasSize.w || this.ball.ballPos.x > this.canvasSize.w - this.ballSize.w) {

            wall_hit.play()
            this.ball.ballVel.x *= -1

        } else {

            null

        }

    },

    // CHECK COLLISIONS
    isPaddleCollision() {

        if (this.ball.ballPos.y + this.ball.ballRadius > this.paddle.paddlePos.y &&
            this.ball.ballPos.y - this.ball.ballRadius < this.paddle.paddlePos.y + this.paddle.paddleSize.h &&
            this.ball.ballPos.x + this.ball.ballRadius > this.paddle.paddlePos.x &&
            this.ball.ballPos.x - this.ball.ballRadius < this.paddle.paddlePos.x + this.paddle.paddleSize.w) {
                
            this.ball.ballVel.y *= -1
            paddle_hit.play()
            
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
                    brick_hit.play()
                    b.status = false
                    this.setScore()
                    //console.log(b,'---',b.status)
                    if (b.power) {
                        //this.powerUp.draw(b.x, b.y)
                                                  
                        this.powerUpsArray.push({x: b.x, y: b.y})
                        
                    }
                }

              }
            
            }
        }
    },

    setPowerUp(type) {
        const paddleRealSize = this.paddleSize.w
        const ballRealVel = this.ballVel
        console.log(type);

        switch (type) {
          case 'bigPaddle':
            this.paddle.paddleSize.w *= 2
            break
          case 'smallPaddle':
            this.paddle.paddleSize.w /= 2
            break
          case 'fastBall':
            this.ball.ballVel.y *= 2
            break
          case 'crazyKeys':
              this.keycode.left = 39
              this.keycode.right = 37
        }
        
        setTimeout(() => {
            
            this.paddle.paddleSize.w = paddleRealSize
            this.ball.ballVel = ballRealVel

        }, 7000)
    
    },

    isPowerUpCollision(powerUpPosX, powerUpPosY){

        for (let i = 0; i < this.powerUpsArray.length; i++) {
            if (i === 0) {
                null
            } else {
        
                if (powerUpPosX + this.powerUpSize.w > this.paddle.paddlePos.x &&
                    powerUpPosX < this.paddle.paddlePos.x + this.paddle.paddleSize.w &&
                    powerUpPosY + this.powerUpSize.h > this.paddle.paddlePos.y) {
                    //console.log('colisioooon')
                    power_up.play()
                    this.setPowerUp(this.powerUpsArray[i].type)
                    this.powerUpsArray.splice(i, 1)
                    //console.log(this.powerUpsArray)
                    
                    //console.log(this.paddleSize.w)
                } else if ( powerUpPosY + this.powerUpSize.h > this.canvasSize.h) {
                    this.powerUpsArray.splice(i, 1)
                }
            }
        } 
    },

    isCollision() {

        this.setBounderies()
        this.isPaddleCollision()
        this.isBrickCollision()
    },
 
    // CLEAR SCREEN 
    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
    },

    // LOOSE LIFE
    isLosingLife() {

        if (this.lifes > 0) {
            //console.log('entró');

            this.ball.ballPos.x = (this.canvasSize.w / 2)
            this.ball.ballPos.y = (this.canvasSize.h / 2)

            this.paddle.paddlePos.x = (this.canvasSize.w / 2) - (this.paddleSize.w / 2)
            this.paddle.paddlePos.y = (this.canvasSize.h - 70)

        } else {

            this.gameOver()
            lose.play()

        }

    },

    // LIFE COUNTER
    lifeCounter() {

        this.lifes--
        life_lost.play()
        this.isLosingLife()

        // Update HTML deleting the heart
        const lifeNode = document.querySelectorAll('.life')
        lifeNode[this.lifes].style.opacity = '0'

    },
    
    // POP UPS GAME OVER/WIN
    banner() {

        const gameOverNode = document.querySelector('.gameover')
        const youWinNode = document.querySelector('.you-lose')
        
        // If lose
        gameOverNode.style.opacity = '1'
        gameOverNode.style.display = 'flex'
        youWinNode.classList.remove('hide')

        // If win

    },
        
    // SOUND MANAGEMENT
    soundManagement() {

        const soundNode = document.querySelector('#sound')

        soundNode.addEventListener('click', audioManager)

        function audioManager() {

            let imgSrc = soundNode.getAttribute('src')

            let soundImg = imgSrc == './img/volume-on.png' ? './img/volume-off.png' : './img/volume-on.png'

            soundNode.setAttribute('src', soundImg)
            
            // MUTE AND UNMUTE SOUNDS
            wall_hit.muted = wall_hit.muted ? false : true
            paddle_hit.muted = paddle_hit.muted ? false : true
            brick_hit.muted = brick_hit.muted ? false : true
            life_lost.muted = life_lost.muted ? false : true
            win.muted = win.muted ? false : true
            lose.muted = lose.muted ? false : true
        }

    },

    // GAMEOVER
    gameOver() {
                
        this.banner()

        clearInterval(this.interval)
        this.createBricksArray()
        this.reset()
        
    },

}
