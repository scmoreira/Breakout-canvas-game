class Brick {

    constructor(ctx, brickPosX, brickPosY, brickSizeW, brickSizeH, canvasSize) {

        this.ctx = ctx
        this.canvasSize = canvasSize
        this.brickPos = {
            x: brickPosX,
            y: brickPosY
        }
        this.brickSize = {
            w: brickSizeW,
            h: brickSizeH
        }
        this.bricks = []
        this.rows = 7
        this.columns = 10
        this.colors = ['rgb(255,0,0)','rgb(0,255,0)','rgb(0,0,255)','rgb(255,255,0)']
    }

    draw() {

        for (let r = 0; r < this.rows; r++) {
            this.bricks[r] = []
            for (let c = 0; c < this.columns; c++) {
                this.bricks [r][c] = {x: 0, y: 0}
            }
        } 

        for (let r = 1; r < this.rows; r++) {
            for (let c = 0; c < this.columns; c++) {
                this.brickPos.x = c * (this.brickSize.h + 80)
                this.brickPos.y = r * (this.brickSize.w - 65)
                this.bricks[r][c].x = this.brickPos.x
                this.bricks[r][c].y =  this.brickPos.y
                this.ctx.fillStyle = this.colors[parseInt(Math.random()*this.colors.length)] 
                //console.log(this.ctx.fillStyle);
                this.ctx.fillRect(this.brickPos.x, this.brickPos.y, this.brickSize.w, this.brickSize.h)
                console.log(this.brickSize.w);
                //console.log(this.brickPos.y);
            }

        }

        //console.log(this.bricks);
    }

}