// class Brick {

//     constructor(ctx, brickPosX, brickPosY, brickSizeW, brickSizeH, bricksArray, canvasSize) {

//         this.ctx = ctx
//         this.canvasSize = canvasSize
//         this.brickPos = {
//             x: brickPosX,
//             y: brickPosY
//         }
//         this.brickSize = {
//             w: brickSizeW,
//             h: brickSizeH
//         }
//         this.bricks = bricksArray
//         this.rows = 9
//         this.columns = 7
//         this.colors = ['rgb(255,0,0)','rgb(0,255,0)','rgb(0,0,255)','rgb(255,255,0)']
//     }

//     draw() {
          
//         this.ctx.fillStyle = this.colors[parseInt(Math.random()*this.colors.length)] 
//         //console.log(this.ctx.fillStyle);
//         this.ctx.fillRect(this.brickPos.x, this.brickPos.y, this.brickSize.w, this.brickSize.h)
//         console.log(this.bricks);
//         //console.log(this.brickPos.y);
//     }

        

//         //console.log(this.bricks);
    

// }